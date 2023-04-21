import { queryDatoGQL } from '../../clients';

const HUMAN_NAME_MAPPER_QUERY = `
    query humanNameMappers($locale: SiteLocale) {
        allHumanNamesMappers(locale: $locale) {
            title
            map {
                key
                value
            }
        }
    }
  `;

export async function fetchHumanMapperData(locale: string) {
  const mapperData = await queryDatoGQL({
    query: HUMAN_NAME_MAPPER_QUERY,
    variables: { locale },
  });

  // Transforms our data into an array of key/value objects
  const updatedData = {};

  mapperData?.allHumanNamesMappers.map((item) => {
    const updatedItem = {};

    item.map.map((data) => {
      updatedItem[data.key] = data;
    });

    updatedData[item.title] = updatedItem;
  });

  console.log('updatedData', updatedData);

  return updatedData;
}
