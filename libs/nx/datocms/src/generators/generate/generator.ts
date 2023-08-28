import * as path from 'path';

import { addProjectConfiguration, formatFiles, generateFiles, Tree } from '@nx/devkit';

import { GenerateGeneratorSchema } from './schema';

export async function generateGenerator(tree: Tree, options: GenerateGeneratorSchema) {
  const projectRoot = `libs/${options.name}`;

  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default generateGenerator;
