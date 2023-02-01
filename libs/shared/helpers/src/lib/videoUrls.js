import { pickBy } from 'lodash';

import { BP_IOS_PLUS } from '@diamantaire/shared/constants';

const PRODUCT_VIDEO_SLUG_METAL = 'yellow-gold';
const PRODUCT_VIDEO_SLUG_ORDER = '1';

// Logic originated from HomeTryOnTopBoxVideo
export const getVideoAttributes = (
  videoSettings,
  windowWidth = window.innerWidth
) => {
  if (windowWidth > parseInt(BP_IOS_PLUS, 10)) {
    if (videoSettings && videoSettings.desktop) {
      return {
        width: videoSettings.desktop.width || '960',
        height: videoSettings.desktop.height || '540',
        dpr: videoSettings.desktop.dpr || 'auto',
        crop:
          videoSettings.desktop.crop !== undefined
            ? videoSettings.desktop.crop
            : true,
      };
    }
    // video dimensions of 9x7 for desktop

    return {
      width: '960',
      height: '540',
      dpr: 'auto',
      crop: true,
    };
  } else {
    if (videoSettings && videoSettings.mobile) {
      return {
        width: videoSettings.mobile.width || '375',
        height: videoSettings.mobile.height || '210',
        dpr: videoSettings.mobile.dpr || '3.0',
        crop:
          videoSettings.mobile.crop !== undefined
            ? videoSettings.mobile.crop
            : true,
      };
    }
    // video dimensions for 9x7 on mobile

    return {
      width: '375',
      height: '210',
      dpr: '3.0',
      crop: true,
    };
  }
};

export const VIDEO_URL_OPTIONS_ORDER = [
  'slug',
  'diamondType',
  'sideStoneCarat',
  'bandWidth',
  'bandAccent',
  'metal',
  'order',
];

export const addVideoSettings = ({ dpr, height, width, crop }) => {
  const settings = [
    crop && 'c_crop',
    dpr && `dpr_${dpr}`,
    'f_auto',
    'fl_force_strip.lossy.progressive:semi',
    height && `h_${height}`,
    'q_62:qmax_32',
    'vc_auto',
    width && `w_${width}`,
  ].filter(Boolean);

  return settings;
};

const addStaticProductOptionsForVideo = (productVideoParams) => {
  return {
    ...productVideoParams,
    metal: PRODUCT_VIDEO_SLUG_METAL,
    order: PRODUCT_VIDEO_SLUG_ORDER,
  };
};

const getProductVideoSectionsInOrder = (productVideoParams) => {
  return VIDEO_URL_OPTIONS_ORDER.reduce(
    (selectedParameterValues, paramName) => {
      if (productVideoParams[paramName]) {
        const parameterValue = productVideoParams[paramName];

        return [...selectedParameterValues, parameterValue];
      }

      return selectedParameterValues;
    },
    []
  );
};

// 1.5mm -> 1-5mm
// 0.50ct -> 0-50ct
const normalizeSlugSections = (videoUrlSlugSections) => {
  return videoUrlSlugSections.map((section) => section.replace('.', '-'));
};

export const makeOmegaProductVideoSlug = (productOptions) => {
  const productOptionsWithValues = pickBy(productOptions);

  const productVideoParams = addStaticProductOptionsForVideo(
    productOptionsWithValues
  );

  const productVideoSectionsInOrder =
    getProductVideoSectionsInOrder(productVideoParams);

  const normalizedProductVideoSections = normalizeSlugSections(
    productVideoSectionsInOrder
  );

  const productVideoUrlSlug = normalizedProductVideoSections.join('-');

  return productVideoUrlSlug;
};
