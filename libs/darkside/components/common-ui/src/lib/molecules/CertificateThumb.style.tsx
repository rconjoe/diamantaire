import { GREY_LIGHTER, TEAL } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledCertificateThumb = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  position: relative;
  border: 1px solid ${GREY_LIGHTER};
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease-in;

  &:hover {
    border-color: ${TEAL};
  }

  img {
    width: 100%;
  }

  svg {
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
  }
`;

export default StyledCertificateThumb;

export { StyledCertificateThumb };
