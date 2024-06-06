<?php

namespace Plover\Core\Extensions;

use Plover\Core\Services\Extensions\Contract\Extension;
use Plover\Core\Toolkits\Filesystem;
use Plover\Core\Toolkits\Html\Document;

/**
 * Add highlight feature to core/code block.
 *
 * @since 1.0.0
 */
class Highlight extends Extension {

	/**
	 * Bootstrap the extension.
	 *
	 * @return void
	 */
	public function bootstrap() {

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
	 * Localize data to JavaScript.
	 *
	 * @param $data
	 *
	 * @return array
	 */
	public function localize_highlight_attributes( $data ) {

		$data['extensions']['highlight'] = [
			'attributes' => [
				'highlight' => [
					'type'    => 'string',
					'default' => 'highlight',
				],
				'theme'     => [
					'type'    => 'string',
					'default' => 'github-copilot',
				],
				'language'  => [
					'type'    => 'string',
					'default' => 'clike',
				],
			],
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

		$highlight = strtolower( $attrs['highlight'] ?? 'highlight' );
		$theme     = $attrs['theme'] ?? 'github-copilot';
		$lang      = $attrs['language'] ?? 'php';

		if ( $highlight !== 'none' ) {
			$wrap->add_classnames( "plover-prism prism-{$theme}-theme language-{$lang}" );
		}

		return $html->save_html();
	}
}
