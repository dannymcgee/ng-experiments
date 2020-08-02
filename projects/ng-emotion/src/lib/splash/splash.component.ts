import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostBinding,
	Input,
	OnDestroy,
	OnInit,
} from '@angular/core';

import { v1 as uuid } from 'uuid';

import { takeUntil } from 'rxjs/operators';
import { EmotionComponent, EmotionStylesheet, StyleProp, UUID } from '../core';
import { Alpha, Anim, BlendMode, ColorShade, ThemeColor } from '../css-utils';
import { splash } from './splash.animation';
import { SplashCollection } from './splash.collection';
import { SplashStyles } from './splash.component.styles';
import { SPLASH_GRADIENT_STOPS } from './splash.constants';

@Component({
	selector: 'nge-splash-host',
	templateUrl: './splash.component.html',
	providers: [{
		provide: EmotionStylesheet,
		useClass: SplashStyles,
	}],
	animations: [splash],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplashHostComponent
	extends EmotionComponent<SplashStyles>
	implements OnInit, OnDestroy
{
	@Input() trigger: ElementRef<HTMLElement>|HTMLElement;
	@Input() color: ThemeColor;
	@Input() shade: ColorShade;
	@Input() baseOpacity: Alpha;

	@StyleProp()
	@Input() blendMode: BlendMode;

	@HostBinding('attr.aria-hidden')
	ariaHidden = 'true';

	splashes: SplashCollection;

	readonly stops = SPLASH_GRADIENT_STOPS;
	readonly gradientId: UUID = uuid();

	constructor (
		public elementRef: ElementRef<HTMLElement>,
		styles: EmotionStylesheet,
		private changeDetectorRef: ChangeDetectorRef,
	) {
		super(elementRef, styles);
	}

	ngOnInit (): void {
		super.ngOnInit();

		// TODO: Make animation duration configurable
		this.splashes = new SplashCollection(this.trigger, Anim.Duration.Long);
		this.splashes.updates$
			.pipe(takeUntil(this.onDestroy$))
			.subscribe(() => {
					this.changeDetectorRef.markForCheck();
				});
	}

	ngOnDestroy (): void {
		super.ngOnDestroy();

		this.splashes.destroy();
	}
}
