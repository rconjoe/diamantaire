import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';

type QueryFunctionContextMeta = {
  locale: 'en-us' | 'fr' | 'de' | 'es';
  environment: string;
};

export interface DarksideQueryFunctionContext
  extends Omit<QueryFunctionContext, 'meta'> {
  meta: QueryFunctionContextMeta;
}

export type DarksideGatewayRequestContext = AxiosRequestConfig &
  QueryFunctionContextMeta;

export type DarksideGatewayQueryResponse = AxiosResponse;
