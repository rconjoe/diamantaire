export function getRelativeUrl(url: string, basePath?: string) {
  if (url.includes('http')) {
    let { pathname } = new URL(url);

    if (basePath) {
      pathname = pathname.replace(basePath, '');
    }

    return pathname;
  }

  if (basePath) {
    url = url.replace(basePath, '');
  }

  return url;
}
