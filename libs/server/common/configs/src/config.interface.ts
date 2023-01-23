export interface Config {
  nest: NestConfig;
  graphql: GraphqlConfig;
}

export interface NestConfig {
  port: number;
  mongoUri: string;
  apiPrefix: string;
  nodeEnv: string;
}

export interface GraphqlConfig {
  playgroundEnabled: boolean;
  debug: boolean;
  schemaDestination: string;
  sortSchema: boolean;
}
