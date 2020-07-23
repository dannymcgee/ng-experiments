import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../../collection.json');

describe('component', () => {
	it('works', async () => {
		const runner = new SchematicTestRunner('schematics', collectionPath);
		const tree = await runner
			.runSchematicAsync('component',
				{ name: 'hello-world' },
				Tree.empty())
			.toPromise();

		expect(tree.files)
			.toEqual([
				'/hello-world/hello-world.component.html',
				'/hello-world/hello-world.component.styles.ts',
				'/hello-world/hello-world.component.ts'
			]);
	});
});
