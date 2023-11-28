import { CssHelpers } from './css-helpers';
import { CssVariables } from './css-variables.style';
import { MiscStyles } from './misc.style';
import { ResetStyles } from './reset.style';
import { Typography } from './typography';

export const MAIN_FONT = 'var(--font-family-main)';

export const HEADLINE_SIZE = '2rem';

export function makeTealLink() {
  return `
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-xsmall);
    color: var(--color-teal);
    font-family: ${MAIN_FONT};
    text-decoration: underline;
  `;
}

export const GlobalStyles = () => {
  return (
    <>
      <ResetStyles />
      <CssVariables />
      <CssHelpers />
      <Typography />
      <MiscStyles />
    </>
  );
};
