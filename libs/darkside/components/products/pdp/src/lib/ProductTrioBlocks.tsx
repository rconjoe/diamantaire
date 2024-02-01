// TODO: Consolidate this component with the one in the darkside blockpicker library

import { ImageTile } from '@diamantaire/darkside/components/common-ui';
import { useProductTrioBlock } from '@diamantaire/darkside/data/hooks';
import { contentBlockMargin, media } from '@diamantaire/styles/darkside-styles';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ProductTrioBlocksContainer = styled.div`
  ${contentBlockMargin}
  display: grid;
  gap: 2rem;

  ${media.medium`
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
    `}
`;

const ProductTrioBlocks = ({ trioBlocksId }) => {
  const { locale } = useRouter();
  const { data: { trioBlock: { blocks } = {} } = {} } = useProductTrioBlock(trioBlocksId, locale);

  return (
    <ProductTrioBlocksContainer className="container-wrapper">
      {blocks?.map((item, index) => {
        const { title, copy, image, ctaCopy, ctaRoute, darksideButtons } = item || {};

        return (
          <ImageTile
            title={title}
            copy={copy}
            image={image}
            ctaCopy={ctaCopy}
            ctaRoute={ctaRoute}
            darksideButtons={darksideButtons}
            key={`trio-block-${index}`}
          />
        );
      })}
    </ProductTrioBlocksContainer>
  );
};

export { ProductTrioBlocks };
