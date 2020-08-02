import { coerceElement } from '@angular/cdk/coercion';
import { ElementRef, TrackByFunction } from '@angular/core';

import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { v1 as uuid } from 'uuid';

import { UUID } from '../core';
import { CoordinateSpace, Coords, Splash } from './splash.types';

export class SplashCollection implements Iterable<Splash> {

	get rect (): DOMRect|undefined {
		return this._rect;
	}

	private _updates$ = new Subject<void>();

	/** An observable that fires whenever an update happens which may require a re-check of the view */
	updates$: Observable<void> = this._updates$.asObservable();

	private _rect?: DOMRect;
	private _splashes = new Map<UUID, Splash>();
	private _triggerElement: HTMLElement;
	private _onDestroy$ = new Subject<void>();

	constructor (
		/** A new splash effect will be created whenever this element is clicked. */
		trigger: ElementRef<HTMLElement>|HTMLElement,
		/** Animation duration in ms. */
		public animDuration: number,
	) {
		this._triggerElement = coerceElement(trigger);

		fromEvent(this._triggerElement, 'mouseenter')
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(this.updateRect);

		fromEvent<MouseEvent>(this._triggerElement, 'mousedown')
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(this.createSplash);
	}

	*[Symbol.iterator] (): Iterator<Splash> {
		for (let splash of this._splashes.values())
			yield splash;
	}

	trackById: TrackByFunction<Splash> = (i: number, item: Splash) => item.id;

	/** This method can be called to explicitly re-measure the DOM Rect of the trigger element to account for changes due to resizing */
	updateRect = (): void => {
		this._rect = this._triggerElement.getBoundingClientRect();
		this._updates$.next();
	}

	/** This method must be called when the class instance is no longer needed in order to prevent memory leaks. */
	destroy (): void {
		this._onDestroy$.next();
		this._onDestroy$.complete();
		this._updates$.complete();

		for (let splash of this._splashes.values())
			clearTimeout(splash._timer);

		this._splashes.clear();
	}

	/**
	 * Create a new splash originating from the specified point.
	 *
	 * @param origin The origin point of the splash effect.
	 * @param coordSpace The CoordinateSpace of the passed origin point.
	 *
	 * @see CoordinateSpace
	 */
	createSplash = ({ x, y }: Coords, coordSpace = CoordinateSpace.Viewport): void => {
		if (this.rect === undefined)
			this.updateRect();

		const origin =
			coordSpace === CoordinateSpace.Local ? {
				x, y
			} : {
				x: x - this.rect.left,
				y: y - this.rect.top,
			};

		const radius = this._calculateRadius(origin);
		const id: UUID = uuid();
		const _timer = setTimeout(() => {
				this._removeSplash(id);
			}, this.animDuration + 10) as any;

		this._splashes.set(id, {
			id,
			origin,
			radius,
			_timer,
		});

		this._updates$.next();
	}

	private _removeSplash (id: UUID): void {
		this._splashes.delete(id);
		this._updates$.next();
	}

	/** Radius should be the distance between the origin and the furthest corner of the DOM rect so the effect always fills the entire element */
	private _calculateRadius ({ x, y }: Coords): number {
		const { width, height } = this.rect;
		const corners: Coords[] = [
			{ x: 0,     y: 0 },      // top left
			{ x: width, y: 0 },      // top right
			{ x: width, y: height }, // bottom right
			{ x: 0,     y: height }, // bottom left
		];

		return corners.reduce((prev, current) => {
			// distance = √ a² + b²
			const a = Math.abs(x - current.x);
			const b = Math.abs(y - current.y);
			const distance = Math.sqrt((a * a) + (b * b));

			// Return the largest distance
			return Math.max(distance, prev);
		}, 0);
	}

}
