import { queryDatoGQL } from '../../clients';
import { ShowroomNav as SHOWROOM_NAV_QUERY } from '../../nonModular';

export async function fetchShowroomNav(locale: string) {
  const navData = await queryDatoGQL({
    query: SHOWROOM_NAV_QUERY,
    variables: { locale },
  });

  return navData;
}
