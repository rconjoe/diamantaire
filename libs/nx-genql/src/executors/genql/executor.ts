import { generate } from '@genql/cli';
import { Config } from '@genql/cli/dist/config';

import { GenqlExecutorSchema } from './schema';

export default async function runExecutor(options: GenqlExecutorSchema) {
  console.log('Executor ran for Genql', options);

  if (!options.endpoint) {
    throw new Error('Only endpoints supported for now.');
  }
  if (!options.token || !options.output) {
    throw new Error('Token and output location are required.');
  }

  const genqlOpts: Config = {
    endpoint: options.endpoint,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${options.token}`,
    },
    output: options.output,
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

    return {
      success: true,
    };
  } catch (e) {
    console.error(e);

    return {
      success: false,
      error: e,
    };
  }
}
