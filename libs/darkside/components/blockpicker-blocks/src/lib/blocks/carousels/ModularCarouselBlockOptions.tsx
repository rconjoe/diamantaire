// This file takes specific blocks for the modular carousel block
import { FULL_WIDTH_BANNER_BLOCK } from '@diamantaire/shared/constants';
import styled from 'styled-components';

import ModularBannerBlock from '../banners/ModularBannerBlock';
import ModularQuoteBlock from '../misc/ModularQuoteBlock';

const ModularCarouselOptionsStyles = styled.div``;

const ModularCarouselOptions = (props) => {
  return (
    <ModularCarouselOptionsStyles>
      {props._modelApiKey === 'quote_block' ? (
        <ModularQuoteBlock {...props} />
      ) : (
        props._modelApiKey === FULL_WIDTH_BANNER_BLOCK && (
          <div className="banner-slide-container">
            <ModularBannerBlock {...props} />
          </div>
        )
      )}
    </ModularCarouselOptionsStyles>
  );
};

export default ModularCarouselOptions;
