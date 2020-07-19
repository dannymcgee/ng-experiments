import { ElementRef, OnDestroy, OnInit, Component, Injectable, DoCheck } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { StyleBindingFn } from 'src/app/ng-emotion/types';

/**
 * TODO
 */
@Injectable()
export class EmotionStylesheet
{
	/**
	 * A hashmap of component properties bound to the stylesheet via the `@StyleProp()` decorator.
	 */
	props: Record<string, any> = {};

	_ngeBindings = new Map<string, StyleBindingFn>();

	/**
	 * The base set of styles for this component. Style rules at the "root" level of this property will apply to the component's host element, while nested selectors will be matched to descendants of the component _in an un-encapsulated way_.
	 *
	 * This rule set is only evaluated and applied _once_, on component initialization, so dynamic styles which are dependent on `@StyleProp()`-decorated component properties should be applied using methods bound via the `@StyleModifier()` decorator.
	 *
	 * To benefit from view encapsulation, you must declare separate stylesheet members, and apply them in the template via [class] bindings. See EmotionStylesheet for examples.
	 *
	 * @see EmotionStylesheet
	 * @see StyleModifier
	 * @see StyleProp
	 */
	readonly base: string;
}

@Component({ template: '' })
export class EmotionComponent<T extends EmotionStylesheet>
	implements OnInit, DoCheck, OnDestroy
{
	/**
	 * The `EmotionStylesheet` attached to this component.
	 *
	 * @see EmotionStylesheet
	 */
	styles: T;

	protected _ngeBindingValues = new Map<string, string>();
	protected _ngeBindingChanges = new Map<string, [string, string]>();

	protected _ngeShouldCheck = false;
	protected _ngeHasChanges = false;

	protected _onInit$ = new ReplaySubject<void>();
	protected onDestroy$ = new Subject<void>();

	constructor(
		public elementRef: ElementRef<HTMLElement>,
		styles: EmotionStylesheet,
	) {
		this.styles = styles as T;
	}

	ngOnInit(): void {
		this.ngeAddClass(this.styles.base);
		this._onInit$.next();
	}

	ngDoCheck(): void {
		if (this._ngeShouldCheck) {
			for (const [key, fn] of this.styles._ngeBindings.entries()) {
				const arg: any = this[key];
				const newValue = fn(arg);
				const currentValue = this._ngeBindingValues.get(key);

				if (newValue !== currentValue) {
					this._ngeHasChanges = true;
					this._ngeBindingChanges.set(key, [currentValue, newValue]);
				}
			}
			this._ngeShouldCheck = false;
		}

		if (this._ngeHasChanges) {
			this.ngeUpdateBindings();
		}
	}

	ngOnDestroy(): void {
		this.onDestroy$.next();
		this.onDestroy$.complete();
		this._onInit$.complete();
	}

	protected ngeMarkForCheck(): void {
		this._ngeShouldCheck = true;
	}

	protected ngeUpdateBindings(): void {
		if (this.elementRef?.nativeElement == null)
			return;

		for (const [key, [currentValue, newValue]] of this._ngeBindingChanges.entries()) {
			if (currentValue == null)
				this.ngeAddClass(newValue);
			else if (newValue == null)
				this.ngeRemoveClass(currentValue);
			else
				this.ngeReplaceClass(currentValue, newValue);

			this._ngeBindingValues.set(key, newValue);
		}

		this._ngeBindingChanges.clear();
		this._ngeHasChanges = false;
	}

	private ngeAddClass(className: string): void {
		this.elementRef.nativeElement.classList.add(className);
	}

	private ngeReplaceClass(prev: string, current: string): void {
		this.elementRef.nativeElement.classList.replace(prev, current);
	}

	private ngeRemoveClass(className: string): void {
		this.elementRef.nativeElement.classList.remove(className);
	}
}
