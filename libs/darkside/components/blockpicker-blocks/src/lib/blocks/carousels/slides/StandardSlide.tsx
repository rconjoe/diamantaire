/** This is the default slide component. Useful for basic slides on mobile */

import { Heading, MobileDesktopImage } from '@diamantaire/darkside/components/common-ui';
import { getCountry, isCountrySupported } from '@diamantaire/shared/helpers';
import { DatoImageType } from '@diamantaire/shared/types';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { StandardSlideContainer } from './StandardSlide.style';

type StandardSlideProps = {
  title?: string;
  link: string;
  desktopImage: DatoImageType;
  mobileImage: DatoImageType;
  shouldLazyLoad?: boolean;
  supportedCountries: {
    code: string;
  }[];
};

const StandardSlide = ({
  desktopImage,
  mobileImage,
  title,
  link,
  supportedCountries,
  shouldLazyLoad,
}: StandardSlideProps) => {
  const { locale } = useRouter();
  const countryCode = getCountry(locale);

  if (supportedCountries.length > 0 && !isCountrySupported(supportedCountries, countryCode)) {
    return null;
  }

  return (
    <StandardSlideContainer>
      <div className="slide__image">
        <Link href={link}>
          <MobileDesktopImage
            desktopImage={desktopImage}
            mobileImage={mobileImage}
            alt={title}
            shouldLazyLoad={shouldLazyLoad}
          />
        </Link>
      </div>
      <div className="slide__title">
        <Heading type="h3" className="secondary">
          <Link href={link}>{title}</Link>
        </Heading>
      </div>
    </StandardSlideContainer>
  );
};

export default StandardSlide;
