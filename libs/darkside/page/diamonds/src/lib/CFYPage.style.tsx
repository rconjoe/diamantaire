import styled from 'styled-components';

const StyledCFYPage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto 0;
  padding: 0;
  position: relative;

  @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
    margin: 2rem auto;
    flex-direction: row;
  }

  .page-header {
    padding: 1rem 1.5rem 0;
    text-align: center;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      padding: 0 3rem;
    }

    .title {
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-medium);
      margin: 0 0 1.5rem;
      line-height: 1.1;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        font-size: var(--font-size-large);
        margin: 0 0 1rem;
      }
    }

    p {
      font-size: var(--font-size-xxxsmall);
      max-width: 100%;
      margin: 0 auto;
      width: 360px;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        font-size: var(--font-size-xsmall);
        width: 55rem;
      }
    }
  }

  .page-main {
    flex: 1;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      padding: 0 0 4rem;
      position: sticky;
      align-self: flex-start;
      top: 7.5rem;
    }
  }

  .page-aside {
    width: 100%;
    margin: 1rem 0 0;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      margin: 0;
      width: 40rem;
      padding: 0 0 4rem;
    }

    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      transform: translateX(-5.5rem);
    }
  }

  .button-check-availability {
    max-width: calc(100% - 4.8rem);
    margin: 1rem auto;
    position: relative;
    z-index: 1;

    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      max-width: 30rem;
    }
  }
`;

export default StyledCFYPage;

export { StyledCFYPage };
