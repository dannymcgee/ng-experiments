export enum EaseIn {
	Sine  = 'cubic-bezier(0.12, 0, 0.39, 0)',
	Quad  = 'cubic-bezier(0.11, 0, 0.5,  0)',
	Cubic = 'cubic-bezier(0.12, 0, 0.39, 0)',
}
export enum EaseOut {
	Sine  = 'cubic-bezier(0.61, 1, 0.88, 1)',
	Quad  = 'cubic-bezier(0.5,  1, 0.89, 1)',
	Cubic = 'cubic-bezier(0.33, 1, 0.68, 1)',
}
export enum EaseInOut {
	Sine  = 'cubic-bezier(0.37, 0, 0.63, 1)',
	Quad  = 'cubic-bezier(0.45, 0, 0.55, 1)',
	Cubic = 'cubic-bezier(0.65, 0, 0.35, 1)',
}

export namespace Anim
{
	export enum Duration {
		Micro  =  67, //  2 frames @ 30fps
		Short  = 133, //  4 frames @ 30fps
		Medium = 200, //  6 frames @ 30fps
		Long   = 400, // 12 frames @ 30fps
	}

	/** Converts number of frames @ 30fps to ms */
	export function frameTime (frames: number): number {
		return frames / 30 * 1000;
	}
}
