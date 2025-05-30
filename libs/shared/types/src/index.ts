import { QueryFunctionContext } from '@tanstack/react-query';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

import 'styled-components';
export * from './type-helpers/diamonds';
export * from './type-helpers/general';
export * from './type-helpers/media';
export * from './type-helpers/selectors';
export * from './type-helpers/plp';

type QueryFunctionContextMeta = {
  locale: string;
  category?: string;
  environment: string;
};

export interface DarksideGlobalGatewayQueryFunctionContext extends Omit<QueryFunctionContext, 'meta'> {
  meta: QueryFunctionContextMeta;
}

export type DarksideGatewayRequestContext = AxiosRequestConfig & QueryFunctionContextMeta;

export type DarksideGatewayQueryResponse = AxiosResponse;
