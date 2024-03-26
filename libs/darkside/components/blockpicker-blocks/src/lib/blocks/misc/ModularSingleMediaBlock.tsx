import { DatoImage, Heading, LazyInViewBlock, Markdown } from '@diamantaire/darkside/components/common-ui';
import { CtoDiamondPromoBlockTypes } from '@diamantaire/darkside/data/hooks';
import { isCountrySupported } from '@diamantaire/shared/helpers';
import styled from 'styled-components';

import ModularVideoBlock from '../ModularVideoBlock';

const ModularSingleMediaBlock = (props: CtoDiamondPromoBlockTypes) => {
  const {
    media,
    title,
    copy,
    additionalClass,
    headingType,
    headingAdditionalClass,
    shouldLazyLoad,
    supportedCountries,
    countryCode,
  } = props;

  if (!isCountrySupported(supportedCountries, countryCode)) {
    return null;
  }

  const hasVideo = Boolean(media?.video);

  const block = (
    <StyledModularSingleMediaBlock className={additionalClass ?? additionalClass}>
      {title && (
        <Heading type={headingType ? headingType : 'h2'} className={`title ${headingAdditionalClass ?? ''}`}>
          {title}
        </Heading>
      )}
      {copy && (
        <div className="content">
          <Markdown>{copy}</Markdown>
        </div>
      )}
      <div className="media">
        {hasVideo ? (
          <ModularVideoBlock video={{ video: { streamingUrl: media.video.streamingUrl } }} />
        ) : (
          <DatoImage image={media} shouldLazyLoad={shouldLazyLoad} />
        )}
      </div>
    </StyledModularSingleMediaBlock>
  );

  if (shouldLazyLoad) {
    return <LazyInViewBlock>{block}</LazyInViewBlock>;
  }

  return block;
};

export default ModularSingleMediaBlock;

export { ModularSingleMediaBlock };

const StyledModularSingleMediaBlock = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    font-size: var(--font-size-xxsmall);
  }

  .content {
  }

  .media {
  }
`;
