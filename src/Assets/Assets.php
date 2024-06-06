<?php

namespace Plover\Core\Assets;

use Plover\Core\Framework\Container\EntryNotFoundException;
use Plover\Core\Plover;
use Plover\Core\Toolkits\Filesystem;

/**
 * @since 1.0.0
 */
abstract class Assets {

	/**
	 * Plover core instance.
	 *
	 * @var Plover
	 */
	protected $core;

	/**
	 * Assets files.
	 *
	 * @var array
	 */
	protected $assets = [];

	/**
	 * Editor assets files.
	 *
	 * @var array
	 */
	protected $editor_assets = [];

	/**
	 * Asset type.
	 *
	 * @var string
	 */
	protected $asset_type;

	/**
	 * Create scripts instance.
	 *
	 * @param Plover $core
	 */
	public function __construct( Plover $core ) {
		$this->core       = $core;
		$this->asset_type = str_contains( static::class, 'Style' ) ? 'style' : 'script';

		if ( method_exists( $this, 'boot' ) ) {
			$this->boot();
		}
	}

	/**
	 * Enqueue the asset file in fronted and editor.
	 *
	 * @param string $handle
	 * @param array $args
	 *
	 * @return void
	 */
	public function enqueue_asset( string $handle, array $args ) {
		$args = wp_parse_args( $args, array(
			'src'       => '',
			'path'      => '',
			'deps'      => array(),
			'ver'       => false,
			'keywords'  => [],
			'condition' => true,
		) );

		$args['ver'] = $this->asset_version( $args['ver'] );

		$this->assets[ $handle ] = $args;
	}

	/**
	 * App asset version.
	 *
	 * @return int|mixed|object|null
	 * @throws EntryNotFoundException
	 */
	protected function asset_version( $ver ) {
		if ( $ver === 'core' ) {
			return $this->core->is_debug() ? time() : $this->core->get( 'core.version' );
		}

		return $ver;
	}

	/**
	 * Enqueue the asset file in fronted and editor.
	 *
	 * @param string $handle
	 * @param array $args
	 *
	 * @return void
	 */
	public function enqueue_editor_asset( string $handle, array $args ) {
		if ( ! is_admin() ) {
			return;
		}

		$fs = Filesystem::get();

		$args = wp_parse_args( $args, array(
			'src'       => '',
			'path'      => '',
			'deps'      => array(),
			'ver'       => 'app',
			'keywords'  => [],
			'condition' => true,
		) );

		if ( isset( $args['asset'] ) && $fs->is_file( $args['asset'] ) ) {
			$asset        = require $args['asset'];
			$args['deps'] = array_merge(
				array( 'plover-editor-data' ), // should be depended on by all editor scripts
				$args['deps'] ?? array(),
				$asset['dependencies'] ?? array()
			);

			$args['ver'] = $asset['version'] ?? $this->asset_version( $args['ver'] );
		}

		$args['ver'] = $this->asset_version( $args['ver'] );

		$this->editor_assets[ $handle ] = $args;
	}

	/**
	 * Get all asset files.
	 *
	 * @return array
	 */
	public function get_assets() {
		return apply_filters( 'plover_core_' . $this->asset_type . '_assets', $this->assets );
	}

	/**
	 * Get all editor asset files.
	 *
	 * @return array
	 */
	public function get_editor_assets() {
		return apply_filters( 'plover_core_' . $this->asset_type . '_editor_assets', $this->editor_assets );
	}
}