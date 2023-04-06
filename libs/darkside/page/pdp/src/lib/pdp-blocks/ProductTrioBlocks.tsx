import { ImageTile } from '@diamantaire/darkside/components/common-ui';
import { media } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const ProductTrioBlocksContainer = styled.div`
  padding: calc(var(--gutter) * 1.3) 0 0;

  ${media.medium`display: flex;`}

  > * {
    flex: 0 0 33.33%;
  }
`;

const ProductTrioBlocks = ({ blocks }) => {
  return (
    <ProductTrioBlocksContainer className="container-emotion">
      {blocks?.map((item, index) => {
        const { title, copy, image, ctaCopy, ctaRoute } = item || {};

        return (
          <ImageTile
            title={title}
            copy={copy}
            image={image}
            ctaCopy={ctaCopy}
            ctaRoute={ctaRoute}
            key={`trio-block-${index}`}
          />
        );
      })}
    </ProductTrioBlocksContainer>
  );
};

export default ProductTrioBlocks;
