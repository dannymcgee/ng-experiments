import { Injectable } from '@angular/core';

import { css, EmotionStylesheet } from '../../core';
import { Colors } from '../../utils';
import { MenuRole } from './menu.types';

@Injectable()
export class MenuStyles extends EmotionStylesheet {
	base = css`
		label: menu;
		display: block;
	`;

	role (menuRole: MenuRole): string|null {
		if (menuRole === MenuRole.Navigation)
			return css`border-right: 2px solid ${Colors.theme('background', 300)};`;

		return null;
	}
}
