import {
  DIAMOND_TABLE_DEFAULT_OPTIONS,
  DIAMOND_VALID_QUERIES,
  DIAMOND_TABLE_FACETED_NAV,
  DIAMOND_TABLE_VALID_COLORS,
  DIAMOND_TABLE_VALID_CLARITIES,
  DIAMOND_TABLE_VALID_CUTS,
  DIAMOND_TABLE_VALID_TYPES,
  DIAMOND_TABLE_VALID_SORT_BY,
  DIAMOND_TABLE_VALID_SORT_ORDER,
  DIAMOND_CFY_VALID_QUERIES,
  DIAMOND_CFY_FACETED_NAV,
} from '@diamantaire/shared/constants';
import { diamondRouteCfy, diamondRoutePlp, diamondRouteCfyResult } from '@diamantaire/shared/routes';

export const diamondOption = {
  isClarity: (v) => DIAMOND_TABLE_VALID_CLARITIES.includes(v || v.toLowercase()),
  isCut: (v) => DIAMOND_TABLE_VALID_CUTS.includes(v || v.toLowercase()),
  isColor: (v) => DIAMOND_TABLE_VALID_COLORS.includes(v || v.toLowercase()),
  isDiamondType: (v) => !diamondOption.isHandle(v) && getDiamondType(v).title,
  isHandle: (v) => {
    const len = (v && v.split('-').length - 1) || 0;

    return len > 4;
  },
};

export const getDiamondType = (value: string) => {
  const titles = Object.keys(DIAMOND_TABLE_VALID_TYPES);

  const slugs = Object.values(DIAMOND_TABLE_VALID_TYPES);

  // GET DIAMOND TYPE ON DIAMOND SLUG
  if (diamondOption.isHandle(value)) {
    const diamondTypeSegment = value?.split('-')?.[0];

    if (slugs.some((slug) => slug.includes(diamondTypeSegment))) {
      const index = slugs.findIndex((slug) => slug.includes(diamondTypeSegment));

      return {
        slug: slugs[index],
        title: titles[index],
      };
    }
  }

  // GET DIAMOND TYPE FROM ANY STRING
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

export const getDiamondId = (slug: string) => {
  return slug && slug.split('-').pop().toUpperCase();
};

/**
 * INVENTORY Faceted Navigation Logic
 * Will take what's in the url parse it
 * ex: /diamonds/oval/VVS1,VVS2/Excellent/D,E,F
 * Parse it and return a params object for querying the diamond API.
 */

export const getDiamondOptionsFromUrl = (query, page) => {
  const validQueryType = [...DIAMOND_VALID_QUERIES];

  const getOptionsFromFacetedNav = (data: string[]) => {
    const obj: {
      diamondType?: string;
      clarity?: string;
      cut?: string;
      color?: string;
      lotId?: string;
    } = {};

    data?.forEach((value) => {
      const arr = value.toLowerCase().split(',');

      if (arr.every(diamondOption.isDiamondType)) {
        obj.diamondType = arr
          .map(getDiamondType)
          .map((v) => v.slug)
          .join();
      } else if (arr.every(diamondOption.isClarity)) {
        obj.clarity = value.toUpperCase();
      } else if (arr.every(diamondOption.isCut)) {
        obj.cut = value;
      } else if (arr.every(diamondOption.isColor)) {
        obj.color = value.toUpperCase();
      } else if (arr.every(diamondOption.isHandle)) {
        obj.lotId = getDiamondId(value);

        obj.diamondType = arr
          .map(getDiamondType)
          .map((v) => v.title)
          .join();
      }
    });

    return obj;
  };

  const getOptionsFromQueryNav = (data: { key: string; value: string }) => {
    return Object.keys(data)
      .filter((k) => validQueryType.includes(k))
      .reduce((a: object, k: string) => {
        // sortBy and sortOrder sanity checks
        if (
          (k === 'sortBy' && !DIAMOND_TABLE_VALID_SORT_BY.includes(data[k])) ||
          (k === 'sortOrder' && !DIAMOND_TABLE_VALID_SORT_ORDER.includes(data[k]))
        ) {
          return { ...a };
        }

        // page and limit sanity checks
        if (DIAMOND_VALID_QUERIES.includes(k)) {
          const num = parseFloat(data[k]);

          if (typeof num !== 'number') {
            return { ...a };
          }
        }

        return { ...a, [k]: data[k] };
      }, {});
  };

  if (page === 'diamondTable') {
    const options = { ...DIAMOND_TABLE_DEFAULT_OPTIONS, ...query };
    const optCaratMin = (options.caratMin && parseFloat(options.caratMin)) || null;

    const opt = {
      ...getOptionsFromFacetedNav(options.filterOptions),
      ...getOptionsFromQueryNav(options),
      ...(!optCaratMin || (optCaratMin && optCaratMin < 1) ? { caratMin: 1 } : {}),
    };

    return opt;
  }

  if (page === 'diamondPDP') {
    return {
      ...getOptionsFromFacetedNav(query),
    };
  }
};

export const getDiamondShallowRoute = (options) => {
  const segments = DIAMOND_TABLE_FACETED_NAV.reduce((arr: string[], value: string) => {
    if (options[value]) {
      if (value === 'diamondType') {
        const diamondType =
          options.diamondType &&
          options.diamondType
            .split(',')
            .map((v) => getDiamondType(v).slug)
            .join();

        return [...arr, diamondType];
      }

      return [...arr, options[value]];
    }

    return [...arr];
  }, []);

  const queries = DIAMOND_VALID_QUERIES.reduce((obj: Record<string, string>, qry: string) => {
    if (options[qry]) {
      return {
        ...obj,
        [qry]: options[qry],
      };
    }

    return { ...obj };
  }, {});

  const queryURL = new URLSearchParams(queries).toString();

  const query = queryURL ? '?' + queryURL : '';

  const showQueryInUrl = true;

  const route = `${diamondRoutePlp}/${segments.join('/')}${showQueryInUrl ? query : ''}`;

  return route;
};

/**
 * CFY Faceted Navigation Logic
 * Will take what's in the url parse it
 * ex: /diamonds/[diamondType] or /diamonds/results/[diamondType]
 * Parse it and return a params object for querying the diamond API.
 */

export const getCFYOptionsFromUrl = (query) => {
  const validQueryType = [...DIAMOND_CFY_VALID_QUERIES];

  const getOptionsFromQueryNav = (data: { key: string; value: string }) => {
    return Object.keys(data)
      .filter((k) => validQueryType.includes(k))
      .reduce((a: object, k: string) => {
        // sortBy and sortOrder sanity checks
        if (
          (k === 'sortBy' && !DIAMOND_TABLE_VALID_SORT_BY.includes(data[k])) ||
          (k === 'sortOrder' && !DIAMOND_TABLE_VALID_SORT_ORDER.includes(data[k]))
        ) {
          return { ...a };
        }

        // page and limit sanity checks
        if (DIAMOND_VALID_QUERIES.includes(k)) {
          const num = parseFloat(data[k]);

          if (typeof num !== 'number') {
            return { ...a };
          }
        }

        return { ...a, [k]: data[k] };
      }, {});
  };

  return {
    ...getOptionsFromQueryNav(query),
  };
};

export const getCFYShallowRoute = (options, page) => {
  const segments = DIAMOND_CFY_FACETED_NAV.reduce((arr: string[], value: string) => {
    if (options[value]) {
      if (value === 'diamondType') {
        const diamondType =
          options.diamondType &&
          options.diamondType
            .split(',')
            .map((v) => getDiamondType(v).slug)
            .join();

        return [...arr, diamondType];
      }

      return [...arr, options[value]];
    }

    return [...arr];
  }, []);

  const queries = DIAMOND_CFY_VALID_QUERIES.reduce((obj: Record<string, string>, qry: string) => {
    if (options[qry]) {
      return {
        ...obj,
        [qry]: options[qry],
      };
    }

    return { ...obj };
  }, {});

  const queryURL = new URLSearchParams(queries).toString();

  const query = queryURL ? '?' + queryURL : '';

  let base = diamondRouteCfy;

  if (page === 'diamondCfyResult') {
    base = diamondRouteCfyResult;
  }

  const showQueryInUrl = true;

  const route = `${base}/${segments.join('/')}${showQueryInUrl ? query : ''}`;

  return route;
};
