import { MobileDesktopImage } from '@diamantaire/darkside/components/common-ui';
import { getRelativeUrl } from '@diamantaire/shared/helpers';
import Link from 'next/link';
import styled from 'styled-components';

const PlpPromoItemStyles = styled.div`
  .promo__image {
    position: relative;
    .promo__content {
      position: absolute;
      bottom: 0;
      left: 0;

      p {
        padding-left: calc(var(--gutter) / 3);
        padding-bottom: calc(var(--gutter) / 3);
        color: var(--color-white);

        .arrow-right {
          width: 0;
          height: 0;
          border-top: 7px solid transparent !important;
          border-bottom: 7px solid transparent !important;
          border-left: 7px solid var(--color-white);
          display: inline-block;
          position: relative;
          top: 2px;
          margin-left: 5px;
        }
      }
    }
  }
`;

const PlpPromoItem = ({ block }) => {
  const { image, imageMobile, title, link, textColor } = block || {};

  return (
    <PlpPromoItemStyles>
      <Link href={link && getRelativeUrl(link)}>
        <div className="promo__image">
          <MobileDesktopImage alt={title} desktopImage={image} mobileImage={imageMobile} quality={100} />
          <div className="promo__content">
            <p
              style={{
                color: textColor?.hex,
              }}
            >
              {title}{' '}
              <span
                className="arrow-right"
                style={{
                  borderColor: textColor?.hex,
                }}
              ></span>
            </p>
          </div>
        </div>
      </Link>
    </PlpPromoItemStyles>
  );
};

export default PlpPromoItem;
