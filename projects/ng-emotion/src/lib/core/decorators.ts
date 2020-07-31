import { first } from 'rxjs/operators';

import { EmotionComponent, EmotionStylesheet } from './classes';

type PropertyDecorator = (target: object, key: string|symbol) => void;

/**
 * Passes the value of the decorated property to the `EmotionStylesheet`, making it available on the stylesheet's `props` object.
 *
 * Changes to any properties decorated with `@StyleProp()` will trigger change detection on all `@StyleModifier()` bindings.
 */
export function StyleProp (): PropertyDecorator {
	return function<
		T extends EmotionComponent<TS>,
		TS extends EmotionStylesheet,
	>(
		component: T,
		propName: string
	): void {
		function get (): T[keyof T] {
			return this[`__${propName}__`];
		}

		function set (value: T[keyof T]): void {
			this._onInit$
				.pipe(first())
				.subscribe(() => {
						this.styles.props[propName] = value;
						this.ngeMarkForCheck();

						this[`__${propName}__`] = value;
					});
		}

		Object.defineProperty(component, propName, {
			get, set,
			enumerable: true,
			configurable: true,
		});
	};
}

/**
 * Applies the return value of an EmotionStylesheet method to the component's host element, passing the value of the decorated property as an argument.
 *
 * This is primarily useful for dynamically applying a set of styles to the host element depending on the value of an `@Input()` property or some other piece of component state.
 *
 * @param methodName The name of the stylesheet method to apply. If not provided, the method name is assumed to be the same as the decorated property.
 */
export function StyleModifier (methodName?: string): PropertyDecorator {
	return function<
		T extends EmotionComponent<TS>,
		TS extends EmotionStylesheet,
	>(
		component: T,
		propName: string
	): void {
		function get (): T[keyof T] {
			return this[`__${propName}__`];
		}

		function set (value: T[keyof T]): void {
			this._onInit$
				.pipe(first())
				.subscribe(() => {
						const _methodName = !!methodName ? methodName : propName;

						if (typeof this.styles[_methodName] === 'function') {
							if (!this.styles._ngeBindings.has(propName)) {
								this.styles._ngeBindings.set(
									propName,
									this.styles[_methodName].bind(this.styles)
								);
							}
							this.ngeMarkForCheck();
						}
					});

			this[`__${propName}__`] = value;
		}

		Object.defineProperty(component, propName, {
			get, set,
			enumerable: true,
			configurable: true,
		});
	};
}
