import _viewport from 'viewport-dimensions';
import { toNumber } from './';
import { MOBILE_MAX_WIDTH } from '@diamantaire/shared/constants';

const isMobile = ({ viewport = _viewport } = {}) => {
  return viewport.width() <= toNumber(MOBILE_MAX_WIDTH);
};

export default isMobile;
