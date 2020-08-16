export class ToggleSet<T> extends Set<T> {
	toggle (value: T): void {
		if (this.has(value))
			this.delete(value);
		else
			this.add(value);
	}
}
