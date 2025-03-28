import { MobileDesktopImage, ImageTile, UniLink } from '@diamantaire/darkside/components/common-ui';
import { getBlockPictureAlt, normalizeDatoNumberedContent } from '@diamantaire/shared/helpers';
import { DatoImageType, DatoDarksideButtonProps } from '@diamantaire/shared/types';
import clsx from 'clsx';

import { ModularHalfWidthQuadBlockContainer } from './ModularHalfWidthQuadBlock.style';

type ModularHalfWidthQuadBlockProps = {
  id: string;
  desktopImage: DatoImageType;
  mobileImage: DatoImageType;
  imageAlignment: string;
  ctaRoute?: string;
  route?: string;
  blocks: unknown[];
  shouldLazyLoad?: boolean;
  darksideButtons: DatoDarksideButtonProps[];
};

const ModularHalfWidthQuadBlock = (props: ModularHalfWidthQuadBlockProps) => {
  const { id, desktopImage, mobileImage, imageAlignment, ctaRoute, route } = props;

  const arrayOfAttributes = ['copy', 'image', 'title', 'darksideButtons'];
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
        {!(route || ctaRoute) && <MobileDesktopImage desktopImage={desktopImage} mobileImage={mobileImage} alt={alt} />}
        {(route || ctaRoute) && (
          <UniLink route={route || ctaRoute}>
            <MobileDesktopImage desktopImage={desktopImage} mobileImage={mobileImage} alt={alt} />
          </UniLink>
        )}

        <div className="quad__block-container">
          {blocks.map((block, index) => {
            return (
              <div key={`${id}-${index}-${block.title}-container`} className="quad__image-tile-container">
                <ImageTile key={`${id}-${index}-${block.title}`} {...block} ctaRoute={block.darksideButtons[0]?.ctaLinkUrl}/>
              </div>
            );
          })}
        </div>
      </div>
    </ModularHalfWidthQuadBlockContainer>
  );
};

export default ModularHalfWidthQuadBlock;
