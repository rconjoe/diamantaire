import * as path from 'path';

import { generate } from '@genql/cli';
import { Config } from '@genql/cli/dist/config';
import { readProjectConfiguration, Tree } from '@nx/devkit';
import dotenv from 'dotenv';
dotenv.config();

import { UtilsGeneratorSchema } from './schema';

export async function utilsGenerator(tree: Tree, options: UtilsGeneratorSchema) {
  const token = process.env.DATO_READ_ONLY_TOKEN;

  if (!token) {
    throw new Error('Missing DATO_READ_ONLY_TOKEN env var in workspace root .env');
  }

  if (options.api !== 'datocms') {
    throw new Error(`API ${options.api} not supported yet`);
  }

  const project = readProjectConfiguration(tree, options.project);

  const sourceRoot = project.sourceRoot;

  const target = path.join(tree.root, sourceRoot, '_generated');

  const genqlOpts: Config = {
    endpoint: 'https://graphql.datocms.com/',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    output: target,
    scalarTypes: {
      BooleanType: 'boolean',
      CustomData: 'Record<string, unknown>',
      Date: 'string',
      DateTime: 'string',
      FloatType: 'number',
      IntType: 'number',
      ItemId: 'string',
      JsonField: 'unknown',
      MetaTagAttributes: 'Record<string, string>',
      UploadId: 'string',
    },
  };

  try {
    await generate(genqlOpts);
  } catch (e) {
    console.error(e);
  }

  return;
}

export default utilsGenerator;
