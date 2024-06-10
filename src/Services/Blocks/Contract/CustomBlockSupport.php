<?php

namespace Plover\Core\Services\Blocks\Contract;

use Plover\Core\Assets\Scripts;
use Plover\Core\Assets\Styles;
use Plover\Core\Plover;
use Plover\Core\Services\Settings\Settings;

/**
 * @since 1.0.0
 */
abstract class CustomBlockSupport {

	/**
	 * Global plover core instance.
	 *
	 * @var Plover
	 */
	protected $core;

	/**
	 * Global scripts handler instance.
	 *
	 * @var Scripts
	 */
	protected $scripts;

	/**
	 * Global styles handler instance.
	 *
	 * @var Styles
	 */
	protected $styles;

	/**
	 * Global settings instance.
	 *
	 * @var Settings
	 */
	protected $settings;

	/**
	 * Create new extension instance.
	 *
	 * @param Plover $core
	 * @param Scripts $scripts
	 * @param Styles $styles
	 */
	public function __construct( Plover $core, Scripts $scripts, Styles $styles, Settings $settings ) {
		$this->core     = $core;
		$this->scripts  = $scripts;
		$this->styles   = $styles;
		$this->settings = $settings;
	}
}