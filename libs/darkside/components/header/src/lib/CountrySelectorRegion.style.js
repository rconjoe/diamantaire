import { css } from 'react-emotion';
import { MAIN_FONT } from '../../styles/globalStyles';
import { setSpace } from '../../styles';
import { tabletAndUp } from '../../styles/mediaQueries';

export const container = css`
  border-bottom: 1px solid #979797;
  padding: ${setSpace(2)} 0;

  &:first-child {
    padding-top: ${setSpace(1)};
  }

  &:last-child {
    border-bottom: 0;
  }

  ${tabletAndUp(css`
    margin-right: ${setSpace(4)};
    border-bottom: none;
    padding: 0;

    &:first-child {
      padding-top: 0;
    }
  `)};
`;

export const countries = css`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(10, auto);

  ${tabletAndUp(css`
    margin-bottom: ${setSpace(4)};
    grid-template-rows: repeat(6, auto);
  `)};

  &.-shortlist {
    grid-template-rows: repeat(4, auto);
  }
`;

export const country = css`
  margin-right: ${setSpace(3)};
  margin-bottom: ${setSpace(0.5)};
  font-family: ${MAIN_FONT};
  font-size: 1.2rem;
  cursor: pointer;
  line-height: ${setSpace(3)};

  ${tabletAndUp(css`
    margin-right: ${setSpace(4)};
  `)};
`;

export const region = css`
  font-size: 1.2rem;
  margin-bottom: ${setSpace(1)};

  ${tabletAndUp(css`
    margin-bottom: ${setSpace(2)};
  `)};
`;
