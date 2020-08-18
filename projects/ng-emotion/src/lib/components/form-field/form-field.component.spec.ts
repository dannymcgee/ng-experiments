import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';

import { TextFieldComponent, TextFieldModule } from '../text-field';
import { FormFieldComponent } from './form-field.component';
import { FormFieldModule } from './form-field.module';
import { LabelComponent } from './label';

@Component({})
class FormFieldHostComponent {}

describe('Form Field', () => {

	let spectator: SpectatorHost<FormFieldComponent<any>, FormFieldHostComponent>;
	const createHost = createHostFactory({
		component: FormFieldComponent,
		imports: [
			FormsModule,
			FormFieldModule,
			TextFieldModule,
		],
		declareComponent: false,
		host: FormFieldHostComponent,
	});

	it('should project content passed into it', () => {
		spectator = createHost(`
			<nge-form-field>Test Content</nge-form-field>
		`);
		const { element } = spectator;

		expect(element)
			.toHaveText('Test Content');
	});

	describe('with Label and Form Control', () => {

		test('Label should register itself with Form Field', () => {
			spectator = createHost(`
				<nge-form-field>
					<label nge-label>Test Label</label>
				</nge-form-field>
			`);
			const { component: formField } = spectator;
			const label = spectator.query(LabelComponent)!;

			const registerLabelSpy = spyOn(formField, 'registerLabel');

			label.ngOnInit();

			expect(registerLabelSpy)
				.toHaveBeenCalledWith(label);
		});

		test('Form Control should register itself with Form Field', () => {
			spectator = createHost(`
				<nge-form-field>
					<input nge-text-field />
				</nge-form-field>
			`);
			const { component: formField } = spectator;
			const textField = spectator.query(TextFieldComponent)!;
			const registerFormControlSpy = spyOn(formField, 'registerFormControl');

			textField.ngOnInit();

			expect(registerFormControlSpy)
				.toHaveBeenCalledWith(textField);
		});

		test('Form Control and Label should have linked `id`/`for` attributes', () => {
			spectator = createHost(`
				<nge-form-field>
					<label nge-label>Test Label</label>
					<input nge-text-field />
				</nge-form-field>
			`);
			const labelElement = spectator.query('label[nge-label]')!;
			const inputElement = spectator.query('input[nge-text-field]')!;

			expect(inputElement)
				.toHaveAttribute('id');
			expect(labelElement)
				.toHaveAttribute('for');
			expect(labelElement.getAttribute('for'))
				.toEqual(inputElement.getAttribute('id'));
		});

		test('Auto-generated `id`/`for` attributes should be overridable by consumer', () => {
			spectator = createHost(`
				<nge-form-field>
					<label nge-label>Test Label</label>
					<input nge-text-field
						id="my-overridden-id"
					/>
				</nge-form-field>
			`);
			const inputElement = spectator.query('input[nge-text-field]')!;
			const labelElement = spectator.query('label[nge-label]')!;

			spectator.detectChanges();

			expect(inputElement.getAttribute('id'))
				.toEqual('my-overridden-id');
			expect(labelElement.getAttribute('for'))
				.toEqual('my-overridden-id');
		});

		test('Form Field should update Label\'s `focused` state when Form Control focus changes',
			() => {
				spectator = createHost(`
					<nge-form-field>
						<label nge-label>Test Label</label>
						<input nge-text-field />
					</nge-form-field>
				`);
				const label = spectator.query(LabelComponent)!;
				const inputElement = spectator.query<HTMLInputElement>('input[nge-text-field]')!;

				const updateStateSpy = spyOn(label, 'updateState');

				inputElement.focus();
				spectator.detectChanges();

				expect(updateStateSpy)
					.toHaveBeenCalledTimes(1);
				expect(updateStateSpy)
					.toHaveBeenCalledWith({ focused: true });

				inputElement.blur();
				spectator.detectChanges();

				expect(updateStateSpy)
					.toHaveBeenCalledTimes(2);
				expect(updateStateSpy)
					.toHaveBeenLastCalledWith({ focused: false });
			});

	});

});
