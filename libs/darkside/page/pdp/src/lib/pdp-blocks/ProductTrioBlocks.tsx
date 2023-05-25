// TODO: Consolidate this component with the one in the darkside blockpicker library

import { ImageTile } from '@diamantaire/darkside/components/common-ui';
import { useProductTrioBlock } from '@diamantaire/darkside/data/hooks';
import { media } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const ProductTrioBlocksContainer = styled.div`
  ${media.medium`display: flex; padding: calc(var(--gutter) * 1.3) 0 0;`}

  > * {
    flex: 0 0 33.33%;
  }
`;

const ProductTrioBlocks = ({ trioBlocksId }) => {
  const { data: { trioBlock: { blocks } } = {} } = useProductTrioBlock(trioBlocksId, 'en_US');

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
