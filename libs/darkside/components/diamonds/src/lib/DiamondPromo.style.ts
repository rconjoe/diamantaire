import styled from 'styled-components';

const StyledDiamondPromo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 3rem;
  gap: 3rem;

  @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
    margin: 2rem 0 0;
  }

  .banner {
    display: block;
    margin: 0;

    /* @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      padding: 0rem 0 0rem;
    } */
  }

  .title {
    padding: 0;
    margin: 0 0 0.5rem;
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
    gap: 0.5rem;

    li {
      padding: 0;
      width: 100%;

      h3 {
        font-size: var(--font-size-xsmall);
        font-weight: 500;
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
    margin-bottom: 7.5rem;

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
