import { setSpace, MEDIUM_FONT_WEIGHT, tabletAndUp, XXLDesktopAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularEmailSignupBlockContainer = styled.div`
  position: relative;
  display: block;
  margin: 50px 0;
  ${tabletAndUp(`
    margin: 80px 0;
  `)}
  &.-reduce-margins {
    margin-top: 0;
    margin-bottom: ${setSpace(4)};

    ${tabletAndUp(`
      margin-bottom: ${setSpace(5)};
    `)};
  }
  &.-centered button {
    margin: auto;
  }

  .email-signup__wrapper {
    position: relative;
    padding: 0;

    ${tabletAndUp(`
    padding: 0 ${setSpace(3)}
  `)}

    ${XXLDesktopAndUp(`
    padding: 0;
  `)}
  }

  .email-signup__section-title {
    position: relative;
    text-align: center;
    margin: ${setSpace(3)} 0;
    ${tabletAndUp(`
      margin: ${setSpace(3)} 0 ${setSpace(6)} 0;
    `)}
    &.-no-margin {
      margin: 0;
    }
    &.-no-margin-top {
      margin-top: 0;
    }
    .primary {
      font-weight: 400 !important;
      line-height: 3.6rem;
      font-size: 3.2rem;

      ${XXLDesktopAndUp(`
      font-size: 4.2rem;
      line-height: 4.8rem;
    `)}
    }
    &.-reduce-margins {
      margin-top: 0;
      margin-bottom: ${setSpace(3)};

      ${tabletAndUp(`
        margin-bottom: ${setSpace(3)};
      `)};
    }
  }

  .email-signup__title {
    &.blog {
      font-size: 24px;
      line-height: 1.2;
      font-weight: ${MEDIUM_FONT_WEIGHT};
      ${tabletAndUp(`
      font-size: 28px;
    `)}
    }
  }

  .email-signup__subtitle {
    font-size: 16px;
    margin-top: 10px;
  }

  .email-signup__form-container {
    position: relative;
    padding: 0;

    ${tabletAndUp(`
    padding: 0 ${setSpace(3)}
  `)}

    ${XXLDesktopAndUp(`
    padding: 0;
  `)}
  }

  .email-signup__form-wrapper {
    max-width: 500px;
    margin: auto;
    padding: 0 20px;
  }
`;
