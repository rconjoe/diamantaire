import { QueryFunctionContext } from '@tanstack/react-query';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import 'styled-components';

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
