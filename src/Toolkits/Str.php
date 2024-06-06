<?php

namespace Plover\Core\Toolkits;

/**
 * Utils for string.
 *
 * @since 1.0.0
 */
class Str {

	/**
	 * Checks if any of the given needles are in the haystack.
	 *
	 * @param string $haystack
	 * @param ...$needles
	 *
	 * @return bool
	 */
	public static function contains_any( string $haystack, ...$needles ): bool {
		foreach ( $needles as $needle ) {
			if ( str_contains( $haystack, $needle ) ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Removes line breaks from a string.
	 *
	 * @param string $string
	 *
	 * @return string
	 */
	public static function remove_line_breaks( string $string ): string {
		// Remove zero width spaces and other invisible characters.
		$string = preg_replace( '/^[\pZ\pC]+|[\pZ\pC]+$/u', '', $string );

		// Replace line breaks.
		str_replace( [ "\r", "\n", PHP_EOL, ], '', $string );

		return trim( $string );
	}

	/**
	 * Prepends a leading slash.
	 *
	 * Will remove leading forward and backslashes if it exists already before adding
	 * a leading forward slash. This prevents double slashing a string or path.
	 *
	 * The primary use of this is for paths and thus should be used for paths. It is
	 * not restricted to paths and offers no specific path support.
	 *
	 * @param string $string What to add the leading slash to.
	 *
	 * @return string String with leading slash added.
	 */
	public static function leadingslashit( string $string ): string {
		return DIRECTORY_SEPARATOR . static::unleadingslashit( $string );
	}

	/**
	 * Removes leading forward slashes and backslashes if they exist.
	 *
	 * The primary use of this is for paths and thus should be used for paths. It is
	 * not restricted to paths and offers no specific path support.
	 *
	 * @param string $string What to remove the leading slashes from.
	 *
	 * @return string String without the leading slashes.
	 */
	public static function unleadingslashit( string $string ): string {
		return ltrim( $string, '/\\' );
	}
}