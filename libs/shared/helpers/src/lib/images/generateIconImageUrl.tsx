import { generateImageUrl } from './generateImageUrl';

export function generateIconImageUrl(imageName: string, extension = 'jpg') {
  return generateImageUrl(`icons`, imageName, extension);
}
