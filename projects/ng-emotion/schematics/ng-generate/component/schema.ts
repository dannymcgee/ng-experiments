import { Schema as ComponentSchema } from '@schematics/angular/component/schema';

interface EmotionSchema {
	/** When false, the OnInit implementation will be skipped. If explicitly set to true and combined with `minimal: true`, this setting overrides the `minimal` setting. */
	onInit?: boolean;
	/** When false, the OnDestroy implementation will be skipped. If explicitly set to true and combined with `minimal: true`, this setting overrides the `minimal` setting. */
	onDestroy?: boolean;
	/** When false, the constructor will be omitted. If explicitly set to true and combined with `minimal: true`, this setting overrides the `minimal` setting. */
	construct?: boolean;
	/** When true, the constructor, OnInit, and OnDestroy implementations will be skipped. Can be overridden by setting `onInit`, `onDestroy`, or `construct` to true individually. */
	minimal?: boolean;
	/** When true, `ng-emotion` dependencies are imported from source instead of installed package. For internal use. */
	internal?: boolean;
	/** Path to the `ng-emotion/core` module. For internal use. */
	emotionPath?: string;
}

export type Schema = EmotionSchema
		& Omit<ComponentSchema,
				'inlineStyle'
				|'viewEncapsulation'
				|'style'>;
