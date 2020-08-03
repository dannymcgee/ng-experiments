import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostBinding,
	OnDestroy,
	OnInit,
	TemplateRef,
} from '@angular/core';

import { EmotionComponent, EmotionStylesheet } from '../../core';
import { dropdownPanel } from './dropdown-panel.animations';
import { DropdownPanelStyles } from './dropdown-panel.component.styles';

@Component({
	templateUrl: './dropdown-panel.component.html',
	providers: [{
		provide: EmotionStylesheet,
		useClass: DropdownPanelStyles,
	}],
	animations: [dropdownPanel],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownPanelComponent
	extends EmotionComponent<DropdownPanelStyles>
	implements OnInit, OnDestroy
{
	@HostBinding('@dropdownPanel') hostAnimation = true;

	get template (): TemplateRef<any> { return this._template; }
	set template (value: TemplateRef<any>) {
		this._template = value;
		this.changeDetectorRef.detectChanges();
	}
	private _template: TemplateRef<any>;

	constructor (
		public elementRef: ElementRef,
		styles: EmotionStylesheet,
		private changeDetectorRef: ChangeDetectorRef,
	) {
		super(elementRef, styles);
	}

	ngOnInit (): void {
		super.ngOnInit();
	}

	ngOnDestroy (): void {
		super.ngOnDestroy();
	}
}
