import { queryDatoGQL } from '../../clients';
import { showroomNav as SHOWROOM_NAV_QUERY } from '../../standard-page/component-queries/showroomNav';

export async function fetchShowroomNav(locale: string) {
  const navData = await queryDatoGQL({
    query: SHOWROOM_NAV_QUERY,
    variables: { locale },
  });

  return navData;
}
