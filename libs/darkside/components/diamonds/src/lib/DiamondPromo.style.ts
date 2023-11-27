import { tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondPromo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 3rem;
  gap: 3rem;

  ${tabletAndUp(`
    margin: 2rem 0 0;
  `)}

  .banner {
    display: block;
    margin: 0;

    ${tabletAndUp(`
      padding: 2rem 0;
    `)}
  }

  .title {
    padding: 0;
    margin: 0 0 1.5rem;
    font-size: var(--font-size-xsmall);
    font-weight: 500;
  }

  .list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    list-style-position: inside;
    flex-direction: column;
    display: flex;
    gap: 1rem;

    li {
      padding: 0;
      width: 100%;

      h3 {
        font-size: var(--font-size-xsmall);
      }

      p {
        font-size: var(--font-size-xxsmall);
      }
    }
  }

  .leo {
    display: block;
    padding: 2rem;
    text-align: center;
    background: var(--color-lightest-grey);

    h2 {
      font-size: var(--font-size-xsmall);
      font-weight: var(--font-weight-normal);
    }

    p {
      font-size: var(--font-size-xxsmall);
    }

    .media {
      width: 12rem;
      display: block;
      margin: 1.5rem auto 0;
      position: relative;
    }
  }
`;

export default StyledDiamondPromo;

export { StyledDiamondPromo };
