<?php

namespace Plover\Core\Assets;

use Plover\Core\Plover;
use Plover\Core\Toolkits\Filesystem;

/**
 * Icon library and icons handler.
 *
 * @since 1.0.0
 */
class Icons {

	/**
	 * Plover core.
	 *
	 * @var Plover
	 */
	protected $core;

	/**
	 * Create icons instance.
	 *
	 * @param Plover $core
	 */
	public function __construct( Plover $core ) {
		$this->core = $core;
	}

	/**
	 * @param $library
	 * @param $slug
	 *
	 * @return string|null
	 */
	public function get_icon( $library, $slug ) {
		$libraries   = $this->get_icon_libraries();
		$library_dir = $libraries[ $library ] ?? '';
		if ( ! $library_dir ) {
			return null;
		}

		$svg_file = $library_dir . DIRECTORY_SEPARATOR . 'svgs' . DIRECTORY_SEPARATOR . $slug . '.svg';
		if ( ! is_file( $svg_file ) ) {
			return null;
		}

		return self::sanitize( Filesystem::get()->get_contents( $svg_file ) );
	}

	/**
	 * Get all icon libraries.
	 *
	 * @return array
	 */
	public function get_icon_libraries(): array {
		$icons_path   = $this->core->core_path( 'assets/icons' );
		$library_dirs = Filesystem::list_files( $icons_path, 1 );

		$libraries = [];
		foreach ( $library_dirs as $library_dir ) {
			$slug               = basename( $library_dir );
			$libraries[ $slug ] = untrailingslashit( $library_dir );
		}

		return $this->core->apply_filters( 'icon_libraries', $libraries );
	}

	/**
	 * @param string $svg
	 *
	 * @return string
	 */
	public static function sanitize( string $svg ): string {
		return self::svg_sanitizer()->sanitize( $svg );
	}

	/**
	 * @return \enshrined\svgSanitize\Sanitizer
	 */
	public static function svg_sanitizer(): \enshrined\svgSanitize\Sanitizer {
		static $sanitizer = null;

		if ( is_null( $sanitizer ) ) {
			$sanitizer = new \enshrined\svgSanitize\Sanitizer();

			$sanitizer->minify( true );
			$sanitizer->removeXMLTag( true );
		}

		return $sanitizer;
	}

	/**
	 * @param $library
	 *
	 * @return array|null
	 */
	public function get_icons( $library ) {
		$fs          = Filesystem::get();
		$libraries   = $this->get_icon_libraries();
		$library_dir = $libraries[ $library ] ?? '';
		$meta_file   = $library_dir . DIRECTORY_SEPARATOR . 'meta.json';
		$svgs_dir    = $library_dir . DIRECTORY_SEPARATOR . 'svgs';

		if ( ! $library_dir || ! $fs->exists( $meta_file ) || ! $fs->exists( $svgs_dir ) ) {
			return null;
		}

		$meta = json_decode( $fs->get_contents( $meta_file ), true );
		if ( ! $meta ) {
			return null;
		}

		$icons = [];

		$svg_files = Filesystem::list_files( $svgs_dir, 1 );
		foreach ( $svg_files as $svg_file ) {
			$slug           = basename( $svg_file, '.svg' );
			$icons[ $slug ] = [
				's' => self::sanitize( $fs->get_contents( $svg_file ) ),
			];

			if ( isset( $meta[ $slug ] ) ) {
				$icons[ $slug ]['t'] = $meta[ $slug ];
			}
		}

		return $icons;
	}
}