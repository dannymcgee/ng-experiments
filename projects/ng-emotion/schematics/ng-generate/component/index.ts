import { Rule, SchematicContext, Tree, url, apply, template, mergeWith, SchematicsException } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { parseName } from '@schematics/angular/utility/parse-name';
import { buildRelativePath, findModule, findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { Schema as EmotionComponentSchema } from './schema';
import * as ts from 'typescript';
import { addDeclarationToModule, addExportToModule } from '@schematics/angular/utility/ast-utils';

// You don't have to export the function as default. You can also have more than one rule factory per file.
export default function({
	export: $export,
	module,
	name,
	path,
	prefix,
	project,
	selector,
}: EmotionComponentSchema): Rule
{
	return (tree: Tree, context: SchematicContext) => {
		const workspaceAsBuffer = tree.read('angular.json');
		if (!workspaceAsBuffer)
			throw new SchematicsException('Could not find Angular workspace configuration');

		const workspace = JSON.parse(workspaceAsBuffer.toString());

		const _project = !!project && workspace.projects[project] != null
			? workspace.projects[project]
			: workspace.defaultProject;

		const _prefix: string = !!prefix ? prefix : _project?.prefix;

		const _pathStart: string[] = path?.split('/')
			?? [_project.sourceRoot, _project.projectType.substring(0, 3)];
		const _pathEnd: string[] = name.split('/');

		const _name = _pathEnd.pop();
		const _path: string = _pathStart.concat(_pathEnd).join('/');
		const parsed = parseName(_path, _name);

		const _selector: string = !!selector
			? selector
			: `${_prefix}-${strings.dasherize(_name)}`;

		const _module = !!module
			? findModuleFromOptions(tree, { module, name, path: parsed.path })
			: findModule(tree, parsed.path);
		console.log(`module: ${_module}`);
		console.log('');
		const filename = strings.dasherize(parsed.name);
		const className = `${strings.classify(parsed.name)}Component`;
		const importPath = buildRelativePath(_module,
			`${parsed.path}/${filename}/${filename}.component.ts`);
		// const importLine = `import { ${className}Component } from '${importPath}';`;
		const moduleSource = ts.createSourceFile(
			_module,
			tree.read(_module).toString('utf-8'),
			ts.ScriptTarget.ES2015,
			true );
		const declarationChanges = addDeclarationToModule(moduleSource, _module, className, importPath);

		const options: EmotionComponentSchema = {
			module: _module,
			name: parsed.name,
			project: _project,
			prefix: _prefix,
			path: parsed.path,
			selector: _selector,
		};

		const sourceTemplate = url('./files');
		const sourceTemplateParametrized = apply(sourceTemplate, [
			template({ ...options, ...strings }),
		]);

		return mergeWith(sourceTemplateParametrized)(tree, context);
	};
}
