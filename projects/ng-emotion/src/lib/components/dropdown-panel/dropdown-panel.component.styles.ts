// tslint:disable:member-ordering
import { Injectable } from '@angular/core';

import { css, EmotionStylesheet } from '../../core';
import { Colors, rem } from '../../utils';

@Injectable()
export class DropdownPanelStyles extends EmotionStylesheet {

	host = css`
		label: dropdown-panel;
		display: block;
		height: max-content;
		padding: ${rem(8)} 0;
		background: ${Colors.theme('background', 100, 0.9)};
		border-radius: 4px;
		overflow: hidden;
		backdrop-filter: blur(12px);
		box-shadow:
			0 1px 4px rgba(0,0,0,0.1),
			0 8px 24px rgba(0,0,0,0.1);

		.from-top-left &     { transform-origin:   0    0 }
		.from-top-right &    { transform-origin: 100%   0 }
		.from-bottom-right & { transform-origin: 100% 100% }
		.from-bottom-left &  { transform-origin:   0  100% }
	`;

}
