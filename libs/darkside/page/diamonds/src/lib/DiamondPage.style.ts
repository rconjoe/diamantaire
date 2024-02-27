import styled from 'styled-components';

const asideWidthLG = '40rem';
const asideWidthMD = '40%';
const gapMD = '2.4rem';
const gapLG = '5rem';

const StyledDiamondPage = styled.div`
  margin: 2.5rem auto 0;
  display: block;

  @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
    margin: 2.5rem auto 0;
    flex-wrap: wrap;
    display: flex;
    gap: 0 ${gapMD};
    max-width: 90vw;
  }

  @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
    gap: 0 ${gapLG};
  }

  .page-title {
    width: 100%;
    display: block;
    padding: 0 0 3rem;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      display: flex;
      justify-content: center;
    }

    .title {
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-medium);
      text-align: center;
      line-height: 1;
    }
  }

  .page-aside {
    display: block;
    width: 100%;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      width: ${asideWidthMD};
      display: flex;
      flex-direction: column;
      position: sticky;
      align-self: flex-start;
      top: 55px;
    }

    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      width: ${asideWidthLG};
    }
  }

  .page-main {
    width: 100%;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      width: calc(100% - ${asideWidthMD} - ${gapMD});
    }

    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      width: calc(100% - ${asideWidthLG} - ${gapLG});
    }
  }

  .vo-filter-clear-button {
    margin: 1rem 0 0;

    button {
      font-size: var(--font-size-xxxsmall);
      font-weight: var(--font-weight-normal);
    }
  }
`;

export default StyledDiamondPage;

export { StyledDiamondPage };
