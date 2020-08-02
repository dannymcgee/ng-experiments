import { UUID } from '../../core';
import { Alpha } from '../../css-utils';

export interface SplashGradientStop {
	offset: string;
	opacity: Alpha;
}

export interface Coords {
	x: number;
	y: number;
}

/** Represents the reference space for a set of coordinates. */
export enum CoordinateSpace {
	Viewport,
	/** Relative to an individual DOM element. */
	Local,
}

export interface Splash {
	id: UUID;
	origin: Coords;
	radius: number;
	_timer: number;
}
