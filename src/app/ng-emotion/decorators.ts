import { first } from 'rxjs/operators';
import { EmotionComponent, EmotionStyler } from './classes';

type PropertyDecorator = (target: object, key: string|symbol) => void;

export function StyleProperty(): PropertyDecorator {
	return function<
		TS extends EmotionStyler,
		T extends EmotionComponent<TS> = any
	>(
		component: T,
		propName: string
	): void {
		function get(): T {
			return this[`__${propName}__`];
		}

		function set(value: T): void {
			this.onInit$.pipe(first()).subscribe(() => {
				this.styles.ngeProps.set(propName, value);
				this.ngeMarkForCheck();

				this[`__${propName}__`] = value;
			});
		}

		Object.defineProperty(component, propName, {
			get,
			set,
			enumerable: true,
			configurable: true,
		});
	};
}

export function StyleModifier(fnName: string): PropertyDecorator {
	return function<
		TS extends EmotionStyler,
		T extends EmotionComponent<TS>,
	>(
		component: T,
		propName: string
	): void {
		function get(): any {
			return this[`__${propName}__`];
		}

		function set(value: any): void {
			this.onInit$.pipe(first()).subscribe(() => {
				if (typeof this.styles[fnName] === 'function') {
					if (!this.styles.ngeBindings.has(propName)) {
						this.styles.ngeBindings.set(propName, this.styles[fnName].bind(this.styles));
					}
					this.ngeMarkForCheck();
				}
			});

			this[`__${propName}__`] = value;
		}

		Object.defineProperty(component, propName, {
			get,
			set,
			enumerable: true,
			configurable: true,
		});
	};
}
