import { DOCUMENT } from '@angular/common';
import {
	Directive,
	ElementRef,
	EventEmitter,
	HostListener,
	Inject,
	Input,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';

import { animationFrameScheduler, fromEvent, merge, Observable, Subject } from 'rxjs';
import { first, shareReplay, take, takeUntil, throttleTime } from 'rxjs/operators';

import { css } from '../../core';
import { Position } from '../../utils';
import { Coords } from '../splash';

@Directive({
	selector: '[ngeHueRotator]',
})
export class ColorPickerHueRotatorDirective implements OnInit, OnDestroy {

	@Input('ngeHueRotator')
	set hue (value: number) {
		this._hue = value;
		this._updateRotation();
	}
	private _hue: number;

	@Output('ngeHueRotatorChange')
	hueChange = new EventEmitter<number>();

	private _rect?: DOMRect;
	private _center?: Coords;
	private _onDestroy$ = new Subject<void>();
	private _mousedown$: Observable<MouseEvent>;
	private _mouseup$: Observable<MouseEvent>;
	private _mousemove$: Observable<MouseEvent>;
	private _mouseleave$: Observable<MouseEvent>;

	private _grabbingClass = css`
		position: relative;

		&::after {
			content: '';
			${Position.absolute('fill')};
			z-index: 5000;
			cursor: pointer !important;
		}
	`;

	constructor (
		private _elementRef: ElementRef<HTMLElement>,
		@Inject(DOCUMENT) private document: Document,
	) {}

	ngOnInit (): void {
		const { nativeElement: element } = this._elementRef;

		if (element != null) {
			this._mousedown$ = fromEvent<MouseEvent>(element, 'mousedown');
			this._mouseup$ = fromEvent<MouseEvent>(this.document.body, 'mouseup');
			this._mousemove$ = fromEvent<MouseEvent>(this.document.body, 'mousemove');
			this._mouseleave$ = fromEvent<MouseEvent>(this.document.body, 'mouseleave');

			this._mousedown$
				.pipe(takeUntil(this._onDestroy$))
				.subscribe(this._onMouseDown);
		}
	}

	ngOnDestroy (): void {
		this._onDestroy$.next();
		this._onDestroy$.complete();
	}

	@HostListener('mouseenter')
	onMouseEnter (): void {
		if (this._rect === undefined) {
			this._rect = this._elementRef.nativeElement?.getBoundingClientRect();

			const { width, height } = this._rect;

			this._center = {
				x: width / 2,
				y: height / 2,
			};
		}
	}

	private _onMouseDown = (event: MouseEvent): void => {
		event.preventDefault();
		event.stopPropagation();
		this._emitNewHue(event);

		this.document.body.classList.add(this._grabbingClass);

		const stopEvents$ = merge(
				this._mouseup$,
				this._mouseleave$,
				this._onDestroy$,
			)
			.pipe(shareReplay({ bufferSize: 1, refCount: true }));

		stopEvents$
			.pipe(first())
			.subscribe(() => {
				this.document.body.classList.remove(this._grabbingClass);
			});

		this._mousemove$
			.pipe(
				throttleTime(0, animationFrameScheduler),
				takeUntil(stopEvents$),
			)
			.subscribe(this._emitNewHue);

		this._mouseup$
			.pipe(
				take(1),
				takeUntil(this._onDestroy$),
			)
			.subscribe(this._emitNewHue);
	}

	private _emitNewHue = (event: MouseEvent): void => {
		const rotation = this._calcRotation(event);

		if (rotation !== this._hue)
			this.hueChange.emit(rotation);
	}

	private _calcRotation ({ x, y }: Coords): number {
		const { x: xCenter, y: yCenter } = this._center;
		const xClick = x - this._rect.left;
		const yClick = y - this._rect.top;

		const angle = Math.atan2(xClick - xCenter, yClick - yCenter) * -180 / Math.PI + 180;

		return Math.round(angle);
	}

	private _updateRotation (): void {
		const { nativeElement: element } = this._elementRef;

		if (element != null)
			element.style.setProperty('transform', `rotate(${this._hue}deg)`);
	}

}
