// tslint:disable:member-ordering
import { Injectable } from '@angular/core';

import { css, EmotionStylesheet } from '@ng-emotion/core';

@Injectable()
export class AppStyles extends EmotionStylesheet {

	host = css`
		label: app;
		display: block;
	`;

}
