// tslint:disable:member-ordering;
import { Injectable } from '@angular/core';

import { css, EmotionStylesheet } from '../../core';
import { Colors, rem } from '../../utils';
import { MenuRole } from './menu.types';

@Injectable()
export class MenuStyles extends EmotionStylesheet {
	host = css`
		label: menu;
		display: block;
	`;

	navMenu = css`
		label: menu--navigation;
		border-right: 2px solid ${Colors.theme('background', 300)};
	`;
	actionMenu = css`
		label: menu--action-menu;
		height: max-content;
		padding: ${rem(8)} 0;
		background: ${Colors.theme('background', 100, 0.875)};
		border-radius: 3px;
		overflow: hidden;
		transform-origin: 0 0;
		backdrop-filter: blur(16px);
		box-shadow:
			0 1px 4px rgba(0,0,0,0.1),
			0 8px 24px rgba(0,0,0,0.1);

		hr {
			width: 100%;
			height: 1px;
			border: 0;
			background: rgba(0,0,0,0.1);
		}
	`;

	actionMenuPanel = css`
		label: menu__action-menu-panel;
		height: max-content;
		overflow: hidden;
	`;
	role (menuRole: MenuRole): string|null {
		return menuRole === 'navigation'
				? this.navMenu
				: this.actionMenu;
	}
}
