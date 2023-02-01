import {
  CARAT_OPTIONS,
  CARAT_OPTIONS_IN_HUMAN_NAMES,
} from '@diamantaire/shared/constants';

export const getFractionSizeName = ({
  availableArray = CARAT_OPTIONS,
  optionsMap = CARAT_OPTIONS_IN_HUMAN_NAMES,
  option,
}) => {
  return availableArray.includes(option) ? optionsMap[option] : option;
};

export default getFractionSizeName;
