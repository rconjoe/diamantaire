import {
  Heading,
  ShowMobileOnly,
  ShowTabletAndUpOnly,
  DatoImage,
  DarksideButton,
} from '@diamantaire/darkside/components/common-ui';
import { UniLink } from '@diamantaire/darkside/core';
import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
import { DatoImageType } from '@diamantaire/shared/types';
import clsx from 'clsx';
import Markdown from 'markdown-to-jsx';

import { ModularShowroomBlockContainer } from './ModularShowroomBlock.style';

type ModularShowroomBlockProps = {
  data: {
    title: string;
    address: string;
    hoursOfOperation: string;
    phone: string;
    email: string;
    directionsCtaLink: string;
    directionsImage: DatoImageType;
    appointmentCtaCopy: string;
    appointmentCtaLink: string;
    detailCtaCopy: string;
    detailCtaLink: string;
    phoneLabel: string;
    emailText: string;
    emailCtaStyle: string;
    servicesLabel: string;
    services: string;
  };
  image: DatoImageType;
};

const ModularShowroomBlock = ({ data, image }: ModularShowroomBlockProps) => {
  const {
    title,
    address,
    hoursOfOperation,
    phone,
    email,
    directionsCtaLink,
    directionsImage,
    appointmentCtaCopy,
    appointmentCtaLink,
    detailCtaCopy,
    detailCtaLink,
    phoneLabel,
    emailText,
    emailCtaStyle,
    servicesLabel,
    services,
  } = data;

  const directionsImageAlt = getBlockPictureAlt({ image: directionsImage, title });

  return (
    <ModularShowroomBlockContainer>
      <ShowMobileOnly>
        {image && (
          <div className="showroom__image-container">
            <DatoImage image={image} overrideAlt={title + ' Showroom'} />
          </div>
        )}
      </ShowMobileOnly>
      <div className="showroom__text-container">
        <Heading type="h2" className="showroom__title h1">
          {title}
        </Heading>
        <div className="showroom__text-inner-container">
          <div className="showroom__text-section">
            {directionsCtaLink && (
              <UniLink className="showroom__cta" route={directionsCtaLink}>
                <Markdown options={{ forceBlock: true }}>{address}</Markdown>
              </UniLink>
            )}
            {!directionsCtaLink && <Markdown options={{ forceBlock: true }}>{address}</Markdown>}
          </div>
          <div className="showroom__text-section">
            <Markdown options={{ forceBlock: true }}>{hoursOfOperation}</Markdown>
          </div>
          {phoneLabel && phone && (
            <div className="showroom__text-section">
              <a href={`tel:${phone}`}>{phone}</a>
            </div>
          )}
          {email && (
            <div className="showroom__text-section">
              <p>
                <a href={`mailto:${email}`}>
                  <DarksideButton type="outline" colorTheme="black" className={clsx(emailCtaStyle, 'second-button')}>
                    {emailText || email}
                  </DarksideButton>
                </a>
              </p>
            </div>
          )}
          {appointmentCtaLink && appointmentCtaCopy && (
            <div className="showroom__text-section">
              <DarksideButton href={appointmentCtaLink} className="showroom__appt-cta-button primary">
                {appointmentCtaCopy}
              </DarksideButton>
            </div>
          )}
          {detailCtaLink && detailCtaCopy && (
            <UniLink route={detailCtaLink} className="showroom__cta ">
              {detailCtaCopy}
            </UniLink>
          )}
          {servicesLabel && services && (
            <div className="showroom__text-section">
              <p className="p-copy -bold">{servicesLabel}</p>
              <Markdown options={{ forceBlock: true }}>{services}</Markdown>
            </div>
          )}
        </div>
      </div>
      <ShowTabletAndUpOnly>
        {image && (
          <div className="showroom__image-container">
            <DatoImage image={image} overrideAlt={'temp'} />
            {directionsImage && (
              <div className="showroom__side-direction-image">
                <DatoImage image={directionsImage} overrideAlt={directionsImageAlt} />
              </div>
            )}
          </div>
        )}
      </ShowTabletAndUpOnly>
      {directionsImage && (
        <ShowMobileOnly>
          <div className="showroom__bottom-direction-image">
            <DatoImage image={directionsImage} overrideAlt={directionsImageAlt} />
          </div>
        </ShowMobileOnly>
      )}
    </ModularShowroomBlockContainer>
  );
};

export default ModularShowroomBlock;
