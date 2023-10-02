import { BLACK, GREY_LIGHT, WHITE, RED_ERROR } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledCheckSquare = styled.div`
  line-height: 16px;
  color: ${BLACK};

  input[type='checkbox'] {
    /* Hide but keep original checkbox around */
    opacity: 0;
    width: 0;

    &:focus + label {
      &::before {
        /* Make accessible */
        outline: rgb(59, 153, 252) auto 5px;
      }
    }

    & + label {
      &::after {
        /* Hide check */
        content: none;
      }
    }

    &:checked + label {
      &::before {
        /* Show check */
        content: '';
        border: none;
        background-color: ${GREY_LIGHT};
      }

      &::after {
        /* Show check */
        content: '';
      }
    }
  }

  /* https://medium.com/claritydesignsystem/pure-css-accessible-checkboxes-and-radios-buttons-54063e759bb3 */
  label {
    cursor: pointer;
    padding-left: 20px;
    position: relative;
    white-space: nowrap;
    transition: all 0.2s ease;

    *,
    a {
      transition: all 0.2s ease;
    }

    /* CheckSquare styling */
    &::before {
      position: absolute;
      content: '';
      width: 16px;
      height: 16px;
      border: 1px solid ${BLACK};
      background: ${WHITE};

      /* Placement of box */
      top: -2px;
      left: 0px;
    }

    /* Styling for the little checkmark is made using the bottom left and bottom borders of a small inner box */
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      height: 7px;
      width: 11px;
      border-left: 2px solid;
      border-bottom: 2px solid;
      transform: rotate(-45deg);
      border-color: ${BLACK};

      /* Placement of check */
      left: 2px;
      top: 1px;
    }
  }

  &.-transparent {
    &.-error {
      label {
        &::before {
          background-color: transparent;
        }
      }
    }
  }
  /** these styles override various uppers, so must be placed at the very bottom */
  // special case (a) that isn't covered by * because of base styles in _link.scss
  &.-error {
    *,
    a {
      color: ${RED_ERROR};
    }

    // add error border to LightRingPseudoStyle
    label {
      &::before {
        border: 1px solid ${RED_ERROR};
      }
    }
  }
`;

export const CheckSquare = ({ checkSquareId, children, onCheckSquareClick, checked }) => {
  return (
    <StyledCheckSquare>
      <input type="checkbox" id={checkSquareId} onChange={onCheckSquareClick} checked={checked} />
      <label htmlFor={checkSquareId}>{children}</label>
    </StyledCheckSquare>
  );
};

CheckSquare.defaultProps = {
  checked: true,
  onCheckSquareClick: undefined,
};

export default CheckSquare;
