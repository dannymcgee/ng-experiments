import * as fs from 'fs';
import * as path from 'path';

interface File {
	name: string;
	type: 'file'|'folder';
}

const dist = path.resolve('../../dist/ng-emotion/');

copySchematics();

/**
 * Copies Angular schematics into the `dist` directory for the library.
 *
 * Runs as a postbuild step after building the library with `ng build` and compiling the schematics with TypeScript.
 */
async function copySchematics(): Promise<void> {
	const files: File[] = await readDirRecursive('./schematics');

	// Copy schemas
	files.filter((file) => /schema\.json$/.test(file.name))
		.forEach((file) => copyToDist(file.name));

	// Copy templates
	const templates = files.filter((file) => /.+\\files\b/g.test(path.relative('.', file.name)));
	const templateFolders = templates.filter((file) => file.type === 'folder');
	const templateFiles = templates.filter((file) => file.type === 'file');
	await Promise.all(templateFolders.map((dir) => makeDirectoryInDist(dir.name)));
	templateFiles.forEach((file) => copyToDist(file.name));

	// Copy collection
	files.filter((file) => /collection\.json$/.test(file.name))
		.forEach((file) => copyToDist(file.name));
}

/**
 * Create a subfolder in the `dist` directory
 *
 * @param dir Absolute path to the source directory
 * @param dryRun Whether to just console.log the result and skip the actual operation
 */
function makeDirectoryInDist(dir: string, dryRun?: boolean): Promise<void> {
	const relativePath = path.relative('.', dir);
	const pathToCreate = `${dist}\\${relativePath}`;

	if (dryRun) {
		console.log(`Creating directory '${path.relative('.', pathToCreate)}'`);

		return Promise.resolve();
	}

	return new Promise((resolve, reject) => {
		fs.mkdir(pathToCreate, {}, (error: any) => {
			if (error)
				reject(error);
			resolve();
		});
	});
}

/**
 * Copy a file to the `dist` directory
 *
 * @param source Absolute path to the file
 * @param dryRun Whether to just console.log the result and skip the actual operation
 */
function copyToDist(source: string, dryRun?: boolean): Promise<void> {
	const srcRelative = path.relative('.', source);
	const destination = `${dist}\\${srcRelative}`;

	if (dryRun) {
		console.log(`Copying '.\\${srcRelative}' --> '${path.relative('.', destination)}'`);

		return Promise.resolve();
	}

	return new Promise((resolve, reject) => {
		fs.copyFile(source, destination, (error: any) => {
			if (error)
				reject(error);
			resolve();
		});
	});
}

/**
 * Recursively build a list of all files and folders in a directory
 *
 * @param dir Path to read
 */
function readDirRecursive(dir: string): Promise<File[]> {
	return new Promise((resolve, reject) => {
		let results: File[] = [];

		fs.readdir(dir, (error, list) => {
			if (error)
				reject(error);

			let pending = list.length;
			if (!pending)
				resolve(results);

			list.forEach((file) => {
				file = path.resolve(dir, file);
				fs.stat(file, (err, stat) => {
					if (err)
						reject(err);

					if (stat?.isDirectory()) {
						results.push({ name: file, type: 'folder' });

						readDirRecursive(file).then((res) => {
							results = results.concat(res);
							if (!--pending)
								resolve(results);
						});
					}
					else {
						results.push({ name: file, type: 'file' });

						if (!--pending)
							resolve(results);
					}
				});
			});
		});
	});
}
