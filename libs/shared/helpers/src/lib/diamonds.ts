import {
  DIAMOND_TABLE_DEFAULT_OPTIONS,
  DIAMOND_TABLE_VALID_QUERIES,
  DIAMOND_TABLE_FACETED_NAV,
  DIAMOND_TABLE_VALID_COLORS,
  DIAMOND_TABLE_VALID_CLARITIES,
  DIAMOND_TABLE_VALID_CUTS,
  DIAMOND_TABLE_VALID_TYPES,
  DIAMOND_TABLE_VALID_SORT_BY,
  DIAMOND_TABLE_VALID_SORT_ORDER,
} from '@diamantaire/shared/constants';

export const getDiamondType = (value) => {
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
};

/**
 * Faceted Navigation Logic
 * Will take what's in the url parse it
 * ex: /diamonds/Oval/VVS1,VVS2/Excellent/D,E,F
 * Parse it and return a params object for querying the diamond API.
 */

export const getDiamondsOptionsFromUrl = (query) => {
  const options = { ...DIAMOND_TABLE_DEFAULT_OPTIONS, ...query };

  const getOptionsFromFacetedNav = (data) => {
    const obj = {};

    data?.forEach((value: string) => {
      const arr = value.toLowerCase().split(',');

      const isDiamondTypeOption = arr.every((v) => getDiamondType(v).title);

      const isClarityOption = arr.every((v) => DIAMOND_TABLE_VALID_CLARITIES.includes(v));

      const isCutOption = arr.every((v) => DIAMOND_TABLE_VALID_CUTS.includes(v));

      const isColorOption = arr.every((v) => DIAMOND_TABLE_VALID_COLORS.includes(v));

      if (isDiamondTypeOption) {
        obj['diamondType'] = value
          .split(',')
          .map((v) => getDiamondType(v).title)
          .join();
      } else if (isClarityOption) {
        obj['clarity'] = value.toUpperCase();
      } else if (isCutOption) {
        obj['cut'] = value;
      } else if (isColorOption) {
        obj['color'] = value.toUpperCase();
      }
    });

    return obj;
  };

  const getOptionsFromQueryNav = (data) => {
    return Object.keys(data)
      .filter((k) => [...DIAMOND_TABLE_VALID_QUERIES].includes(k))
      .reduce((a: object, k: string) => {
        // sortBy and sortOrder sanity checks
        if (
          (k === 'sortBy' && !DIAMOND_TABLE_VALID_SORT_BY.includes(data[k])) ||
          (k === 'sortOrder' && !DIAMOND_TABLE_VALID_SORT_ORDER.includes(data[k]))
        ) {
          return { ...a };
        }

        // page and limit sanity checks
        if (DIAMOND_TABLE_VALID_QUERIES.includes(k)) {
          const num = parseFloat(data[k]);

          if (typeof num !== 'number') {
            return { ...a };
          }
        }

        return { ...a, [k]: data[k] };
      }, {});
  };

  return { ...getOptionsFromFacetedNav(options.filterOptions), ...getOptionsFromQueryNav(options) };
};

export const getDiamondsOptionsRoute = (options) => {
  const segments = DIAMOND_TABLE_FACETED_NAV.reduce((arr: string[], value: string) => {
    if (options[value]) {
      if (value === 'diamondType') {
        const diamondType =
          options.diamondType &&
          options.diamondType
            .split(',')
            .map((v) => getDiamondType(v).title)
            .join();

        return [...arr, diamondType];
      }

      return [...arr, options[value]];
    }

    return [...arr];
  }, []);

  // const queries = DIAMOND_TABLE_VALID_QUERIES.reduce((obj: object, qry: string) => {
  //   if (options[qry]) {
  //     return {
  //       ...obj,
  //       [qry]: options[qry],
  //     };
  //   }

  //   return { ...obj };
  // }, {});

  // const queryURL = new URLSearchParams(queries).toString();

  // const query = queryURL ? '?' + queryURL : '';

  return '/diamonds/' + segments.join('/'); // + query;
};
