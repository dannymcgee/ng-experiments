import { css } from 'emotion';

export class Mixins {

	public static transition(...properties: string[]): string {
		const transitionProperties = properties.join(', ');

		return css`
			transition-property: ${transitionProperties};
			transition-duration: 100ms;
			transition-timing-function: linear;
		`;
	}

}
