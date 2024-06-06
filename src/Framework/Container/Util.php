<?php

namespace Plover\Core\Framework\Container;

use Closure;
use ReflectionNamedType;
use ReflectionParameter;

/**
 * Utils for container.
 *
 * @since 1.0.0
 */
class Util {
	/**
	 * If the given value is not an array and not null, wrap it in one.
	 *
	 * From Arr::wrap() in Illuminate\Support.
	 *
	 * @param mixed $value
	 *
	 * @return array
	 */
	public static function arrayWrap( $value ): array {
		if ( is_null( $value ) ) {
			return [];
		}

		return is_array( $value ) ? $value : [ $value ];
	}

	/**
	 * Return the default value of the given value.
	 *
	 * From global value() helper in Illuminate\Support.
	 *
	 * @param mixed $value
	 *
	 * @return mixed
	 */
	public static function unwrapIfClosure( $value ) {
		return $value instanceof Closure ? $value() : $value;
	}

	/**
	 * Get the class name of the given parameter's type, if possible.
	 *
	 * From Reflector::getParameterClassName() in Illuminate\Support.
	 *
	 * @param ReflectionParameter $parameter
	 *
	 * @return string|null
	 */
	public static function getParameterClassName( ReflectionParameter $parameter ): ?string {
		$type = $parameter->getType();

		if ( ! $type instanceof ReflectionNamedType || $type->isBuiltin() ) {
			return null;
		}

		$name = $type->getName();

		if ( ! is_null( $class = $parameter->getDeclaringClass() ) ) {
			if ( $name === 'self' ) {
				return $class->getName();
			}

			if ( $name === 'parent' && $parent = $class->getParentClass() ) {
				return $parent->getName();
			}
		}

		return $name;
	}
}
