<?php

namespace Plover\Core\Services\Blocks;

use Plover\Core\Framework\ServiceProvider;

/**
 * Block repository service provider.
 *
 * @since 1.0.0
 */
class BlocksServiceProvider extends ServiceProvider {

	/**
	 * @var string[]
	 */
	public $singletons = [
		\Plover\Core\Services\Blocks\Blocks::class,
	];

	/**
	 * @var string[]
	 */
	public $aliases = [
		'blocks' => \Plover\Core\Services\Blocks\Blocks::class,
	];

	public function boot() {
		add_filter( 'pre_kses', [ $this, 'pre_kses_block_attributes' ], 11, 3 );
	}

	/**
	 * Removes non-allowable HTML from parsed block attributes.
	 *
	 * @param $content
	 * @param $allowed_html
	 * @param $allowed_protocols
	 *
	 * @return string
	 */
	public function pre_kses_block_attributes( $content, $allowed_html, $allowed_protocols ) {
		$result = '';
		$blocks = parse_blocks( $content );

		foreach ( $blocks as $block ) {
			$block  = $this->filter_block_kses( $block, $allowed_html, $allowed_protocols );
			$result .= serialize_block( $block );
		}

		return $result;
	}


	/**
	 * Filters and sanitizes a parsed block to remove non-allowable HTML
	 * from block attribute values.
	 *
	 * @param $block
	 * @param $allowed_html
	 * @param $allowed_protocols
	 *
	 * @return mixed
	 */
	protected function filter_block_kses( $block, $allowed_html, $allowed_protocols ) {
		$block = apply_filters( 'plover_core_filter_block_kses', $block, $allowed_html, $allowed_protocols );

		if ( is_array( $block['innerBlocks'] ) ) {
			foreach ( $block['innerBlocks'] as $i => $inner_block ) {
				$block['innerBlocks'][ $i ] = $this->filter_block_kses(
					$inner_block,
					$allowed_html,
					$allowed_protocols
				);
			}
		}

		return $block;
	}
}
