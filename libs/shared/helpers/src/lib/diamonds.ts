import {
  ACCEPTABLE_CLARITIES,
  DIAMOND_CFY_FACETED_NAV,
  DIAMOND_CFY_VALID_QUERIES,
  DIAMOND_TABLE_DEFAULT_OPTIONS,
  DIAMOND_TABLE_FACETED_NAV,
  DIAMOND_TABLE_VALID_CLARITIES,
  DIAMOND_TABLE_VALID_COLORS,
  DIAMOND_TABLE_VALID_CUTS,
  DIAMOND_TABLE_VALID_SORT_BY,
  DIAMOND_TABLE_VALID_SORT_ORDER,
  DIAMOND_TYPE_HUMAN_NAMES,
  DIAMOND_TYPE_INTERNAL_NAMES,
  DIAMOND_TABLE_DEFAULT_VALID_QUERIES,
} from '@diamantaire/shared/constants';
import { diamondRouteCfy, diamondRouteCfyResult, diamondRoutePlp } from '@diamantaire/shared/routes';

export const diamondOption = {
  isClarity: (v) => DIAMOND_TABLE_VALID_CLARITIES.includes(v || v.toLowercase()),
  isCut: (v) => DIAMOND_TABLE_VALID_CUTS.includes(v || v.toLowercase()),
  isColor: (v) => DIAMOND_TABLE_VALID_COLORS.includes(v || v.toLowercase()),
  isDiamondType: (v) => !diamondOption.isHandle(v) && getDiamondType(v)?.title,
  isHandle: (v) => {
    const len = (v && v.split('-').length - 1) || 0;

    return len > 4;
  },
};

export const getDiamondType = (value: string) => {
  const titles = Object.values(DIAMOND_TYPE_HUMAN_NAMES);

  const slugs = Object.keys(DIAMOND_TYPE_HUMAN_NAMES);

  if (titles.includes(value)) {
    const slug = DIAMOND_TYPE_INTERNAL_NAMES[value];

    const title = titles[slugs.findIndex((v) => v === slug)];

    return { slug, title };
  }

  if (slugs.includes(value)) {
    return {
      slug: value,
      title: titles[slugs.findIndex((v) => v === value)],
    };
  }

  return null;
};

// Function to extract the diamond ID from the slug
export const getDiamondIdFromSlug = (slug: string) => {
  if (!slug) return null;

  const clarities = ACCEPTABLE_CLARITIES;

  const slugUpperCase = slug.toUpperCase();

  const clarityMatchArr = clarities.map((v) => `-${v}-`);

  const clarityMatch = clarityMatchArr.find((v) => slugUpperCase.includes(v));

  if (!clarityMatch) return null;

  const idUpperCase = slugUpperCase.split(clarityMatch).pop();

  return idUpperCase;
};

/**
 * INVENTORY Faceted Navigation Logic
 * Will take what's in the url parse it
 * ex: /diamonds/oval/VVS1,VVS2/Excellent/D,E,F
 * Parse it and return a params object for querying the diamond API.
 */

export const getDiamondOptionsFromUrl = (query, page) => {
  const validQueryType = [...DIAMOND_TABLE_DEFAULT_VALID_QUERIES];

  const getOptionsFromFacetedNav = (data: string[]) => {
    const obj: {
      clarity?: string;
      color?: string;
      cut?: string;
      diamondType?: string;
      handle?: string;
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
        obj.handle = value;
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
        if (DIAMOND_TABLE_DEFAULT_VALID_QUERIES.includes(k)) {
          const num = parseFloat(data[k]);

          if (typeof num !== 'number') {
            return { ...a };
          }
        }

        return { ...a, [k]: data[k] };
      }, {});
  };

  const getViewOptions = (data: Record<string, string> & { view: string }) => {
    const obj: {
      view?: 'toimoi' | 'pairs';
      caratMin?: number;
    } = {};

    if (data.view && (data.view === 'toimoi' || data.view === 'pairs')) {
      obj.view = data.view;
    }

    return obj;
  };

  if (page === 'diamondTable') {
    const options = { ...DIAMOND_TABLE_DEFAULT_OPTIONS, ...query };
    const optCaratMin = (options.caratMin && parseFloat(options.caratMin)) || null;
    const isDiamondPair = ['toimoi', 'pairs'].includes(options.view);

    const opt = {
      ...getOptionsFromFacetedNav(options.filterOptions),
      ...getOptionsFromQueryNav(options),
      ...getViewOptions(options),
      ...(!optCaratMin || (optCaratMin && optCaratMin < 1 && isDiamondPair)
        ? { caratMin: 0.5 }
        : !optCaratMin || (optCaratMin && optCaratMin < 1)
        ? { caratMin: 1 }
        : {}),
    };

    return opt;
  }

  if (page === 'diamondPDP') {
    return {
      ...getOptionsFromFacetedNav(query),
    };
  }
};

export const getDiamondShallowRoute = (options: { diamondType?: string }, overrideUrl?: string, pathsAsParams?: boolean) => {
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

  const defaultQueries = [...DIAMOND_TABLE_DEFAULT_VALID_QUERIES];

  if (pathsAsParams) {
    defaultQueries.push('cut');
    defaultQueries.push('clarity');
    defaultQueries.push('color');
  }

  const queries = defaultQueries.reduce((obj: Record<string, string>, qry: string) => {
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

  const route = `${overrideUrl ? overrideUrl : diamondRoutePlp}/${overrideUrl ? '' : segments.join('/')}${
    showQueryInUrl ? query : ''
  }`;

  return route;
};

/**
 * CFY Faceted Navigation Logic
 * Will take what's in the url parse it
 * ex: /diamonds/[diamondType] or /diamonds/results/[diamondType]
 * Parse it and return a params object for querying the diamond API.
 */

export const getCFYOptionsFromUrl = (query) => {
  const options: {
    diamondType?: string;
    [key: string]: string;
  } = {};

  const { diamondType } = query;

  if (diamondType && diamondOption.isDiamondType(diamondType)) {
    options.diamondType = getDiamondType(diamondType).slug;
  }

  const getOptionsFromQueryNav = (data: { key: string; value: string }) => {
    const validQueryType = [...DIAMOND_CFY_VALID_QUERIES];

    return Object.keys(data)
      .filter((k) => validQueryType.includes(k))
      .reduce((a: object, k: string) => ({ ...a, [k]: data[k] }), {});
  };

  return {
    ...options,
    ...getOptionsFromQueryNav(query),
  };
};

export const getCFYShallowRoute = (options, page, router) => {
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

  const base = page === 'diamondCfyResult' ? diamondRouteCfyResult : diamondRouteCfy;

  const showQueryInUrl = true;

  const { collectionSlug, productSlug } = router.query;

  const route = `${base}/${segments.join('/')}${showQueryInUrl ? query : ''}${
    collectionSlug ? `&collectionSlug=${collectionSlug}` : ''
  }${productSlug ? `&productSlug=${productSlug}` : ''}`;

  return route;
};

/**
 * CFY Result Faceted Navigation Logic
 * Will take what's in the url parse it
 * ex: /diamonds/[diamondType] or /diamonds/results/[diamondType]
 * Parse it and return a params object for querying the diamond API.
 */

export const getCFYResultOptionsFromUrl = (query) => {
  const options: {
    diamondType?: string;
    [key: string]: string;
  } = {};

  const { diamondType } = query;

  if (diamondType && diamondOption.isDiamondType(diamondType)) {
    options.diamondType = getDiamondType(diamondType).slug;
  }

  const getOptionsFromQueryNav = (data: { key: string; value: string }) => {
    const validQueryType = [...DIAMOND_CFY_VALID_QUERIES];

    return Object.keys(data)
      .filter((k) => validQueryType.includes(k))
      .reduce((a: object, k: string) => ({ ...a, [k]: data[k] }), {});
  };

  const result = {
    ...options,
    ...getOptionsFromQueryNav(query),
  };

  if (!result['carat']) result['carat'] = '3.0';

  return result;
};
