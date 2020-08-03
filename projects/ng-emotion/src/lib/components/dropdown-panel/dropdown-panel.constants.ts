import { ConnectedPosition } from '@angular/cdk/overlay';

const DEFAULT_POSITION: ConnectedPosition = {
	originX: 'end',
	originY: 'bottom',
	overlayX: 'start',
	overlayY: 'top',
};
const FALLBACK_VERTICAL: Partial<ConnectedPosition> = {
	originY: 'top',
	overlayY: 'bottom',
};
const FALLBACK_HORIZONTAL: Partial<ConnectedPosition> = {
	originX: 'start',
	overlayX: 'end',
};

export const DROPDOWN_PANEL_POSITIONS = [{
	...DEFAULT_POSITION,
	panelClass: 'from-top-left',
}, {
	...DEFAULT_POSITION,
	...FALLBACK_VERTICAL,
	panelClass: 'from-bottom-left',
}, {
	...DEFAULT_POSITION,
	...FALLBACK_HORIZONTAL,
	panelClass: 'from-top-right',
}, {
	...FALLBACK_VERTICAL,
	...FALLBACK_HORIZONTAL,
	panelClass: 'from-bottom-right',
} as ConnectedPosition];
