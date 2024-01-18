import { DatoImage, Heading } from '@diamantaire/darkside/components/common-ui';
import { media } from '@diamantaire/styles/darkside-styles';
import { useState } from 'react';
import styled from 'styled-components';

import CelebrityModal from '../carousels/CelebrityModal';

const StandAloneCelebrityGalleryStyles = styled.div`
  padding-top: 4rem;
  .title-container {
    padding-bottom: 4rem;
  }
  .celebrity-grid {
    display: flex;
    flex-wrap: wrap;

    .thumbnail-container {
      flex: 1 1 100%;
      padding: 0 2rem;
      margin-bottom: 4rem;

      ${media.xsmall`flex: 0 0 50%;`}
      ${media.small`flex: 0 0 33.33%;`}
      ${media.large`flex: 0 0 25%;`}

      button {
        width: 100%;
        background-color: transparent;
        padding: 0;

        img {
          border-radius: 0.4rem;
          overflow: hidden;
        }

        .thumbnail-content {
          padding-top: 1rem;
        }
      }
    }
  }

  .modal-celeb-wrapper {
    max-height: 80vh;
    overflow-y: auto;
    ${media.small`display: flex;max-height: 100%;`}

    .celeb-image {
      flex: 1;

      > div {
        height: 100%;
        img {
          height: 100% !important;
        }
      }
    }
    .celeb-content {
      flex: 1;
      display: flex;
      align-items: center;

      .celeb-content__inner {
        padding: 4rem;
        flex: 1;
        max-width: 450px;
        margin: 0 auto;

        h2 {
          margin-bottom: 1rem;
        }

        .products {
          margin-top: 2rem;
          display: flex;
          li {
            margin-bottom: 1rem;
            flex: 1;
            display: flex;
            margin-right: 1rem;
            &:last-child {
              margin-right: 0px;
            }
            a {
              flex: 1;
              display: block;
              border: 0.1rem solid #e2e2e2;
              border-radius: 0.4rem;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              transition: 0.25s;

              &:hover {
                box-shadow:
                  0 1.4rem 2.8rem rgba(0, 0, 0, 0.25),
                  0 1rem 1rem rgba(0, 0, 0, 0.22);
              }

              > .image {
                flex: 0 0 10rem;
                padding: 1rem;
                img {
                  height: 100% !important;
                  max-height: 14rem;
                  object-fit: contain;
                }
              }

              .text {
                padding: 1rem;
                text-align: center;
                display: block;
              }

              button {
                border-bottom-left-radius: 0.4rem;
                border-bottom-right-radius: 0.4rem;
                width: calc(100% + 0.2rem);
                position: relative;
                left: -0.1rem;
                bottom: -0.1rem;
              }
            }
          }
        }
      }
    }
  }
`;

const StandAloneCelebrityGallery = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const { celebrities, title } = props || {};

  function toggleModal(celebrity) {
    if (isModalOpen) {
      setModalContent(null);
      setIsModalOpen(false);
    } else {
      setModalContent(celebrity);
      setIsModalOpen(true);
    }
  }

  return (
    <StandAloneCelebrityGalleryStyles>
      <div className="title-container container-wrapper text-center">
        <Heading type="h2" className="h1 primary">
          {title}
        </Heading>
      </div>
      <div className="celebrity-grid container-wrapper">
        {celebrities.map((celebrity) => {
          const { id, title: celebName, desktopImage } = celebrity || {};

          return (
            <div className="thumbnail-container" key={id}>
              <button onClick={() => toggleModal(celebrity)}>
                <div className="thumbnail-image">
                  <DatoImage image={desktopImage} />
                </div>
                <div className="thumbnail-content">
                  <p>{celebName}</p>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {isModalOpen && <CelebrityModal modalContent={modalContent} toggleModal={toggleModal} />}
    </StandAloneCelebrityGalleryStyles>
  );
};

export default StandAloneCelebrityGallery;
