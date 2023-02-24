import { setSpace, COPY_SIZE_SMALL, COPY_SIZE, TEAL, GREY_LIGHT, BLACK } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularAccordionItemContainer = styled.div`
  .acc-item__container {
    flex: 0;
    border-bottom: 1px solid ${GREY_LIGHT};
    text-align: left;
  }

  .acc-item__header {
    margin: ${setSpace(2)} 0;
    cursor: pointer;
    text-align: left;
    font-size: ${COPY_SIZE};
    color: ${BLACK};
    line-height: 1.2;
    width: 100%;
    position: relative;
    background-color: transparent;
    border: none;
    padding-left: 0;
    padding-right: ${setSpace(4)};
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
    color: ${TEAL};
    &.minus {
      right: 1px;
      font-size: 2.4rem;
    }
  }

  .acc-item__copy {
    margin-right: ${setSpace(2)};
    font-size: ${COPY_SIZE_SMALL};
    padding-bottom: ${setSpace(4)};

    & p,
    span {
      font-size: ${COPY_SIZE_SMALL};
      line-height: 1.5;
      margin: ${setSpace(2)} 0;
    }

    & a {
      color: ${TEAL};
    }

    & a:hover {
      text-decoration: underline;
    }

    & ul.links,
    ul {
      list-style: none;
      padding-left: ${setSpace(1)};
    }

    & ul li {
      margin-bottom: ${setSpace(1)};
    }
  }

  .acc-item__cta-link {
    font-size: ${COPY_SIZE_SMALL};
    line-height: 1.5;
    color: ${TEAL};
    text-decoration: underline;
    &:hover {
      text-decoration: none !important;
    }
  }
`;
