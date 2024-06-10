<?php

namespace Plover\Core\Services\Extensions;

use Plover\Core\Plover;
use Plover\Core\Services\Extensions\Contract\Extension;

/**
 * @since 1.0.0
 */
class Extensions {

	/**
	 * All registered extensions.
	 *
	 * @var array
	 */
	protected $extensions = [];

	/**
	 * Create extensions instance.
	 *
	 * @param array $extensions
	 */
	public function __construct( Plover $core, array $extensions = array() ) {
		foreach ( $extensions as $abs => $extension ) {
			if ( ! is_string( $abs ) ) {
				$abs = $extension;
			}

			$this->register( $abs, $extension );
		}

		$core->booted( function () use ( $core ) {
			foreach ( $this->all() as $abs => $extension ) {
				$instance = $core->make( $extension );
				if ( $instance instanceof Extension && method_exists( $instance, 'bootstrap' ) ) {
					$core->call( [ $instance, 'bootstrap' ] );
				}
			}
		} );
	}

	/**
	 * Register an extension.
	 *
	 * @param string $abs
	 * @param $extension
	 * @param $override
	 *
	 * @return void
	 */
	public function register( string $abs, $extension = null, $override = false ) {
		if ( is_null( $extension ) ) {
			$extension = $abs;
		}

		if ( isset( $this->extensions[ $abs ] ) && ! $override ) {
			throw new ExtensionRegisteredException( $abs . ' has been registered.' );
		}

		$this->extensions[ $abs ] = $extension;
	}

	/**
	 * Get all registered extensions.
	 *
	 * @return array
	 */
	public function all() {
		return $this->extensions;
	}

	/**
	 * Unregister exists extension.
	 *
	 * @param $abs
	 *
	 * @return void
	 */
	public function unregister( $abs ) {
		unset( $this->extensions[ $abs ] );
	}
}
