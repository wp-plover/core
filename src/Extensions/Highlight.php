<?php

namespace Plover\Core\Extensions;

use Plover\Core\Services\Extensions\Contract\Extension;
use Plover\Core\Services\Modules\Control;
use Plover\Core\Toolkits\Filesystem;
use Plover\Core\Toolkits\Html\Document;
use Plover\Core\Toolkits\Str;

/**
 * Add highlight feature to core/code block.
 *
 * @since 1.0.0
 */
class Highlight extends Extension {

	/**
	 * Module name
	 */
	const MODULE_NAME = 'plover_highlight';

	/**
	 * Bootstrap the extension.
	 *
	 * @return void
	 */
	public function bootstrap() {
		$modules = $this->core->get( 'modules' );

		if ( $modules ) {
			$modules->register( self::MODULE_NAME, array(
				'label'       => __( 'Code highlight', 'plover' ),
				'excerpt'     => __( 'Add out-of-the-box code highlighting features for core/code block.', 'plover' ),
				'icon'        => '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="48" height="48"  viewBox="0 0 682.667 682.667" xml:space="preserve"><g><defs><clipPath id="a" clipPathUnits="userSpaceOnUse"><path d="M0 512h512V0H0Z" fill="#000000" opacity="1"></path></clipPath></defs><g clip-path="url(#a)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)"><path d="M0 0h26.261c16.568 0 30-13.432 30-30v-42h-497v42c0 16.568 13.431 30 30 30h377.808" style="stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(448.24 433)" fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity=""></path><path d="M0 0v-19.506c0-16.568-13.432-30-30-30h-437c-16.568 0-30 13.432-30 30v179.133" style="stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(504.5 128.506)" fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity=""></path><path d="M0 0v40.681h497v-200.867" style="stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(7.5 320.32)" fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity=""></path><path d="m0 0-45.07-45.07L-.596-89.544" style="stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(103.18 272.24)" fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity=""></path><path d="m0 0 45.071-45.07L.596-89.544" style="stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(214.051 272.24)" fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity=""></path><path d="m0 0 53.294 140.399" style="stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(131.992 157.268)" fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity=""></path><path d="M0 0c0-8.284-6.715-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15C-6.715 15 0 8.284 0 0Z" style="stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(70.506 396.629)" fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity=""></path><path d="M0 0c0-8.284-6.716-15-15-15-8.285 0-15 6.716-15 15 0 8.284 6.715 15 15 15C-6.716 15 0 8.284 0 0Z" style="stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(128.666 396.629)" fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity=""></path><path d="M0 0c0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15C-6.716 15 0 8.284 0 0Z" style="stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(186.825 396.629)" fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity=""></path><path d="M0 0h-47c-8.284 0-15 6.716-15 15 0 8.285 6.716 15 15 15H0c8.284 0 15-6.715 15-15C15 6.716 8.284 0 0 0Z" style="stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(382.5 277.132)" fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity=""></path><path d="M0 0h-124c-8.284 0-15 6.716-15 15 0 8.285 6.716 15 15 15H0c8.284 0 15-6.715 15-15C15 6.716 8.284 0 0 0Z" style="stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(459.5 217.132)" fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity=""></path><path d="M0 0h-87.165c-8.284 0-15 6.716-15 15 0 8.285 6.716 15 15 15H0c8.284 0 15-6.715 15-15C15 6.716 8.284 0 0 0Z" style="stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(422.665 157.132)" fill="none" stroke="#000000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity=""></path></g></g></svg>',
				'description' => Filesystem::get()->get_contents(
					$this->core->core_path( 'templates/highlight/description.php' )
				),
				'fields'      => array(
					'default_style'    => array(
						'label'        => __( 'Enabled by default', 'plover' ),
						'default'      => 'highlight',
						'control'      => Control::T_SELECT,
						'control_args' => array(
							'options' => array(
								array( 'label' => __( 'No', 'plover' ), 'value' => 'highlight' ),
								array( 'label' => __( 'Yes', 'plover' ), 'value' => 'none' )
							)
						)
					),
					'default_theme'    => array(
						'label'        => __( 'Default theme', 'plover' ),
						'default'      => 'github-copilot',
						'control'      => Control::T_SELECT,
						'control_args' => array(
							'options' => $this->support_themes()
						)
					),
					'default_language' => array(
						'label'        => __( 'Default language', 'plover' ),
						'default'      => 'clike',
						'control'      => Control::T_SELECT,
						'control_args' => array(
							'options' => $this->support_languages()
						)
					),
				)
			) );
		}

		// module is disabled.
		if ( ! $this->settings->checked( self::MODULE_NAME ) ) {
			return;
		}

		// Enqueue all prism themes
		$prism_theme_files = Filesystem::list_files( $this->core->core_path( 'assets/css/prism-themes' ) );
		foreach ( $prism_theme_files as $theme_file ) {
			$theme = basename( $theme_file, '.css' );

			$this->styles->enqueue_asset( "plover-prism-{$theme}-theme", array(
				'ver'      => 'core',
				'src'      => $this->core->core_url( "assets/css/prism-themes/{$theme}.css" ),
				'path'     => $this->core->core_path( "assets/css/prism-themes/{$theme}.css" ),
				'keywords' => [ "prism-{$theme}-theme" ],
			) );
		}

		// Enqueue prism dependency
		$this->scripts->enqueue_asset( 'plover-prism', array(
			'ver'      => 'core',
			'src'      => $this->core->core_url( 'assets/vendor/prism/prism.min.js' ),
			'path'     => $this->core->core_path( 'assets/vendor/prism/prism.min.js' ),
			'keywords' => [ 'plover-prism' ],
		) );

		// Enqueue highlight extension assets
		$this->scripts->enqueue_editor_asset( 'plover-highlight-extension', array(
			'ver'   => 'core',
			'src'   => $this->core->core_url( 'assets/js/block-extensions/highlight/index.js' ),
			'path'  => $this->core->core_path( 'assets/js/block-extensions/highlight/index.js' ),
			'asset' => $this->core->core_path( 'assets/js/block-extensions/highlight/index.asset.php' ),
		) );

		// Render highlight attrs for core/code block
		add_filter( 'render_block_core/code', [ $this, 'render' ], 11, 2 );
		// Send default highlight attributes to JavaScript
		add_filter( 'plover_core_editor_data', [ $this, 'localize_highlight_attributes' ] );
	}

	/**
	 * Support themes.
	 *
	 * @return mixed|null
	 */
	protected function support_themes() {
		$prism_themes      = [];
		$prism_theme_files = Filesystem::list_files( $this->core->core_path( 'assets/css/prism-themes' ) );
		foreach ( $prism_theme_files as $theme_file ) {
			$theme          = basename( $theme_file, '.css' );
			$prism_themes[] = [ 'label' => Str::to_title_case( $theme ), 'value' => $theme ];
		}

		return apply_filters( 'plover_core_support_highlight_themes', $prism_themes );
	}

	/**
	 * Support languages.
	 *
	 * @return mixed|null
	 */
	protected function support_languages() {
		$languages = [
			[ 'label' => 'C-Like', 'value' => 'clike' ],
			[ 'label' => 'Markup', 'value' => 'markup' ],
			[ 'label' => 'HTML', 'value' => 'html' ],
			[ 'label' => 'XML', 'value' => 'xml' ],
			[ 'label' => 'SVG', 'value' => 'svg' ],
			[ 'label' => 'CSS', 'value' => 'css' ],
			[ 'label' => 'JavaScript', 'value' => 'javascript' ],
			[ 'label' => 'TypeScript', 'value' => 'typescript' ],
			[ 'label' => 'React JSX', 'value' => 'jsx' ],
			[ 'label' => 'React TSX', 'value' => 'tsx' ],
			[ 'label' => 'Go', 'value' => 'go' ],
			[ 'label' => 'C', 'value' => 'c' ],
			[ 'label' => 'C#', 'value' => 'cs' ],
			[ 'label' => 'C++', 'value' => 'cpp' ],
			[ 'label' => 'PHP', 'value' => 'php' ],
			[ 'label' => 'JSON', 'value' => 'json' ],
			[ 'label' => 'Python', 'value' => 'python' ],
			[ 'label' => 'Rust', 'value' => 'rust' ],
		];

		return apply_filters( 'plover_core_support_highlight_languages', $languages );
	}

	/**
	 * Localize data to JavaScript.
	 *
	 * @param $data
	 *
	 * @return array
	 */
	public function localize_highlight_attributes( $data ) {
		$data['extensions']['highlight'] = [
			'attributes'        => [
				'highlight' => [
					'type'    => 'string',
					'default' => $this->settings->get( self::MODULE_NAME, 'default_style' ),
				],
				'theme'     => [
					'type'    => 'string',
					'default' => $this->settings->get( self::MODULE_NAME, 'default_theme' ),
				],
				'language'  => [
					'type'    => 'string',
					'default' => $this->settings->get( self::MODULE_NAME, 'default_language' ),
				],
			],
			'support_themes'    => $this->support_themes(),
			'support_languages' => $this->support_languages(),
		];

		return $data;
	}

	/**
	 * @param $block_content
	 * @param $block
	 *
	 * @return mixed
	 */
	public function render( $block_content, $block ) {
		$attrs = $block['attrs'] ?? [];
		$html  = new Document( $block_content );
		$wrap  = $html->get_element_by_tag_name( 'pre' );
		if ( ! $wrap ) {
			return $block_content;
		}

		$highlight = strtolower( $attrs['highlight'] ?? $this->settings->get( self::MODULE_NAME, 'default_style' ) );
		$theme     = $attrs['theme'] ?? $this->settings->get( self::MODULE_NAME, 'default_theme' );
		$lang      = $attrs['language'] ?? $this->settings->get( self::MODULE_NAME, 'default_language' );

		if ( $highlight !== 'none' ) {
			$wrap->add_classnames( "plover-prism prism-{$theme}-theme language-{$lang}" );
		}

		return $html->save_html();
	}
}
