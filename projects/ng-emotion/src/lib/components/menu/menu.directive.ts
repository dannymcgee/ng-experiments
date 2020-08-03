import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import {
	Directive,
	HostListener,
	Inject,
	Input,
	OnDestroy,
	TemplateRef,
	ViewContainerRef,
} from '@angular/core';

import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { fromEvent, merge, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { Coords } from '../splash';

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

@Directive({
	selector: '[ngeContextMenu]',
})
export class ContextMenuDirective implements OnDestroy {

	@Input('ngeContextMenu') menu: TemplateRef<{}>;

	private _isOpen: boolean;
	private _overlayRef?: OverlayRef;
	private _portal?: TemplatePortal;
	private _onDestroy$ = new Subject<void>();

	constructor (
		@Inject(DOCUMENT) private document: Document,
		private overlay: Overlay,
		private viewContainerRef: ViewContainerRef,
	) {}

	ngOnDestroy (): void {
		this._onDestroy$.next();
		this._onDestroy$.complete();
		if (this._portal?.isAttached)
			this._portal.detach();
		this._overlayRef?.dispose();
	}

	@HostListener('contextmenu', ['$event'])
	open (event: MouseEvent): void {
		if (this._isOpen) this.close();

		const { x, y }: Coords = event;
		event.preventDefault();
		event.stopPropagation();

		const positionStrategy = this.overlay.position()
			.flexibleConnectedTo({ x, y })
			.withPositions([{
				...DEFAULT_POSITION,
			}, {
				...DEFAULT_POSITION,
				...FALLBACK_VERTICAL,
			}, {
				...DEFAULT_POSITION,
				...FALLBACK_HORIZONTAL,
			}, {
				...FALLBACK_VERTICAL,
				...FALLBACK_HORIZONTAL,
			} as ConnectedPosition]);

		this._overlayRef = this.overlay.create({ positionStrategy });

		if (!this._portal)
			this._portal = new TemplatePortal(this.menu, this.viewContainerRef);
		this._portal.attach(this._overlayRef);
		this._isOpen = true;

		const click$ = fromEvent(this.document, 'click');
		const esc$ = fromEvent<KeyboardEvent>(this.document, 'keydown')
				.pipe(filter((event) => event.key === 'Escape'));

		merge(click$, esc$)
			.pipe(
					take(1),
					takeUntil(this._onDestroy$),
				)
			.subscribe(this.close);
	}

	close = (): void => {
		if (this._portal?.isAttached)
			this._portal.detach();
		this._overlayRef?.dispose();
		this._isOpen = false;
	}

}
