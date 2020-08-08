import { Component } from '@angular/core';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';

import { ThemeColor } from '../../utils';
import { ButtonComponent } from './button.component';
import { ButtonModule } from './button.module';
import { ButtonVariant } from './button.types';

@Component({ template: '' })
class ButtonHostComponent {
	variant: ButtonVariant = 'primary';
	color: ThemeColor = 'primary';
	label = 'Button Label';
}

describe('ButtonComponent', () => {

	let spectator: SpectatorHost<ButtonComponent, ButtonHostComponent>;
	const createHost = createHostFactory({
		component: ButtonComponent,
		imports: [ButtonModule],
		declareComponent: false,
		host: ButtonHostComponent,
	});

	it('should project content passed into it', () => {
		spectator = createHost(`
			<button nge-btn>Button Label</button>
		`);
		const { element } = spectator;

		expect(element)
			.toHaveText('Button Label');
	});

	it('should have `cdk-focused` class when focused', () => {
		spectator = createHost(`
			<button nge-btn></button>
		`);
		const { element } = spectator;

		element.focus();
		spectator.detectChanges();

		expect(element)
			.toHaveClass('cdk-focused');
	});

	it('should set its `color` input as a stylesheet prop', () => {
		spectator = createHost(`
			<button nge-btn color="success"></button>
		`);

		const { component: button } = spectator;
		const { styles } = button;

		expect(styles.props.color)
			.toBeTruthy();

		expect(styles.props.color)
			.toEqual(button.color);

		expect(styles.props.color)
			.toEqual('success');
	});

	it('should get the correct `variant` class from its stylesheet', () => {
		spectator = createHost(`
			<button nge-btn="secondary"></button>
		`);
		const {
			component: button,
			element,
		} = spectator;
		const { styles } = button;

		const className = styles.variantSecondary;

		expect(element)
			.toHaveClass(className);
	});

	it('should dynamically update when its `variant` input is changed', () => {
		spectator = createHost(`
			<button [nge-btn]="variant"></button>
		`);
		const {
			component: button,
			hostComponent: host,
			element,
		} = spectator;
		const { styles } = button;

		expect(element)
			.toHaveClass(styles.variantPrimary);

		host.variant = 'secondary';
		spectator.detectChanges();

		expect(element)
			.toHaveClass(styles.variantSecondary);

		host.variant = 'tertiary';
		spectator.detectChanges();

		expect(element)
			.toHaveClass(styles.variantTertiary);
	});

	it('should dynamically update when its `color` input is changed', () => {
		spectator = createHost(`
			<button nge-btn="primary" [color]="color"></button>
		`);
		const {
			component: button,
			hostComponent: host,
			element,
		} = spectator;
		const { styles } = button;

		const initialClassName = styles.variantPrimary;

		expect(element)
			.toHaveClass(initialClassName);

		host.color = 'success';
		spectator.detectChanges();
		const newClassName = styles.variantPrimary;

		expect(newClassName).not
			.toEqual(initialClassName);

		expect(element)
			.not
			.toHaveClass(initialClassName);

		expect(element)
			.toHaveClass(newClassName);
	});

});
