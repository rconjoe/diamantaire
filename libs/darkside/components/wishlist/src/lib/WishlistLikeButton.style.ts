import { TEAL } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const StyledWishlistLikeButton = styled.div`
  position: absolute;
  cursor: pointer;
  width: 20px;
  right: 0;
  top: 0;

  .active {
    svg {
      fill: ${TEAL}
    }
  }

  svg {
    width: 100%;
  }

  &.wishlist {
    
  }
`;
