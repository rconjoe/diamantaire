// This file takes specific blocks for the modular carousel block
import styled from 'styled-components';

import { blockConfig } from '../../BlockPicker';

const ModularCarouselOptionsStyles = styled.div``;

const ModularCarouselOptions = (props) => {
  const key = `modular_${props._modelApiKey}`;
  const SelectedBlock = blockConfig?.[key];

  return <ModularCarouselOptionsStyles>{SelectedBlock && <SelectedBlock {...props} />}</ModularCarouselOptionsStyles>;
};

export default ModularCarouselOptions;
