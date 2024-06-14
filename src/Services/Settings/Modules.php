<?php

namespace Plover\Core\Services\Settings;

use Plover\Core\Plover;

/**
 * @since 1.0.0
 */
class Modules {
	/**
	 * All registered modules.
	 *
	 * @var array
	 */
	protected $modules = [];

	/**
	 * @var Plover
	 */
	protected $core;

	/**
	 * @var Settings
	 */
	protected $settings;

	/**
	 * Create modules instance.
	 *
	 * @param Plover $core
	 */
	public function __construct( Plover $core, Settings $settings ) {
		$this->core     = $core;
		$this->settings = $settings;

		add_filter( 'plover_core_dashboard_data', function ( $data ) {
			// TODO: escape label, icon, excerpt, description.
			$data['modules'] = $this->modules;

			return $data;
		} );
	}

	/**
	 * Register module.
	 *
	 * @param $id
	 * @param $args
	 *
	 * @return void
	 * @throws \Exception
	 */
	public function register( $id, $args = array() ) {
		if ( isset( $this->modules[ $id ] ) ) {
			return;
		}

		$args = wp_parse_args( $args, array(
			'label'       => '',
			'enabled'     => 'yes',
			'excerpt'     => '',
			'icon'        => '',
			'description' => '',
			'fields'      => array(),
		) );

		$this->settings->add_group( $id, array(
			'default' => $args['enabled'],
		) );

		$fields          = $args['fields'] ?? array();
		$args['enabled'] = $this->settings->get( $id );
		$args['fields']  = array();

		$this->modules[ $id ] = $args;

		foreach ( $fields as $field => $field_args ) {
			$this->add_field( $id, $field, $field_args );
		}
	}

	/**
	 * Add a field to exists module.
	 *
	 * @param $module
	 * @param $field
	 * @param $args
	 *
	 * @return void
	 */
	public function add_field( $module, $field, $args = array() ) {
		if ( ! isset( $this->modules[ $module ] ) ) {
			return;
		}

		$field_args = wp_parse_args( $args, array(
			'label'   => '',
			'default' => '',
			'control' => Control::T_TEXT,
		) );

		$this->settings->add_field( $module, $field, array(
			'default'  => $field_args['default'],
			'sanitize' => Control::sanitize(
				$field_args['control'],
				array_merge(
					$field_args['control_args'] ?? array(),
					array( 'default' => $field_args['default'] )
				)
			),
		) );

		$field_args['value'] = $this->settings->get( $module, $field );

		$this->modules[ $module ]['fields'][ $field ] = $field_args;
	}

	/**
	 * Unregister exists module.
	 *
	 * @param $slug
	 *
	 * @return void
	 */
	public function unregister( $slug ) {
		unset( $this->modules[ $slug ] );
	}
}