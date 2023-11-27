import styled from 'styled-components';

const StyledCheckSquare = styled.div`
  line-height: 1.6rem;
  color: var(--color-black);

  input[type='checkbox'] {
    /* Hide but keep original checkbox around */
    opacity: 0;
    width: 0;

    &:focus + label {
      &::before {
        /* Make accessible */
        outline: rgb(59, 153, 252) auto 0.5rem;
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
        background-color: var(--color-light-grey);
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
    padding-left: 2rem;
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
      width: 1.6rem;
      height: 1.6rem;
      border: 0.1rem solid var(--color-black);
      background: var(--color-white);

      /* Placement of box */
      top: -0.2rem;
      left: 0px;
    }

    /* Styling for the little checkmark is made using the bottom left and bottom borders of a small inner box */
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      height: 0.7rem;
      width: 1.1rem;
      border-left: 0.2rem solid;
      border-bottom: 0.2rem solid;
      transform: rotate(-45deg);
      border-color: var(--color-black);

      /* Placement of check */
      left: 0.2rem;
      top: 0.1rem;
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
      color: var(--color-error-red);
    }

    // add error border to LightRingPseudoStyle
    label {
      &::before {
        border: 0.1rem solid var(--color-error-red);
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
