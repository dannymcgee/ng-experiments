import { Injectable } from '@angular/core';

import { css, EmotionStylesheet } from '../../core';
import { BlendMode, Position } from '../../utils';

export interface SplashStyleProps {
	blendMode?: BlendMode;
}

@Injectable()
export class SplashStyles extends EmotionStylesheet {

	props: SplashStyleProps = {};

	readonly host = css`
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
