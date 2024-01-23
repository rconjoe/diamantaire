import { setSpace, tabletAndUp, XXLDesktopAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularEmailSignupBlockContainer = styled.div`
  position: relative;
  display: block;
  margin: 5rem 0;
  ${tabletAndUp(`
    margin: 5rem 0;
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
    /* ${tabletAndUp(`
      margin: ${setSpace(3)} 0 ${setSpace(6)} 0;
    `)} */
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
      font-size: 2.4rem;
      line-height: 1.2;
      font-weight: var(--font-weight-medium);
      ${tabletAndUp(`
      font-size: 2.8rem;
    `)}
    }
  }

  .email-signup__subtitle {
    font-size: 1.6rem;
    margin-top: 1rem;
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
    max-width: 50rem;
    margin: auto;
    padding: 0 2rem;
    text-align: center;
  }
  .input-container.submit {
    button {
      max-width: 20rem;
      margin: 15px auto;
    }
  }
`;
