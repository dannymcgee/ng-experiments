import createEmotion from 'create-emotion';

export * from './classes';
export * from './decorators';

const emotion = createEmotion({
	key: 'nge',
});

export const {
	flush,
	hydrate,
	cx,
	merge,
	getRegisteredStyles,
	injectGlobal,
	keyframes,
	css,
	sheet,
	cache,
} = emotion;
