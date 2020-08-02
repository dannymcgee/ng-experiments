import { css, cx } from '../../core';

export namespace Position
{
	type Type = 'relative'|'absolute'|'fixed'|'sticky';
	type Offset = string|number;
	type Offsets = [
		Offset|undefined,
		Offset|undefined,
		Offset|undefined,
		Offset|undefined,
	];

	const OFFSET_KEYS = ['top', 'right', 'bottom', 'left'];

	export function relative (offsets: Offsets): string {
		return _position('relative', offsets);
	}

	export function absolute (offsets: Offsets|'fill'): string {
		if (offsets === 'fill')
			return _position('absolute', [0, 0, 0, 0]);

		return _position('absolute', offsets);
	}

	export function fixed (offsets: Offsets): string {
		return _position('fixed', offsets);
	}

	export function sticky (offsets: Offsets): string {
		return _position('sticky', offsets);
	}

	function _position (type: Type, offsets: Offsets): string {
		return css`
			position: ${type};
			${_offsets(offsets)}
		`;
	}

	function _offsets (offsets: Offsets): string {
		const classNames: string[] = offsets.reduce<string[]>((result, current, i) => {
			if (current != null) {
				const key = OFFSET_KEYS[i];
				const value = typeof current === 'number'
						? current + (current === 0 ? '' : 'px')
						: current;

				result.push(css({ [key]: value }));
			}

			return result;
		}, []);

		return cx(...classNames);
	}
}
