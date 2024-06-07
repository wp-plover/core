<?php

namespace Plover\Core\Services\Blocks;

use Plover\Core\Assets\Scripts;
use Plover\Core\Plover;
use Plover\Core\Services\Blocks\Contract\Block;
use Plover\Core\Services\Blocks\Contract\HasBlockStyles;
use Plover\Core\Services\Blocks\Contract\HasSupports;
use Plover\Core\Services\Blocks\Contract\Renderable;
use Plover\Core\Services\Blocks\Contract\RenderableBlock;

/**
 * @since 1.0.0
 */
class Blocks {

	/**
	 * Plover core instance.
	 *
	 * @var Plover
	 */
	protected $core;

	/**
	 * Registered custom support.
	 *
	 * @var array
	 */
	protected $custom_supports = [];

	/**
	 * Extended block supports.
	 *
	 * @var array
	 */
	protected $block_supports = [];

	/**
	 * @param Plover $core
	 * @param Scripts $scripts
	 */
	public function __construct( Plover $core, Scripts $scripts ) {
		$this->core = $core;

		$scripts->enqueue_editor_asset( 'plover-block-supports', array(
			'ver'   => 'core',
			'src'   => $core->core_url( 'assets/js/block-supports/index.js' ),
			'path'  => $core->core_path( 'assets/js/block-supports/index.js' ),
			'asset' => $core->core_path( 'assets/js/block-supports/index.asset.php' )
		) );

		add_filter( 'plover_core_editor_data', function ( $data ) {
			$data['blockSupports'] = apply_filters(
				'plover_core_extended_block_supports',
				$this->block_supports
			);

			return $data;
		} );

		$this->core->booted( function () {
			foreach ( $this->custom_supports() as $abs => $support ) {
				$instance = $this->core->make( $support );
				if ( is_object( $instance ) && method_exists( $instance, 'bootstrap' ) ) {
					$this->core->call( [ $instance, 'bootstrap' ] );
				}
			}
		} );
	}

	/**
	 * Get all custom supports.
	 *
	 * @return array
	 */
	public function custom_supports() {
		return $this->custom_supports;
	}

	/**
	 * Register a custom support.
	 *
	 * @param string $abs
	 * @param $extension
	 * @param $force
	 *
	 * @return void
	 */
	public function register_custom_support( string $abs, $support = null, $force = false ) {
		if ( is_null( $support ) ) {
			$support = $abs;
		}

		if ( isset( $this->custom_supports[ $abs ] ) && ! $force ) {
			return;
		}

		$this->custom_supports[ $abs ] = $support;
	}

	/**
	 * Unregister exists custom support.
	 *
	 * @param $abs
	 *
	 * @return void
	 */
	public function unregister_custom_support( $abs ) {
		unset( $this->custom_supports[ $abs ] );
	}

	/**
	 * Extend a block.
	 *
	 * @param  $block
	 *
	 * @return void
	 */
	public function extend( $block ) {
		$blockName = $block instanceof Block ? $block->name() : '';

		if ( $block instanceof HasSupports ) {
			$this->extend_block_supports(
				$blockName,
				$block->supports(),
				$block->override()
			);
		}

		if ( $block instanceof HasBlockStyles ) {
			foreach ( $block->styles() as $style ) {
				register_block_style( $blockName, $style );
			}
		}

		if ( $block instanceof Renderable ) {
			add_filter( 'render_block', [ $block, 'render' ], 11, 2 );
		}

		if ( $block instanceof RenderableBlock ) {
			add_filter( "render_block_{$blockName}", [ $block, 'render' ], 11, 2 );
		}
	}

	/**
	 * Extend block support.
	 *
	 * @param string $blockName
	 * @param  $supports
	 * @param bool $override
	 *
	 * @return void
	 */
	public function extend_block_supports( string $blockName, $supports, bool $override = false ) {
		if ( $override ) {
			$this->block_supports[ $blockName ] = $supports;

			return;
		}

		$this->block_supports[ $blockName ] = array_merge(
			$this->block_supports[ $blockName ] ?? array(),
			$supports
		);
	}
}