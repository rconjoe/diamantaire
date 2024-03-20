import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import { Heading } from '@diamantaire/darkside/components/common-ui';
import { CtoDiamondPromoBlock } from '@diamantaire/darkside/data/hooks';

import StyledDiamondCfyAsidePromo from './DiamondCfyAsidePromo.style';

type DiamondCfyAsidePromoProps = {
  data: {
    title: string;
    content: {
      blocks: CtoDiamondPromoBlock[];
    };
  }[];
};

const DiamondCfyAsidePromo = (props: DiamondCfyAsidePromoProps) => {
  const { data } = props;

  const blockList = data?.map((contentBlock, index) => {
    const { title: masterTitle, content: { blocks } = {} } = contentBlock;

    return (
      <div key={`blocks-${index}`}>
        <Heading type="h2" className="section-title">
          {masterTitle}
        </Heading>

        <div className="blocks">
          {blocks &&
            blocks?.map((block, idx) => {
              const { id, _modelApiKey, title } = block;

              if (title.includes('LEONARDO DICAPRIO')) {
                block.additionalClass = 'leo';
              }
              const contentIsAboveFold = idx < 2;
              const shouldLazyLoad = contentIsAboveFold ? false : true;

              return (
                <BlockPicker key={id} _modelApiKey={_modelApiKey} modularBlockData={block} shouldLazyLoad={shouldLazyLoad} />
              );
            })}
        </div>
      </div>
    );
  });

  return <StyledDiamondCfyAsidePromo>{blockList}</StyledDiamondCfyAsidePromo>;
};

export { DiamondCfyAsidePromo };

export default DiamondCfyAsidePromo;
