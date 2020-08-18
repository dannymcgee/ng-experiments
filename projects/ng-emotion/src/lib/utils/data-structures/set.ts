export class ReducerSet<T> extends Set<T> {
	reduce<R> (
		callback: (acc: R, current: T, index: number) => R,
		defaultValue: R,
	): R {
		let i = 0;
		let result = defaultValue;

		for (let item of this) {
			result = callback(result, item, i);
			i++;
		}

		return result;
	}
}

export class ToggleSet<T> extends Set<T> {
	toggle (value: T): void {
		if (this.has(value))
			this.delete(value);
		else
			this.add(value);
	}
}
