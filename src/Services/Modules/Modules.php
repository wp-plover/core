<?php

namespace Plover\Core\Services\Modules;

use Plover\Core\Plover;
use Plover\Core\Services\Modules\Contract\Module;

/**
 * @since 1.0.0
 */
class Modules {
	/**
	 * All registered modules.
	 *
	 * @var Module[]
	 */
	protected $modules = [];

	/**
	 * @var Plover
	 */
	protected $core;

	/**
	 * Create modules instance.
	 *
	 * @param Plover $core
	 */
	public function __construct( Plover $core ) {
		$this->core = $core;

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
		$args = wp_parse_args( $args, array(
			'label'       => '',
			'enabled'     => 'yes',
			'excerpt'     => '',
			'icon'        => '',
			'description' => '',
			'fields'      => array(),
		) );

		$settings = $this->core->get( 'settings' );
		if ( $settings ) {
			$settings->add_group( $id, array(
				'default' => $args['enabled'],
			) );

			$args['enabled'] = $settings->get( $id );
		}

		foreach ( $args['fields'] as $field => $field_args ) {
			$field_args = wp_parse_args( $field_args, array(
				'label'   => '',
				'default' => '',
				'control' => Control::T_TEXT,
			) );

			if ( $settings ) {
				$settings->add_field( $id, $field, array(
					'default'  => $field_args['default'],
					'sanitize' => Control::sanitize(
						$field_args['control'],
						array_merge(
							$field_args['control_args'] ?? array(),
							array( 'default' => $field_args['default'] )
						)
					),
				) );

				$field_args['value'] = $settings->get( $id, $field );
			}

			$args['fields'][ $field ] = $field_args;
		}

		$this->modules[ $id ] = $args;
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