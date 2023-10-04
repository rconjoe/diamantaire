import { useEmailPopup } from '@diamantaire/darkside/data/hooks';

import { media } from '@diamantaire/styles/darkside-styles';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { DarksideButton, DatoImage, Heading, Modal } from './';

const EmailPopUpStyles = styled.div`
  .wrapper {
    margin-top: auto;
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .modal-emailpopup-wrapper {
    max-width: 860px;
    height: 500px;
    overflow-y: auto;
    display: flex;
    max-height: 100%;

    .emailpopup-image {
      flex: 1;

      > div {
        height: 100%;
        img {
          height: 100% !important;
        }
      }
    }
    .emailpopup-content {
      flex: 1;
      display: flex;
      align-items: center;

      .emailpopup-content__inner {
        padding: 40px;
        flex: 1;
        max-width: 450px;
        margin: 0 auto;

        h2 {
          margin-bottom: 10px;
        }

        .products {
          margin-top: 20px;
          display: flex;
          li {
            margin-bottom: 10px;
            flex: 1;
            display: flex;
            margin-right: 10px;
            &:last-child {
              margin-right: 0px;
            }
            a {
              flex: 1;
              display: block;
              border: 1px solid #e2e2e2;
              border-radius: 4px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              transition: 0.25s;

              &:hover {
                box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
              }

              > .image {
                flex: 0 0 100px;
                padding: 10px;
                img {
                  height: 100% !important;
                  max-height: 140px;
                  object-fit: contain;
                }
              }

              .text {
                padding: 10px;
                text-align: center;
                display: block;
              }

              button {
                border-bottom-left-radius: 4px;
                border-bottom-right-radius: 4px;
                width: calc(100% + 2px);
                position: relative;
                left: -1px;
                bottom: -1px;
              }
            }
          }
        }
      }
    }
  }
`;

const EmailPopUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [modalContent, setModalContent] = useState(null);
  const router = useRouter();
  const selectedLocale = router.locale;
  const { data: { emailPopup: emailPopUpContent } = {} } = useEmailPopup(selectedLocale);
  const {
    title,
    copy,
    copyPrices,
    countrySpecificCopy,
    errorCopy,
    image,
    placeholder1,
    placeholder2,
    privacyctacopy,
    privacyctalink,
    submitCopy,
    successCopy,
    supportedCountries,
  } = emailPopUpContent || {};
  console.log({ emailPopUpContent });
  function toggleModal(celebrity) {
    if (isModalOpen) {
      setModalContent(null);
      setIsModalOpen(false);
    } else {
      setModalContent(celebrity);
      setIsModalOpen(true);
    }
  }

  if (isModalOpen) {
    return (
      <EmailPopUpStyles>
        <Modal title={false} onClose={() => toggleModal(null)} className="modal--sm">
          <div className="modal-emailpopup-wrapper">
            <div className="emailpopup-image">
              <DatoImage image={image} />
            </div>
            <div className="emailpopup-content">
              <div className="emailpopup-content__inner">
                <Heading type="h2" className="h1 primary">
                  {title}
                </Heading>
                <p>{copy}</p>
              </div>
            </div>
          </div>
        </Modal>
      </EmailPopUpStyles>
    );
  }

  return;
};

export { EmailPopUp };
