import { Injectable } from '@angular/core';

import { css, EmotionStylesheet } from '../core';
import { Position } from '../theme';

@Injectable()
export class SplashStyles extends EmotionStylesheet {

	props: {
		blendMode: string;
	};

	readonly base = css`
		label: splash;
		display: block;
		${Position.absolute('fill')}
	`;

	get circle (): string {
		return css`
			opacity: 0;
			mix-blend-mode: ${this.props.blendMode};
		`;
	}

}
