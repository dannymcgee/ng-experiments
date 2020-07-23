import { Injectable } from '@angular/core';
import { EmotionStylesheet, css } from 'ng-emotion';

@Injectable()
export class <%= classify(name) %>Styles extends EmotionStylesheet
{
	base = css`
		label: <%= dasherize(name) %>;
		display: block;
	`;
}