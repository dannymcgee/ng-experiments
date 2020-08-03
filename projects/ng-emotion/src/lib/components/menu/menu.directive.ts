import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
	Directive,
	HostListener,
	Inject,
	Input,
	OnDestroy,
	TemplateRef,
} from '@angular/core';

import { fromEvent, merge, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

import { DropdownPanelComponent, DROPDOWN_PANEL_POSITIONS } from '../dropdown-panel';
import { Coords } from '../splash';

@Directive({
	selector: '[ngeContextMenu]',
})
export class ContextMenuDirective implements OnDestroy {

	@Input('ngeContextMenu') menuTemplate: TemplateRef<{}>;

	private _overlayRef?: OverlayRef;
	private _portal = new ComponentPortal(DropdownPanelComponent);
	private _onDestroy$ = new Subject<void>();

	constructor (
		@Inject(DOCUMENT) private document: Document,
		private overlay: Overlay,
	) {}

	ngOnDestroy (): void {
		this._onDestroy$.next();
		this._onDestroy$.complete();

		if (this._portal?.isAttached)
			this._portal.detach();

		this._overlayRef?.dispose();
	}

	@HostListener('contextmenu', ['$event'])
	open (event: MouseEvent|Coords): void {
		const { x, y }: Coords = event;

		if (event instanceof MouseEvent) {
			event.preventDefault();
			event.stopPropagation();
		}

		const positionStrategy = this.overlay.position()
			.flexibleConnectedTo({ x, y })
			.withPositions(DROPDOWN_PANEL_POSITIONS);

		this._overlayRef?.dispose();
		this._overlayRef = this.overlay.create({ positionStrategy });

		const dropdownPanel = this._portal.attach(this._overlayRef).instance;
		dropdownPanel.template = this.menuTemplate;

		const click$ = fromEvent<MouseEvent>(this.document, 'click');
		const esc$ = fromEvent<KeyboardEvent>(this.document, 'keydown')
				.pipe(filter((event) => event.key === 'Escape'));

		merge(click$, esc$)
			.pipe(take(1), takeUntil(this._onDestroy$))
			.subscribe(this.close);
	}

	close = (): void => {
		if (this._portal?.isAttached)
			this._portal.detach();
	}

}
