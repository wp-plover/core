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
	public function bootstrap( Icons $icons ) {
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

		// Send default icon attributes to JavaScript
		add_filter( 'plover_core_editor_data', [ $this, 'localize_icon_attributes' ] );
		add_filter( 'render_block_core/button', [ $this, 'render_button_with_icon' ], 11, 2 );
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

		$html     = new Document( $block_content );
		$imported = $html->get_dom()->importNode( $svg->get_dom_element(), true );

		$a = $html->get_element_by_tag_name( 'a' );
		if ( $a ) {
			if ( $icon_position === 'left' ) {
				$a->get_dom_element()->insertBefore( $imported, $a->get_dom_element()->firstChild );
			} else {
				$a->get_dom_element()->appendChild( $imported );
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
