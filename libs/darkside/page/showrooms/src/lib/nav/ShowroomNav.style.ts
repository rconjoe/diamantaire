import styled from 'styled-components';

export const ShowroomNavContainer = styled.div`
  /* Responsive Menu Styles */
  background-color: #fff;
  .mobile-nav {
    position: absolute;
    top: 0;
    background-color: #fff;
    width: 100%;
    padding: ${(props) => props.$headerHeight + 'px'} calc(var(--gutter) / 2) calc(var(--gutter) / 3);
  }

  .mobile-nav__toggle {
    h3 {
      flex: 2;
      margin: 0;
      display: inline-block;
      margin-right: 5px;
    }
    button {
      flex: 1.5;
      padding: 0;
      background-color: transparent;
      border: none;
      color: var(--color-teal);
      font-size: 1.7rem;
      font-weight: var(--font-weight-bold);

      span.text {
        text-decoration: underline;
      }
      span.icon {
        font-size: 1rem;
        text-decoration: none;
      }
    }
  }

  .mobile-nav__menu {
    padding-top: calc(var(--gutter) / 2);
  }

  /* General Menu Styles */
  h3,
  h4 {
    font-size: 1.7rem;
  }

  h3 {
    margin: calc(var(--gutter) / 5) 0 calc(var(--gutter) / 1.5);
  }

  h4 {
    margin: 0 0 calc(var(--gutter) / 5);
  }

  .list__container {
    margin: 0 0 calc(var(--gutter) / 1.5);
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        margin: 0 0 calc(var(--gutter) / 5);
        a {
          color: #979797;
          font-size: 1.7rem;
          font-weight: 400;

          &.active {
            color: var(--color-teal);
            font-weight: var(--font-weight-bold);
            text-decoration: underline;
          }
        }
      }
    }
  }
`;
