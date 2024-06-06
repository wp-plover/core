<?php

namespace Plover\Core\Toolkits\Html;

use DOMElement;
use Plover\Core\Toolkits\StyleEngine;

/**
 * Wrapper for DOMElement
 *
 * @since 1.0.0
 */
class Element {

	/**
	 * @var DOMElement
	 */
	protected $el;

	/**
	 * @param DOMElement $el
	 */
	public function __construct( DOMElement $el ) {
		$this->el = $el;
	}

	/**
	 * @return DOMElement
	 */
	public function get_dom_element() {
		return $this->el;
	}

	/**
	 * @param string $qualified_name
	 * @param string $value
	 *
	 * @return void
	 */
	public function set_attribute( string $qualified_name, string $value ) {
		$this->el->setAttribute( $qualified_name, $value );
	}

	/**
	 * Add classnames to element.
	 *
	 * @param $classnames
	 *
	 * @return void
	 */
	public function add_classnames( $classnames ) {
		$this->el->setAttribute( 'class', implode( ' ', array_unique(
			array_merge(
				$this->classnames_to_array( $this->get_attribute( 'class' ) ),
				$this->classnames_to_array( $classnames )
			)
		) ) );
	}

	/**
	 * Convert classnames string to array
	 *
	 * @param $classnames
	 *
	 * @return array
	 */
	protected function classnames_to_array( $classnames ) {
		if ( is_string( $classnames ) ) {
			return array_map( 'trim', explode( ' ', $classnames ) );
		}

		return is_array( $classnames ) ? $classnames : [];
	}

	/**
	 * @param string $qualified_name
	 *
	 * @return string
	 */
	public function get_attribute( string $qualified_name ): string {
		return $this->el->getAttribute( $qualified_name );
	}

	/**
	 * Remove classnames from element.
	 *
	 * @param $classnames
	 *
	 * @return void
	 */
	public function remove_classnames( $classnames ) {
		$this->el->setAttribute( 'class', implode( ' ', array_diff(
			$this->classnames_to_array( $this->get_attribute( 'class' ) ),
			$this->classnames_to_array( $classnames )
		) ) );
	}

	/**
	 * @param $css
	 *
	 * @return void
	 */
	public function add_styles( $css ) {
		if ( ! is_array( $css ) ) {
			$css = StyleEngine::css_to_declarations( $css );
		}

		$this->el->setAttribute( 'style', StyleEngine::compile_css(
			array_merge(
				StyleEngine::css_to_declarations( $this->get_attribute( 'style' ) ),
				$css
			)
		) );
	}
}
