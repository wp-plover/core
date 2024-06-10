<?php

namespace Plover\Core\Services\Modules;

use Plover\Core\Framework\ServiceProvider;

/**
 * @since 1.0.0
 */
class ModulesServiceProvider extends ServiceProvider {

	/**
	 * @var string[]
	 */
	public $singletons = [
		\Plover\Core\Services\Modules\Modules::class,
	];

	/**
	 * @var string[]
	 */
	public $aliases = [
		'modules' => \Plover\Core\Services\Modules\Modules::class,
	];

	public function boot( Modules $modules ) {
		//
	}
}
