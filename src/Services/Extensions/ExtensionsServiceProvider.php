<?php

namespace Plover\Core\Services\Extensions;

use Plover\Core\Framework\ServiceProvider;

/**
 * Extensions service provider.
 *
 * @since 1.0.0
 */
class ExtensionsServiceProvider extends ServiceProvider {

	/**
	 * @var string[]
	 */
	public $singletons = [
		\Plover\Core\Services\Extensions\Extensions::class,
	];

	/**
	 * @var string[]
	 */
	public $aliases = [
		'extensions' => \Plover\Core\Services\Extensions\Extensions::class,
	];
}
