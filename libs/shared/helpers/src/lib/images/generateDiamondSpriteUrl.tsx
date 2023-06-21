import { DIAMOND_VIDEO_BASE_URL } from '@diamantaire/shared/constants';

const generateDiamondSpriteUrl = (lotId: string, format: string): string => {
  const corsIssueHackUsingQuery = `timestamp=${new Date()}`;

  const url = `${DIAMOND_VIDEO_BASE_URL}/${lotId}.${format}?${corsIssueHackUsingQuery}`;

  return url;
};

export default generateDiamondSpriteUrl;

export { generateDiamondSpriteUrl };
