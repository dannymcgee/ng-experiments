import { ElementRef, OnDestroy, OnInit, Component, Injectable, DoCheck } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { StyleBindingFn } from 'src/app/ng-emotion/types';

@Injectable()
export class EmotionStyler
{
	ngeProps = new Map<string, any>();
	ngeBindings = new Map<string, StyleBindingFn>();

	base: string;
}

@Component({ template: '' })
export class EmotionComponent<T extends EmotionStyler>
	implements OnInit, DoCheck, OnDestroy
{
	styles: T;
	protected ngeBindingValues = new Map<string, string>();
	protected ngeBindingChanges = new Map<string, [string, string]>();

	protected ngeShouldCheck = false;
	protected ngeHasChanges = false;

	protected onInit$ = new ReplaySubject<void>();
	protected onDestroy$ = new Subject<void>();

	constructor(
		public elementRef: ElementRef<HTMLElement>,
		styles: EmotionStyler,
	) {
		this.styles = styles as T;
	}

	ngOnInit(): void {
		this.ngeAddClass(this.styles.base);
		this.onInit$.next();
	}

	ngDoCheck(): void {
		if (this.ngeShouldCheck) {
			for (const [key, fn] of this.styles.ngeBindings.entries()) {
				const arg: any = this[key];
				const newValue = fn(arg);
				const currentValue = this.ngeBindingValues.get(key);

				if (newValue !== currentValue) {
					this.ngeHasChanges = true;
					this.ngeBindingChanges.set(key, [currentValue, newValue]);
				}
			}
			this.ngeShouldCheck = false;
		}

		if (this.ngeHasChanges) {
			this.ngeUpdateBindings();
		}
	}

	ngOnDestroy(): void {
		this.onDestroy$.next();
		this.onDestroy$.complete();
		this.onInit$.complete();
	}

	protected ngeMarkForCheck(): void {
		this.ngeShouldCheck = true;
	}

	protected ngeUpdateBindings(): void {
		if (this.elementRef?.nativeElement == null)
			return;

		for (const [key, [currentValue, newValue]] of this.ngeBindingChanges.entries()) {
			if (currentValue == null)
				this.ngeAddClass(newValue);
			else if (newValue == null)
				this.ngeRemoveClass(currentValue);
			else
				this.ngeReplaceClass(currentValue, newValue);

			this.ngeBindingValues.set(key, newValue);
		}

		this.ngeBindingChanges.clear();
		this.ngeHasChanges = false;
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
