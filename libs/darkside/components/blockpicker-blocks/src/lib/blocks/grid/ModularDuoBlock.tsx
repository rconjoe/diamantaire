import { Heading, ImageTile } from '@diamantaire/darkside/components/common-ui';
import clsx from 'clsx';

import { ModularDuoBlockContainer } from './ModularDuoBlock.style';

type ModularDuoBlockProps = {
  blocks?: Array<{
    ctaRoute: string;
    title?: string;
    media: {
      image;
    };
  }>;
  shouldLazyLoad?: boolean;
  title?: string;
  blurb?: string;
  id?: string;
  headingType?: string;
  headingAdditionalClass?: string;
  additionalClass?: string;
};

const ModularDuoBlock = ({
  blocks,
  title,
  blurb,
  id,
  headingType,
  headingAdditionalClass,
  additionalClass,
}: ModularDuoBlockProps) => {
  return (
    <ModularDuoBlockContainer className={clsx('container-emotion mod-duo__container', additionalClass)}>
      {title && (
        <Heading type={headingType} className={clsx('mod-duo__title primary', headingAdditionalClass)}>
          {title}
        </Heading>
      )}

      {blurb && <p className="mod-duo__blurb">{blurb}</p>}

      <div className="mod-duo__with-swiper">
        <div className="mod-duo__media">
          {blocks.map((block, index) => (
            <ImageTile key={`${id}-${index}-${block.title}`} ctaRoute={block.ctaRoute} image={block.media.image} />
          ))}
        </div>
      </div>
    </ModularDuoBlockContainer>
  );
};

export default ModularDuoBlock;
