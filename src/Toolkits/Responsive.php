<?php

namespace Plover\Core\Toolkits;

/**
 * Utils for responsive design.
 *
 * @since 1.0.0
 */
class Responsive {

	/**
	 * @param $value
	 * @param bool $fill
	 *
	 * @return array
	 */
	public static function promote_scalar_value_into_responsive( $value, bool $fill = false ) {
		if ( is_array( $value ) && isset( $value['desktop'] ) ) {
			$valueWithResponsive = $value;
		} else {
			$valueWithResponsive = array(
				'desktop' => $value,
				'tablet'  => '__INITIAL_VALUE__',
				'mobile'  => '__INITIAL_VALUE__',
			);
		}

		if ( $fill ) {
			if ( $valueWithResponsive['tablet'] === '__INITIAL_VALUE__' ) {
				$valueWithResponsive['tablet'] = $valueWithResponsive['desktop'];
			}
			if ( $valueWithResponsive['mobile'] === '__INITIAL_VALUE__' ) {
				$valueWithResponsive['mobile'] = $valueWithResponsive['tablet'];
			}
		}

		return $valueWithResponsive;
	}

	/**
	 * @param $value
	 * @param $device
	 *
	 * @return mixed
	 */
	public static function get_scalar_value_by_device( $value, $device = 'desktop' ) {
		return self::promote_scalar_value_into_responsive( $value, true )[ $device ];
	}

	/**
	 * Wrap desktop only css with media query.
	 *
	 * @param $css
	 *
	 * @return string
	 */
	public static function desktop_css( $css ) {
		return $css; // desktop first, don't need any media query.
	}

	/**
	 * Wrap tablet only css with media query.
	 *
	 * @param $css
	 *
	 * @return string
	 */
	public static function tablet_css( $css ) {
		$tablet_breakpoint = apply_filters( 'plover_css_tablet_breakpoint', '781px' );

		return '@media (max-width: ' . $tablet_breakpoint . ') {' . $css . '}';
	}

	/**
	 * Wrap mobile only css with media query.
	 *
	 * @param $css
	 *
	 * @return string
	 */
	public static function mobile_css( $css ) {
		$mobile_breakpoint = apply_filters( 'plover_css_mobile_breakpoint', '599px' );

		return '@media (max-width: ' . $mobile_breakpoint . ') {' . $css . '}';
	}
}