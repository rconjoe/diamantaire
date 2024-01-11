import { Heading, MobileDesktopImage } from '@diamantaire/darkside/components/common-ui';
import { getCountry, isCountrySupported } from '@diamantaire/shared/helpers';
import { DatoImageType } from '@diamantaire/shared/types';
import { desktopAndUp, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ModularMiniBannerBlockStyles = styled.div`
  width: 100%;
  max-width: 118rem;
  height: auto;
  margin: 0 auto;
  position: relative;
  margin-bottom: 8rem;

  .title-copy__wrapper {
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 2rem;
    ${tabletAndUp(`
     grid-template-columns: 1fr 1fr;
  `)}

    .title-copy {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;

      .title {
        font-size: 2.4rem;
        font-weight: 400;
        margin-bottom: 0.5rem;
        line-height: 1.2;
        ${tabletAndUp(`
            font-size: 2rem;
            margin-bottom: 0px;
          `)}
        ${desktopAndUp(`
            font-size: 3rem;
          `)}
      }

      .copy-p {
        font-size: 1.4rem;
        ${tabletAndUp(`
      font-size: 1.2rem;
    `)};
        ${desktopAndUp(`
      font-size: 1.6rem;
    `)}
      }

      .copy-terms {
        font-size: 1rem;
        position: absolute;
        bottom: 1.2rem;
        ${tabletAndUp(`
            bottom: 0.8rem;
          `)}
        ${desktopAndUp(`
            bottom: 1.2rem;
          `)}
      }
    }
  }
`;

type ModularMiniBannerBlockProps = {
  title: string;
  copy: string;
  route: string;
  copyTerms: string;
  mobileImage: DatoImageType;
  desktopImage: DatoImageType;
  textColor: {
    hex: string;
  };
  additionalClass: string;
  // currencyCode: PropTypes.string.isRequired,
  // countryCode: string.isRequired,
  supportedCountries: Array<{
    code: string;
  }>;
  shouldLazyLoad: boolean;
};

const ModularMiniBannerBlock = (props: ModularMiniBannerBlockProps) => {
  const { title, copy, copyTerms, mobileImage, desktopImage, textColor, additionalClass, supportedCountries, route } = props;
  const { hex } = textColor;

  const { locale } = useRouter();

  const countryCode = getCountry(locale);

  if (!isCountrySupported(supportedCountries, countryCode)) {
    return null;
  }

  return (
    <ModularMiniBannerBlockStyles>
      {route ? (
        <Link href={route}>
          <MobileDesktopImage
            className="image-container"
            desktopImage={desktopImage}
            mobileImage={mobileImage}
            alt={title}
          />
          {title && (
            <div className="title-copy__wrapper">
              <div></div>
              <div
                className={clsx('title-copy', additionalClass)}
                style={{
                  color: hex,
                }}
              >
                {title && (
                  <Heading type="h3" className="title">
                    {title}
                  </Heading>
                )}
                {copy && <p className="copy-p">{copy}</p>}
                {copyTerms && <p className="copy-terms">{copyTerms}</p>}
              </div>
            </div>
          )}
        </Link>
      ) : (
        <>
          <MobileDesktopImage
            className="image-container"
            desktopImage={desktopImage}
            mobileImage={mobileImage}
            alt={title}
          />
          {title && (
            <div className="title-copy__wrapper">
              <div></div>
              <div
                className={clsx('title-copy', additionalClass)}
                style={{
                  color: hex,
                }}
              >
                {title && (
                  <Heading type="h3" className="title">
                    {title}
                  </Heading>
                )}
                {copy && <p className="copy-p">{copy}</p>}
                {copyTerms && <p className="copy-terms">{copyTerms}</p>}
              </div>
            </div>
          )}
        </>
      )}
    </ModularMiniBannerBlockStyles>
  );
};

export default ModularMiniBannerBlock;
