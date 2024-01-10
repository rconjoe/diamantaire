import { DIAMOND_VIDEO_BASE_URL } from '@diamantaire/shared/constants';

const generateDiamondSpriteUrl = (lotId: string, format: string): string => {
  const date = new Date();

  const url = `${DIAMOND_VIDEO_BASE_URL}/${lotId}.${format}?timestamp=${date.toJSON()}`;

  return url;
};

const generateCfyDiamondSpriteThumbUrl = (diamondType: string): string => {
  const date = new Date();

  const url = `${DIAMOND_VIDEO_BASE_URL}/cfy-${diamondType}-thumb.jpg?timestamp=${date.toJSON()}`;

  return url;
};

export { generateCfyDiamondSpriteThumbUrl, generateDiamondSpriteUrl };
