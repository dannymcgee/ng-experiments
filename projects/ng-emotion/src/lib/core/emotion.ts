import createEmotion from 'create-emotion';

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
