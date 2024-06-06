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
}
