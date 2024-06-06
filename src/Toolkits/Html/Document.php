<?php

namespace Plover\Core\Toolkits\Html;

use DOMDocument;
use DOMElement;

/**
 * Wrapper for DOMDocument
 *
 * @since 1.0.0
 */
class Document {

	/**
	 * HTML DOM
	 *
	 * @var DOMDocument
	 */
	private $dom;

	/**
	 * Create Html document instance.
	 *
	 * @param string $raw
	 */
	public function __construct( string $raw ) {
		$this->dom = new DOMDocument();

		if ( ! $raw ) {
			return;
		}

		$libxml_previous_state         = libxml_use_internal_errors( true );
		$this->dom->preserveWhiteSpace = false;

		if ( defined( 'LIBXML_HTML_NOIMPLIED' ) && defined( 'LIBXML_HTML_NODEFDTD' ) ) {
			$options = LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD;
		} else {
			if ( defined( 'LIBXML_HTML_NOIMPLIED' ) ) {
				$options = LIBXML_HTML_NOIMPLIED;
			} else {
				if ( defined( 'LIBXML_HTML_NODEFDTD' ) ) {
					$options = LIBXML_HTML_NODEFDTD;
				} else {
					$options = 0;
				}
			}
		}

		// @see https://stackoverflow.com/questions/13280200/convert-unicode-to-html-entities-hex.
		$html = preg_replace_callback(
			'/[\x{80}-\x{10FFFF}]/u',
			static function ( array $matches ): string {
				return sprintf(
					'&#x%s;',
					ltrim(
						strtoupper(
							bin2hex(
								iconv(
									'UTF-8',
									'UCS-4',
									current( $matches )
								)
							)
						),
						'0'
					)
				);
			},
			$raw
		);

		$this->dom->loadHTML( $html, $options );
		$this->dom->formatOutput = true;

		libxml_clear_errors();
		libxml_use_internal_errors( $libxml_previous_state );
	}

	/**
	 * Return DOM document instance.
	 *
	 * @return DOMDocument
	 */
	public function get_dom() {
		return $this->dom;
	}

	/**
	 * Save as raw HTML string
	 *
	 * @return string
	 */
	public function save_html(): string {
		return $this->dom->saveHTML();
	}

	/**
	 * Get root/first element
	 *
	 * @return Element|null
	 */
	public function get_root_element(): ?Element {
		return $this->get_element_by_tag_name( '*' );
	}

	/**
	 * @param string $tag
	 * @param int $index
	 *
	 * @return Element|null
	 */
	public function get_element_by_tag_name( string $tag, int $index = 0 ): ?Element {
		$element = $this->dom->getElementsByTagName( $tag )->item( $index );

		if ( ! $element ) {
			return null;
		}

		return $this->sanitize_element( $element );
	}

	/**
	 * @param $node
	 *
	 * @return DOMElement|null
	 */
	private function sanitize_element( $node ): ?Element {

		if ( $node && $node->nodeType === XML_ELEMENT_NODE ) {
			return new Element( $node );
		}

		return null;
	}

	/**
	 * @param string $tag
	 *
	 * @return DOMElement|false|null
	 */
	public function create_element( string $tag ) {
		$element = null;

		try {
			$element = $this->dom->createElement( $tag );
		} catch ( \Exception $e ) {
			new \WP_Error( 'invalid_dom_tag', $e->getMessage() );
		}

		if ( is_null( $element ) ) {
			return null;
		}

		return $element;
	}
}