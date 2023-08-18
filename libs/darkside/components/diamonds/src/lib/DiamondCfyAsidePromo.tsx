import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import { Heading } from '@diamantaire/darkside/components/common-ui';
import { CtoDiamondPromoBlock } from '@diamantaire/darkside/data/hooks';

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

  return data?.map((contentBlock, index) => {
    const { title, content: { blocks } = {} } = contentBlock;

    return (
      <div key={`placeholder-${index}`}>
        <Heading type="h2" className="section-title">
          {title}
        </Heading>

        <div className="blocks">
          {blocks &&
            blocks?.map((block) => {
              const { id, _modelApiKey } = block;

              if (title.includes('LEONARDO DICAPRIO')) {
                block.additionalClass = 'leo';
              }

              return <BlockPicker key={id} _modelApiKey={_modelApiKey} modularBlockData={block} />;
            })}
        </div>
      </div>
    );
  });
};

export { DiamondCfyAsidePromo };

export default DiamondCfyAsidePromo;
