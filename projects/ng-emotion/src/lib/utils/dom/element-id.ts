/** Represents a string for use as a DOM element's `id` attribute */
export type ElementId = string;

export function elementId (prefix?: string): string {
	const pre = prefix ?? random();

	return `${pre}-${random()}`;
}

function random (): string {
	return Math.round(Math.random() * Date.now())
			.toString(16);
}
