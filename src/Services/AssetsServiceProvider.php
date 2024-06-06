<?php

namespace Plover\Core\Services;

use Plover\Core\Assets\Enqueue;
use Plover\Core\Assets\Styles;
use Plover\Core\Framework\ServiceProvider;
use Plover\Core\Toolkits\Arr;
use Plover\Core\Toolkits\Filesystem;

/**
 * Assets service provider.
 *
 * @since 1.0.0
 */
class AssetsServiceProvider extends ServiceProvider {

	/**
	 * @var array
	 */
	public $singletons = [
		\Plover\Core\Assets\Scripts::class,
		\Plover\Core\Assets\Styles::class,
		\Plover\Core\Assets\Icons::class,
	];

	/**
	 * @var string[]
	 */
	public $aliases = [
		'scripts' => \Plover\Core\Assets\Scripts::class,
		'styles'  => \Plover\Core\Assets\Styles::class,
		'icons'   => \Plover\Core\Assets\Icons::class,
	];

	public function register() {
		$this->core->booted( function () {
			$this->core->make( Enqueue::class );
		} );
	}

	public function boot( Styles $styles ) {
		$block_styles = Filesystem::list_files( $this->core->core_path( 'assets/css/block-styles' ) );
		$style_groups = [
			'elements'     => [
				'button' => [
					'<button',
					'type="button"',
					'type="submit"',
					'type="reset"',
					'nf-form',
					'wp-element-button',
				],
			],
			'block-styles' => Arr::from_entries( array_map( function ( $block_style_file ) {
				$block_style = basename( $block_style_file, '.css' );

				return [ $block_style, [ "is-style-{$block_style}" ] ];
			}, $block_styles ) )
		];

		foreach ( $style_groups as $group => $style_files ) {
			foreach ( $style_files as $file_name => $keywords ) {
				$styles->enqueue_asset( "plover-{$group}-{$file_name}", array(
					'ver'      => 'core',
					'src'      => $this->core->core_url( "assets/css/{$group}/{$file_name}.css" ),
					'path'     => $this->core->core_path( "assets/css/{$group}/{$file_name}.css" ),
					'keywords' => $keywords,
				) );
			}
		}
	}
}