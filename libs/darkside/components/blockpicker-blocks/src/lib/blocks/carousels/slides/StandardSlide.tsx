/** This is the default slide component. Useful for basic slides on mobile */

import { MobileDesktopImage } from '@diamantaire/darkside/components/common-ui';
import Link from 'next/link';

import { StandardSlideContainer } from './StandardSlide.style';

type StandardSlideProps = {
  title?: string;
  link: string;
  desktopImage: {
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
  mobileImage: {
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
};

const StandardSlide = ({ desktopImage, mobileImage, title, link }: StandardSlideProps) => {
  return (
    <StandardSlideContainer>
      <div className="slide__image">
        <Link href={link}>
          <MobileDesktopImage desktopImage={desktopImage} mobileImage={mobileImage} alt={title} />
        </Link>
      </div>
      <div className="slide__title">
        <h3>
          <Link href={link}>{title}</Link>
        </h3>
      </div>
    </StandardSlideContainer>
  );
};

export default StandardSlide;
