import { DatoImage, Heading } from '@diamantaire/darkside/components/common-ui';
import { DatoImageType } from '@diamantaire/shared/types';
import { media } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import styled from 'styled-components';

type PlpHeroBannerProps = {
  data: {
    desktopImage: DatoImageType;
    title: string;
    copy: string;
    textColor?: {
      hex: string;
    };
  };
  showHeroWithBanner: boolean;
};

const PlpHeroBannerStyles = styled.div`
  position: relative;

  .hero__image {
    display: none;
    ${media.small`display: block;`}
  }

  &.hero-with-banner {
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
          color: ${({ textColor }) => textColor || 'var(--color-black)'};
        }
        p {
          max-width: 32rem;
          font-size: var(--font-size-xsmall);
          line-height: 1.6;
          margin: 0 auto;
          color: ${({ textColor }) => textColor || 'var(--color-black)'};
          ${media.small`max-width: 55rem;`}
        }
      }
    }
  }

  .hero__content {
    text-align: center;
    padding: 3rem 0 2.5rem;

    .hero-title {
      margin-bottom: 2rem;
    }

    p {
      margin: 0;
      font-size: var(--font-size-xxsmall);
    }
  }
`;

const PlpHeroBanner = ({ data, showHeroWithBanner }: PlpHeroBannerProps) => {
  const { desktopImage, title, copy, textColor } = data || {};

  return (
    <PlpHeroBannerStyles
      textColor={textColor?.hex}
      className={clsx('container-wrapper', {
        'hero-with-banner': showHeroWithBanner,
      })}
    >
      {showHeroWithBanner && (
        <div className="hero__image">
          <DatoImage image={desktopImage} />
        </div>
      )}
      <div className="hero__content">
        <div className="hero__content-inner">
          <Heading className="primary hero-title" type="h1">
            {title}
          </Heading>
          <p>{copy}</p>
        </div>
      </div>
    </PlpHeroBannerStyles>
  );
};

export { PlpHeroBanner };
