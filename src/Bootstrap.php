<?php

namespace Plover\Core;

/**
 * Plover core bootstrapper
 *
 * @since 1.0.0
 */
class Bootstrap {

	/**
	 * Is booted or not.
	 *
	 * @var bool
	 */
	protected static $booted = false;
	/**
	 * Service providers.
	 *
	 * @var array
	 */
	protected static $providers = [];
	/**
	 * Plover core instance.
	 *
	 * @var Plover
	 */
	protected $core;
	/**
	 * Current application instance.
	 *
	 * @var Application
	 */
	protected $app;

	/**
	 * Create plover core bootstrapper instance.
	 *
	 * @param $id
	 * @param $base_path
	 * @param bool $ver
	 */
	protected function __construct( $id, $base_path ) {
		$this->core = plover_core();
		if ( ! $this->core ) {
			$this->core = new Plover( $base_path );
		}

		$this->app = new Application( $id, $base_path, $this->core );
	}

	/**
	 * @param $id
	 * @param $base_path
	 * @param array $providers
	 *
	 * @return Bootstrap
	 */
	public static function make( $id, $base_path, $providers = [] ) {
		return ( new static( $id, $base_path ) )
			->withProviders( $providers );
	}

	/**
	 * Register additional service providers.
	 *
	 * @param array $providers
	 * @param bool $withBootstrapProviders
	 *
	 * @return $this
	 */
	public function withProviders( array $providers = [] ) {
		static::$providers = array_merge(
			static::$providers,
			$providers
		);

		return $this;
	}

	/**
	 * Register an array of container bindings to be bound when the application is booting.
	 *
	 * @param array $bindings
	 *
	 * @return $this
	 */
	public function withBindings( array $bindings ) {
		return $this->registered( function ( $core ) use ( $bindings ) {
			foreach ( $bindings as $abstract => $concrete ) {
				$core->bind( $abstract, $concrete );
			}
		} );
	}

	/**
	 * Register a callback to be invoked when the application's service providers are registered.
	 *
	 * @param callable $callback
	 * @param int $priority
	 *
	 * @return $this
	 */
	public function registered( callable $callback, int $priority = 0 ) {
		$this->core->registered( $callback, $priority );

		return $this;
	}

	/**
	 * Register an array of singleton container bindings to be bound when the application is booting.
	 *
	 * @param array $singletons
	 *
	 * @return $this
	 */
	public function withSingletons( array $singletons ) {
		return $this->registered( function ( $core ) use ( $singletons ) {
			foreach ( $singletons as $abstract => $concrete ) {
				if ( is_string( $abstract ) ) {
					$core->singleton( $abstract, $concrete );
				} else {
					$core->singleton( $concrete );
				}
			}
		} );
	}

	/**
	 * Register a callback to be invoked when the application is "booting".
	 *
	 * @param callable $callback
	 * @param int $priority
	 *
	 * @return $this
	 */
	public function booting( callable $callback, int $priority = 0 ) {
		$this->core->booting( $callback, $priority );

		return $this;
	}

	/**
	 * Register a callback to be invoked when the application is "booted".
	 *
	 * @param callable $callback
	 * @param int $priority
	 *
	 * @return $this
	 */
	public function booted( callable $callback, int $priority = 0 ) {
		$this->core->booted( $callback, $priority );

		return $this;
	}

	/**
	 * @return void
	 */
	public function boot() {
		if ( static::$booted ) {
			return;
		}

		static::$booted = true;

		add_action( 'after_setup_theme', function () {
			$this->core->register_providers( static::$providers );
			$this->core->boot();
		} );
	}
}
