/**
 * Utils service
 * @author Bismark Frimpong
 * @date 11/23/2022
 * @version 1.0
 * @copyright DiamondFoundry
 */

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import cryptoJs from 'crypto-js';
import { GraphQLClient } from 'graphql-request';
import NodeCache from 'node-cache';
import OAuth from 'oauth-1.0a';

@Injectable()
export class UtilService {
  private readonly logger = new Logger(UtilService.name);
  private queryCache: NodeCache;
  constructor(private readonly configService: ConfigService) {
    this.queryCache = new NodeCache({
      stdTTL: 86400, // 1 day in seconds
      useClones: false, // Caching query responses as promises
    });
  }

  /**
   * This function creates an instance of shopify store front client
   * @returns a shopify client connection
   */

  createShopifyStoreFrontGateway() {
    const client = new GraphQLClient(this.configService.get('SHOPIFY_STOREFRONT_GRAPHQL_URI'), {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Shopify-Storefront-Access-Token': `${this.configService.get('NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN')}`,
      },
    });

    return client;
  }

  /**
   * This function creates an instance of shopify admin client
   * @returns a shopify client connection
   */

  createShopifyAdminGateway() {
    const client = new GraphQLClient(this.configService.get('SHOPIFY_ADMIN_GRAPHQL_URI'), {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Shopify-Access-Token': `${this.configService.get('SHOPIFY_ADMIN_API_TOKEN')}`,
      },
    });

    return client;
  }

  /**
   * This function creates the dato client connection
   * @returns a dato client connection
   */

  createDataGateway() {
    const client = new GraphQLClient(this.configService.get('DATO_GRAPHQL_URI'), {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.configService.get('DATO_READ_ONLY_TOKEN')}`,
      },
    });

    return client;
  }

  /**
   * Netsuite restlet API header needs to be signed using Oauth1.0 with base64 encoding for every request
   */

  getAuthHeaderForRequest(request: OAuth.RequestOptions) {
    const consumerKey = this.configService.get('RESTLET_CONSUMER_KEY');
    const consumerSecret = this.configService.get('RESTLET_CONSUMER_SECRET');
    const tokenKey = this.configService.get('RESTLET_TOKEN_KEY');
    const tokenSecret = this.configService.get('RESTLET_TOKEN_SECRET');
    const oauthRealm = this.configService.get('RESTLET_OAUTH_REALM');
    const oauth = new OAuth({
      realm: oauthRealm,
      consumer: { key: consumerKey, secret: consumerSecret },
      // eslint-disable-next-line camelcase
      signature_method: 'HMAC-SHA256',

      version: '1.0',
      // eslint-disable-next-line camelcase,
      hash_function(base_string, key) {
        return cryptoJs.algo.HMAC.create(cryptoJs.algo.SHA256, key)
          .update(base_string)
          .finalize()
          .toString(cryptoJs.enc.Base64);
      },
    });

    const authorization = oauth.authorize(request, {
      key: tokenKey,
      secret: tokenSecret,
    });

    return oauth.toHeader(authorization);
  }

  /**
   * Netsuite diamond availability fetch
   * @param { String }lotId - diamond lot id
   * @returns { Promise } - diamond a diamond object with availability true or false
   */

  async getDiamondFromNetSuite(lotId: string): Promise<any> {
    const netsuiteDiamondAvailabilityRestletUri = this.configService.get('NETSUITE_DIAMOND_AVAILABILITY_RESTLET_URI');
    const configAxios = {
      method: 'GET',
      url: `${netsuiteDiamondAvailabilityRestletUri}${lotId}`,
    };

    try {
      // generate the Authorization header
      const authHeader = this.getAuthHeaderForRequest(configAxios);
      const customHeader = {
        headers: {
          ...authHeader,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.get(configAxios.url, customHeader);

      return response.status === 200 ? response.data : null;
    } catch (err) {
      this.logger.error(`Error getting diamond from netsuite: ${err}`);

      return Promise.reject(err);
    }
  }

  /**
   * Set a key value in memory
   * @param { String } key name of key to set
   * @param { String } value data to store
   * @param { Number } ttl time to live
   */

  memSet(key: string, value: any, ttl?: number) {
    this.queryCache.set(key, value, ttl);
  }

  /**
   * Retrieve data from key
   * @param { String } key name of key
   */

  async memGet(key: string): Promise<any> {
    return await this.queryCache.get(key);
  }

  getTTL(key: string) {
    return this.queryCache.getTtl(key);
  }
}
