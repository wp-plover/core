<?php

namespace Plover\Core\Toolkits;

use enshrined\svgSanitize\data\AllowedAttributes;
use Plover\Core\Toolkits\Html\Document;

/**
 * Sanitize and escape utils.
 *
 * @since 1.0.0
 */
class Format {

	/**
	 * Generates a closure to sanitize a fixed set of values.
	 *
	 * @param $args
	 *
	 * @return \Closure
	 */
	public static function create_select_sanitizer( $args = array() ) {
		return function ( $input ) use ( $args ) {
			// Get list of choices from the control associated with the setting.
			$options = $args['options'] ?? array();

			// If the input is valid, return it; otherwise, return the default.
			return in_array( $input, Arr::pluck( $options, 'value' ) ) ? $input : ( $args['default'] ?? null );
		};
	}

	/**
	 * Generates a closure to sanitize tags value.
	 *
	 * @param $args
	 *
	 * @return \Closure
	 */
	public static function create_tags_sanitizer( $args = array() ) {
		return function ( $input ) use ( $args ) {
			if ( is_string( $input ) ) {
				$input = explode( ',', $input );
			}

			if ( ! is_array( $input ) ) {
				return [];
			}

			if ( isset( $args['suggestions'] ) && ( $args['validate'] ?? false ) ) {
				$input = array_filter( $input, function ( $item ) use ( $args ) {
					return in_array( $item, $args['suggestions'] );
				} );
			}

			return $input;
		};
	}

	/**
	 * @param $str
	 *
	 * @return string
	 */
	public static function sanitize_text( $str ) {
		return sanitize_text_field( $str );
	}

	/**
	 * Alias for sanitize_checkbox.
	 *
	 * @param $checked
	 *
	 * @return string
	 */
	public static function sanitize_switch( $checked ) {
		return static::sanitize_checkbox( $checked );
	}

	/**
	 * Checkbox value sanitization callback.
	 *
	 * Sanitization callback for 'checkbox' type controls. This callback sanitizes `$checked`
	 * as a boolean value, either TRUE or FALSE.
	 *
	 * @param $checked
	 *
	 * @return string
	 */
	public static function sanitize_checkbox( $checked ) {
		return ( $checked === 'yes' || $checked === true ) ? 'yes' : 'no';
	}

	/**
	 * Sanitize raw SVG string.
	 *
	 * @param string $svg
	 *
	 * @return string
	 */
	public static function sanitize_svg( string $svg ): string {
		static $sanitizer = null;

		if ( is_null( $sanitizer ) ) {
			$sanitizer = new \enshrined\svgSanitize\Sanitizer();
			$sanitizer->minify( true );
			$sanitizer->removeXMLTag( true );
		}

		$dom    = new Document( $svg );
		$svg_el = $dom->get_element_by_tag_name( 'svg' );
		if ( ! $svg_el ) {
			return '';
		}

		// Removing attributes that affect custom style for SVG element.
		$svg_el->remove_attribute( 'width' );
		$svg_el->remove_attribute( 'height' );
		$svg_el->remove_attribute( 'style' );
		$svg_el->remove_attribute( 'class' );
		$svg = $dom->save_html();

		$svg = $sanitizer->sanitize( $svg );

		// Remove comments and spaces to minify store size.
		$svg = preg_replace( '/<!--(.|\s)*?-->/', '', $svg );
		$svg = preg_replace( '/\s+/', ' ', $svg );
		$svg = preg_replace( '/\t+/', '', $svg );
		$svg = preg_replace( '/>\s+</', '><', $svg );
		// Correct viewBox.
		$svg = str_replace( 'viewbox=', 'viewBox=', $svg );

		return $svg;
	}

	/**
	 * Format inline JavaScript code.
	 *
	 * @param string $js
	 *
	 * @return string
	 */
	public static function inline_js( string $js ): string {
		$js = str_replace( '"', "'", $js );
		$js = trim( rtrim( $js, ';' ) );
		$js = Str::reduce_whitespace( $js );
		$js = Str::remove_line_breaks( $js );

		return apply_filters( 'plover_core_format_inline_js', $js );
	}

	/**
	 * Format inline CSS code.
	 *
	 * @param string $css
	 *
	 * @return string
	 */
	public static function inline_css( string $css ): string {
		return StyleEngine::compile_css(
			StyleEngine::css_to_declarations( $css )
		);
	}
}