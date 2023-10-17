import Cookies from 'js-cookie';

export function getUserGeo() {
  const isEmptyObject = (obj) => obj && Object.keys(obj).length === 0 && obj.constructor === Object;

  const geo =
    (Cookies.get('geo') && !isEmptyObject(JSON.parse(Cookies.get('geo'))) && JSON.parse(Cookies.get('geo'))) || undefined;

  return geo;
}
