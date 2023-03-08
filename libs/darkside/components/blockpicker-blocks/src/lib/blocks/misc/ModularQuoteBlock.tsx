import { DatoImage } from '@diamantaire/darkside/components/common-ui';
import { getBlockPictureAlt } from '@diamantaire/shared/helpers';

import { ModularQuoteBlockContainer } from './ModularQuoteBlock.style';

type ModularQuoteBlockProps = {
  quote: string;
  quoteFont?: string;
  quoteStyle?: string;
  attribution?: string;
  attributionFont?: string;
  backgroundColor: string;
  textColor: string;
  quotationMarksImage?: {
    mimeType?: string;
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    responsiveImage?: {
      width: number;
      height: number;
      base64: string;
    };
  };
  shouldLazyLoad?: boolean;
};

const ModularQuoteBlock = ({
  quote,
  quoteFont,
  quoteStyle,
  attribution,
  attributionFont,
  backgroundColor,
  textColor,
  quotationMarksImage,
}: ModularQuoteBlockProps) => {
  const alt = getBlockPictureAlt({
    image: quotationMarksImage,
    title: 'quotation marks',
  });

  return (
    <ModularQuoteBlockContainer
      $backgroundColor={backgroundColor}
      $textColor={textColor}
      $textStyle={quoteStyle}
      $textFont={quoteFont}
      $attributionFont={attributionFont}
    >
      <div className="quote-block__wrapper">
        <div className="quote-block__container">
          {quotationMarksImage && (
            <div className="quote-block__quote-image-wrapper">
              <DatoImage image={quotationMarksImage} className="quote-block__quote-image" overrideAlt={alt} />
            </div>
          )}
          <p className="quote-block__quote">{quote}</p>
          <p className="quote-block__attribution">{attribution}</p>
        </div>
      </div>
    </ModularQuoteBlockContainer>
  );
};

export default ModularQuoteBlock;
