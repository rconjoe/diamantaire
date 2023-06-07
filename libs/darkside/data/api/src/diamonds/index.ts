import { DIAMOND_TABLE_VALID_TYPES } from '@diamantaire/shared/constants';

import { queryClientApi } from '../clients/client-api';

export const getDiamondsData = async (options) => {
  const url: string = '/diamonds' + getFormatedDataForApi(options);

  const response = await queryClientApi().request({ method: 'GET', url });

  const payload = response.data || {};

  return {
    diamonds: payload.items,
    options,
    pagination: payload.paginator,
    ranges: payload.ranges,
  };
};

function getDiamondType(value) {
  const titles = Object.keys(DIAMOND_TABLE_VALID_TYPES);

  const slugs = Object.values(DIAMOND_TABLE_VALID_TYPES);

  if (titles.includes(value)) {
    return {
      slug: DIAMOND_TABLE_VALID_TYPES[value],
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
}

function getFormatedDataForApi(options) {
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
}
