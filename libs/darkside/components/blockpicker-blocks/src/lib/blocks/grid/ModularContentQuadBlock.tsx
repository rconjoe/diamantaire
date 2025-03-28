import { Heading, ImageTile, LazyInViewBlock } from '@diamantaire/darkside/components/common-ui';
import { normalizeDatoNumberedContent } from '@diamantaire/shared/helpers';
import { DatoImageType, DatoDarksideButtonProps } from '@diamantaire/shared/types';

import { ModularContentQuadBlockContainer } from './ModularContentQuadBlock.style';

type ModularContentQuadBlock = {
  blocks: Array<any>;
  id?: string;
  shouldLazyLoad?: boolean;
  title?: string;
  subtitle?: string;
  title1?: string;
  ctaCopy1?: string;
  ctaRoute1?: string;
  darksideButtons1: DatoDarksideButtonProps[];
  image1?: DatoImageType;
  title2?: string;
  ctaCopy2?: string;
  ctaRoute2?: string;
  image2?: DatoImageType;
  darksideButtons2: DatoDarksideButtonProps[];
  title3?: string;
  ctaCopy3?: string;
  ctaRoute3?: string;
  image3?: DatoImageType;
  darksideButtons3: DatoDarksideButtonProps[];
  title4?: string;
  ctaCopy4?: string;
  ctaRoute4?: string;
  image4?: DatoImageType;
  darksideButtons4: DatoDarksideButtonProps[];
};

const ModularContentQuadBlock = (props: ModularContentQuadBlock) => {
  const { title, subtitle, id, shouldLazyLoad } = props;

  const arrayOfAttributes = ['title', 'copy', 'ctaCopy', 'ctaRoute', 'image', 'darksideButtons'];

  const blocks = normalizeDatoNumberedContent(props, arrayOfAttributes);

  if (!blocks) {
    return null;
  }

  const block = (
    <ModularContentQuadBlockContainer className="container-wrapper">
      <div className="content-block__layout">
        <div className="content-block__title">
          {title && (
            <Heading type="h2" className="h1 primary">
              {title}
            </Heading>
          )}
          {title && subtitle && <p className="content-block__subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="content-block__container">
        {blocks.map((block, index) => (
          <div key={`${id}-${index}-${block.title}-container`} className="image-tile__container -modular-content-quad-block">
            <ImageTile
              key={`${id}-${index}-${block.title}`}
              isProductImage={true}
              extraClass="-modular-content-quad-block"
              shouldLazyLoad={shouldLazyLoad}
              {...block}
            />
          </div>
        ))}
      </div>
    </ModularContentQuadBlockContainer>
  );

  if (shouldLazyLoad) {
    return <LazyInViewBlock>{block}</LazyInViewBlock>;
  }

  return block;
};

export default ModularContentQuadBlock;
