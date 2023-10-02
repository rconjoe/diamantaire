import { DIAMOND_VIDEO_BASE_URL } from '@diamantaire/shared/constants';

const generateDiamondSpriteUrl = (lotId: string, format: string): string => {
  const corsIssueHackUsingQuery = `timestamp=${new Date()}`;

  const url = `${DIAMOND_VIDEO_BASE_URL}/${lotId}.${format}?${corsIssueHackUsingQuery}`;

  return url;
};

const generateCfyDiamondSpriteThumbUrl = (diamondType: string): string => {
  const corsIssueHackUsingQuery = `timestamp=${new Date()}`;

  const url = `${DIAMOND_VIDEO_BASE_URL}/cfy-${diamondType}-thumb.jpg?${corsIssueHackUsingQuery}`;

  return url;
};

export { generateCfyDiamondSpriteThumbUrl, generateDiamondSpriteUrl };
