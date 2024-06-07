<?php

namespace Plover\Core;

/**
 * Plover core bootstrapper
 *
 * @since 1.0.0
 */
class Bootstrap {

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
	 * Service providers.
	 *
	 * @var array
	 */
	protected $providers = [];

	/**
	 * Create plover core bootstrapper instance.
	 *
	 * @param Plover $core
	 */
	public function __construct( $id, $base_path, $ver = false ) {
		$this->core = plover_core();
		if ( ! $this->core ) {
			$this->core = new Plover( $base_path );
		}

		$this->app = new Application( $id, $base_path, $this->core, $ver );
	}

	/**
	 * @param $id
	 * @param $base_path
	 *
	 * @return Bootstrap
	 */
	public static function make( $id, $base_path, $ver = false ) {
		return new static( $id, $base_path, $ver );
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
		$this->providers = array_merge(
			$this->providers,
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
	 *
	 * @return $this
	 */
	public function registered( callable $callback ) {
		$this->core->registered( $callback );

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
	 *
	 * @return $this
	 */
	public function booting( callable $callback ) {
		$this->core->booting( $callback );

		return $this;
	}

	/**
	 * Register a callback to be invoked when the application is "booted".
	 *
	 * @param callable $callback
	 *
	 * @return $this
	 */
	public function booted( callable $callback ) {
		$this->core->booted( $callback );

		return $this;
	}

	/**
	 * @return Application
	 */
	public function boot(): Application {
		$this->core->register_providers( $this->providers );
		$this->core->boot();

		return $this->app;
	}
}
