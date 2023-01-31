import { css } from 'react-emotion';
import { tabletAndUp } from '../../styles/mediaQueries';
import { setSpace } from '../../styles';

export const regionsWrapper = css`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(1, auto);

  ${tabletAndUp(css`
    grid-template-columns: repeat(2, auto);
  `)};
`;

export const header = css`
  font-size: 1.2rem;
  margin-bottom: ${setSpace(1)};

  ${tabletAndUp(css`
    margin-bottom: ${setSpace(3)};
  `)};
`;
