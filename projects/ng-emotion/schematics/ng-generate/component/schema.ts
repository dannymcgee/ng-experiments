import { Schema as ComponentSchema } from '@schematics/angular/component/schema';

export type Schema = Omit<
	ComponentSchema,
		'inlineStyle'|
		'viewEncapsulation'|
		'style'|
		'displayBlock'>;

// export interface Schema extends ComponentSchema {
// 	inlineStyle: undefined;
// 	viewEncapsulation: undefined;
// 	style: undefined;
// }
