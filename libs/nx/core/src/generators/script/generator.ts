import * as path from 'path';

import { formatFiles, generateFiles, Tree } from '@nx/devkit';

import { ScriptGeneratorSchema } from './schema';

export async function scriptGenerator(tree: Tree, options: ScriptGeneratorSchema) {
  generateFiles(tree, path.join(__dirname, 'files'), './scripts', options);
  await formatFiles(tree);
}

export default scriptGenerator;
