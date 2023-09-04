import { DarksideButton, Markdown } from '@diamantaire/darkside/components/common-ui';
import { UniLink } from '@diamantaire/darkside/core';
import { getDiamondType, replacePlaceholders } from '@diamantaire/shared/helpers';

import StyledDiamondTableCfyPromoCard from './DiamondTableCfyPromoCard.style';

const DiamondTableCfyPromoCard = (props) => {
  const { content, options, ranges } = props;

  const {
    bottomPromoContentLargerCarat,
    bottomPromoContentNoShape,
    bottomPromoContentCtaCopy,
    bottomPromoContentCtaLink,
    bottomPromoContent,
  } = content;

  const bottomPromoContentWithShapeByCarat = ranges.carat.max > 4 ? bottomPromoContentLargerCarat : bottomPromoContent;

  const bottomPromoContentWithShape = replacePlaceholders(
    bottomPromoContentWithShapeByCarat,
    ['%%product_name%%'],
    [getDiamondType(options?.diamondType)?.title],
  );

  const promoContent = options?.diamondType ? bottomPromoContentWithShape : bottomPromoContentNoShape;

  if (!promoContent) return <></>;

  return (
    <StyledDiamondTableCfyPromoCard>
      <Markdown withStyles={false}>{promoContent}</Markdown>
      <div className="cta">
        <UniLink route={bottomPromoContentCtaLink}>
          <DarksideButton className="primary">{bottomPromoContentCtaCopy}</DarksideButton>
        </UniLink>
      </div>
    </StyledDiamondTableCfyPromoCard>
  );
};

export default DiamondTableCfyPromoCard;

export { DiamondTableCfyPromoCard };
