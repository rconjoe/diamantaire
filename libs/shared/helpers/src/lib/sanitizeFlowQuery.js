import { SETTING_FLOW, DIAMOND_FLOW } from '@diamantaire/shared/constants';

const isSetting = (flow) => flow === SETTING_FLOW;
const isDiamond = (flow) => flow === DIAMOND_FLOW;

const sanitizeFlowQuery = (flow) => {
  if (!isSetting(flow) && !isDiamond(flow)) {
    return SETTING_FLOW;
  }

  return isSetting(flow) ? SETTING_FLOW : DIAMOND_FLOW;
};

export default sanitizeFlowQuery;
