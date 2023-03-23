import { DatoImage } from '@diamantaire/darkside/components/common-ui';
import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
import clsx from 'clsx';

import { DiamondLeoBlockContainer } from './ModularDiamondLeoBlock.style';

type DiamondLeoBlockProps = {
  extraClass?: string;
  title?: string;
  copy?: string;
  image?: {
    width: number;
    height: number;
    url: string;
  };
  shouldLazyLoad?: boolean;
};

const DiamondLeoBlock = ({ extraClass = 'blockquote', title, copy, image, shouldLazyLoad }: DiamondLeoBlockProps) => {
  const alt = getBlockPictureAlt({ image, title });

  return (
    <DiamondLeoBlockContainer>
      <div
        className={clsx('diamond-leo__wrapper', {
          '-blockquote': extraClass === 'blockquote',
        })}
      >
        <p className="diamond-leo__name">{title}</p>
        <p
          className={clsx('diamond-leo__quote', {
            '-blockquote': extraClass === 'blockquote',
          })}
        >
          {copy}
        </p>
        <DatoImage
          className={clsx('diamond-leo__signature', {
            '-blockquote': extraClass === 'blockquote',
          })}
          image={image}
          overrideAlt={alt}
          shouldLazyLoad={shouldLazyLoad}
        />
      </div>
    </DiamondLeoBlockContainer>
  );
};

export default DiamondLeoBlock;
