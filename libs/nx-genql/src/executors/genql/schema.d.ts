export interface GenqlExecutorSchema {
  endpoint?: string;
  token?: string;
  scalars?: { [key: string]: string };
  output?: string;
}
