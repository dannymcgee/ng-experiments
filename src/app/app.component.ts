import { Component, HostBinding } from '@angular/core';
import { appBase } from './app.component.styles';

@Component({
	selector: 'x-root',
	templateUrl: './app.component.html',
})
export class AppComponent {

	@HostBinding('class') hostClass = appBase;

}
