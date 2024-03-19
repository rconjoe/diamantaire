import { getDiamondType } from '@diamantaire/shared/helpers';

import { queryDatoGQL } from '../clients';
import { queryClientApi } from '../clients/client-api';
// eslint-disable-next-line
import { DIAMOND_CFY_QUERY, DIAMOND_INFO_QUERY, DIAMOND_PDP_QUERY, DIAMOND_TABLE_QUERY } from './query';

// Get a single diamond per id or a list per other options
export const fetchDiamondData = async (options) => {
  if (!options) return;

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

    const id: string = options?.lotId || null;
    const handle: string = options?.handle || null;
    const url: string = '/diamonds' + getFormatedDataForApi();

    const response = await queryClientApi().request({ method: 'GET', url });
    const payload = response?.data || {};

    if (handle) {
      return {
        diamond: payload,
        options,
      };
    }

    if (id) {
      // return list of diamonds by ids
      if (id.split(',').length > 1) {
        return {
          diamonds: payload,
          options,
        };
      }

      // return one diamond by id
      return {
        diamond: payload,
        options,
      };
    } else {
      // return list of diamonds by other params
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
  const getDefaultCtoDiamond = (diamonds, type, ct) => {
    const conditions = [
      (v) => (ct <= 4 ? v.color === 'Colorless' : v.color === 'NearColorless'),
      (v) => (type === 'round-brilliant' ? v.cut === 'Ideal+Hearts' : v.cut === 'Excellent'),
      (v) => (ct <= 4 ? v.clarity === 'VVS+' : v.clarity === 'VS+'),
    ];

    let bestMatch = null;

    let bestMatchConditionsMet = 0;

    for (const diamond of diamonds) {
      const conditionsMet = conditions.reduce((count, condition) => (condition(diamond) ? count + 1 : count), 0);

      if (conditionsMet > bestMatchConditionsMet) {
        bestMatch = diamond;
        bestMatchConditionsMet = conditionsMet;
      }
    }

    if (bestMatch) {
      return bestMatch;
    }

    return diamonds[0];
  };

  const getAvailableUpgrades = (diamonds, selectedDiamond) => {
    if (!selectedDiamond) return;

    const { cut: selectedCut, color: selectedColor, clarity: selectedClarity } = selectedDiamond;
    // selectedDiamond => v.clarity === 'VVS+' && v.cut === 'Ideal+Hearts' && v.color === 'Colorless';

    const findUpgrade = (filter) => diamonds.find((diamond) => filter(diamond));

    const result = {
      diamond: selectedDiamond,
      diamondCutUpgrade: findUpgrade((v) => {
        return v.clarity === selectedClarity && v.cut !== selectedCut && v.color === selectedColor;
      }),
      diamondColorUpgrade: findUpgrade((v) => {
        return v.clarity === selectedClarity && v.cut === selectedCut && v.color !== selectedColor;
      }),
      diamondClarityUpgrade: findUpgrade((v) => {
        return v.clarity !== selectedClarity && v.cut === selectedCut && v.color === selectedColor;
      }),
      diamondCutAndColorUpgrade: findUpgrade((v) => {
        return v.clarity === selectedClarity && v.cut !== selectedCut && v.color !== selectedColor;
      }),
      diamondCutAndClarityUpgrade: findUpgrade((v) => {
        return v.clarity !== selectedClarity && v.cut !== selectedCut && v.color === selectedColor;
      }),
      diamondColorAndClarityUpgrade: findUpgrade((v) => {
        return v.clarity !== selectedClarity && v.cut === selectedCut && v.color !== selectedColor;
      }),
      diamondCutAndColorAndClarityUpgrade: findUpgrade((v) => {
        return v.clarity !== selectedClarity && v.cut !== selectedCut && v.color !== selectedColor;
      }),
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

    const diamond = getDefaultCtoDiamond(diamonds, options.diamondType, caratNumber);

    const diamondAvailableUpgrade = getAvailableUpgrades(diamonds, diamond);

    const upgrades: { [key: string]: any } = {};

    const {
      diamondColorUpgrade,
      diamondCutUpgrade,
      diamondClarityUpgrade,
      diamondCutAndColorUpgrade,
      diamondCutAndClarityUpgrade,
      diamondColorAndClarityUpgrade,
      diamondCutAndColorAndClarityUpgrade,
    } = diamondAvailableUpgrade || {};

    if (diamondCutUpgrade !== undefined) {
      upgrades['diamondCutUpgrade'] = diamondCutUpgrade;
    }

    if (diamondColorUpgrade !== undefined) {
      upgrades['diamondColorUpgrade'] = diamondColorUpgrade;
    }

    if (diamondClarityUpgrade !== undefined) {
      upgrades['diamondClarityUpgrade'] = diamondClarityUpgrade;
    }

    if (diamondCutAndColorUpgrade !== undefined) {
      upgrades['diamondCutAndColorUpgrade'] = diamondCutAndColorUpgrade;
    }

    if (diamondCutAndClarityUpgrade !== undefined) {
      upgrades['diamondCutAndClarityUpgrade'] = diamondCutAndClarityUpgrade;
    }

    if (diamondColorAndClarityUpgrade !== undefined) {
      upgrades['diamondColorAndClarityUpgrade'] = diamondColorAndClarityUpgrade;
    }

    if (diamondCutAndColorAndClarityUpgrade !== undefined) {
      upgrades['diamondCutAndColorAndClarityUpgrade'] = diamondCutAndColorAndClarityUpgrade;
    }

    return {
      diamond,
      ...upgrades,
    };
  } catch (error) {
    console.log(error);
  }
};

export async function fetchLowestPriceByDiamondType(diamondType) {
  if (!diamondType || typeof diamondType !== 'string') {
    throw new Error('Invalid diamondType provided');
  }

  const queryString = new URLSearchParams({ diamondType }).toString();
  const url = `/diamondLowestPriceByDiamondType?${queryString}`;

  try {
    const response = await queryClientApi().request({ method: 'GET', url });

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching lowest priced diamond for type ${diamondType}:`, error);
    throw error;
  }
}
