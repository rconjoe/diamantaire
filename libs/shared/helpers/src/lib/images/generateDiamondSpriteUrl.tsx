import { DIAMOND_VIDEO_BASE_URL } from '@diamantaire/shared/constants';

const generateDiamondSpriteUrl = (lotId: string, format: string): string => {
  const url = `${DIAMOND_VIDEO_BASE_URL}/${lotId}.${format}`;

  return url;
};

const generateCfyDiamondSpriteThumbUrl = (diamondID: string, diamondType?: string): string => {
  const url = diamondID?.includes('cfy-') ? `/cfy-${diamondType}` : `/${diamondID.replace(/[a-zA-Z]/g, '')}`;

  return `${DIAMOND_VIDEO_BASE_URL}${url}-thumb.jpg`;
};

export { generateCfyDiamondSpriteThumbUrl, generateDiamondSpriteUrl };
