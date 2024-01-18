import { DarksideButton, Markdown, UniLink } from '@diamantaire/darkside/components/common-ui';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { getDiamondType, replacePlaceholders } from '@diamantaire/shared/helpers';
import { useContext } from 'react';

import StyledDiamondTableCfyPromoCard from './DiamondTableCfyPromoCard.style';

const DiamondTableCfyPromoCard = (props) => {
  const { content, options } = props;

  const { diamondType: selectedDiamondType } = options || {};

  const {
    bottomPromoContentLargerCarat,
    bottomPromoContentNoShape,
    bottomPromoContentCtaCopy,
    // bottomPromoContentCtaLink,
    bottomPromoContent,
  } = content;

  const { builderProduct } = useContext(BuilderProductContext);

  const bottomPromoContentWithShapeByCarat =
    options.caratMax && options.caratMax > 4 ? bottomPromoContentLargerCarat : bottomPromoContent;

  const bottomPromoContentWithShape = replacePlaceholders(
    bottomPromoContentWithShapeByCarat,
    ['%%product_name%%'],
    [getDiamondType(options?.diamondType)?.title],
  );

  const promoContent = options?.diamondType ? bottomPromoContentWithShape : bottomPromoContentNoShape;

  if (!promoContent) return;

  return (
    <StyledDiamondTableCfyPromoCard>
      <Markdown withStyles={false}>{promoContent?.join('')}</Markdown>

      <div className="cta">
        <UniLink
          route={`/diamonds/${selectedDiamondType ? selectedDiamondType : ''}${
            builderProduct?.product
              ? `?collectionSlug=${builderProduct?.product?.collectionSlug}&productSlug=${builderProduct?.product?.productSlug}`
              : ''
          }`}
        >
          <DarksideButton className="primary">{bottomPromoContentCtaCopy}</DarksideButton>
        </UniLink>
      </div>
    </StyledDiamondTableCfyPromoCard>
  );
};

export default DiamondTableCfyPromoCard;

export { DiamondTableCfyPromoCard };
