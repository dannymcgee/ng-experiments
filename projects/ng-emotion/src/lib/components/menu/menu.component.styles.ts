// tslint:disable:member-ordering
import { Injectable } from '@angular/core';

import { css, EmotionStylesheet } from '../../core';
import { Colors } from '../../utils';
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

		hr {
			width: 100%;
			height: 1px;
			border: 0;
			background: rgba(0,0,0,0.1);
		}
	`;
	role (menuRole: MenuRole): string|null {
		return menuRole === 'navigation'
				? this.navMenu
				: this.actionMenu;
	}

	// actionMenuPanel = css`
	// 	label: menu__action-menu-panel;
	// 	height: max-content;
	// 	overflow: hidden;
	// `;
}
