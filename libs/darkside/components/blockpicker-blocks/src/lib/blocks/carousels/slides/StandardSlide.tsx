/** This is the default slide component. Useful for basic slides on mobile */

import Image from 'next/image';
import Link from 'next/link';

import { StandardSlideContainer } from './StandardSlide.style';

const StandardSlide = ({ mobileImage, title, link }) => {
  const imageObject = {
    src: mobileImage.url,
    width: mobileImage.responsiveImage.width,
    height: mobileImage.responsiveImage.height,
  };

  return (
    <StandardSlideContainer>
      <div className="slide__image">
        <Link href={link}>
          <Image src={imageObject.src} width={imageObject.width} height={imageObject.height} alt={title} />
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
