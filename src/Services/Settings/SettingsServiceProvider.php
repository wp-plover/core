<?php

namespace Plover\Core\Services\Settings;

use Plover\Core\Framework\ServiceProvider;

/**
 * Global settings.
 *
 * @since 1.0.0
 */
class SettingsServiceProvider extends ServiceProvider {

	/**
	 * @var string[]
	 */
	public $singletons = [
		\Plover\Core\Services\Settings\Settings::class,
		\Plover\Core\Services\Settings\SettingsApi::class,
	];

	/**
	 * @var string[]
	 */
	public $aliases = [
		'settings' => \Plover\Core\Services\Settings\Settings::class,
	];

	public function boot( SettingsApi $api ) {
		//
	}
}
