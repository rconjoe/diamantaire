import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import { Heading } from '@diamantaire/darkside/components/common-ui';
import { CtoDiamondPromoBlockTypes } from '@diamantaire/darkside/data/hooks';

import StyledDiamondCfyAsidePromo from './DiamondCfyAsidePromo.style';

type DiamondCfyAsidePromoProps = {
  data: {
    title: string;
    content: {
      blocks: CtoDiamondPromoBlockTypes[];
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
            blocks?.map((block) => {
              const { id, _modelApiKey, title } = block;

              if (title.includes('LEONARDO DICAPRIO')) {
                block.additionalClass = 'leo';
              }

              return <BlockPicker key={id} _modelApiKey={_modelApiKey} modularBlockData={block} />;
            })}
        </div>
      </div>
    );
  });

  return <StyledDiamondCfyAsidePromo>{blockList}</StyledDiamondCfyAsidePromo>;
};

export { DiamondCfyAsidePromo };

export default DiamondCfyAsidePromo;
