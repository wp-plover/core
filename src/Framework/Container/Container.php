<?php

namespace Plover\Core\Framework\Container;

use Closure;
use Exception;
use LogicException;
use ReflectionClass;
use ReflectionException;
use ReflectionParameter;

/**
 * Simpler auto-wiring dependency injection container.
 *
 * @see https://github.com/illuminate/container
 *
 * @since 1.0.0
 */
class Container {

	/**
	 * The contextual binding map.
	 *
	 * @var array[]
	 */
	public $contextual = [];
	/**
	 * An array of the types that have been resolved.
	 *
	 * @var bool[]
	 */
	protected $resolved = [];
	/**
	 * The container's shared instances.
	 *
	 * @var object[]
	 */
	protected $instances = [];
	/**
	 * The container's bindings.
	 *
	 * @var array[]
	 */
	protected $bindings = [];
	/**
	 * The registered type aliases.
	 *
	 * @var string[]
	 */
	protected $aliases = [];
	/**
	 * The registered aliases keyed by the abstract name.
	 *
	 * @var array[]
	 */
	protected $abstractAliases = [];
	/**
	 * The parameter override stack.
	 *
	 * @var array[]
	 */
	protected $with = [];
	/**
	 * The stack of concretions currently being built.
	 *
	 * @var array[]
	 */
	protected $buildStack = [];

	/**
	 * All of the registered rebound callbacks.
	 *
	 * @var array[]
	 */
	protected $reboundCallbacks = [];

	/**
	 * Finds an entry of the container by its identifier and returns it.
	 *
	 * @param string $id
	 *
	 * @return mixed
	 */
	public function get( string $id ) {
		try {
			return $this->resolve( $id );
		} catch ( Exception $e ) {
			if ( $this->has( $id ) ) {
				throw $e;
			}

			return null;
		}
	}

	/**
	 * Resolve the given type from the container.
	 *
	 * @param string $abstract
	 * @param array $parameters
	 *
	 * @return mixed
	 * @throws BindingResolutionException|ReflectionException
	 */
	protected function resolve( string $abstract, array $parameters = [] ) {
		$abstract = $this->getAlias( $abstract );

		$needsContextualBuild = ! empty( $parameters ) || ! is_null(
				$this->getContextualConcrete( $abstract )
			);

		// If an instance of the type is currently being managed as a singleton we'll
		// just return an existing instance instead of instantiating new instances
		// so the developer can keep using the same objects instance every time.
		if ( isset( $this->instances[ $abstract ] ) && ! $needsContextualBuild ) {
			return $this->instances[ $abstract ];
		}

		$this->with[] = $parameters;

		$concrete = $this->getConcrete( $abstract );

		// We're ready to instantiate an instance of the concrete type registered for
		// the binding. This will instantiate the types, as well as resolve any of
		// its "nested" dependencies recursively until all have gotten resolved.
		if ( $this->isBuildable( $concrete, $abstract ) ) {
			$object = $this->build( $concrete );
		} else {
			$object = $this->make( $concrete );
		}

		// If the requested type is registered as a singleton we'll want to cache off
		// the instances in "memory" so we can return it later without creating an
		// entirely new instance of an object on each subsequent request for it.
		if ( $this->isShared( $abstract ) && ! $needsContextualBuild ) {
			$this->instances[ $abstract ] = $object;
		}

		// Before returning, we will also set the resolved flag to "true" and pop off
		// the parameter overrides for this build. After those two things are done
		// we will be ready to return back the fully constructed class instance.
		$this->resolved[ $abstract ] = true;

		array_pop( $this->with );

		return $object;
	}

	/**
	 * Get the alias for an abstract if available.
	 *
	 * @param string $abstract
	 *
	 * @return string
	 */
	public function getAlias( string $abstract ): string {
		if ( ! isset( $this->aliases[ $abstract ] ) ) {
			return $abstract;
		}

		return $this->getAlias( $this->aliases[ $abstract ] );
	}

	/**
	 * Get the contextual concrete binding for the given abstract.
	 *
	 * @param string $abstract
	 *
	 * @return Closure|string|null
	 */
	protected function getContextualConcrete( string $abstract ) {
		if ( ! is_null( $binding = $this->findInContextualBindings( $abstract ) ) ) {
			return $binding;
		}

		// Next we need to see if a contextual binding might be bound under an alias of the
		// given abstract type. So, we will need to check if any aliases exist with this
		// type and then spin through them and check for contextual bindings on these.
		if ( empty( $this->abstractAliases[ $abstract ] ) ) {
			return null;
		}

		foreach ( $this->abstractAliases[ $abstract ] as $alias ) {
			if ( ! is_null( $binding = $this->findInContextualBindings( $alias ) ) ) {
				return $binding;
			}
		}
	}

	/**
	 * Find the concrete binding for the given abstract in the contextual binding array.
	 *
	 * @param string $abstract
	 *
	 * @return Closure|string|null
	 */
	protected function findInContextualBindings( string $abstract ) {
		return $this->contextual[ end( $this->buildStack ) ][ $abstract ] ?? null;
	}

	/**
	 * Get the concrete type for a given abstract.
	 *
	 * @param string $abstract
	 *
	 * @return mixed
	 */
	protected function getConcrete( string $abstract ) {
		if ( ! is_null( $concrete = $this->getContextualConcrete( $abstract ) ) ) {
			return $concrete;
		}

		// If we don't have a registered resolver or concrete for the type, we'll just
		// assume each type is a concrete name and will attempt to resolve it as is
		// since the container should be able to resolve concretes automatically.
		if ( isset( $this->bindings[ $abstract ] ) ) {
			return $this->bindings[ $abstract ]['concrete'];
		}

		return $abstract;
	}

	/**
	 * Determine if the given concrete is buildable.
	 *
	 * @param mixed $concrete
	 * @param string $abstract
	 *
	 * @return bool
	 */
	protected function isBuildable( $concrete, string $abstract ): bool {
		return $concrete === $abstract || $concrete instanceof Closure;
	}

	/**
	 * Instantiate a concrete instance of the given type.
	 *
	 * @param mixed $concrete
	 *
	 * @return mixed
	 *
	 * @throws BindingResolutionException|ReflectionException
	 */
	public function build( $concrete ) {
		// If the concrete type is actually a Closure, we will just execute it and
		// hand back the results of the functions, which allows functions to be
		// used as resolvers for more fine-tuned resolution of these objects.
		if ( $concrete instanceof Closure ) {
			return $concrete( $this, $this->getLastParameterOverride() );
		}

		try {
			$reflector = new ReflectionClass( $concrete );
		} catch ( ReflectionException $e ) {
			throw new BindingResolutionException( "Target class [$concrete] does not exist.", 0, $e );
		}

		// If the type is not instantiable, the developer is attempting to resolve
		// an abstract type such as an Interface or Abstract Class and there is
		// no binding registered for the abstractions so we need to bail out.
		if ( ! $reflector->isInstantiable() ) {
			return $this->notInstantiable( $concrete );
		}

		$this->buildStack[] = $concrete;

		$constructor = $reflector->getConstructor();

		// If there are no constructors, that means there are no dependencies then
		// we can just resolve the instances of the objects right away, without
		// resolving any other types or dependencies out of these containers.
		if ( is_null( $constructor ) ) {
			array_pop( $this->buildStack );

			return new $concrete;
		}

		$dependencies = $constructor->getParameters();

		// Once we have all the constructor's parameters we can create each of the
		// dependency instances and then use the reflection instances to make a
		// new instance of this class, injecting the created dependencies in.
		try {
			$instances = $this->resolveDependencies( $dependencies );
		} catch ( BindingResolutionException $e ) {
			array_pop( $this->buildStack );

			throw $e;
		}

		array_pop( $this->buildStack );

		return $reflector->newInstanceArgs( $instances );
	}

	/**
	 * Get the last parameter override.
	 *
	 * @return array
	 */
	protected function getLastParameterOverride(): array {
		return count( $this->with ) ? end( $this->with ) : [];
	}

	/**
	 * Throw an exception that the concrete is not instantiable.
	 *
	 * @param string $concrete
	 *
	 * @return void
	 *
	 * @throws BindingResolutionException
	 */
	protected function notInstantiable( string $concrete ) {
		if ( ! empty( $this->buildStack ) ) {
			$previous = implode( ', ', $this->buildStack );

			$message = "Target [$concrete] is not instantiable while building [$previous].";
		} else {
			$message = "Target [$concrete] is not instantiable.";
		}

		throw new BindingResolutionException( $message );
	}

	/**
	 * Resolve all the dependencies from the ReflectionParameters.
	 *
	 * @param ReflectionParameter[] $dependencies
	 *
	 * @return array
	 *
	 * @throws BindingResolutionException|ReflectionException
	 */
	protected function resolveDependencies( array $dependencies ): array {
		$results = [];

		foreach ( $dependencies as $dependency ) {
			// If this dependency has a override for this particular build we will use
			// that instead as the value. Otherwise, we will continue with this run
			// of resolutions and let reflection attempt to determine the result.
			if ( $this->hasParameterOverride( $dependency ) ) {
				$results[] = $this->getParameterOverride( $dependency );

				continue;
			}

			// If the class is null, it means the dependency is a string or some other
			// primitive type which we can not resolve since it is not a class and
			// we will just bomb out with an error since we have no-where to go.
			$results[] = is_null( Util::getParameterClassName( $dependency ) )
				? $this->resolvePrimitive( $dependency )
				: $this->resolveClass( $dependency );
		}

		return $results;
	}

	/**
	 * Determine if the given dependency has a parameter override.
	 *
	 * @param ReflectionParameter $dependency
	 *
	 * @return bool
	 */
	protected function hasParameterOverride( ReflectionParameter $dependency ): bool {
		return array_key_exists(
			$dependency->name,
			$this->getLastParameterOverride()
		);
	}

	/**
	 * Get a parameter override for a dependency.
	 *
	 * @param ReflectionParameter $dependency
	 *
	 * @return mixed
	 */
	protected function getParameterOverride( ReflectionParameter $dependency ) {
		return $this->getLastParameterOverride()[ $dependency->name ];
	}

	/**
	 * Resolve a non-class hinted primitive dependency.
	 *
	 * @param ReflectionParameter $parameter
	 *
	 * @return mixed
	 *
	 * @throws BindingResolutionException
	 */
	protected function resolvePrimitive( ReflectionParameter $parameter ) {
		if ( ! is_null( $concrete = $this->getContextualConcrete( '$' . $parameter->getName() ) ) ) {
			return $concrete instanceof Closure ? $concrete( $this ) : $concrete;
		}

		if ( $parameter->isDefaultValueAvailable() ) {
			return $parameter->getDefaultValue();
		}

		$this->unresolvablePrimitive( $parameter );
	}

	/**
	 * Throw an exception for an unresolvable primitive.
	 *
	 * @param ReflectionParameter $parameter
	 *
	 * @return void
	 *
	 * @throws BindingResolutionException
	 */
	protected function unresolvablePrimitive( ReflectionParameter $parameter ) {
		$message = "Unresolvable dependency resolving [$parameter] in class {$parameter->getDeclaringClass()->getName()}";

		throw new BindingResolutionException( $message );
	}

	/**
	 * Resolve a class based dependency from the container.
	 *
	 * @param \ReflectionParameter $parameter
	 *
	 * @return mixed
	 *
	 * @throws BindingResolutionException|ReflectionException
	 */
	protected function resolveClass( ReflectionParameter $parameter ) {
		try {
			return $this->make( Util::getParameterClassName( $parameter ) );
		}

			// If we can not resolve the class instance, we will check to see if the value
			// is optional, and if it is we will return the optional parameter value as
			// the value of the dependency, similarly to how we do this with scalars.
		catch ( BindingResolutionException $e ) {
			if ( $parameter->isOptional() ) {
				return $parameter->getDefaultValue();
			}

			throw $e;
		}
	}

	/**
	 * Resolve the given type from the container.
	 *
	 * @param string $abstract
	 * @param array $parameters
	 *
	 * @return mixed
	 */
	public function make( string $abstract, array $parameters = [] ) {
		return $this->resolve( $abstract, $parameters );
	}

	/**
	 * Determine if a given type is shared.
	 *
	 * @param string $abstract
	 *
	 * @return bool
	 */
	public function isShared( string $abstract ): bool {
		return isset( $this->instances[ $abstract ] ) ||
		       ( isset( $this->bindings[ $abstract ]['shared'] ) &&
		         $this->bindings[ $abstract ]['shared'] === true );
	}

	/**
	 * Returns true if the container can return an entry for the given identifier.
	 * Returns false otherwise.
	 *
	 * `has($id)` returning true does not mean that `get($id)` will not throw an exception.
	 * It does however mean that `get($id)` will not throw a `NotFoundExceptionInterface`.
	 *
	 * @param string $id
	 *
	 * @return bool
	 */
	public function has( string $id ): bool {
		return $this->bound( $id );
	}

	/**
	 * Determine if the given abstract type has been bound.
	 *
	 * @param string $abstract
	 *
	 * @return bool
	 */
	public function bound( string $abstract ): bool {
		return isset( $this->bindings[ $abstract ] ) ||
		       isset( $this->instances[ $abstract ] ) ||
		       $this->isAlias( $abstract );
	}

	/**
	 * Determine if a given string is an alias.
	 *
	 * @param string $name
	 *
	 * @return bool
	 */
	public function isAlias( string $name ): bool {
		return isset( $this->aliases[ $name ] );
	}

	/**
	 * Register a shared binding in the container.
	 *
	 * @param string $abstract
	 * @param \Closure|string|null $concrete
	 *
	 * @return void
	 */
	public function singleton( string $abstract, $concrete = null ) {
		$this->bind( $abstract, $concrete, true );
	}

	/**
	 * Register a binding with the container.
	 *
	 * @param string $abstract
	 * @param Closure|string|null $concrete
	 * @param bool $shared
	 *
	 * @return void
	 */
	public function bind( string $abstract, $concrete = null, bool $shared = false ) {
		$this->dropStaleInstances( $abstract );

		// If no concrete type was given, we will simply set the concrete type to the
		// abstract type. After that, the concrete type to be registered as shared
		// without being forced to state their classes in both of the parameters.
		if ( is_null( $concrete ) ) {
			$concrete = $abstract;
		}

		// If the factory is not a Closure, it means it is just a class name which is
		// bound into this container to the abstract type and we will just wrap it
		// up inside its own Closure to give us more convenience when extending.
		if ( ! $concrete instanceof Closure ) {
			$concrete = $this->getClosure( $abstract, $concrete );
		}

		$this->bindings[ $abstract ] = compact( 'concrete', 'shared' );

		// If the abstract type was already resolved in this container we'll fire the
		// rebound listener so that any objects which have already gotten resolved
		// can have their copy of the object updated via the listener callbacks.
		if ( $this->resolved( $abstract ) ) {
			$this->rebound( $abstract );
		}
	}

	/**
	 * Drop all the stale instances and aliases.
	 *
	 * @param string $abstract
	 *
	 * @return void
	 */
	protected function dropStaleInstances( string $abstract ) {
		unset( $this->instances[ $abstract ], $this->aliases[ $abstract ] );
	}

	/**
	 * Get the Closure to be used when building a type.
	 *
	 * @param string $abstract
	 * @param string $concrete
	 *
	 * @return Closure
	 */
	protected function getClosure( string $abstract, string $concrete ): Closure {
		return function ( $container, $parameters = [] ) use ( $abstract, $concrete ) {
			if ( $abstract == $concrete ) {
				return $container->build( $concrete );
			}

			return $container->resolve(
				$concrete,
				$parameters
			);
		};
	}

	/**
	 * Determine if the given abstract type has been resolved.
	 *
	 * @param string $abstract
	 *
	 * @return bool
	 */
	public function resolved( string $abstract ): bool {
		if ( $this->isAlias( $abstract ) ) {
			$abstract = $this->getAlias( $abstract );
		}

		return isset( $this->resolved[ $abstract ] ) ||
		       isset( $this->instances[ $abstract ] );
	}

	/**
	 * Fire the "rebound" callbacks for the given abstract type.
	 *
	 * @param string $abstract
	 *
	 * @return void
	 */
	protected function rebound( string $abstract ) {
		$instance = $this->make( $abstract );

		foreach ( $this->getReboundCallbacks( $abstract ) as $callback ) {
			call_user_func( $callback, $this, $instance );
		}
	}

	/**
	 * Get the rebound callbacks for a given type.
	 *
	 * @param string $abstract
	 *
	 * @return array
	 */
	protected function getReboundCallbacks( string $abstract ): array {
		return $this->reboundCallbacks[ $abstract ] ?? [];
	}

	/**
	 * Alias a type to a different name.
	 *
	 * @param string $alias
	 * @param string $abstract
	 *
	 * @return void
	 *
	 * @throws \LogicException
	 */
	public function alias( string $alias, string $abstract ) {
		if ( $alias === $abstract ) {
			throw new LogicException( "[{$abstract}] is aliased to itself." );
		}

		$this->aliases[ $alias ] = $abstract;

		$this->abstractAliases[ $abstract ][] = $alias;
	}

	/**
	 * Register an existing instance as shared in the container.
	 *
	 * @param string $abstract
	 * @param mixed $instance
	 *
	 * @return mixed
	 */
	public function instance( string $abstract, $instance ) {
		$this->removeAbstractAlias( $abstract );

		$isBound = $this->bound( $abstract );

		unset( $this->aliases[ $abstract ] );

		// We'll check to determine if this type has been bound before, and if it has
		// we will fire the rebound callbacks registered with the container and it
		// can be updated with consuming classes that have gotten resolved here.
		$this->instances[ $abstract ] = $instance;

		if ( $isBound ) {
			$this->rebound( $abstract );
		}

		return $instance;
	}

	/**
	 * Remove an alias from the contextual binding alias cache.
	 *
	 * @param string $searched
	 *
	 * @return void
	 */
	protected function removeAbstractAlias( string $searched ) {
		if ( ! isset( $this->aliases[ $searched ] ) ) {
			return;
		}

		foreach ( $this->abstractAliases as $abstract => $aliases ) {
			foreach ( $aliases as $index => $alias ) {
				if ( $alias == $searched ) {
					unset( $this->abstractAliases[ $abstract ][ $index ] );
				}
			}
		}
	}

	/**
	 * Call the given Closure / class@method and inject its dependencies.
	 *
	 * @param callable|string $callback
	 * @param array<string, mixed> $parameters
	 * @param string|null $defaultMethod
	 *
	 * @return mixed
	 *
	 * @throws \InvalidArgumentException
	 */
	public function call( $callback, array $parameters = [], $defaultMethod = null ) {
		return BoundMethod::call( $this, $callback, $parameters, $defaultMethod );
	}
}