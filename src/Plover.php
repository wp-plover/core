<?php

namespace Plover\Core;

use Plover\Core\Framework\Container\Container;
use Plover\Core\Framework\ServiceProvider;
use Plover\Core\Services\AssetsServiceProvider;
use Plover\Core\Services\Blocks\BlocksServiceProvider;
use Plover\Core\Services\Extensions\ExtensionsServiceProvider;
use Plover\Core\Toolkits\Path;
use Plover\Core\Toolkits\Str;
use Psr\Container\ContainerInterface;

/**
 * @since 1.0.0
 */
class Plover extends Container {

	/**
	 * The plover/core framework version.
	 *
	 * @since 1.0.0
	 * @var string
	 */
	const VERSION = '1.0.0';

	/**
	 * The core instances.
	 *
	 * @var array Plover[]
	 */
	protected static $core_instances = [];

	/**
	 * The identifier of current plover core instance.
	 *
	 * @var string
	 */
	protected $instance_id;

	/**
	 * Indicates if the core has "booted".
	 *
	 * @var bool
	 */
	protected $booted = false;

	/**
	 * All the registered service providers.
	 *
	 * @var array<string, \Plover\Core\Framework\ServiceProvider>
	 */
	protected $service_provides = [];

	/**
	 * The names of the loaded service providers.
	 *
	 * @var array
	 */
	protected $loaded_providers = [];

	/**
	 * The array of registered callbacks.
	 *
	 * @var callable[]
	 */
	protected $registered_callbacks = [];

	/**
	 * The array of booting callbacks.
	 *
	 * @var array callable[]
	 */
	protected $booting_callbacks = [];

	/**
	 * The array of booted callbacks.
	 *
	 * @var array callable[]
	 */
	protected $booted_callbacks = [];

	/**
	 * Create a new plover core instance.
	 *
	 * @param string $id
	 * @param $base_path
	 */
	public function __construct( string $id, $base_path ) {
		$this->instance_id = $id;

		$this->bind_paths_in_container( $base_path );
		$this->register_base_bindings();
		$this->register_base_service_providers();
		$this->register_core_container_aliases();
	}

	/**
	 * Bind all the app & core paths in the container.
	 *
	 * @param string $base_path
	 *
	 * @return $this
	 */
	public function bind_paths_in_container( string $base_path ) {
		$app_path  = untrailingslashit( $base_path );
		$core_path = untrailingslashit( dirname( __DIR__ ) );
		$app_url   = content_url( Path::get_segment( $app_path, - 2 ) );
		$core_url  = $app_url . str_replace( $app_path, '', $core_path );

		$this->instance( 'app.path', $app_path );
		$this->instance( 'app.url', $app_url );
		$this->instance( 'core.path', $core_path );
		$this->instance( 'core.url', $core_url );

		return $this;
	}

	/**
	 * Register the basic bindings into the container.
	 *
	 * @return void
	 */
	protected function register_base_bindings() {
		static::set_instance( $this->instance_id, $this );

		$this->instance( 'core.version', static::VERSION );
		$this->instance( 'core', $this );
		$this->instance( Plover::class, $this );
		$this->instance( Container::class, $this );
	}

	/**
	 * Set the shared instance of plover/core.
	 *
	 * @param string $id
	 * @param Plover $core
	 *
	 * @return Plover
	 */
	public static function set_instance( string $id, Plover $core ): Plover {
		return static::$core_instances[ $id ] = $core;
	}

	/**
	 * Register all the base service providers.
	 *
	 * @return void
	 */
	protected function register_base_service_providers() {
		$this->register( new AssetsServiceProvider( $this ) );
		$this->register( new ExtensionsServiceProvider( $this ) );
		$this->register( new BlocksServiceProvider( $this ) );
	}

	/**
	 * Register a service provider with the core.
	 *
	 * @param $provider
	 * @param $force
	 *
	 * @return \Plover\Core\Framework\ServiceProvider
	 */
	public function register( $provider, $force = false ) {
		if ( ( $registered = $this->get_provider( $provider ) ) && ! $force ) {
			return $registered;
		}

		// If the given "provider" is a string, we will resolve it, passing in the
		// application instance automatically. This is simply
		// a more convenient way of specifying our service provider classes.
		if ( is_string( $provider ) ) {
			$provider = $this->resolve_provider( $provider );
		}

		$provider->register();

		// If there are bindings / singletons / aliases set as properties on the provider we
		// will spin through them and register them with the application, which
		// serves as a convenience layer while registering a lot of bindings.
		if ( property_exists( $provider, 'bindings' ) ) {
			foreach ( $provider->bindings as $key => $value ) {
				$this->bind( $key, $value );
			}
		}

		if ( property_exists( $provider, 'singletons' ) ) {
			foreach ( $provider->singletons as $key => $value ) {
				$key = is_int( $key ) ? $value : $key;

				$this->singleton( $key, $value );
			}
		}

		if ( property_exists( $provider, 'aliases' ) ) {
			foreach ( $provider->aliases as $key => $value ) {
				$key = is_int( $key ) ? $value : $key;

				$this->alias( $key, $value );
			}
		}

		$this->mark_as_registered( $provider );

		// If the application has already booted, we will call this boot method on
		// the provider class so it has an opportunity to do its boot logic.
		if ( $this->is_booted() ) {
			$this->boot_provider( $provider );
		}

		return $provider;
	}

	/**
	 * Get the registered service provider if it exists.
	 *
	 * @param $provider
	 *
	 * @return \Plover\Core\Framework\ServiceProvider|null
	 */
	public function get_provider( $provider ) {
		$name = is_string( $provider ) ? $provider : get_class( $provider );

		return $this->service_provides[ $name ] ?? null;
	}

	/**
	 * Resolve a service provider instance from the class name.
	 *
	 * @param string $provider
	 *
	 * @return \Plover\Core\Framework\ServiceProvider
	 */
	public function resolve_provider( $provider ) {
		return new $provider( $this );
	}

	/**
	 * Mark the given provider as registered.
	 *
	 * @param \Plover\Core\Framework\ServiceProvider $provider
	 *
	 * @return void
	 */
	protected function mark_as_registered( $provider ) {
		$class = get_class( $provider );

		$this->service_provides[ $class ] = $provider;

		$this->loaded_providers[ $class ] = true;
	}

	/**
	 * Determine if the core has booted.
	 *
	 * @return bool
	 */
	public function is_booted() {
		return $this->booted;
	}

	/**
	 * Boot the given service provider.
	 *
	 * @param ServiceProvider $provider
	 *
	 * @return void
	 */
	protected function boot_provider( ServiceProvider $provider ) {

		$provider->call_booting_callbacks();

		if ( method_exists( $provider, 'boot' ) ) {
			$this->call( [ $provider, 'boot' ] );
		}

		$provider->call_booted_callbacks();
	}

	/**
	 * Register the core class aliases in the container.
	 *
	 * @return void
	 */
	protected function register_core_container_aliases() {
		foreach (
			[
				'core' => [ self::class, Container::class, ContainerInterface::class ]
			] as $key => $aliases
		) {
			foreach ( $aliases as $alias ) {
				$this->alias( $key, $alias );
			}
		}
	}

	/**
	 * Get the saved globally available instance of plover/core.
	 *
	 * @param string $id
	 *
	 * @return mixed|null
	 */
	public static function get_instance( string $id ) {
		return static::$core_instances[ $id ] ?? null;
	}

	/**
	 * Get app asset url.
	 *
	 * @param string $path
	 *
	 * @return string
	 */
	public function app_url( string $path ): string {
		return $this->get( 'app.url' ) . Str::leadingslashit( $path );
	}

	/**
	 * Get core asset url.
	 *
	 * @param string $path
	 *
	 * @return string
	 */
	public function core_url( string $path ): string {
		return $this->get( 'core.url' ) . Str::leadingslashit( $path );
	}

	/**
	 * Get app asset url.
	 *
	 * @param string $path
	 *
	 * @return string
	 */
	public function app_path( string $path ): string {
		return $this->get( 'app.path' ) . Str::leadingslashit( $path );
	}

	/**
	 * Get core asset path.
	 *
	 * @param string $path
	 *
	 * @return string
	 */
	public function core_path( string $path ): string {
		return $this->get( 'core.path' ) . Str::leadingslashit( $path );
	}

	/**
	 * Register all the configured providers.
	 *
	 * @return void
	 */
	public function register_providers( $providers ) {
		foreach ( $providers as $provider ) {
			$this->register( $provider );
		}

		$this->fire_callbacks( $this->registered_callbacks );
	}

	/**
	 * Call the booting callbacks for the application.
	 *
	 * @param callable[] $callbacks
	 *
	 * @return void
	 */
	protected function fire_callbacks( array &$callbacks ) {
		$index = 0;

		while ( $index < count( $callbacks ) ) {
			$callbacks[ $index ]( $this );

			$index ++;
		}
	}

	/**
	 * Register a new registered listener.
	 *
	 * @param callable $callback
	 *
	 * @return void
	 */
	public function registered( $callback ) {
		$this->registered_callbacks[] = $callback;
	}

	/**
	 * Register a new boot listener.
	 *
	 * @param callable $callback
	 *
	 * @return void
	 */
	public function booting( $callback ) {
		$this->booting_callbacks[] = $callback;
	}

	/**
	 * Register a new "booted" listener.
	 *
	 * @param callable $callback
	 *
	 * @return void
	 */
	public function booted( $callback ) {
		$this->booted_callbacks[] = $callback;

		if ( $this->is_booted() ) {
			$callback( $this );
		}
	}

	/**
	 * Get the version number of the core framework.
	 *
	 * @return string
	 */
	public function version(): string {
		return static::VERSION;
	}

	/**
	 * Boot the application's service providers.
	 *
	 * @return void
	 */
	public function boot() {
		if ( $this->is_booted() ) {
			return;
		}

		$this->fire_callbacks( $this->booting_callbacks );

		array_walk( $this->service_provides, function ( $p ) {
			$this->boot_provider( $p );
		} );

		$this->booted = true;

		$this->fire_callbacks( $this->booted_callbacks );
	}

	/**
	 * Is debug mode on or not.
	 *
	 * @return string
	 * @todo theme-related switches
	 */
	public function is_debug(): string {
		return defined( 'WP_DEBUG' ) && WP_DEBUG;
	}

	/**
	 * 'do_action' wrapper that prefixes the hook name with id.
	 *
	 * @param string $hook_name
	 * @param ...$args
	 */
	public function do_action( string $hook_name, ...$args ) {
		do_action( $this->id( $hook_name, '_' ), ...$args );
	}

	/**
	 * Get prefixed id.
	 *
	 * @param string $id
	 * @param string $sep
	 *
	 * @return string
	 */
	public function id( string $id, string $sep = '-' ): string {
		if ( empty( $this->instance_id ) ) {
			return $id;
		}

		return $this->instance_id . $sep . $id;
	}

	/**
	 * 'add_action' wrapper that prefixes the hook name with id.
	 *
	 * @param string $hook_name
	 * @param mixed $callback
	 * @param int $priority
	 * @param int $accepted_args
	 */
	public function add_action( string $hook_name, $callback, int $priority = 10, int $accepted_args = 1 ) {
		add_action( $this->id( $hook_name, '_' ), $callback, $priority, $accepted_args );
	}

	/**
	 * 'apply_filters' wrapper that prefixes the hook name with id.
	 *
	 * @param string $hook_name
	 * @param mixed $value
	 *
	 * @return mixed|null
	 */
	public function apply_filters( string $hook_name, $value ) {
		return apply_filters( $this->id( $hook_name, '_' ), $value );
	}

	/**
	 * 'add_filter' wrapper that prefixes the hook name with id.
	 *
	 * @param string $hook_name
	 * @param mixed $callback
	 * @param mixed ...$args
	 */
	public function add_filter( string $hook_name, $callback, ...$args ) {
		add_filter( $this->id( $hook_name, '_' ), $callback, ...$args );
	}
}
