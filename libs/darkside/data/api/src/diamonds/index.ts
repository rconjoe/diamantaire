import { DIAMOND_TYPE_INTERNAL_NAMES } from '@diamantaire/shared/constants';

import { queryDatoGQL } from '../clients';
import { queryClientApi } from '../clients/client-api';
import { DIAMOND_CFY_QUERY, DIAMOND_INFO_QUERY, DIAMOND_PDP_QUERY, DIAMOND_TABLE_QUERY } from './query';

// Get Diamond Data from Mongo
export const fetchDiamondData = async (options) => {
  try {
    const getFormatedDataForApi = () => {
      const getDiamondType = (value) => {
        const titles = Object.keys(DIAMOND_TYPE_INTERNAL_NAMES);

        const slugs = Object.values(DIAMOND_TYPE_INTERNAL_NAMES);

        if (titles.includes(value)) {
          return {
            slug: DIAMOND_TYPE_INTERNAL_NAMES[value],
            title: value,
          };
        }

        if (slugs.includes(value)) {
          return {
            slug: value,
            title: titles[slugs.findIndex((v) => v === value)],
          };
        }

        return {};
      };

      const diamondType =
        (options.diamondType && {
          diamondType: options.diamondType
            .split(',')
            .map((v) => getDiamondType(v).slug)
            .join(),
        }) ||
        {};

      const query =
        {
          ...options,
          ...diamondType,
        } || {};

      return Object.keys(query).length ? '?' + new URLSearchParams(query).toString() : '';
    };

    const id: string = options?.lotId;

    const url: string = '/diamonds' + getFormatedDataForApi();

    const response = await queryClientApi().request({ method: 'GET', url });

    const payload = response?.data || {};

    if (id) {
      return {
        diamond: payload,
        options,
      };
    } else {
      return {
        diamonds: payload.items,
        options,
        pagination: payload.paginator,
        ranges: payload.ranges,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchInfiniteDiamondData = async (options, pageParam = 1) => {
  try {
    const getFormatedDataForApi = () => {
      const getDiamondType = (value) => {
        const titles = Object.keys(DIAMOND_TYPE_INTERNAL_NAMES);

        const slugs = Object.values(DIAMOND_TYPE_INTERNAL_NAMES);

        if (titles.includes(value)) {
          return {
            slug: DIAMOND_TYPE_INTERNAL_NAMES[value],
            title: value,
          };
        }

        if (slugs.includes(value)) {
          return {
            slug: value,
            title: titles[slugs.findIndex((v) => v === value)],
          };
        }

        return {};
      };

      const diamondType =
        (options.diamondType && {
          diamondType: options.diamondType
            .split(',')
            .map((v) => getDiamondType(v).slug)
            .join(),
        }) ||
        {};

      const query =
        {
          ...options,
          ...diamondType,
          ...{ page: pageParam },
        } || {};

      return Object.keys(query).length ? '?' + new URLSearchParams(query).toString() : '';
    };

    const url: string = '/diamonds' + getFormatedDataForApi();

    const response = await queryClientApi().request({ method: 'GET', url });

    const payload = response.data || {};

    return {
      diamonds: payload.items,
      options,
      pagination: payload.paginator,
      ranges: payload.ranges,
    };
  } catch (err) {
    console.log(err);
  }
};

// Get Diamond Table Page Info from Dato
export const fetchDiamondTableData = async (locale: string) => {
  const diamondTableData = await queryDatoGQL({
    query: DIAMOND_TABLE_QUERY,
    variables: { locale },
  });

  return diamondTableData;
};

// Get Diamond PDP Page Info from Dato
export const fetchDiamondPdpData = async (locale: string) => {
  const diamondTableData = await queryDatoGQL({
    query: DIAMOND_PDP_QUERY,
    variables: { locale },
  });

  return diamondTableData;
};

// Get Diamond PDP Additional Info from Dato
export const fetchDiamondInfoData = async (locale: string) => {
  const diamondInfoData = await queryDatoGQL({
    query: DIAMOND_INFO_QUERY,
    variables: { locale },
  });

  return diamondInfoData;
};

// Get Diamond CFY Page Info from Dato
export const fetchDiamondCfyData = async (locale: string) => {
  const diamondCfyData = await queryDatoGQL({
    query: DIAMOND_CFY_QUERY,
    variables: { locale },
  });

  return diamondCfyData;
};

// Get Diamond Cut To Order
export const fetchDiamondCtoData = async (options) => {
  const number = Number(options.carat);

  const caratNumber = isNaN(number) ? 3 : number;

  try {
    const queryOptions = {
      limit: 1,
      diamondType: options.diamondType,
      caratMin: caratNumber,
      caratMax: caratNumber * 1.001,
    };

    const ctoQueryOptions = {
      ...queryOptions,
      isCto: true,
    };

    const queryString = Object.entries(ctoQueryOptions)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    const searchParams = new URLSearchParams(queryString);

    const url = `/diamondCto?${searchParams.toString()}`;

    // const upgradeQueryOptionsCut = {
    //   ...queryOptions,
    //   cut: 'Ideal+Heart',
    // };

    // const upgradeQueryOptionsColor = {
    //   ...queryOptions,
    //   color: 'D,E,F',
    // };

    const response = await queryClientApi().request({ method: 'GET', url });

    const payload = response?.data || {};

    console.log(`fetchDiamondCtoData url`, url);

    console.log(`fetchDiamondCtoData payload`, payload);

    // const upgradeCut = await fetchDiamondData(upgradeQueryOptionsCut);

    // const upgradeColor = await fetchDiamondData(upgradeQueryOptionsColor);

    return { payload };
  } catch (error) {
    console.log(error);
  }
};
