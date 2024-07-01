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
	 * @param $input_string
	 *
	 * @return string
	 * @see https://developer.wordpress.org/reference/functions/_wp_to_kebab_case/
	 */
	public static function to_kebab_case( $input_string ) {
		/*
		 * Some notable things we've removed compared to the lodash version are:
		 *
		 * - non-alphanumeric characters: rsAstralRange, rsEmoji, etc
		 * - the groups that processed the apostrophe, as it's removed before passing the string to preg_match: rsApos, rsOptContrLower, and rsOptContrUpper
		 *
		 */

		/** Used to compose unicode character classes. */
		$rsLowerRange       = 'a-z\\xdf-\\xf6\\xf8-\\xff';
		$rsNonCharRange     = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf';
		$rsPunctuationRange = '\\x{2000}-\\x{206f}';
		$rsSpaceRange       = ' \\t\\x0b\\f\\xa0\\x{feff}\\n\\r\\x{2028}\\x{2029}\\x{1680}\\x{180e}\\x{2000}\\x{2001}\\x{2002}\\x{2003}\\x{2004}\\x{2005}\\x{2006}\\x{2007}\\x{2008}\\x{2009}\\x{200a}\\x{202f}\\x{205f}\\x{3000}';
		$rsUpperRange       = 'A-Z\\xc0-\\xd6\\xd8-\\xde';
		$rsBreakRange       = $rsNonCharRange . $rsPunctuationRange . $rsSpaceRange;

		/** Used to compose unicode capture groups. */
		$rsBreak  = '[' . $rsBreakRange . ']';
		$rsDigits = '\\d+'; // The last lodash version in GitHub uses a single digit here and expands it when in use.
		$rsLower  = '[' . $rsLowerRange . ']';
		$rsMisc   = '[^' . $rsBreakRange . $rsDigits . $rsLowerRange . $rsUpperRange . ']';
		$rsUpper  = '[' . $rsUpperRange . ']';

		/** Used to compose unicode regexes. */
		$rsMiscLower = '(?:' . $rsLower . '|' . $rsMisc . ')';
		$rsMiscUpper = '(?:' . $rsUpper . '|' . $rsMisc . ')';
		$rsOrdLower  = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])';
		$rsOrdUpper  = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])';

		$regexp = '/' . implode(
				'|',
				array(
					$rsUpper . '?' . $rsLower . '+' . '(?=' . implode( '|', array( $rsBreak, $rsUpper, '$' ) ) . ')',
					$rsMiscUpper . '+' . '(?=' . implode( '|', array( $rsBreak, $rsUpper . $rsMiscLower, '$' ) ) . ')',
					$rsUpper . '?' . $rsMiscLower . '+',
					$rsUpper . '+',
					$rsOrdUpper,
					$rsOrdLower,
					$rsDigits,
				)
			) . '/u';

		preg_match_all( $regexp, str_replace( "'", '', $input_string ), $matches );

		return strtolower( implode( '-', $matches[0] ) );
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