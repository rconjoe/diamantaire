import { MobileDesktopImage, ImageTile } from '@diamantaire/darkside/components/common-ui';
import { UniLink } from '@diamantaire/darkside/core';
import { getBlockPictureAlt, normalizeDatoNumberedContent } from '@diamantaire/shared/helpers';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { ModularHalfWidthQuadBlockContainer } from './ModularHalfWidthQuadBlock.style';

const propTypes = {
  id: PropTypes.string,
  desktopImage: PropTypes.string.isRequired,
  mobileImage: PropTypes.string.isRequired,
  imageAlignment: PropTypes.string.isRequired,
  ctaRoute: PropTypes.string,
  blocks: PropTypes.array.isRequired,
  shouldLazyLoad: PropTypes.bool,
};

const ModularHalfWidthQuadBlock = (props) => {
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
    <ModularHalfWidthQuadBlockContainer className="container-emotion" $imageAlignment={imageAlignment}>
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

ModularHalfWidthQuadBlock.propTypes = propTypes;

export default ModularHalfWidthQuadBlock;
