import { BASE } from './setSpace';

/**
 * Util to convert our domain specific rem into pixel values
 * x10 because our root font is 10px
 * @param  {Number} space  - How many increments of space to convert
 * @return {Number}        - Calculated pixel value
 */
const spaceToPixelValue = (space) => {
  const pixelValue = space * (BASE * 10);

  return pixelValue;
};

export { spaceToPixelValue };
