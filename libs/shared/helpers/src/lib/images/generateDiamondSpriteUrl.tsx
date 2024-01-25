import { DIAMOND_VIDEO_BASE_URL } from '@diamantaire/shared/constants';

const generateDiamondSpriteUrl = (lotId: string, format: string): string => {
  const url = `${DIAMOND_VIDEO_BASE_URL}/${lotId}.${format}`;

  return url;
};

const generateDiamondSpriteImage = ({ diamondID, diamondType }: { diamondID?: string; diamondType: string }): string => {
  let url = '';

  if (!diamondID || diamondType) {
    url = `/cfy-${diamondType}`;
  }

  if (diamondID) {
    if (!diamondID?.includes('cfy-')) {
      url = `/${diamondID.replace(/[a-zA-Z]/g, '')}`;
    }
  }

  return `${DIAMOND_VIDEO_BASE_URL}${url}-thumb.jpg`;
};

export { generateDiamondSpriteImage, generateDiamondSpriteUrl };
