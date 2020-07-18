import {
	Renderer2,
	ElementRef,
	ɵComponentDef as ComponentDef,
} from '@angular/core';

import { Subject, ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';

import { EmotionComponent } from './classes';

type ClassType = new(...args: any[]) => {};
type ClassDecorator = <T extends ClassType>(constructor: T) => T;
type PropertyDecorator = (target: object, key: string|symbol) => void;

export function WithEmotion(StyleClass: any): ClassDecorator {
	return function(ctor: any): any {
		ctor.prototype.onInit$ = new ReplaySubject<void>();
		ctor.prototype.onDestroy$ = new Subject<void>();

		const onInit = ctor.prototype.ngOnInit;
		ctor.prototype.ngOnInit = function(...args: any[]): void {
			if (typeof onInit === 'function')
				onInit.apply(this, args);

			this.styler = new StyleClass();
			setTimeout(() => {
				(this.onInit$ as ReplaySubject<void>).next();
			});
		};

		const onDestroy = ctor.prototype.ngOnDestroy;
		ctor.prototype.ngOnDestroy = function(...args: any[]): void {
			if (typeof onDestroy === 'function')
				onDestroy.apply(this, args);

			this.onDestroy$.next();
			this.onDestroy$.complete();
			this.onInit$.complete();
		};
	};
}

export function StyleBinding(fnName: string): PropertyDecorator {
	return function(component: EmotionComponent, propName: string|symbol): void {

		let current: any = component[propName];

		// const get = () => current;
		function get(): any {
			return current;
		}

		function set(next: any): void {
			this.onInit$.pipe(first()).subscribe(() => {
				const { styler, elementRef }: EmotionComponent = this;
				const styleFn = styler?.[fnName];

				if (next != null
					&& next !== current
					&& next.length
					&& typeof styleFn === 'function'
					&& !!elementRef?.nativeElement
				) {
					elementRef.nativeElement.classList.add(styleFn(next));

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
