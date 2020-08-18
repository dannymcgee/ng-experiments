// tslint:disable:member-ordering newline-per-chained-call
import { Injectable } from '@angular/core';

import { css, EmotionStylesheet } from '@ng-emotion/core';
import { rem } from '@ng-emotion/utils';

interface GradientStyleProps {
	gradientStops?: number[];
}

@Injectable()
export class GradientStyles extends EmotionStylesheet {

	props: GradientStyleProps = {};

	host = css`
		label: gradient;
		display: block;
		width: 100%;
		height: 100%;
		border-radius: ${rem(4)};
		overflow: hidden;
	`;

}
