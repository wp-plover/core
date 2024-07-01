<?php

namespace Plover\Core\Extensions;

use Plover\Core\Assets\Icons;
use Plover\Core\Router\Auth;
use Plover\Core\Router\Router;
use Plover\Core\Services\Extensions\Contract\Extension;
use Plover\Core\Toolkits\Html\Document;

/**
 * Add icon support for core/button block.
 *
 * @since 1.0.0
 */
class Icon extends Extension {

	/**
	 * @var Icons
	 */
	protected $icons;

	/**
	 * Bootstrap the extension.
	 *
	 * @return void
	 */
	public function boot( Icons $icons ) {
		$this->icons = $icons;

		// Register rest api for retrieve icons
		add_action( 'rest_api_init', [ $this, 'register_reset_api' ] );

		// Enqueue icon extension assets
		$this->scripts->enqueue_editor_asset( 'plover-icon-extension', array(
			'ver'   => 'core',
			'src'   => $this->core->core_url( 'assets/js/block-extensions/icon/index.js' ),
			'path'  => $this->core->core_path( 'assets/js/block-extensions/icon/index.js' ),
			'asset' => $this->core->core_path( 'assets/js/block-extensions/icon/index.asset.php' ),
		) );
		$this->styles->enqueue_editor_asset( 'plover-icon-extension', array(
			'ver'  => 'core',
			'rtl'  => 'replace',
			'src'  => $this->core->core_url( 'assets/js/block-extensions/icon/style.css' ),
			'path' => $this->core->core_path( 'assets/js/block-extensions/icon/style.css' ),
		) );

		// Allow safe svg in post
		add_filter( 'wp_kses_allowed_html', [ $this, 'allow_safe_svg_in_post' ], 11, 2 );
		// Send default icon attributes to JavaScript
		add_filter( 'plover_core_editor_data', [ $this, 'localize_icon_attributes' ] );
		add_filter( 'render_block_core/button', [ $this, 'render_button_with_icon' ], 11, 2 );
		// Add core icons
		add_filter( 'plover_core_icon_primitive_libraries', [ $this, 'add_plover_icon_libraries' ] );
	}

	/**
	 * @param $libraries
	 *
	 * @return mixed
	 */
	public function add_plover_icon_libraries( $libraries ) {
		$libraries[] = array(
			'name'  => __( 'Plover', 'plover' ),
			'slug'  => 'plover-core',
			'icons' => array(
				array(
					'name' => __( 'moon', 'plover' ),
					'slug' => 'moon',
					'svg'  => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
					'tags' => [ 'dark', 'night' ],
				),
				array(
					'name' => __( 'sun', 'plover' ),
					'slug' => 'sun',
					'svg'  => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
					'tags' => [ 'brightness', 'weather', 'light' ],
				),
				array(
					'name' => __( 'arrow-left', 'plover' ),
					'slug' => 'arrow-left',
					'svg'  => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
					'tags' => [],
				),
				array(
					'name' => __( 'arrow-right', 'plover' ),
					'slug' => 'arrow-right',
					'svg'  => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
					'tags' => [],
				)
			),
		);

		return $libraries;
	}

	/**
	 * @param $allowedposttags
	 * @param $context
	 *
	 * @return array
	 */
	public function allow_safe_svg_in_post( $allowedposttags, $context ) {
		if ( $context !== 'post' ) {
			return $allowedposttags;
		}

		$attributes = \enshrined\svgSanitize\data\AllowedAttributes::getAttributes();
		$attributes = array_fill_keys( array_unique( $attributes ), true );
		$tags       = \enshrined\svgSanitize\data\AllowedTags::getTags();

		// add safe svg support
		return array_merge(
			array_fill_keys( array_unique( $tags ), $attributes ),
			$allowedposttags
		);
	}

	/**
	 * Render button with icon.
	 *
	 * @param $block_content
	 * @param $block
	 *
	 * @return string
	 */
	public function render_button_with_icon( $block_content, $block ): string {
		$icon_library = $block['attrs']['iconLibrary'] ?? '';
		$icon_slug    = $block['attrs']['iconSlug'] ?? '';
		if ( ! ( $icon_library && $icon_slug ) ) {
			return $block_content;
		}

		$icon = $this->icons->get_icon( $icon_library, $icon_slug );
		if ( ! $icon ) {
			return $block_content;
		}

		$svg = ( new Document( $icon ) )->get_root_element();
		if ( ! $svg ) {
			return $block_content;
		}

		$icon_position = $block['attrs']['iconPosition'] ?? 'right';
		$icon_size     = $block['attrs']['iconSize'] ?? '18px';

		if ( $icon_size ) {
			$svg->set_attribute( 'width', $icon_size );
			$svg->set_attribute( 'height', $icon_size );
		}

		// Adapt the icon color
		if ( ! $svg->get_attribute( 'fill' ) ) {
			$svg->set_attribute( 'fill', 'currentColor' );
		}
		if ( ! $svg->get_attribute( 'stroke' ) ) {
			$svg->set_attribute( 'stroke', 'currentColor' );
		}

		$html     = new Document( $block_content );
		$imported = $html->get_dom()->importNode( $svg->get_dom_element(), true );

		$el = $html->get_element_by_tags_priority( array( 'button', 'a', '*' ) );
		if ( $el ) {
			if ( $icon_position === 'left' ) {
				$el->get_dom_element()->insertBefore( $imported, $el->get_dom_element()->firstChild );
			} else {
				$el->get_dom_element()->appendChild( $imported );
			}
		}

		return $html->save_html();
	}

	/**
	 * Localize data to JavaScript.
	 *
	 * @param $data
	 *
	 * @return mixed
	 */
	public function localize_icon_attributes( $data ) {
		$data['extensions']['icon'] = [
			'blocks'     => [
				'core/button'
			],
			'libraries'  => $this->icons->get_libraries(),
			'attributes' => [
				'iconLibrary'   => [
					'type' => 'string',
				],
				'iconSlug'      => [
					'type' => 'string',
				],
				'iconPosition'  => [
					'type'    => 'string',
					'default' => 'right',
				],
				'iconSize'      => [
					'type'    => 'string',
					'default' => '18px',
				],
				'iconSvgString' => [
					'type' => 'string',
				],
			],
		];

		return $data;
	}

	/**
	 * Register icons rest api.
	 *
	 * @return void
	 */
	public function register_reset_api() {
		$router = Router::v1();

		$router->read( '/icons/(?P<library>[0-9|a-z|_-]+)', array( $this, 'icons_api' ) )
		       ->use( array( Auth::class, 'can_edit_posts' ) );

		$router->register();
	}

	/**
	 *  Rest api for getting icons from library
	 *
	 * @param \WP_REST_Request|null $request
	 *
	 * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
	 */
	public function icons_api( ?\WP_REST_Request $request ) {
		$library = strtolower( $request->get_param( 'library' ) );
		$icons   = $this->icons->get_icons( $library );

		if ( ! $icons ) {
			return rest_ensure_response(
				new \WP_Error( '404', __( 'No such icon library.', 'plover' ) )
			);
		}

		return rest_ensure_response( array( 'icons' => $icons ) );
	}
}
