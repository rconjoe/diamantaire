import { put } from '@vercel/blob';
import axios from 'axios';

import 'dotenv/config';

const LANGUAGES = ['en_US', 'fr', 'de', 'es'];

const ALL_HUMAN_NAME_MAPPERS = `
  query getAllHumanNameMappers($locale: SiteLocale) {
    allHumanNamesMappers(locale: $locale) {
      title
      map {
        key
        value
      }
    }
  }
`;

async function getHumanNameMappers(locale = 'en_US') {
  const response = await axios({
    method: 'post',
    url: process.env['DATO_GRAPHQL_URI'] || `https://graphql.datocms.com/preview`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env['DATO_READ_ONLY_TOKEN']}`,
    },
    data: {
      query: ALL_HUMAN_NAME_MAPPERS,
      variables: {
        locale,
      },
    },
  });

  if (response.status === 200) {
    console.log('Successful request');

    return response.data.data.allHumanNamesMappers;
  } else {
    console.log('Error retrieving data');
  }
}

type HumanNameMapper = {
  title: string;
  map: {
    key: string;
    value: string;
  }[];
};

function convertHumanNameMappersArrayIntoFlatMap(humanNameMappers: HumanNameMapper[]) {
  const flatMap = new Map<string, string>();

  humanNameMappers.forEach((humanNameMapper) => {
    humanNameMapper.map.forEach((map) => {
      flatMap.set(map.key, map.value);
    });
  });

  return flatMap;
}

async function createLanguageJsonFile(humanNameMappers: HumanNameMapper[], locale: string) {
  const flatMap = convertHumanNameMappersArrayIntoFlatMap(humanNameMappers);

  const filename = `locale/${locale === 'en_US' ? 'en' : locale}.json`;

  const { url } = await put(filename, JSON.stringify(flatMap), { access: 'public' });

  console.log('File uploaded to', url);
}

async function createAllLanguageJsonFiles() {
  LANGUAGES.forEach(async (locale) => {
    console.log('Creating language json file for locale:', locale);
    const data = await getHumanNameMappers(locale);

    console.log('data', data);

    await createLanguageJsonFile(data, locale);
  });
}

createAllLanguageJsonFiles();
