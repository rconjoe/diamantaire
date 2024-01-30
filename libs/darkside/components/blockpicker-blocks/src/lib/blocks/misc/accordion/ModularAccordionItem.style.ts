import styled from 'styled-components';

export const ModularAccordionItemContainer = styled.div`
  .acc-item__container {
    flex: 0;
    border-bottom: 0.1rem solid var(--color-light-grey);
    text-align: left;
  }

  .acc-item__header {
    margin: calc(var(--space-gutter) * 2) 0;
    cursor: pointer;
    text-align: left;
    font-size: var(--font-size-xsmall);
    color: var(--color-black);
    line-height: 1.2;
    width: 100%;
    position: relative;
    background-color: transparent;
    border: none;
    padding-left: 0;
    padding-right: calc(var(--space-gutter) * 4);
    &[data-state='open'] .plus {
      display: none;
    }
    &[data-state='collapsed'] .minus {
      display: none;
    }
    h3 {
      font-weight: normal;
    }
  }

  .acc-item__header-icon {
    position: absolute;
    display: flex;
    align-items: center;
    right: 0;
    top: 0;
    height: 100%;
    font-size: 2rem;
    font-weight: normal;
    color: var(--color-teal);
    &.minus {
      right: 0.1rem;
      font-size: 2.4rem;
    }
  }

  .acc-item__copy {
    margin-right: calc(var(--space-gutter * 2));
    font-size: var(--font-size-xsmall);
    padding-bottom: calc(var(--space-gutter * 4));

    p,
    span {
      font-size: var(--font-size-xsmall);
      line-height: 1.5;
      margin: calc(var(--space-gutter * 2)) 0;
    }

    a {
      color: var(--color-teal);
    }

    a:hover {
      text-decoration: underline;
    }

    ul.links,
    ul {
      list-style: none;
      padding-left: var(--space-gutter);
    }

    ul li {
      margin-bottom: var(--space-gutter);
    }
  }

  .acc-item__cta-link {
    font-size: var(--font-size-xsmall);
    line-height: 1.5;
    color: var(--color-teal);
    text-decoration: underline;
    margin-bottom: 2rem;
    display: inline-block;
    &:hover {
      text-decoration: none !important;
    }
  }
`;
