import { strings } from '@angular-devkit/core';
import {
	apply,
	chain,
	FileOperator,
	filter,
	forEach,
	mergeWith,
	move,
	noop,
	renameTemplateFiles,
	Rule,
	SchematicsException,
	template,
	Tree,
	url,
} from '@angular-devkit/schematics';
import { addDeclarationToModule, addExportToModule } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import { buildRelativePath, findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { applyLintFix } from '@schematics/angular/utility/lint-fix';
import { parseName } from '@schematics/angular/utility/parse-name';
import { validateHtmlSelector, validateName } from '@schematics/angular/utility/validation';
import { buildDefaultPath, getWorkspace } from '@schematics/angular/utility/workspace';
import * as ts from 'typescript';
import { Schema as EmotionComponentSchema } from './schema';

function buildSelector (
	{ name, prefix }: EmotionComponentSchema,
	projectPrefix: string
	): string
{
	const kebab = strings.dasherize(name);

	return (!!prefix)
		? `${prefix}-${kebab}`
		: (prefix == null && !!projectPrefix)
			? `${projectPrefix}-${kebab}`
			: kebab;
}

function readIntoSourceFile (host: Tree, modulePath: string): ts.SourceFile {
	const text = host.read(modulePath);

	if (text === undefined)
		throw new SchematicsException(`File ${modulePath} does not exist.`);
	const sourceText = text.toString('utf-8');

	return ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
}

function addDeclarationToNgModule (options: EmotionComponentSchema): Rule {
	return (host: Tree): Tree => {
		if (options.skipImport || !options.module) {
			return host;
		}

		const modulePath = options.module;
		const source = readIntoSourceFile(host, modulePath);

		const componentPath = `/${options.path}/`
				+ (options.flat ? '' : strings.dasherize(options.name) + '/')
				+ strings.dasherize(options.name)
				+ (options.type ? '.' : '')
				+ strings.dasherize(options.type);
		const relativePath = buildRelativePath(modulePath, componentPath);
		const className = strings.classify(options.name) + strings.classify(options.type);

		const declarationRecorder = host.beginUpdate(modulePath);
		const declarationChanges = addDeclarationToModule(
				source,
				modulePath,
				className,
				relativePath);

		for (const change of declarationChanges)
			if (change instanceof InsertChange)
				declarationRecorder.insertLeft(change.pos, change.toAdd);

		host.commitUpdate(declarationRecorder);

		if (options.export) {
			// Need to refresh the AST because we overwrite the file in the host
			const updatedSource = readIntoSourceFile(host, modulePath);

			const exportRecorder = host.beginUpdate(modulePath);
			const exportChanges = addExportToModule(
					updatedSource,
					modulePath,
					className,
					relativePath);

			for (const change of exportChanges)
				if (change instanceof InsertChange)
					exportRecorder.insertLeft(change.pos, change.toAdd);

			host.commitUpdate(exportRecorder);
		}

		return host;
	};
}

/**
 * Mutates the `onInit`, `onDestroy`, and `construct` options to configure them to the correct settings for user selections.
 */
function configureBoilerplateOptions (options: EmotionComponentSchema): void {
	const boilerplateOptions = ['onInit', 'onDestroy', 'construct'];

	for (const optionName of boilerplateOptions) {
		options[optionName] =
				(options.minimal && options[optionName] === true)
				|| (!options.minimal && options[optionName] !== false);
	}
}

function debugLog (message: string): Rule {
	return (host: Tree): Tree => {
		// tslint:disable:no-console
		console.log('');
		console.log(`----- ${message} -----`);
		console.log(host);
		console.log(`----- /${message} -----`);
		console.log('');
		// tslint:disable:no-console

		return host;
	};
}

export default function (options: EmotionComponentSchema): Rule {
	return async (host: Tree): Promise<Rule> => {
		const workspace = await getWorkspace(host);
		const project = workspace.projects.get(options.project);

		if (options.path == null && !!project)
			options.path = buildDefaultPath(project);

		options.module = findModuleFromOptions(host, options);

		const parsed = parseName(options.path, options.name);
		options.name = parsed.name;
		options.path = parsed.path;
		options.selector = options.selector || buildSelector(options, project?.prefix ?? '');

		validateName(options.name);
		validateHtmlSelector(options.selector);

		configureBoilerplateOptions(options);

		options.type = options.type ?? 'Component';

		const templateSource = apply(url('./files'), [
			options.skipTests
				? filter((path) => !path.endsWith('.spec.ts.template'))
				: noop(),
			options.inlineTemplate
				? filter((path) => !path.endsWith('.html.template'))
				: noop(),
			template({
					...options,
					'if-flat': (str: string) => options.flat ? '' : str,
					...strings,
				}),
			renameTemplateFiles(),
			!options.type ? forEach(((file) => {
				if (!!file.path.match(new RegExp('..'))) {
					return {
						content: file.content,
						path: file.path.replace('..', '.'),
					};
				} else {
					return file;
				}
			}) as FileOperator) : noop(),
			move(parsed.path),
		]);

		return chain([
			addDeclarationToNgModule(options),
			mergeWith(templateSource),
			options.lintFix ? applyLintFix(options.path) : noop(),
		]);
	};
}
