import { DatoImage, Heading } from '@diamantaire/darkside/components/common-ui';
import { DatoImageType } from '@diamantaire/shared/types';
import { media } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

type PlpHeroBannerProps = {
  desktopImage: DatoImageType;
  title: string;
  copy: string;
};

const PlpHeroBannerStyles = styled.div`
  position: relative;

  .hero__image {
    display: none;
    ${media.small`display: block;`}
  }

  .hero__content {
    align-items: center;
    text-align: center;
    justify-content: center;
    ${media.small`display: flex; position: absolute;top: 0;left: 0;width: 100%;height: 100%; text-align: left; justify-content: start;`}

    .hero__content-inner {
      padding: calc(var(--gutter) / 1.5) 0;
      ${media.small`padding: 0 var(--gutter);`}
      h1 {
        margin-bottom: calc(var(--gutter) / 6);
      }
      p {
        max-width: 320px;
        font-size: var(--font-size-xsmall);
        line-height: 1.6;
        margin: 0 auto;
        ${media.small`max-width: 550px;`}
      }
    }
  }
`;

const PlpHeroBanner = ({ data }: { data: PlpHeroBannerProps }) => {
  const { desktopImage, title, copy } = data || {};

  return (
    <PlpHeroBannerStyles className="container-wrapper">
      <div className="hero__image">
        <DatoImage image={desktopImage} />
      </div>
      <div className="hero__content">
        <div className="hero__content-inner">
          <Heading className="primary" type="h1">
            {title}
          </Heading>
          <p>{copy}</p>
        </div>
      </div>
    </PlpHeroBannerStyles>
  );
};

export { PlpHeroBanner };
