import { DarksideButton, Markdown } from '@diamantaire/darkside/components/common-ui';
import { UniLink } from '@diamantaire/darkside/core';
import { getDiamondType } from '@diamantaire/shared/helpers';

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
    [getDiamondType(options?.diamondType).title],
  );

  const promoContent = options?.diamondType ? bottomPromoContentWithShape : bottomPromoContentNoShape;

  if (!promoContent) return <></>;

  return (
    <StyledDiamondTableCfyPromoCard>
      <div className="container">
        <Markdown withStyles={false}>{promoContent}</Markdown>
        <UniLink route={bottomPromoContentCtaLink}>
          <DarksideButton className="primary">{bottomPromoContentCtaCopy}</DarksideButton>
        </UniLink>
      </div>
    </StyledDiamondTableCfyPromoCard>
  );
};

export default DiamondTableCfyPromoCard;

export { DiamondTableCfyPromoCard };

function replacePlaceholders(string, placeHoldersArr, valuesArr) {
  if (!string) {
    return '';
  }
  if (!placeHoldersArr || !valuesArr) {
    return string;
  }
  const strArr = [];
  const placeholderIndexArr = [0];

  // find index of where to slice string
  placeHoldersArr.forEach((placeholder) => {
    if (string) {
      const i = string.indexOf(placeholder);

      placeholderIndexArr.push(i);
      placeholderIndexArr.push(i + placeholder.length);
    }
  });

  // sort index then slice string
  placeholderIndexArr
    .sort((a, b) => a - b)
    .forEach((index, i) => {
      const start = index;
      const end = placeholderIndexArr[i + 1];

      strArr.push(string.slice(start, end));
    });

  // replace placeholder indexes with values
  placeHoldersArr.forEach((placeholder, i) => {
    const index = strArr.indexOf(placeholder);

    strArr[index] = valuesArr[i];
  });

  return valuesArr.every((s) => typeof s == 'string') ? strArr.join('') : strArr;
}
