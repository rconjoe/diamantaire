import { IMAGE_BASE_URL } from '@diamantaire/shared/constants';

export function generateImageUrl(path: string, imageName: string, extension = 'jpg') {
  return `${IMAGE_BASE_URL}/${path}/${imageName}.${extension}`;
}
