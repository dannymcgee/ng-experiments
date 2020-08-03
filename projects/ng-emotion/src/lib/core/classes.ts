import { Component, DoCheck, ElementRef, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

import { StyleBindingFn } from './types';

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
	readonly host: string;

	/** @private */
	_ngeBindings = new Map<string, StyleBindingFn>();
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

	private _ngeBindingValues = new Map<string, string>();
	private _ngeBindingChanges = new Map<string, [string, string]>();

	private _ngeShouldCheck = false;
	private _ngeHasChanges = false;

	private _onInit$ = new ReplaySubject<void>();

	/** Observable which emits when the component is destroyed. Useful for managing subscriptions via the `takeUntil` operator */
	protected get onDestroy$ (): Observable<void> { return this._onDestroy$.asObservable(); }
	private _onDestroy$ = new Subject<void>();

	constructor (
		public elementRef: ElementRef<HTMLElement>,
		styles: EmotionStylesheet,
	) {
		this.styles = styles as T;
	}

	ngOnInit (): void {
		this._ngeAddClass(this.styles.host);
		this._onInit$.next();
	}

	ngDoCheck (): void {
		if (this._ngeShouldCheck) {
			for (let [key, fn] of this.styles._ngeBindings.entries()) {
				const arg: any = this[key];
				const next = fn(arg);
				const current = this._ngeBindingValues.get(key);

				if (next !== current) {
					this._ngeHasChanges = true;
					this._ngeBindingChanges.set(key, [current, next]);
				}
			}

			this._ngeShouldCheck = false;
		}

		if (this._ngeHasChanges) {
			this._ngeUpdateBindings();
		}
	}

	ngOnDestroy (): void {
		this._onDestroy$.next();
		this._onDestroy$.complete();
		this._onInit$.complete();
	}

	/** Similar to Angular's `ChangeDetectorRef.markForCheck`, calling this method re-evaluates the component's `@StyleModifier()`-bound stylesheet methods and applies changes where necessary on the next `DoCheck` event. */
	protected ngeMarkForCheck (): void {
		this._ngeShouldCheck = true;
	}

	private _ngeUpdateBindings (): void {
		if (this.elementRef?.nativeElement == null)
			return;

		for (const [key, [current, next]] of this._ngeBindingChanges.entries()) {
			if (current == null)
				this._ngeAddClass(next);
			else if (next == null)
				this._ngeRemoveClass(current);
			else
				this._ngeReplaceClass(current, next);

			this._ngeBindingValues.set(key, next);
		}

		this._ngeBindingChanges.clear();
		this._ngeHasChanges = false;
	}

	private _ngeAddClass (className: string): void {
		this.elementRef.nativeElement.classList.add(className);
	}

	private _ngeReplaceClass (prev: string, current: string): void {
		this.elementRef.nativeElement.classList.replace(prev, current);
	}

	private _ngeRemoveClass (className: string): void {
		this.elementRef.nativeElement.classList.remove(className);
	}
}
