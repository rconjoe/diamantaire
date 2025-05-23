import { queries } from '@diamantaire/darkside/data/queries';
import { DEFAULT_LOCALE } from '@diamantaire/shared/constants';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ReactNode } from 'react';

export const humanNamesMapperType = {
  UI_STRINGS: 'UI_STRINGS',
  METALS_IN_HUMAN_NAMES: 'METALS_IN_HUMAN_NAMES',
  UI_STRINGS_2: 'UI_STRINGS_2',
  METALS_WITH_GOLD_PURITIES_IN_HUMAN_NAMES: 'METALS_WITH_GOLD_PURITIES_IN_HUMAN_NAMES',
  JEWELRY_SUB_CATEGORY_HUMAN_NAMES: 'JEWELRY_SUB_CATEGORY_HUMAN_NAMES',
  METALS_IN_HUMAN_NAMES_WITH_DEFAULT_GOLD_PURITIES: 'METALS_IN_HUMAN_NAMES_WITH_DEFAULT_GOLD_PURITIES',
  OPTION_NAMES: 'OPTION_NAMES',
  DIAMOND_SHAPES: 'DIAMOND_SHAPES',
  HIDDEN_HALO_HUMAN_NAMES: 'HIDDEN_HALO_HUMAN_NAMES',
  BAND_WIDTH_LABEL_HUMAN_NAMES: 'BAND_WIDTH_LABEL_HUMAN_NAMES',
  BAND_WIDTH_HUMAN_NAMES: 'BAND_WIDTH_HUMAN_NAMES',
  CARAT_WEIGHT_HUMAN_NAMES: 'CARAT_WEIGHT_HUMAN_NAMES',
  LANGUAGES: 'LANGUAGES',
  SIZE_UNIT_LABEL_MAP: 'SIZE_UNIT_LABEL_MAP',
  CERAMIC_COLOR_OPTION_HUMAN_NAMES: 'CERAMIC_COLOR_OPTION_HUMAN_NAMES',
  TAGS: 'TAGS',
  BUILDER_NAV_TITLES: 'BUILDER_NAV_TITLES',
  BAND_ACCENT_CATEGORY_SHORT_HUMAN_NAMES: 'BAND_ACCENT_CATEGORY_SHORT_HUMAN_NAMES',
  DIAMOND_SPECS: 'DIAMOND_SPECS',
  DIAMOND_CUTS: 'DIAMOND_CUTS',
  PRICE_RANGE_OPTIONS_HUMAN_NAMES: 'PRICE_RANGE_OPTIONS_HUMAN_NAMES',
  PRODUCT_TYPES: 'PRODUCT_TYPES',
} as const;

type HumanNameMapperResponse = {
  allHumanNamesMappers: {
    map: {
      key: string;
      value: string;
    }[];
    title: (typeof humanNamesMapperType)[keyof typeof humanNamesMapperType];
  }[];
};

export default useTranslations;

const replacementRegExp = new RegExp('%%(.*?)%%', 'g');

/* Usage */
// useTranslations('en-US',[humanNamesMapperType.TAGS, humanNamesMapperType.UI_STRINGS])
// _t('replace this string');
// _t('replace this string with %%this%%', ['that']);
// _t('replace this string with %%this%% and %%that%%', ['that', 'this']);
// _t('replace this string with %%this%% and %%that%%', ['that', <ReactComponent>]);

export function useTranslations(
  locale = DEFAULT_LOCALE,
  category?: (typeof humanNamesMapperType)[keyof typeof humanNamesMapperType][],
) {
  const { data }: UseQueryResult<HumanNameMapperResponse, unknown> = useQuery({ ...queries.template.global(locale) });

  const { allHumanNamesMappers = [] } = data || {};

  const replaceElements = (arr1, arr2, arr3) => {
    return arr3.map((elem) => {
      const index = arr2.indexOf(elem);

      if (index !== -1) {
        return arr1[index];
      }

      return elem;
    });
  };

  const translations = category
    ? allHumanNamesMappers?.reduce((acc, v) => {
        const { map, title } = v;

        if (category.includes(title)) {
          map.forEach(({ key, value }) => (acc[key] = value));
        }

        return acc;
      }, {})
    : allHumanNamesMappers?.reduce((acc, v) => {
        const { map } = v;

        map.forEach(({ key, value }) => (acc[key] = value));

        return acc;
      }, {});

  function _t(key: string, replacements?: (string | ReactNode)[]) {
    if (!translations) {
      return key;
    }

    if (!replacements) {
      return translations[key] || key;
    } else {
      const newStrArr: string[] = translations[key].split(replacementRegExp);

      const matches = (translations[key].match(replacementRegExp) || []).map((match) => match.slice(2, -2));

      return replaceElements(replacements, matches, newStrArr).join('');
    }
  }

  return { _t };
}
