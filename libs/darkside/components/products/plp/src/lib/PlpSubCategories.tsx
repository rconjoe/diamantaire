import { DatoImage, Heading } from '@diamantaire/darkside/components/common-ui';
import { media } from '@diamantaire/styles/darkside-styles';
import React from 'react';
import styled from 'styled-components';

const PlpSubCategoriesStyles = styled.div`
  display: flex;
  padding: 0 0 2rem;
  justify-content: center;
  overflow-x: auto;
  justify-content: start;

  ${media.medium`justify-content: center;`}
  > .subcategory-block {
    flex: 0 0 200px;
    padding: 0 10px;
    > button {
      width: 100%;
      padding: 0;
      background-color: transparent;
      border: none;
    }

    .subcategory-title {
      margin-top: 5px;
      font-size: var(--font-size-xxsmall);
    }
  }
`;

const PlpSubCategories = ({ subcategoryFilter, filterValue, setFilterValues }) => {
  const { data: blocks } = subcategoryFilter?.[0] || {};

  return (
    <PlpSubCategoriesStyles className="container-wrapper">
      {blocks?.map((block) => {
        return (
          <div className="subcategory-block" key={`subcategory-${block?.slug}`}>
            <button
              onClick={() =>
                setFilterValues({
                  ...filterValue,
                  subStyle: block?.slug,
                })
              }
            >
              <div className="subcategory-image">
                <DatoImage image={block?.image} />
              </div>
              <div className="subcategory-content">
                <Heading type="h3" className="subcategory-title">
                  {block?.title}
                </Heading>
              </div>
            </button>
          </div>
        );
      })}
    </PlpSubCategoriesStyles>
  );
};

export { PlpSubCategories };
