import { Alpha, ElementId } from '../../utils';

export interface SplashGradientStop {
	offset: string;
	opacity: Alpha;
}

// FIXME: This should be extracted to some sort of common module
export interface Coords {
	x: number;
	y: number;
}

// FIXME: This should be extracted to some sort of common module
/** Represents the reference space for a set of coordinates. */
export enum CoordinateSpace {
	Viewport,
	/** Relative to an individual DOM element. */
	Local,
}

export interface Splash {
	id: ElementId;
	origin: Coords;
	radius: number;
	_timer: number;
}
