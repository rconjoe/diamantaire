import { QueryFunctionContext } from '@tanstack/react-query';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

type QueryFunctionContextMeta = {
  locale: 'en-us' | 'fr' | 'de' | 'es';
  environment: string;
};

export interface DarksideQueryFunctionContext extends Omit<QueryFunctionContext, 'meta'> {
  meta: QueryFunctionContextMeta;
}

export type DarksideGatewayRequestContext = AxiosRequestConfig & QueryFunctionContextMeta;

export type DarksideGatewayQueryResponse = AxiosResponse;
