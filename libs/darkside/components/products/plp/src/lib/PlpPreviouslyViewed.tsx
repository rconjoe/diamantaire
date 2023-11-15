import { Heading, UIString } from '@diamantaire/darkside/components/common-ui';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const PlpPreviouslyViewedStyles = styled.section``;

const PlpPreviouslyViewed = () => {
  const [handles, setHandles] = useState([]);

  console.log('handles', handles);

  // fetch previously viewed products
  function fetchPreviouslyViewed() {
    const previouslyViewed = localStorage.getItem('previouslyViewed');

    if (!previouslyViewed) return;

    const previouslyViewedObject = JSON.parse(previouslyViewed);
    const previouslyViewedArray = [];

    Object.keys(previouslyViewedObject).forEach(([key, _value]) => {
      previouslyViewedArray.push(previouslyViewedObject[key]);
    });

    console.log('previouslyViewedArray', previouslyViewedArray);
    setHandles(previouslyViewedArray);
  }

  //   useBlockProducts();

  useEffect(() => {
    fetchPreviouslyViewed();
  }, []);

  //   hand off, gonna finish next pr

  return (
    <PlpPreviouslyViewedStyles>
      <div className="title-container">
        <Heading type="h2" className="primary h1">
          <UIString>Previously viewed</UIString>
        </Heading>
      </div>
    </PlpPreviouslyViewedStyles>
  );
};

export { PlpPreviouslyViewed };
