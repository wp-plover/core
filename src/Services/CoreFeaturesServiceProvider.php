<?php

namespace Plover\Core\Services;

use Plover\Core\Framework\ServiceProvider;
use Plover\Core\Services\Blocks\Blocks;
use Plover\Core\Services\Extensions\Extensions;

/**
 * Bootstrap core features.
 *
 * @since 1.0.0
 */
class CoreFeaturesServiceProvider extends ServiceProvider {

	/**
	 * @var \array[][]
	 */
	protected $block_supports = [
		'core/columns'             => [
			'ploverSticky' => true,
		],
		'core/column'              => [
			'shadow'               => false,
			'__experimentalBorder' => [
				'radius'                        => true,
				'width'                         => true,
				'color'                         => true,
				'style'                         => true,
				'__experimentalDefaultControls' => [
					'width' => true,
					'color' => true,
				],
			],
			'ploverSticky'         => true,
			'ploverShadow'         => [
				'box'             => true,
				'defaultControls' => [
					'box' => true,
				]
			]
		],
		'core/button'              => [
			'spacing'            => [
				'margin'                          => true,
				"padding"                         => [ 'horizontal', 'vertical' ],
				'blockGap'                        => true,
				'__experimentalSkipSerialization' => true,
				"__experimentalDefaultControls"   => [
					'margin'  => true,
					'padding' => true,
				]
			],
			'shadow'             => false,
			'ploverEventHandler' => [
				'onclick'         => true,
				'ondblclick'      => true,
				'onmouseover'     => true,
				'defaultControls' => [
					'onclick' => true,
				],
			],
			'ploverShadow'       => [
				'box'             => true,
				'defaultControls' => [
					'box' => true,
				]
			]
		],
		'core/image'               => [
			'spacing'      => [
				'margin'  => true,
				'padding' => true,
			],
			'shadow'       => false,
			'ploverShadow' => [
				'drop'            => true,
				'box'             => true,
				'defaultControls' => [
					'drop' => true,
				]
			],
		],
		'core/post-featured-image' => [
			'shadow'       => false,
			'ploverShadow' => [
				'drop'            => true,
				'box'             => true,
				'defaultControls' => [
					'drop' => true,
				]
			],
		],
		'core/paragraph'           => [
			'shadow'       => false,
			'ploverShadow' => [
				'text'            => true,
				'defaultControls' => [
					'text' => true,
				]
			],
		],
		'core/heading'             => [
			'shadow'       => false,
			'ploverShadow' => [
				'text'            => true,
				'defaultControls' => [
					'text' => true,
				]
			],
		],
		'core/post-title'          => [
			'shadow'       => false,
			'ploverShadow' => [
				'text'            => true,
				'defaultControls' => [
					'text' => true,
				]
			],
		],
		'core/post-excerpt'        => [
			'shadow'       => false,
			'ploverShadow' => [
				'text'            => true,
				'defaultControls' => [
					'text' => true,
				]
			],
		],
		'core/cover'               => [
			'shadow'       => false,
			'ploverShadow' => [
				'box'             => true,
				'defaultControls' => [
					'box' => true,
				]
			]
		],
		'core/group'               => [
			'shadow'       => false,
			'ploverSticky' => true,
			'ploverShadow' => [
				'box'             => true,
				'defaultControls' => [
					'box' => true,
				]
			]
		]
	];

	/**
	 * @return void
	 */
	public function register() {
		$this->core->registered( function ( Blocks $blocks, Extensions $extensions ) {
			// extend core blocks
			$blocks->extend( new \Plover\Core\Blocks\SiteLogo() );
			$blocks->extend( new \Plover\Core\Blocks\Code() );
			$blocks->extend( new \Plover\Core\Blocks\CoreList() );
			$blocks->extend( new \Plover\Core\Blocks\PageList() );
			// extend block supports
			foreach ( $this->block_supports as $block_name => $supports ) {
				$blocks->extend_block_supports( $block_name, $supports );
			}

			// register core extensions
			$extensions->register( 'block-shadow', \Plover\Core\Extensions\Shadow::class );
			$extensions->register( 'block-sticky', \Plover\Core\Extensions\Sticky::class );
			$extensions->register( 'block-dispay', \Plover\Core\Extensions\Display::class );
			$extensions->register( 'code-highlight', \Plover\Core\Extensions\Highlight::class );
			$extensions->register( 'block-event-handler', \Plover\Core\Extensions\EventHandler::class );
			$extensions->register( 'icon', \Plover\Core\Extensions\Icon::class );
		}, 5 );
	}
}
