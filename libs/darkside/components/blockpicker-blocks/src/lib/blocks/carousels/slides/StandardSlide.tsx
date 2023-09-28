/** This is the default slide component. Useful for basic slides on mobile */

import { Heading, MobileDesktopImage } from '@diamantaire/darkside/components/common-ui';
import { DatoImageType } from '@diamantaire/shared/types';
import Link from 'next/link';

import { StandardSlideContainer } from './StandardSlide.style';

type StandardSlideProps = {
  title?: string;
  link: string;
  desktopImage: DatoImageType;
  mobileImage: DatoImageType;
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
        <Link href={link}>
          <Heading type="h3" className="secondary">
            {title}
          </Heading>
        </Link>
      </div>
    </StandardSlideContainer>
  );
};

export default StandardSlide;
