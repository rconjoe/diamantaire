import styled from 'styled-components';

const StyledTooltip = styled.div`
  .tooltip-window {
    opacity: 1;
    z-index: 9999;
    background: var(--color-white);
    border: 0.1rem solid var(--color-grey);
    padding: 2rem;
    color: var(--color-black);
    text-wrap: wrap;
    max-width: 97vw;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      max-width: 360px;
    }

    * {
      font-size: var(--font-size-xxxsmall);
      color: var(--color-black);
    }
  }

  .tooltip-arrow {
    border: 0.1rem solid var(--color-grey);
  }

  .react-tooltip__place-top .tooltip-arrow {
    border-top: 0;
    border-left: 0;
  }

  .react-tooltip__place-bottom .tooltip-arrow,
  .react-tooltip__place-bottom-start .tooltip-arrow,
  .react-tooltip__place-bottom-end .tooltip-arrow {
    border-bottom: 0;
    border-right: 0;
  }

  .react-tooltip__place-left .tooltip-arrow {
    border-bottom: 0;
    border-left: 0;
  }

  .react-tooltip__place-right .tooltip-arrow {
    border-top: 0;
    border-right: 0;
  }

  .tooltip-trigger {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
    border: 0.1rem solid var(--color-grey);
    height: 1.2rem;
    width: 1.2rem;
    position: relative;

    &:after {
      content: '';
      background: transparent;
      width: 3rem;
      height: 3rem;
      position: absolute;
    }

    * {
      font-size: var(--font-size-xxxxxsmall);
      font-family: var(--font-family-main);
      text-transform: none;
      color: var(--color-grey);
    }
  }

  #tooltip-carat,
  #tooltip-color,
  #tooltip-clarity,
  #tooltip-cut {
    max-width: 80%;
  }

  #tooltip-certificate {
    max-width: 220px;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      max-width: 17rem;
    }
  }
`;

export default StyledTooltip;
