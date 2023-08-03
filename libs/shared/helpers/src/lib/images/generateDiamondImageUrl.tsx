import qs from 'querystring';

import { IMAGE_BASE_URL, APPROVED_IMGIX_PARAMS } from '@diamantaire/shared/constants';

import { getDiamondType } from '../diamonds';

type ImageParams = { [key: string]: any };

const getApprovedImgixParams = (imageParams: ImageParams): ImageParams => {
  return Object.keys(imageParams).reduce((acc, cur) => {
    if (APPROVED_IMGIX_PARAMS.includes(cur)) {
      acc[cur] = imageParams[cur];
    }

    return acc;
  }, {});
};

const getQueryString = ({ noParams = false, quality = 25, ...rest }: ImageParams): string => {
  if (noParams) return '';

  const approvedImgxParams = getApprovedImgixParams(rest);

  const params: ImageParams = {
    q: quality,
    ...approvedImgxParams,
  };

  if (!approvedImgxParams['fm']) {
    params['auto'] = 'format';
  }

  return '?' + qs.stringify(params);
};

const getCdnImageUrl = (section) => {
  return (...nameSegments) => {
    return (imageParams: ImageParams = {} as ImageParams) => {
      const name = nameSegments.join('-');
      const { ext = 'jpg' } = imageParams;
      const queryString = getQueryString(imageParams);

      return `${IMAGE_BASE_URL}/${encodeURIComponent(section)}/${encodeURIComponent(name)}.${ext}${queryString}`;
    };
  };
};

const cdnImageUrl =
  (section) =>
  (...nameSegments) =>
  (imageParams: { ext?: string } = {}) => {
    const name = nameSegments.join('-');
    const { ext = 'jpg' } = imageParams;
    const queryString = getQueryString(imageParams);

    return `${IMAGE_BASE_URL}/${encodeURIComponent(section)}/${encodeURIComponent(name)}.${ext}${queryString}`;
  };

const getIconImageUrl = (s3Slug, ext = 'png') => {
  return cdnImageUrl('icons')(s3Slug)({ ext });
};

const generateDiamondImageUrl = (type, directory = 'diamond-images-new') => {
  const trim = '&trim-color=transparent&trim=color';
  const slug = getDiamondType(type).slug;

  return `${
    getCdnImageUrl(directory)(slug)({
      ext: 'png',
      quality: 60,
    }) + trim
  }`;
};

export default generateDiamondImageUrl;

export { generateDiamondImageUrl, getIconImageUrl };
