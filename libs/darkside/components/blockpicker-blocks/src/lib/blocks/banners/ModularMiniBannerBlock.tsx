import { Heading, MobileDesktopImage } from '@diamantaire/darkside/components/common-ui';
import { getCountry, isCountrySupported } from '@diamantaire/shared/helpers';
import { DatoImageType } from '@diamantaire/shared/types';
import { desktopAndUp, setSpace, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ModularMiniBannerBlockStyles = styled.div`
  width: 100%;
  max-width: 1180px;
  height: auto;
  margin: 0 auto;
  position: relative;
  margin-bottom: 80px;
  .image-container {
  }

  .title-copy__wrapper {
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20px;
    ${tabletAndUp(`
     grid-template-columns: 1fr 1fr;
  `)}

    .title-copy {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;

      .title {
        font-size: 24px;
        font-weight: 400;
        margin-bottom: ${setSpace(2)};
        ${tabletAndUp(`
            font-size: 20px;
            margin-bottom: 0px;
          `)}
        ${desktopAndUp(`
            font-size: 30px;
          `)}
      }

      .copy-p {
        font-size: 14px;
        ${tabletAndUp(`
      font-size: 12px;
    `)};
        ${desktopAndUp(`
      font-size: 16px;
    `)}
      }

      .copy-terms {
        font-size: 10px;
        position: absolute;
        bottom: 12px;
        ${tabletAndUp(`
            bottom: 8px;
          `)}
        ${desktopAndUp(`
            bottom: 12px;
          `)}
      }
    }
  }
`;

type ModularMiniBannerBlockProps = {
  title: string;
  copy: string;
  ctaRoute: string;
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
  const { title, copy, copyTerms, mobileImage, desktopImage, textColor, additionalClass, supportedCountries, ctaRoute } =
    props;
  const { hex } = textColor;

  const { locale } = useRouter();

  const countryCode = getCountry(locale);

  if (!isCountrySupported(supportedCountries, countryCode)) {
    return null;
  }

  return (
    <ModularMiniBannerBlockStyles>
      {ctaRoute ? (
        <Link href={ctaRoute}>
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
