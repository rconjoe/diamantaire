import { DarksideButton, Markdown, UniLink } from '@diamantaire/darkside/components/common-ui';
import { getDiamondType, replacePlaceholders } from '@diamantaire/shared/helpers';

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
      <Markdown withStyles={false}>{promoContent}</Markdown>

      <div className="cta">
        <UniLink route={`/diamonds/${selectedDiamondType ? selectedDiamondType : ''}`}>
          <DarksideButton className="primary">{bottomPromoContentCtaCopy}</DarksideButton>
        </UniLink>
      </div>
    </StyledDiamondTableCfyPromoCard>
  );
};

export default DiamondTableCfyPromoCard;

export { DiamondTableCfyPromoCard };
