import { ElementRef, OnDestroy, OnInit, Component } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Component({ template: '' })
export class EmotionComponent implements OnInit, OnDestroy {

	public styler: any;

	protected onInit$ = new ReplaySubject<void>();
	protected onDestroy$ = new Subject<void>();

	constructor(public elementRef: ElementRef<HTMLElement>) {}

	ngOnInit(): void {
		this.onInit$.next();
	}

	ngOnDestroy(): void {
		this.onDestroy$.next();
		this.onDestroy$.complete();
		this.onInit$.complete();
	}

}
