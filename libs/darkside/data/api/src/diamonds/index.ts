import { getDiamondType } from '@diamantaire/shared/helpers';

import { queryDatoGQL } from '../clients';
import { queryClientApi } from '../clients/client-api';
// eslint-disable-next-line
import { DIAMOND_CFY_QUERY, DIAMOND_INFO_QUERY, DIAMOND_PDP_QUERY, DIAMOND_TABLE_QUERY } from './query';

// Get a single diamond per id or a list per other options
export const fetchDiamondData = async (options) => {
  try {
    const getFormatedDataForApi = () => {
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

// Get infinite diamond list
export const fetchInfiniteDiamondData = async (options, pageParam = 1) => {
  try {
    const getFormatedDataForApi = () => {
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
  const getAvailableOptions = (diamonds) => {
    const options = diamonds?.reduce(
      (prevOptions, diamond) => {
        if (!prevOptions.cut.includes(diamond.cut)) {
          prevOptions.cut.push(diamond.cut);
        }

        if (!prevOptions.color.includes(diamond.color)) {
          prevOptions.color.push(diamond.color);
        }

        return prevOptions;
      },
      { cut: [], color: [] },
    );

    return options;
  };

  const getDefaultCtoDiamond = (diamonds) => {
    const upgradeOptions = getAvailableOptions(diamonds);

    if (upgradeOptions.color.includes('Colorless')) {
      const colorlessDiamonds = diamonds.filter((diamond) => diamond.color === 'Colorless');

      if (colorlessDiamonds.length === 1) {
        return colorlessDiamonds[0];
      }
    }

    return diamonds?.[0];
  };

  const getAvailableUpgrades = (diamonds, selectedDiamond) => {
    const { cut: selectedCut, color: selectedColor } = selectedDiamond;

    const colorUpgrade = diamonds.find((diamond) => diamond.cut === selectedCut && diamond.color !== selectedColor);

    const cutUgrade = diamonds.find((diamond) => diamond.color === selectedColor && diamond.cut !== selectedCut);

    const cutAndColorUpgrade = diamonds.find((diamond) => diamond.color !== selectedColor && diamond.cut !== selectedCut);

    const result = {
      diamond: selectedDiamond,
      diamondColorUpgrade: colorUpgrade,
      diamondCutUpgrade: cutUgrade,
      diamondCutAndColorUpgrade: cutAndColorUpgrade,
    };

    return result;
  };

  const number = Number(options.carat);

  const caratNumber = isNaN(number) ? 3 : number;

  try {
    const queryOptions = {
      page: 1,
      limit: 100,
      sortBy: 'carat',
      sortOrder: 'desc',
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

    const response = await queryClientApi().request({ method: 'GET', url });

    const diamonds = Object.values(response?.data || {});

    const diamond = getDefaultCtoDiamond(diamonds);

    const diamondAvailableUpgrade = getAvailableUpgrades(diamonds, diamond);

    const upgrades: { [key: string]: any } = {};

    const { diamondColorUpgrade, diamondCutUpgrade, diamondCutAndColorUpgrade } = diamondAvailableUpgrade || {};

    if (diamondCutUpgrade !== undefined) {
      upgrades['diamondCutUpgrade'] = diamondCutUpgrade;
    }

    if (diamondColorUpgrade !== undefined) {
      upgrades['diamondColorUpgrade'] = diamondColorUpgrade;
    }

    if (diamondCutAndColorUpgrade !== undefined) {
      upgrades['diamondCutAndColorUpgrade'] = diamondCutAndColorUpgrade;
    }

    return {
      diamond,
      ...upgrades,
    };
  } catch (error) {
    console.log(error);
  }
};
