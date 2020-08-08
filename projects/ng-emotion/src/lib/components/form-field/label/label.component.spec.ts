import { Component } from '@angular/core';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';

import { FormFieldModule } from '../form-field.module';
import { LabelComponent } from './label.component';

@Component({ template: '' })
class LabelHostComponent {}

describe('LabelComponent', () => {

	let spectator: SpectatorHost<LabelComponent, LabelHostComponent>;

	const createHost = createHostFactory({
		component: LabelComponent,
		imports: [FormFieldModule],
		declareComponent: false,
		host: LabelHostComponent,
	});

	beforeEach(() => {
		spectator = createHost(`
			<label nge-label>Label Text</label>
		`);
	});

	it('should project content passed into it', () => {
		const { element } = spectator;

		expect(element)
			.toHaveText('Label Text');
	});

	it('should bind the value of its `for` property to its host element', () => {
		const {
			component: label,
			element,
		} = spectator;

		label.for = 'test-for-value';
		spectator.detectChanges();

		expect(element)
			.toHaveAttribute('for', 'test-for-value');
	});

	it('should get a new class when its `focused` state changes', () => {
		const {
			component: label,
			element,
		} = spectator;
		const { styles } = label;

		const defaultStateClass = styles.state({});
		const focusedStateClass = styles.state({ focused: true });

		expect(defaultStateClass)
			.toBeTruthy();
		expect(focusedStateClass)
			.toBeTruthy();
		expect(defaultStateClass)
			.not
			.toEqual(focusedStateClass);

		expect(element)
			.toHaveClass(defaultStateClass);
		expect(element)
			.not
			.toHaveClass(focusedStateClass);

		label.updateState({ focused: true });
		spectator.detectChanges();

		expect(element)
			.toHaveClass(focusedStateClass);
		expect(element)
			.not
			.toHaveClass(defaultStateClass);
	});

});
