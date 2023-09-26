import { DatoImage, Heading } from '@diamantaire/darkside/components/common-ui';
import React from 'react';
import styled from 'styled-components';

const PlpSubCategoriesStyles = styled.div`
  display: flex;
  padding: 0 0 2rem;
  justify-content: center;
  > .subcategory-block {
    flex: 0 0 200px;
    padding: 0 10px;

    .subcategory-title {
      margin-top: 5px;
      font-size: var(--font-size-xxsmall);
    }
  }
`;

const PlpSubCategories = ({ subcategoryFilter }) => {
  console.log('subcategoryFilter', subcategoryFilter);
  const { data: blocks } = subcategoryFilter?.[0] || {};

  return (
    <PlpSubCategoriesStyles className="container-wrapper">
      {blocks?.map((block) => {
        return (
          <div className="subcategory-block" key={`subcategory-${block?.slug}`}>
            <div className="subcategory-image">
              <DatoImage image={block?.image} />
            </div>
            <div className="subcategory-content">
              <Heading type="h3" className="subcategory-title">
                {block?.title}
              </Heading>
            </div>
          </div>
        );
      })}
    </PlpSubCategoriesStyles>
  );
};

export { PlpSubCategories };
