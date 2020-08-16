export * from './angular';
export * from './css';
export * from './data-structures';
export * from './dom';

export function lerp (a: number, b: number, alpha: number): number {
	return (1 - alpha) * a + alpha * b;
}
