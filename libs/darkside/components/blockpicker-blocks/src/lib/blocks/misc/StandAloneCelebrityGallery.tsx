import { DarksideButton, DatoImage, Heading, Modal } from '@diamantaire/darkside/components/common-ui';
import { media } from '@diamantaire/styles/darkside-styles';
import { useState } from 'react';
import styled from 'styled-components';

const StandAloneCelebrityGalleryStyles = styled.div`
  padding-top: 40px;
  .title-container {
    padding-bottom: 40px;
  }
  .celebrity-grid {
    display: flex;
    flex-wrap: wrap;

    .thumbnail-container {
      flex: 1 1 100%;
      padding: 0 20px;
      margin-bottom: 40px;

      ${media.xsmall`flex: 0 0 50%;`}
      ${media.small`flex: 0 0 33.33%;`}
      ${media.large`flex: 0 0 25%;`}

      button {
        width: 100%;
        background-color: transparent;
        padding: 0;

        img {
          border-radius: 4px;
          overflow: hidden;
        }

        .thumbnail-content {
          padding-top: 10px;
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
                box-shadow:
                  0 14px 28px rgba(0, 0, 0, 0.25),
                  0 10px 10px rgba(0, 0, 0, 0.22);
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

      {isModalOpen && (
        <Modal title={false} onClose={() => toggleModal(null)} className="modal--sm">
          <div className="modal-celeb-wrapper">
            <div className="celeb-image">
              <DatoImage image={modalContent?.desktopImage} />
            </div>
            <div className="celeb-content">
              <div className="celeb-content__inner">
                <Heading type="h2" className="h1 primary">
                  {modalContent?.title}
                </Heading>
                <p>{modalContent?.copy}</p>

                <ul className="products list-unstyled">
                  {modalContent?.jewelry?.map((item) => {
                    return (
                      <li key={item.id}>
                        <a href={item?.ctaRoute} target="_blank">
                          <span className="image">
                            <DatoImage image={item?.image} />
                          </span>
                          <span className="content">
                            <span className="text">{item?.itemName}</span>
                            <DarksideButton>View</DarksideButton>
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </StandAloneCelebrityGalleryStyles>
  );
};

export default StandAloneCelebrityGallery;
