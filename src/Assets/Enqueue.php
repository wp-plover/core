<?php

namespace Plover\Core\Assets;

use Plover\Core\Plover;
use Plover\Core\Toolkits\Filesystem;
use Plover\Core\Toolkits\Path;
use Plover\Core\Toolkits\Str;

/**
 * Enqueue all registered assets in an appropriate way
 *
 * @since 1.0.0
 */
class Enqueue {

	/**
	 * All core packages.
	 */
	const CORE_PACKAGES = [ 'utils', 'icons', 'components', 'dashboard', 'api' ];

	/**
	 * Plover core instance.
	 *
	 * @var Plover
	 */
	protected $core;

	/**
	 * Global scripts instance.
	 *
	 * @var Scripts
	 */
	protected $scripts;

	/**
	 * Global styles instance.
	 *
	 * @var Styles
	 */
	protected $styles;

	/**
	 * @param Plover $core
	 * @param Scripts $scripts
	 * @param Styles $styles
	 */
	public function __construct( Plover $core, Scripts $scripts, Styles $styles ) {
		$this->core    = $core;
		$this->scripts = $scripts;
		$this->styles  = $styles;

		add_action( 'init', [ $this, 'register_core_packages' ] );
		add_action( 'init', [ $this, 'enqueue_block_style' ] );
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_block_inline_assets' ] );
		add_filter( 'block_editor_settings_all', [ $this, 'enqueue_block_editor_inline_assets' ], 10, 2 );
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor_assets' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_dashboard_assets' ] );
	}

	/**
	 * Register core packages.
	 *
	 * @return void
	 */
	public function register_core_packages() {
		$fs = Filesystem::get();

		foreach ( self::CORE_PACKAGES as $package ) {
			$asset      = array();
			$asset_file = $this->core->core_path( "assets/js/packages/{$package}/index.asset.php" );
			if ( $fs->is_file( $asset_file ) ) {
				$asset = require $asset_file;
			}

			$ver = $asset['version'] ?? ( $this->core->is_debug() ? time() : $this->core->get( 'core.version' ) );

			$style_file = $this->core->core_path( "assets/js/packages/{$package}/style.css" );
			if ( $fs->is_file( $style_file ) ) {
				wp_register_style(
					"plover-{$package}",
					$this->core->core_url( "assets/js/packages/{$package}/style.css" ),
					[],
					$ver
				);
				wp_style_add_data( "plover-{$package}", 'rtl', 'replace' );
			}

			wp_register_script(
				"plover-{$package}",
				$this->core->core_url( "assets/js/packages/{$package}/index.js" ),
				$asset['dependencies'] ?? array(),
				$ver,
				false
			);

			$this->enqueue_core_styles_from_deps( $asset['dependencies'] ?? array() );
		}
	}

	/**
	 * Enqueue plover core packages stylesheet from script dependencies.
	 *
	 * @param $deps
	 *
	 * @return void
	 */
	protected function enqueue_core_styles_from_deps( $deps ) {
		foreach ( $deps as $dep ) {
			if ( str_starts_with( $dep, 'plover' ) || str_starts_with( $dep, 'wp-' ) ) {
				wp_enqueue_style( $dep );
			}
		}
	}

	/**
	 * Enqueue user-generated content (blocks) style for specific block, both frontend and editor.
	 *
	 * @return void
	 */
	public function enqueue_block_style() {
		// wp_enqueue_block_style since WP 5.9
		$block_styles = $this->styles->all_block_styles();
		foreach ( $block_styles as $block_name => $stylesheets ) {
			foreach ( $stylesheets as $stylesheet ) {
				wp_enqueue_block_style( $block_name, $stylesheet );
			}
		}
	}

	/**
	 * Enqueue user-generated content (blocks) assets, frontend only.
	 *
	 * @return void
	 */
	public function enqueue_block_inline_assets() {
		if ( is_admin() ) {
			return;
		}

		global $template_html;

		$args = array(
			'load_all'      => ! $template_html,
			'template_html' => $template_html
		);

		// handle inline assets.
		$this->enqueue_styles(
			$this->styles->get_assets(),
			array_merge( $args, array( 'inline_handle' => 'block-inline-styles' ) )
		);
		$this->enqueue_scripts(
			$this->scripts->get_assets(),
			array_merge( $args, array( 'inline_handle' => 'block-inline-scripts' ) )
		);
	}

	/**
	 * Enqueue stylesheets.
	 *
	 * @param array $assets
	 * @param $template_html
	 * @param $inline_handle
	 * @param array $args
	 *
	 * @return void
	 */
	protected function enqueue_styles( array $assets, array $args ) {
		$args = wp_parse_args( $args, array(
			'template_html' => '',
			'inline_handle' => '',
		) );

		$template_html = $args['template_html'];
		$inline_handle = $args['inline_handle'];

		// handle inline styles.
		list( $inline_style, $inline_deps, $style_files ) = $this->get_assets(
			$template_html,
			$assets,
			$args
		);

		foreach ( $style_files as $handle => $style_args ) {
			wp_register_style(
				$handle,
				$style_args['src'],
				$style_args['deps'] ?? array(),
				$style_args['ver'] ?? false,
				$style_args['medium'] ?? 'all'
			);

			if ( isset( $style_args['rtl'] ) && $style_args['rtl'] ) {
				wp_style_add_data( $handle, 'rtl', $style_args['rtl'] );
			}

			wp_enqueue_style( $handle );
		}

		if ( $inline_style ) {
			wp_register_style( $inline_handle, false, $inline_deps );
			wp_enqueue_style( $inline_handle );
			wp_add_inline_style( $inline_handle, $inline_style );
		}
	}

	/**
	 * @param string $template_html
	 * @param array $assets
	 * @param array $args
	 *
	 * @return array
	 */
	protected function get_assets( string $template_html, array $assets, array $args ) {
		$args = wp_parse_args( $args, array(
			'load_all' => false,
			'mode'     => 'dynamic',
		) );

		$load_all = $args['load_all'];
		$mode     = $args['mode'];

		$inline_str  = ''; // Inline raw string.
		$inline_deps = array();
		$asset_files = []; // Shouldn't inline assets.

		foreach ( $assets as $handle => $args ) {
			// Skip if additional condition is not met.
			$condition = $args['condition'] ?? true;
			if ( is_callable( $condition ) ) { // support callback as condition.
				$condition = call_user_func( $condition, $this->core );
			}
			if ( ! $condition ) {
				continue;
			}

			$keywords = $args['keywords'] ?? [];

			// Skip if no keywords is not met and web don't need to load all assets.
			if ( ! $load_all && ( ! empty( $keywords ) && ! Str::contains_any( $template_html, ...$keywords ) ) ) {
				continue;
			}

			$fs            = Filesystem::get();
			$should_inline = ( $mode === 'inline' );
			$asset_path    = $args['path'] ?? null;
			if ( is_rtl() && $asset_path && ( $args['rtl'] ?? null ) ) {
				$asset_path = Path::rtl_asset_path( $asset_path );
			}

			if ( $mode === 'dynamic' ) {
				// Determine whether we should inline or enqueue the asset file direct.
				if ( $asset_path && $fs->is_file( $asset_path ) ) {
					$file_size = $fs->size( $asset_path );

					if ( $file_size !== false && $file_size <= (int) apply_filters( 'plover_core_assets_inline_size',
							500 ) ) {
						$should_inline = true;
					}
				}
			}

			if ( $should_inline ) {
				$inline_str  .= Str::remove_line_breaks( $fs->get_contents( $asset_path ) );
				$inline_deps = array_merge( $inline_deps, $args['deps'] ?? array() );
			} elseif ( $args['src'] ) {
				$asset_files[ $handle ] = $args;
			}
		}

		return [ $inline_str, array_unique( $inline_deps ), $asset_files ];
	}

	/**
	 * Enqueue scripts.
	 *
	 * @param array $assets
	 * @param $template_html
	 * @param $inline_handle
	 *
	 * @return void
	 */
	protected function enqueue_scripts( array $assets, array $args ) {
		$args = wp_parse_args( $args, array(
			'template_html' => '',
			'inline_handle' => '',
		) );

		$template_html = $args['template_html'];
		$inline_handle = $args['inline_handle'];

		// handle inline scripts.
		list( $inline_script, $inline_deps, $script_files ) = $this->get_assets(
			$template_html,
			$assets,
			$args
		);

		foreach ( $script_files as $handle => $script_args ) {
			$deps = $script_args['deps'] ?? array();

			wp_register_script(
				$handle,
				$script_args['src'],
				$deps,
				$script_args['ver'] ?? false,
				$script_args['footer'] ?? false
			);

			wp_enqueue_script( $handle );

			$this->enqueue_core_styles_from_deps( $deps );
		}

		if ( $inline_script ) {
			wp_register_script( $inline_handle, false, $inline_deps, false, true );
			wp_enqueue_script( $inline_handle );
			wp_add_inline_script( $inline_handle, $inline_script );

			$this->enqueue_core_styles_from_deps( $deps );
		}
	}

	/**
	 *  Enqueue user-generated content (blocks) assets for all blocks, editor only.
	 *
	 * @param $editor_settings
	 * @param $editor_context
	 *
	 * @return array
	 * @see https://developer.wordpress.org/block-editor/how-to-guides/enqueueing-assets-in-the-editor/#editor-content-scripts-and-styles
	 */
	public function enqueue_block_editor_inline_assets( $editor_settings, $editor_context ) {
		// Enqueue editor scripts.
		$this->enqueue_scripts(
			$this->scripts->get_assets(),
			array(
				'load_all'      => true,
				'mode'          => 'queue',
				'inline_handle' => 'plover-block-editor-inline-scripts'
			)
		);

		// handle inline styles.
		list( $inline_style, $inline_deps, $style_files ) = $this->get_assets(
			'',
			$this->styles->get_assets(),
			array( 'load_all' => true, 'mode' => 'inline' )
		);

		foreach ( $inline_deps as $dep ) {
			wp_enqueue_style( $dep );
		}

		$editor_settings["styles"][] = array(
			"css" => $inline_style
		);

		return $editor_settings;
	}

	/**
	 * Enqueue editor itself (not the user-generated content) assets.
	 *
	 * @return void
	 */
	public function enqueue_editor_assets() {
		if ( ! is_admin() ) {
			return;
		}

		// Editor localize data
		$localize_handle = 'plover-editor-data';
		wp_register_script( $localize_handle, false, array(), false, true );
		wp_localize_script(
			$localize_handle,
			'PloverEditor',
			apply_filters( 'plover_core_editor_data', array() )
		);
		wp_enqueue_script( $localize_handle );

		// enqueue editor styles.
		$this->enqueue_styles(
			$this->styles->get_editor_assets(),
			array(
				'load_all'      => true,
				'mode'          => 'queue',
				'inline_handle' => 'plover-editor-styles'
			)
		);

		// enqueue editor scripts.
		$this->enqueue_scripts(
			$this->scripts->get_editor_assets(),
			array(
				'load_all'      => true,
				'mode'          => 'queue',
				'inline_handle' => 'plover-editor-scripts'
			)
		);
	}

	/**
	 * Enqueue dashboard/admin assets.
	 *
	 * @return void
	 */
	public function enqueue_dashboard_assets() {
		if ( ! is_admin() ) {
			return;
		}

		// Dashboard localize data
		if ( apply_filters( 'plover_core_should_localize_dashboard_data', false ) ) {
			$localize_handle = 'plover-dashboard-data';
			wp_register_script( $localize_handle, false, array(), false, true );
			wp_localize_script(
				$localize_handle,
				'PloverDashboard',
				apply_filters( 'plover_core_dashboard_data', array() )
			);
			wp_enqueue_script( $localize_handle );
		}

		// enqueue dashboard styles.
		$this->enqueue_styles(
			$this->styles->get_dashboard_assets(),
			array(
				'inline_handle' => 'plover-dashboard-styles'
			)
		);

		// enqueue dashboard scripts.
		$this->enqueue_scripts(
			$this->scripts->get_dashboard_assets(),
			array(
				'mode'          => 'queue',
				'inline_handle' => 'plover-dashboard-scripts'
			)
		);
	}
}
