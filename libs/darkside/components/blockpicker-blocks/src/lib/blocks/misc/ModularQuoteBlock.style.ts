import { setSpace, mobileOnly, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularQuoteBlockContainer = styled.div`
  .quote-block__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.$backgroundColor};
    max-width: 144rem;
    margin: 0 auto;
  }

  .quote-block__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: ${setSpace(10)} 0;
    min-height: 520px;

    ${tabletAndUp(`
      max-width: unset;
      align-items: center;
      padding: var(--gutter) 0;
    `)};
  }

  .quote-block__quote-image-wrapper {
    width: 100%;
    text-align: center;
    margin-bottom: ${setSpace(2)};

    img {
      max-width: 4rem;
      margin: 0 auto;
    }

    ${mobileOnly(`
      margin-bottom: ${setSpace(3)};
  `)}
  }

  .quote-block__quote-image {
    height: 4rem;
    width: auto;
    margin: 0 auto;
    ${mobileOnly(`
      height: 3rem;
  `)}
  }

  .quote-block__quote {
    font-size: 2rem;
    font-family: ${(props) => (props.$textFont ? `${props.$textFont}, var(--font-family-main)` : 'var(--font-family-main)')};
    font-style: ${(props) => (props.$textStyle ? props.$textStyle : 'initial')};
    font-weight: 400;
    line-height: 1.6;
    letter-spacing: 0.1rem;
    color: ${(props) => props.$textColor};
    max-width: 714px;
    margin: ${setSpace(1)} ${setSpace(8)};
    text-align: center;
  }
  .quote-block__attribution {
    font-family: ${(props) =>
      props.$attributionFont ? `${props.$attributionFont}, var(--font-family-main)` : 'var(--font-family-main)'};
    color: ${(props) => props.$textColor};
    margin: ${setSpace(1)} 0;
    text-align: center;
    width: 100%;
    font-weight: 400;
  }
`;
