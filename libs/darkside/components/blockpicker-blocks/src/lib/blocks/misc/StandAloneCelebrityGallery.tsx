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
