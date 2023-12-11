import { DatoImage, Heading } from '@diamantaire/darkside/components/common-ui';
import { media } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const PlpSubCategoriesStyles = styled.div`
  display: flex;
  padding: 0 0 2rem;
  justify-content: center;
  overflow-x: auto;
  justify-content: start;
  padding-left: 0.5rem;

  ${media.medium`justify-content: center;`}
  > .subcategory-block {
    flex: 0 0 17rem;
    padding: 0 0.5rem;
    > button {
      width: 100%;
      padding: 0;
      background-color: transparent;
      border: none;
      color: var(--color-black);
    }

    .subcategory-title {
      margin-top: 0.5rem;
      font-size: var(--font-size-xxxxsmall);
      text-align: left;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        font-size: var(--font-size-xxsmall);
      }
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
                <DatoImage image={block?.image} enableDpr={true} />
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
