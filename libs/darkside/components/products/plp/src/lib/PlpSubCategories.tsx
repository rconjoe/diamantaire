import { DatoImage, Heading } from '@diamantaire/darkside/components/common-ui';
import { media } from '@diamantaire/styles/darkside-styles';
import Link from 'next/link';
import styled from 'styled-components';

const PlpSubCategoriesStyles = styled.div`
  display: flex;
  padding: 0 0 1rem;
  justify-content: center;
  overflow-x: auto;
  justify-content: start;

  ${media.medium`justify-content: center;padding: 0 0 1rem; padding-left: 0;`}
  > .subcategory-block {
    flex: 0 0 22rem;
    padding: 0 1.2rem;
    > button {
      width: 100%;
      padding: 0;
      background-color: transparent;
      border: none;
      color: var(--color-black);
    }

    .subcategory-title {
      margin-top: 0.5rem;
      font-size: var(--font-size-xxxsmall);
      text-align: left;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        font-size: var(--font-size-xxsmall);
      }
    }
  }
`;

const PlpSubCategories = ({ subcategoryFilter, filterValue, setFilterValues }) => {
  const { data: blocks } = subcategoryFilter?.[0] || {};

  console.log(`PlpSubCategories`, blocks);

  return (
    <PlpSubCategoriesStyles className="container-wrapper">
      {blocks?.map((block) => {
        const content = (
          <>
            <div className="subcategory-image">
              <DatoImage image={block?.image} enableDpr={true} />
            </div>
            <div className="subcategory-content">
              <Heading type="h3" className="subcategory-title">
                {block?.title}
              </Heading>
            </div>
          </>
        );

        return (
          <div className="subcategory-block" key={`subcategory-${block?.slug}`}>
            {block.link ? (
              <Link href={block.link}>{content}</Link>
            ) : (
              <button onClick={() => setFilterValues({ ...filterValue, subStyle: [block?.slug] })}>{content}</button>
            )}
          </div>
        );
      })}
    </PlpSubCategoriesStyles>
  );
};

export { PlpSubCategories };
