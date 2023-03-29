import { Heading, Button, DatoImage } from '@diamantaire/darkside/components/common-ui';
import { UniLink } from '@diamantaire/darkside/core';
import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
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
    directionsCtaCopy: string;
    directionsCtaLink: string;
    appointmentCtaCopy: string;
    appointmentCtaLink: string;
    appointmentMarkdown: string;
    detailCtaCopy: string;
    detailCtaLink: string;
    locationLabel: string;
    phoneLabel: string;
    emailLabel: string;
    hoursOfOperationLabel: string;
    emailText: string;
    emailCtaStyle: string;
  };
  image: {
    mimeType?: string;
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

const ModularShowroomBlock = ({ data, image }: ModularShowroomBlockProps) => {
  const {
    title,
    address,
    hoursOfOperation,
    phone,
    email,
    directionsCtaCopy,
    directionsCtaLink,
    appointmentCtaCopy,
    appointmentCtaLink,
    appointmentMarkdown,
    detailCtaCopy,
    detailCtaLink,
    locationLabel,
    phoneLabel,
    emailLabel,
    hoursOfOperationLabel,
    emailText,
    emailCtaStyle,
  } = data;

  const alt = getBlockPictureAlt({
    image,
    title,
  });

  return (
    <ModularShowroomBlockContainer className="container-emotion">
      <div className="showroom__image-container">
        <DatoImage image={image} overrideAlt={alt} />
      </div>
      <div className="showroom__text-container">
        <div className="showroom__inner-text-container">
          <Heading type="h2" className="h1 showroom__title">
            {title}
          </Heading>
          <div className="showroom__text-block">
            <p className="p-copy -bold">{locationLabel}</p>
            <Markdown options={{ forceBlock: true }}>{address}</Markdown>
            {directionsCtaLink && directionsCtaCopy && (
              <UniLink className="showroom__cta" route={directionsCtaLink}>
                {directionsCtaCopy}
              </UniLink>
            )}
          </div>
          <div className="showroom__text-block">
            <p className="p-copy -bold">{hoursOfOperationLabel}</p>
            <Markdown options={{ forceBlock: true }}>{hoursOfOperation}</Markdown>
          </div>
          {phoneLabel && phone && (
            <div className="showroom__text-block">
              <p className="p-copy -bold">{phoneLabel}</p>
              <p>{phone}</p>
            </div>
          )}
          {email && (
            <div className="showroom__text-block">
              {emailLabel && <p className="p-copy -bold">{emailLabel}</p>}
              <p>
                <a href={`mailto:${email}`}>
                  <Button className={clsx(emailCtaStyle, 'second-button')}>{emailText || email}</Button>
                </a>
              </p>
            </div>
          )}
          {appointmentCtaLink && appointmentCtaCopy && (
            <div className="showroom__text-block">
              <UniLink route={appointmentCtaLink} className="showroom__cta">
                {appointmentCtaCopy}
              </UniLink>
            </div>
          )}
          {appointmentMarkdown && (
            <div className="showroom__text-block showroom__appointment-markdown">
              <Markdown options={{ forceBlock: true }}>{appointmentMarkdown}</Markdown>
            </div>
          )}
          {detailCtaLink && detailCtaCopy && (
            <UniLink route={detailCtaLink} className="showroom__cta">
              {detailCtaCopy}
            </UniLink>
          )}
        </div>
      </div>
    </ModularShowroomBlockContainer>
  );
};

export default ModularShowroomBlock;
