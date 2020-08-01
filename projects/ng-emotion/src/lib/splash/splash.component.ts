import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	Input,
	OnInit
} from '@angular/core';

import { v1 as uuid } from 'uuid';

import { EmotionComponent, EmotionStylesheet, StyleProp } from '../core';
import { Alpha, ColorShade, ThemeColor } from '../theme';
import { splashCircle } from './splash.animation';
import { SplashStyles } from './splash.component.styles';
import { SPLASH_GRADIENT_STOPS } from './splash.constants';
import { Coords } from './splash.types';

@Component({
	selector: 'nge-splash',
	templateUrl: './splash.component.html',
	providers: [{
		provide: EmotionStylesheet,
		useClass: SplashStyles,
	}],
	animations: [splashCircle],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplashComponent
	extends EmotionComponent<SplashStyles> implements OnInit
{
	@Input() origin: Coords;
	@Input() rect: DOMRect;
	@Input() color: ThemeColor;
	@Input() shade: ColorShade;
	@Input() baseOpacity: Alpha;

	@StyleProp()
	@Input() blendMode: string;

	@HostBinding('attr.aria-hidden')
	ariaHidden = 'true';

	readonly stops = SPLASH_GRADIENT_STOPS;
	readonly id = uuid();
	radius?: number;

	ngOnInit (): void {
		super.ngOnInit();

		if (!this.rect || !this.origin) {
			console.error(
					'SplashComponent missing a `rect` or `origin`!',
					this.elementRef.nativeElement
				);
			throw new Error();
		}

		this.radius = this._calculateRadius();
	}

	/** Radius should be the distance between the click origin and the furthest corner of the DOM rect so the effect always fills the entire element */
	private _calculateRadius (): number {
		const { width, height } = this.rect;
		const corners: Coords[] = [
			{ x: 0,     y: 0 },      // top left
			{ x: width, y: 0 },      // top right
			{ x: width, y: height }, // bottom right
			{ x: 0,     y: height }, // bottom left
		];

		return corners.reduce((prev, current) => {
			// distance = √ a² + b²
			const a = Math.abs(this.origin.x - current.x);
			const b = Math.abs(this.origin.y - current.y);
			const distance = Math.sqrt((a * a) + (b * b));

			// Return the largest distance
			return Math.max(distance, prev);
		}, 0);
	}
}
