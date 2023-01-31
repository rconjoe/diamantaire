import { css } from 'react-emotion';
import { MAIN_FONT } from '../../styles/globalStyles';
import { GREY_DARK, WHITE } from '../../styles/colors';
import { setSpace } from '../../styles';

export const button = css`
  font-family: ${MAIN_FONT};
  font-size: 1.4rem;
  /* margin-right: 1.6rem; */
  cursor: pointer;
  display: flex;
`;
export const throbber = css`
  & > div {
    background-color: ${GREY_DARK};
  }
`;

export const modalContent = css`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background-color: ${WHITE};
  padding: ${setSpace(2)} ${setSpace(4)};
  opacity: 0;
  -webkit-transition: opacity 0.2s ease-in-out;
  transition: opacity 0.2s ease-in-out;

  &:focus {
    outline: none;
  }
`;

export const modalContentAfterOpen = css`
  opacity: 1 !important;
`;

export const modalContentBeforeClose = css`
  opacity: 0 !important;
`;

export const modalOverlay = css`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease-out;
`;

export const modalOverlayAfterOpen = css`
  opacity: 1 !important;
`;

export const modalOverlayBeforeClose = css`
  opacity: 0 !important;
`;

export const closeXWrapper = css`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${setSpace(2)};
`;

export const closeX = css`
  font-family: ${MAIN_FONT};
  font-size: 1.6rem;
  cursor: pointer;
`;

export const locationIcon = css`
  /* width: 7px; */
  /* margin-right: ${setSpace(0.5)}; */
`;

export const selectText = css`
  font-size: 1.2rem;
  margin-bottom: ${setSpace(2)};
`;

export const countryLocale = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const countryLocaleLabel = css`
  display: block;
  &.-is-first {
    border-right: 1px solid black;
    padding-right: 1rem;
  }
`;
