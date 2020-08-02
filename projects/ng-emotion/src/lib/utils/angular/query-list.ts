import { QueryList } from '@angular/core';
import { Observable, PartialObserver, Subject, Subscription } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

export class DynamicQueryList<T> {

	private _queryList$ = new Subject<QueryList<T>>();
	private _onDestroy$ = new Subject<void>();

	constructor (
		private queryList: QueryList<T>,
	) {
		queryList.changes
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(this._onChanges);
	}

	observe (): Observable<QueryList<T>> {
		return this._queryList$.pipe(startWith(this.queryList));
	}

	subscribe (next: (value: QueryList<T>) => void): Subscription {
		return this.observe()
				.subscribe(next);
	}

	destroy (): void {
		this._onDestroy$.next();
		this._onDestroy$.complete();
		this._queryList$.complete();
	}

	private _onChanges = (changes: QueryList<T>): void => {
		this._queryList$.next(changes);
	}

}
