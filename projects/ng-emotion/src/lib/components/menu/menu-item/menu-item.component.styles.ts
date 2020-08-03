// tslint:disable:member-ordering
import { Injectable } from '@angular/core';

import { css, EmotionStylesheet } from '../../../core';
import { Colors, Mixins, Position, rem } from '../../../utils';
import { MenuItemRole, MenuItemSize } from './menu-item.types';

@Injectable()
export class MenuItemStyles extends EmotionStylesheet {

	base = css`
		label: menu-item;
		${Mixins.buttonLike()};
		width: 100%;

		.border-frame {
			${Position.absolute([0, -2, 0, 0])};
			border-right: 2px solid;
			border-color: inherit;
		}
	`;

	baseState = css`
		label: menu-item--base;
		background: transparent;
		border-color: transparent;
		color: inherit;

		&:hover {
			background: ${Colors.theme('background', 200)};
		}
		&:active {
			background: ${Colors.theme('background', 300)};
		}
	`;
	activeState = css`
		label: menu-item--active;
		background: ${Colors.primary(100, 0.0625)};
		border-color: ${Colors.primary(100)};
		color: ${Colors.primary(300)};

		&:hover {
			background: ${Colors.primary(100, 0.125)};
			color: ${Colors.primary(400)};
		}
		&:active {
			background: ${Colors.primary(100, 0.25)};
			color: ${Colors.primary(500)};
		}
	`;
	active (isActive: boolean): string {
		return (!isActive || this.props.role === MenuItemRole.MenuItem)
				? this.baseState
				: this.activeState;
	}

	sizeSmall = css`
		height: ${rem(32)};
		padding: 0 ${rem(18)};
	`;
	sizeStandard = css`
		height: ${rem(36)};
		padding: 0 ${rem(24)};
	`;
	sizeLarge = css`
		height: ${rem(48)};
		padding: 0 ${rem(32)};
	`;
	size (value: MenuItemSize): string {
		switch (value) {
			case MenuItemSize.Small    : return this.sizeSmall;
			case MenuItemSize.Standard : return this.sizeStandard;
			case MenuItemSize.Large    : return this.sizeLarge;
			default                    : return this.sizeStandard;
		}
	}

	navLink = css`
		label: menu-item--nav-link;
		font-weight: 600;
	`;
	menuAction = css`
		label: menu-item--action;
		font-weight: 500;
		padding-right: 72px;
	`;
	role (value: MenuItemRole): string|null {
		this.props.role = value;

		switch (value) {
			case MenuItemRole.Link     : return this.navLink;
			case MenuItemRole.MenuItem : return this.menuAction;
			default                    : return this.navLink;
		}
	}

	label = css`
		label: menu-item__label;
		position: relative;
		z-index: 2;
	`;

	splashHost = css`
		label: menu-item__splash-host;
		z-index: 1;
	`;

}
