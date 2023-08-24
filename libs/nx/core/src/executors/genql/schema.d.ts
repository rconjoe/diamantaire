import { generate } from '@genql/cli';

type GenqlConfig = Parameters<typeof generate>[0];

export type GenqlExecutorSchema = Required<Pick<GenqlConfig, 'endpoint' | 'output' | 'headers' | 'scalarTypes' | 'verbose'>>;
