import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	HostBinding,
	OnDestroy,
	OnInit,
	Optional,
} from '@angular/core';

import { EmotionComponent, EmotionStylesheet, StyleModifier } from '../../../core';
import { FormFieldComponent } from '../form-field.component';
import { FormFieldLabel } from '../form-field.types';
import { LabelStyles } from './label.component.styles';
import { LabelState } from './label.types';

@Component({
	selector: '[nge-label]',
	templateUrl: './label.component.html',
	providers: [{
		provide: EmotionStylesheet,
		useClass: LabelStyles,
	}],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent
	extends EmotionComponent<LabelStyles>
	implements OnInit, OnDestroy, FormFieldLabel
{
	@HostBinding('attr.for') for?: string;

	@StyleModifier('state')
	private _state: LabelState = {};

	constructor (
		public elementRef: ElementRef,
		styles: EmotionStylesheet,
		@Optional() private _formField: FormFieldComponent<unknown>,
	) {
		super(elementRef, styles);
	}

	ngOnInit (): void {
		super.ngOnInit();

		if (this._formField)
			this._formField.registerLabel(this);
	}

	ngOnDestroy (): void {
		super.ngOnDestroy();
	}

	updateState (updates: Partial<LabelState>): void {
		this._state = {
			...this._state,
			...updates,
		};
	}
}
