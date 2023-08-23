import { Heading } from '@diamantaire/darkside/components/common-ui';
import { useDiamondCfyData } from '@diamantaire/darkside/data/hooks';

import StyledDiamondCfyFilters from './DiamondCfyFilters.style';

const DiamondCfyFilters = (props) => {
  const { locale } = props;
  const { data: { ctoDiamondTable } = {} } = useDiamondCfyData(locale);
  const { diamondSelectorTitle } = ctoDiamondTable;

  return (
    <StyledDiamondCfyFilters>
      <Heading type="h2">{diamondSelectorTitle}</Heading>
    </StyledDiamondCfyFilters>
  );
};

export { DiamondCfyFilters };

export default DiamondCfyFilters;
