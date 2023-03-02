import { Heading, ImageTile } from '@diamantaire/darkside/components/common-ui';
import clsx from 'clsx';

import { ModularDuoBlockContainer } from './ModularDuoBlock.style';

type ModularDuoBlockProps = {
  media?: Array<{
    title: string;
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
  media,
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
          {media.map((block, index) => (
            <ImageTile key={`${id}-${index}-${block.title}`} {...block} />
          ))}
        </div>
      </div>
    </ModularDuoBlockContainer>
  );
};

export default ModularDuoBlock;
