import { DatoImage, Heading, DarksideButton } from '@diamantaire/darkside/components/common-ui';
import { DatoImageType, DatoDarksideButtonProps } from '@diamantaire/shared/types';
import { media, mobileOnly } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import styled from 'styled-components';

type PlpHeroBannerProps = {
  data: {
    desktopImage: DatoImageType;
    mobileImage: DatoImageType;
    title: string;
    copy: string;
    textColor?: {
      hex: string;
    };
    darksideButtons?: DatoDarksideButtonProps[];
  };
  showHeroWithBanner: boolean;
};

const PlpHeroBannerStyles = styled.div`
  position: relative;
  margin-bottom: 4rem;
  ${mobileOnly(`
    padding-left: .5rem;
    padding-right: .5rem;
  `)}

  .hero__image {
    &.desktop {
      display: none;
      ${media.small`display: block;`}
    }
    &.mobile {
      padding-bottom: 1rem;
      ${media.small`display: none;`}
    }
  }

  &.hero-with-banner {
    .hero__content {
      align-items: center;
      text-align: center;
      justify-content: center;
      ${media.small`display: flex; position: absolute;top: 0;left: 0;width: 100%;height: 100%; text-align: left; justify-content: start;`}

      .hero__content-inner {
        padding: 0;

        ${media.small`padding: 0 var(--gutter);`}

        h1 {
          margin-bottom: 1rem;
          color: var(--color-black);
          @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
            color: ${({ textColor }) => textColor || 'var(--color-black)'};
          }
        }

        p {
          max-width: 32rem;
          font-size: var(--font-size-xsmall);
          margin: 0 auto;
          color: var(--color-black);
          line-height: 1.3;

          @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
            max-width: 55rem;
            margin: 0;
            color: ${({ textColor }) => textColor || 'var(--color-black)'};
          }
        }
      }
    }
  }

  .hero__content {
    text-align: center;

    .hero-title {
      line-height: 1;
      margin-top: 2rem;
      margin-bottom: 2rem;
    }

    p {
      line-height: 1.3;
      font-size: var(--font-size-xxsmall);
    }
  }
`;

const PlpHeroBanner = ({ data, showHeroWithBanner }: PlpHeroBannerProps) => {
  const { desktopImage, mobileImage, title, copy, textColor, darksideButtons } = data || {};

  return (
    <PlpHeroBannerStyles
      textColor={textColor?.hex}
      className={clsx('container-wrapper', {
        'hero-with-banner': showHeroWithBanner,
      })}
    >
      {showHeroWithBanner && (
        <>
          <div className="hero__image desktop">
            <DatoImage image={desktopImage} />
          </div>

          <div className="hero__image mobile">
            <DatoImage image={mobileImage} />
          </div>
        </>
      )}
      <div className="hero__content">
        <div className="hero__content-inner">
          <Heading className="primary hero-title">{title}</Heading>

          <p>{copy}</p>

          {darksideButtons?.map((button) => {
            return (
              <DarksideButton
                colorTheme={button.ctaButtonColorTheme}
                mobileColorTheme={button.ctaButtonMobileColorTheme}
                href={button.ctaLinkUrl}
                key={button.id}
                type={button.ctaButtonType}
              >
                {button.ctaCopy}
              </DarksideButton>
            );
          })}
        </div>
      </div>
    </PlpHeroBannerStyles>
  );
};

export { PlpHeroBanner };
