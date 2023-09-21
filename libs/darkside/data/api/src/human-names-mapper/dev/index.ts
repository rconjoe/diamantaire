import { queryDatoGQL } from '../../clients';

type MapperProps = {
  title: string;
  itemMap: {
    key: string;
    title: string;
  }[];
};

const HUMAN_NAME_MAPPER_QUERY = `
    query humanNameMappers($locale: SiteLocale) {
        allHumanNamesMappers(locale: $locale, first: "100") {
            title
            itemMap: map {
                key
                value
            }
        }
    }
  `;

export async function fetchHumanMapperData(locale: string) {
  const mapperData = (await queryDatoGQL({
    query: HUMAN_NAME_MAPPER_QUERY,
    variables: { locale },
  })) as { allHumanNamesMappers: MapperProps[] };

  // Transforms our data into an array of key/value objects
  const updatedData = {};

  mapperData?.allHumanNamesMappers.map((item) => {
    const updatedItem = {};
    const { itemMap } = item;

    itemMap.map((data) => {
      return (updatedItem[data.key] = data);
    });

    return (updatedData[item.title] = updatedItem);
  });

  return updatedData;
}
