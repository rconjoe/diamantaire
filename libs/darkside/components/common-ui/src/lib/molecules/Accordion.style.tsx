import styled from 'styled-components';

const StyledAccordion = styled.div`
  display: block;
  background: var(--color-white);
  border-bottom: 0.1rem solid var(--color-lighter-grey);
  color: var(--color-black);

  .accordion-row {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-top: 0.1rem solid var(--color-lighter-grey);
  }

  .accordion-row:first-child {
    border-top: 0;
  }

  .accordion-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    cursor: pointer;

    .text {
      gap: 1rem;
      display: flex;
      align-items: flex-start;
      font-size: var(--font-size-xxsmall);
      font-weight: var(--font-weight-normal);

      @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
        font-size: var(--font-size-xsmall);
      }

      .value {
        padding: 0 1rem 0 0;
        // line-height: 1.2;
      }
    }

    .icon {
      font-size: var(--font-size-xsmall);
    }
  }

  .accordion-body {
    transition: all 0.2s ease;
    max-height: 0;
    display: block;
    overflow: hidden;
  }

  .accordion-row-active {
    .accordion-body {
      max-height: inherit;
    }
  }

  .accordion-content {
    display: block;

    position: relative;
  }

  .accordion-content-wrapper {
    display: block;
    position: relative;
    padding: 0 0 2rem;
  }

  .accordion-content-wrapper * {
    font-size: var(--font-size-xsmall);
  }

  .accordion-content-wrapper p {
    margin: 0.5rem 0 0;

    &:first-child {
      margin: 0;
    }
  }
`;

export default StyledAccordion;
