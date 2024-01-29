import styled from 'styled-components';

export const ShowroomPageStyle = styled.div`
  max-width: 100vw;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
    max-width: 90vw;
  }

  @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
    display: flex;
    padding-top: var(--gutter);
  }

  .showroom__nav {
    flex: 1;

    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      border-right: 0.1rem solid #ccc;
      padding-right: var(--gutter);
    }
  }

  .showroom__content {
    flex: 10;
    max-width: 90vw;
    margin: 0 auto;
  }
`;
