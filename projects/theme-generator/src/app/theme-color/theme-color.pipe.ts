import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'shade',
	pure: true,
})
export class ThemeColorPipe implements PipeTransform {

	transform (shade: number): string {
		return Math
			.round(shade)
			.toFixed(0)
				.padStart(3, '0');
	}

}
