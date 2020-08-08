import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { EmotionStylesheet } from './classes';

describe('EmotionStylesheet', () => {

	const createService = createServiceFactory(EmotionStylesheet);
	let spectator: SpectatorService<EmotionStylesheet>;

	beforeEach(() => spectator = createService());

	it('should exist', () => {
		const stylesheet = spectator.service;

		expect(stylesheet)
			.toBeTruthy();
	});

	it('should have an empty `props` object', () => {
		const { props } = spectator.service;

		expect(props)
			.toBeTruthy();

		expect(Object.keys(props)?.length ?? undefined)
			.toEqual(0);
	});

	it('should have an empty `_ngeBindings` Map', () => {
		const { _ngeBindings } = spectator.service;

		expect(_ngeBindings)
			.toBeTruthy();

		expect(_ngeBindings)
			.toBeInstanceOf(Map);

		expect(_ngeBindings?.size ?? undefined)
			.toEqual(0);
	});

});
