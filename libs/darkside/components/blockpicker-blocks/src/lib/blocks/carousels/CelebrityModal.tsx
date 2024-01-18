import { DarksideButton, DatoImage, Heading, Modal } from '@diamantaire/darkside/components/common-ui';
import { media } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const CelebrityModalStyles = styled.div`
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
            a,
            .no-link {
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
            .no-link {
              &:hover {
                box-shadow: none;
              }
            }
          }
        }
      }
    }
  }
`;

const CelebrityModal = ({ modalContent, toggleModal }) => {
  return (
    <CelebrityModalStyles>
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
                      {modalContent?.disableProductCtas === true ? (
                        <div className="no-link">
                          <span className="image">
                            <DatoImage image={item?.image} />
                          </span>
                          <span className="content">
                            <span className="text">{item?.itemName}</span>
                          </span>
                        </div>
                      ) : (
                        <a href={item?.newRoute || item?.ctaRoute} target="_blank">
                          <span className="image">
                            <DatoImage image={item?.image} />
                          </span>
                          <span className="content">
                            <span className="text">{item?.itemName}</span>
                            <DarksideButton>View</DarksideButton>
                          </span>
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Modal>
    </CelebrityModalStyles>
  );
};

export default CelebrityModal;
