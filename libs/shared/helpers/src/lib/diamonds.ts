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
} from '@diamantaire/shared/constants';
import { diamondRoutePlp } from '@diamantaire/shared/routes';

export const diamondOption = {
  isClarity: (v) => DIAMOND_TABLE_VALID_CLARITIES.includes(v || v.toLowercase()),
  isCut: (v) => DIAMOND_TABLE_VALID_CUTS.includes(v || v.toLowercase()),
  isColor: (v) => DIAMOND_TABLE_VALID_COLORS.includes(v || v.toLowercase()),
  isType: (v) => !diamondOption.isSlug(v) && getDiamondType(v).title,
  isSlug: (v) => !isNaN(v.split('-').pop().substring(1)),
};

export const getDiamondType = (value: string) => {
  const titles = Object.keys(DIAMOND_TABLE_VALID_TYPES);

  const slugs = Object.values(DIAMOND_TABLE_VALID_TYPES);

  if (diamondOption.isSlug(value)) {
    const diamondTypeSegment = value?.split('-')?.[0];

    if (slugs.some((slug) => slug.includes(diamondTypeSegment))) {
      const index = slugs.findIndex((slug) => slug.includes(diamondTypeSegment));

      return {
        slug: slugs[index],
        title: titles[index],
      };
    }
  }

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
 * ex: /diamonds/Oval/VVS1,VVS2/Excellent/D,E,F
 * Parse it and return a params object for querying the diamond API.
 */

export const getDiamondsOptionsFromUrl = (query, page) => {
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

      if (arr.every(diamondOption.isType)) {
        obj.diamondType = arr
          .map(getDiamondType)
          .map((v) => v.title)
          .join();
      } else if (arr.every(diamondOption.isClarity)) {
        obj.clarity = value.toUpperCase();
      } else if (arr.every(diamondOption.isCut)) {
        obj.cut = value;
      } else if (arr.every(diamondOption.isColor)) {
        obj.color = value.toUpperCase();
      } else if (arr.every(diamondOption.isSlug)) {
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

    return {
      ...getOptionsFromFacetedNav(options.filterOptions),
      ...getOptionsFromQueryNav(options),
    };
  }

  if (page === 'diamondPDP') {
    return {
      ...getOptionsFromFacetedNav(query),
    };
  }
};

export const getDiamondsShallowRoute = (options) => {
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

  const showQueryInUrl = false;

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
  // TODO: Finish
  const options = { ...query };

  return options;
};
