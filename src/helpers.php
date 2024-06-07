<?php
/**
 * Core helpers
 *
 * @since 1.0.0
 */

if ( ! function_exists( 'plover_core' ) ) {
	/**
	 * Get global container instance or any bindings.
	 *
	 * @param $abs
	 *
	 * @return mixed|null
	 */
	function plover_core( $abs = null ) {
		$core = \Plover\Core\Plover::get_instance();
		if ( ! $core ) {
			return null;
		}

		return $abs !== null ? $core->get( $abs ) : $core;
	}
}

if ( ! function_exists( 'plover_app' ) ) {
	/**
	 * Get application instance.
	 *
	 * @param $id
	 *
	 * @return mixed|null
	 */
	function plover_app( $id ) {
		return \Plover\Core\Application::get_app( $id );
	}
}
