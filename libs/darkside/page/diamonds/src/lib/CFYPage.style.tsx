import { desktopAndUp, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledCFYPage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto 0;
  padding: 0;
  position: relative;

  ${tabletAndUp(`
    margin: 2rem auto;
    flex-direction: row;  
  `)}

  .page-header {
    padding: 1rem 1.5rem 0;
    text-align: center;

    ${tabletAndUp(`
      padding: 0.5rem 3rem 0;
    `)}

    .title {
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-medium);
      margin: 0 0 1.5rem;
      line-height: 1.1;

      ${tabletAndUp(`
        font-size: var(--font-size-large);
        margin: 0 0 1.5rem;
      `)}
    }

    p {
      font-size: var(--font-size-xxxsmall);
      max-width: 100%;
      margin: 0 auto;
      width: 360px;

      ${tabletAndUp(`
        font-size: var(--font-size-xsmall);
        width: 550px;
      `)}
    }
  }

  .page-main {
    flex: 1;

    // top: ${(props) => props.headerHeight + 20}px;

    ${tabletAndUp(`
      padding: 0 0 4rem;
      // position: sticky;
      align-self: flex-start;
    `)}
  }

  .page-aside {
    width: 100%;
    margin: 4rem 0 0;

    ${tabletAndUp(`
    margin: 0;
      width: 40rem;
      padding: 0 0 4rem;
    `)}
  }

  .button-check-availability {
    max-width: calc(100% - 4.8rem);
    margin: 1rem auto;
    position: relative;
    z-index: 1;

    ${desktopAndUp(`
      max-width: 30rem;
    `)}
  }
`;

export default StyledCFYPage;

export { StyledCFYPage };
