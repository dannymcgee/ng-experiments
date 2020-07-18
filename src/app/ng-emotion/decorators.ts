import { first } from 'rxjs/operators';
import { EmotionComponent } from './classes';

export type Constructor<T = any> = new(...args: any[]) => T;
type ClassDecorator = <T extends Constructor>(constructor: T) => T;
type PropertyDecorator = (target: object, key: string|symbol) => void;

export function WithEmotion(StylerClass: any): ClassDecorator {
	return function(ctor: any): any {
		ctor.prototype.__StylerClass__ = StylerClass;
	};
}

export function DynamicStyle(fnName: string): PropertyDecorator {
	return function(component: EmotionComponent, propName: string|symbol): void {
		let current: any = component[propName];

		function get(): any {
			return current;
		}

		function set(next: any): void {
			this.onInit$.pipe(first()).subscribe(() => {
				const { styler, elementRef }: EmotionComponent = this;
				const stylerFn: (...args: any[]) => string = styler?.[fnName];

				if (next != null
					&& next !== current
					&& next.length
					&& typeof stylerFn === 'function'
					&& !!elementRef?.nativeElement
				) {
					elementRef.nativeElement.classList.add(stylerFn(next));

					current = next;
				}
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
