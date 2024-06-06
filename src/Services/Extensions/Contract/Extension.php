<?php

namespace Plover\Core\Services\Extensions\Contract;

use Plover\Core\Assets\Scripts;
use Plover\Core\Assets\Styles;
use Plover\Core\Plover;

/**
 * Extension will only be instantiated once, injecting logic via @hooks annotation.
 *
 * @since 1.0.0
 */
abstract class Extension {

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
	 * Create new extension instance.
	 *
	 * @param Plover $core
	 * @param Scripts $scripts
	 * @param Styles $styles
	 */
	public function __construct( Plover $core, Scripts $scripts, Styles $styles ) {
		$this->core    = $core;
		$this->scripts = $scripts;
		$this->styles  = $styles;
	}
}
