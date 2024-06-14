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
		'core/column'              => [
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
			'ploverShadow'         => [
				'box'             => true,
				'defaultControls' => [
					'box' => true,
				]
			]
		],
		'core/button'              => [
			'spacing'            => [
				'margin'   => true,
				'padding'  => true,
				'blockGap' => true,
			],
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
		'core/list'                => [
			'spacing'              => [
				'padding'  => true,
				'margin'   => true,
				'blockGap' => true,
			],
			'__experimentalLayout' => [
				'allowSwitching'  => false,
				'allowInheriting' => false,
				'default'         => [
					'type'        => 'flex',
					'orientation' => 'vertical',
				],
			],
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
			'ploverShadow'         => [
				'text'            => true,
				'box'             => true,
				'defaultControls' => [
					'text' => true,
				]
			],
		],
		'core/image'               => [
			'spacing'      => [
				'margin'  => true,
				'padding' => true,
			],
			'ploverShadow' => [
				'drop'            => true,
				'box'             => true,
				'defaultControls' => [
					'drop' => true,
				]
			],
		],
		'core/post-featured-image' => [
			'ploverShadow' => [
				'drop'            => true,
				'box'             => true,
				'defaultControls' => [
					'drop' => true,
				]
			],
		],
		'core/paragraph'           => [
			'ploverShadow' => [
				'text'            => true,
				'defaultControls' => [
					'text' => true,
				]
			],
		],
		'core/heading'             => [
			'ploverShadow' => [
				'text'            => true,
				'defaultControls' => [
					'text' => true,
				]
			],
		],
		'core/post-title'          => [
			'ploverShadow' => [
				'text'            => true,
				'defaultControls' => [
					'text' => true,
				]
			],
		],
		'core/post-excerpt'        => [
			'ploverShadow' => [
				'text'            => true,
				'defaultControls' => [
					'text' => true,
				]
			],
		],
		'core/group'               => [
			'ploverShadow' => [
				'box'             => true,
				'defaultControls' => [
					'box' => true,
				]
			]
		],
		'core/row'                 => [
			'ploverShadow' => [
				'box'             => true,
				'defaultControls' => [
					'box' => true,
				]
			]
		],
		'core/stack'               => [
			'ploverShadow' => [
				'box'             => true,
				'defaultControls' => [
					'box' => true,
				]
			]
		],
		'core/cover'               => [
			'ploverShadow' => [
				'box'             => true,
				'defaultControls' => [
					'box' => true,
				]
			]
		],
	];

	/**
	 * @return void
	 */
	public function register() {
		$this->core->registered( function ( Blocks $blocks, Extensions $extensions ) {
			// core extend blocks
			$blocks->extend( new \Plover\Core\Blocks\SiteLogo() );
			$blocks->extend( new \Plover\Core\Blocks\Code() );
			// extend block supports
			foreach ( $this->block_supports as $block_name => $supports ) {
				$blocks->extend_block_supports( $block_name, $supports );
			}

			// register core extensions
			$extensions->register( 'shadow', \Plover\Core\Extensions\Shadow::class );
			$extensions->register( 'event-handler', \Plover\Core\Extensions\EventHandler::class );
			$extensions->register( 'icon', \Plover\Core\Extensions\Icon::class );
			$extensions->register( 'highlight', \Plover\Core\Extensions\Highlight::class );
		} );
	}
}
