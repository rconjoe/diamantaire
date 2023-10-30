import { queries } from '@diamantaire/darkside/data/queries';
import { DEFAULT_LOCALE } from '@diamantaire/shared/constants';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';

const replacementRegExp = new RegExp('%%(.*?)%%', 'g');

// Usage
// _t('replace this string');
// _t('replace this string with %%this%%', ['that']);
// _t('replace this string with %%this%% and %%that%%', ['that', 'this']);
// _t('replace this string with %%this%% and %%that%%', ['that', <ReactComponent>]);

export function useTranslations(locale = DEFAULT_LOCALE, category?: string) {
  const { data } = useQuery({ ...queries.template.global(locale) });

  const { allHumanNamesMappers = [] } = data || {};

  const translations = category
    ? allHumanNamesMappers?.reduce((acc, v) => {
        const { map, title } = v;

        if (title === category) {
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
      if (translations[key]) {
        return translations[key];
      } else {
        // console.warn('No translations found for key: ', key);\
        return key;
      }
    } else {
      const matches = key.match(replacementRegExp);

      if (matches.length !== replacements.length) {
        // console.warn('Number of replacements does not match number of placeholders');
        return key;
      } else {
        const ouputArray: (string | ReactNode)[] = [];
        const newStrArr: string[] = key.split(' ');

        for (let i = 0; i < newStrArr.length; i++) {
          let match = 1;
          const val = newStrArr[i];

          if (replacementRegExp.test(val)) {
            ouputArray.push(replacements[match]);
            match++;
          }
        }
      }
    }
  }

  return { _t };
}

export default useTranslations;
