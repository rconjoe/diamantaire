import { Heading, MobileDesktopImage, VRAIButton } from '@diamantaire/darkside/components/common-ui';
import { media } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const PlpCreativeBlockStyles = styled.div`
  grid-column: 1/3;
  border: 1px solid var(--color-light-grey);

  ${media.medium`grid-column: 1/3; grid-area: 2 / 1 / 4 / 3;`}

  &.creative-block--right {
    ${media.medium`grid-area: 5 / 3 / 7 / 5;`}
  }

  .creative-block__image {
    position: relative;

    .creative-block__content {
      ${media.small`position: absolute;right: 20px;bottom: 20px;`}

      .creative-block__content-inner {
        background-color: #fff;
        padding: calc(var(--gutter) / 2);
        max-width: 420px;

        p {
          margin: calc(var(--gutter) / 4) 0;
        }
      }
    }
  }
`;

const PlpCreativeBlock = ({ block }) => {
  // console.log('block', block);

  const { desktopImage, mobileImage, desktopCopy, title, ctaCopy, ctaRoute, className } = block || {};

  return (
    <PlpCreativeBlockStyles className={className}>
      <div className="creative-block__image">
        <MobileDesktopImage desktopImage={desktopImage} mobileImage={mobileImage} alt={title} />

        <div className="creative-block__content">
          <div className="creative-block__content-inner">
            <Heading type="h2" className="primary">
              {title}
            </Heading>
            <p>{desktopCopy}</p>
            {className === 'creative-block--left' ? (
              <VRAIButton type="underline" colorTheme="teal" isLink={true} href={ctaRoute || ''}>
                {ctaCopy}
              </VRAIButton>
            ) : (
              <VRAIButton type="solid" inverse colorTheme="black" isLink={true} href={ctaRoute || ''}>
                {ctaCopy}
              </VRAIButton>
            )}
          </div>
        </div>
      </div>
    </PlpCreativeBlockStyles>
  );
};

export default PlpCreativeBlock;
