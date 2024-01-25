import { DatoImage, Heading, Markdown, Modal } from '@diamantaire/darkside/components/common-ui';
import { usePDPGwp } from '@diamantaire/darkside/data/hooks';
import { getCurrency, getFormattedPrice } from '@diamantaire/shared/constants';
import {
  getCountry,
  isCountrySupported,
  isCurrentTimeWithinInterval,
  replacePlaceholders,
} from '@diamantaire/shared/helpers';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

const ProductGWPStyles = styled.div`
  margin-top: 2rem;

  > .inner {
    display: flex;

    .image-container {
      flex: 0 0 6.5rem;
      margin-right: 0.5rem;
      box-shadow: 0px 0.4rem 0.4rem 0px rgba(0, 0, 0, 0.25);
      display: flex;

      /* Dato image img */
      > * {
        display: flex;
        flex: 1;
        > * {
          flex: 1;
        }
      }
    }

    .content-container {
      flex: 1;
      background-color: ${({ bgColor }) => bgColor};
      display: flex;
      align-items: center;
      box-shadow:
        0 3px 6px rgba(0, 0, 0, 0.16),
        0 3px 6px rgba(0, 0, 0, 0.23);

      p {
        font-size: var(--font-size-xxsmall);
        padding: 1rem 1.5rem;
      }

      button {
        font-size: var(--font-size-xxsmall);
        padding: 0;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid;
      }
    }
  }
  .gwp-modal-content__container {
    .gwp-modal-content__inner {
      @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .image {
        flex: 1;

        @media (max-width: ${({ theme }) => theme.sizes.desktop}) {
          margin-bottom: 2rem;
        }
      }

      .content {
        flex: 1;

        @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
          padding: 0 20px;
        }

        .gwp-modal-title {
          margin: 0 0 2rem;
          font-size: 2rem;
          line-height: 1.3;
        }

        .modal-body {
          margin: 0 0 2rem;
          font-size: var(--font-size-xxsmall);
          strong {
            font-weight: 500;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
`;

const ProductGWP = () => {
  const { locale } = useRouter();
  const [isGwpModalOpen, setIsGwpModalOpen] = useState(false);

  const { data } = usePDPGwp(locale);

  const gwpData = data?.allGwpDarksides?.[0]?.tiers?.[0];

  const {
    pdpBannerBody,
    pdpBannerColor,
    giftProduct,
    gwpSupportedCountries,
    minSpendByCurrencyCode,
    promotionDateRangeStart,
    promotionDateRangeEnd,
    pdpModalTitle,
    pdpModalBody,
    pdpModalTc,
  } = gwpData || {};

  const countryCode = getCountry(locale);
  const currencyCode = getCurrency(countryCode);

  // Confirm data exists
  if (!gwpData) return null;

  const isWithinTimeframe = isCurrentTimeWithinInterval(promotionDateRangeStart, promotionDateRangeEnd);

  const minSpendValue = getFormattedPrice(minSpendByCurrencyCode?.[currencyCode], locale);

  let refinedCopy = replacePlaceholders(pdpBannerBody, ['%%GWP_minimum_spend%%'], [minSpendValue?.toString()]).toString();

  refinedCopy = replacePlaceholders(refinedCopy, ['%%GWP_remaining_spend%%'], [minSpendValue?.toString()]).toString();

  if (!isCountrySupported(gwpSupportedCountries, countryCode) || !isWithinTimeframe) return null;

  const refinedModalTitle = replacePlaceholders(
    pdpModalTitle,
    ['%%GWP_minimum_spend%%'],
    [minSpendValue?.toString()],
  ).toString();

  const refinedModalBody = replacePlaceholders(
    pdpModalBody,
    ['%%GWP_minimum_spend%%'],
    [minSpendValue?.toString()],
  ).toString();

  const refinedModalTC = replacePlaceholders(pdpModalTc, ['%%GWP_minimum_spend%%'], [minSpendValue?.toString()]).toString();

  return (
    <ProductGWPStyles bgColor={pdpBannerColor?.hex}>
      <div className="inner">
        <div className="image-container">
          <DatoImage image={giftProduct?.plpImage} />
        </div>
        <div className="content-container">
          <div className="content__inner">
            <p>
              {refinedCopy} <button onClick={() => setIsGwpModalOpen(true)}>Learn More</button>
            </p>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isGwpModalOpen && (
          <Modal title="" onClose={() => setIsGwpModalOpen(false)} className="modal--sm">
            <div className="gwp-modal-content__container">
              <div className="gwp-modal-content__inner">
                <div className="image">
                  <DatoImage image={giftProduct?.plpImage} />
                </div>
                <div className="content">
                  <Heading type="h3" className="h1 secondary gwp-modal-title">
                    {refinedModalTitle}
                  </Heading>
                  <Markdown extraClass="modal-body" withStyles={false} options={{ forceInline: true }}>
                    {refinedModalBody}
                  </Markdown>
                  <Markdown extraClass="modal-body" withStyles={false} options={{ forceInline: true }}>
                    {refinedModalTC}
                  </Markdown>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </ProductGWPStyles>
  );
};

export { ProductGWP };
