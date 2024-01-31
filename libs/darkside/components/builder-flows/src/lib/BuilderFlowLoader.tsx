import { Loader } from '@diamantaire/darkside/components/common-ui';
import styled from 'styled-components';

const BuilderFlowLoaderStyles = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BuilderFlowLoader = () => {
  return (
    <BuilderFlowLoaderStyles>
      <Loader color="#000" />
    </BuilderFlowLoaderStyles>
  );
};

export { BuilderFlowLoader };
