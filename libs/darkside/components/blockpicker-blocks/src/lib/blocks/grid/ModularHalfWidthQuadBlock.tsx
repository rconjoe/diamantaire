import { MobileDesktopImage, ImageTile, UniLink } from '@diamantaire/darkside/components/common-ui';
import { getBlockPictureAlt, normalizeDatoNumberedContent } from '@diamantaire/shared/helpers';
import { DatoImageType } from '@diamantaire/shared/types';
import clsx from 'clsx';

import { ModularHalfWidthQuadBlockContainer } from './ModularHalfWidthQuadBlock.style';

type ModularHalfWidthQuadBlockProps = {
  id: string;
  desktopImage: DatoImageType;
  mobileImage: DatoImageType;
  imageAlignment: string;
  ctaRoute?: string;
  blocks: unknown[];
  shouldLazyLoad?: boolean;
};

const ModularHalfWidthQuadBlock = (props: ModularHalfWidthQuadBlockProps) => {
  const { id, desktopImage, mobileImage, imageAlignment, ctaRoute } = props;

  const arrayOfAttributes = ['copy', 'image', 'title'];
  const blocks = normalizeDatoNumberedContent(props, arrayOfAttributes);

  if (!blocks) {
    return null;
  }

  const alt = getBlockPictureAlt({
    desktopImage,
    mobileImage,
  });

  return (
    <ModularHalfWidthQuadBlockContainer className="container-wrapper" $imageAlignment={imageAlignment}>
      <div className={clsx('quad__image-quad-container')}>
        {!ctaRoute && <MobileDesktopImage desktopImage={desktopImage} mobileImage={mobileImage} alt={alt} />}
        {ctaRoute && (
          <UniLink route={ctaRoute}>
            <MobileDesktopImage desktopImage={desktopImage} mobileImage={mobileImage} alt={alt} />
          </UniLink>
        )}

        <div className="quad__block-container">
          {blocks.map((block, index) => {
            return (
              <div key={`${id}-${index}-${block.title}-container`} className="quad__image-tile-container">
                <ImageTile key={`${id}-${index}-${block.title}`} {...block} />
              </div>
            );
          })}
        </div>
      </div>
    </ModularHalfWidthQuadBlockContainer>
  );
};

export default ModularHalfWidthQuadBlock;
