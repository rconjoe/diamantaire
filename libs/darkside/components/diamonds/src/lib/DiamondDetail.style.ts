import styled from 'styled-components';

const gap = '2rem';

const StyledDiamondDetail = styled.div`
  display: block;
  flex-wrap: wrap;
  position: relative;

  > .body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: ${gap};

    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      flex-direction: row;
      padding: ${gap} 0;
    }
  }

  > .foot {
    display: flex;
    margin: 5rem -2.4rem 0;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: ${gap};

    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      margin: 0;
    }
  }

  > .body > .main {
    width: 100%;
    padding: 0 0 ${gap};
    top: ${(props) => props.headerHeight}px;

    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      width: 70%;
      position: sticky;
    }
  }

  > .body > .aside {
    display: flex;
    flex-direction: column;
    gap: ${gap};
    width: 100%;

    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      padding: 0 ${gap} ${gap};
      width: 30%;
    }
  }

  .main > .media {
    display: block;
    margin: 0 -2.4rem;

    @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
      height: calc(100vw + 3rem);
    }

    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      margin: 0;
      width: 100%;
      display: flex;
      align-items: flex-start;
    }

    .media-content {
      position: relative;
      flex: 1;
      width: 100%;
      height: 100%;
    }

    .media-content-item {
      width: 100%;
      display: block;
      aspect-ratio: 1/1;

      @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
        width: 43.5rem;
        max-width: 50%;
      }
    }
  }

  .aside > .title {
    font-size: var(--font-size-medium);
    font-weight: var(--font-weight-medium);
    text-align: center;
    line-height: 1.2;

    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      font-size: var(--font-size-large);
      font-weight: var(--font-weight-medium);
      text-align: left;
    }
  }

  .aside > .price {
    display: block;
    text-align: center;
    margin-top: -1.5rem;
    color: var(--color-black);
    font-size: var(--font-size-small);

    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      text-align: left;
      font-size: var(--font-size-small);
    }

    .price-text {
      display: block;
      text-align: center;
      font-size: var(--font-size-xxxsmall);

      @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
        text-align: left;
        font-size: var(--font-size-xxxxsmall);
      }
    }
  }

  .aside > .cta {
    display: flex;
    flex-direction: column;
    gap: ${gap};
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0 !important;
    width: 100%;

    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      padding-right: ${gap};
    }

    button {
      width: 100%;
      max-width: 100%;

      &.-slideout {
        font-size: var(--font-size-xxxsmall) !important;
      }

      &.-link-teal.primary {
        font-weight: 500;
      }
    }
  }

  .aside > .mail {
    display: flex;
    flex-direction: column;
    margin-top: 3rem;

    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      margin-top: 0;
    }

    .title {
      font-size: var(--font-size-small);
      font-weight: 500;
      text-align: left;

      @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
        font-size: var(--font-size-xsmall);
      }
    }

    p {
      font-size: var(--font-size-xxsmall);
    }

    form {
      flex: unset;
      width: 100%;
      display: block;
      margin-top: calc(${gap} / 2);

      .input-container {
        float: left;
        margin: 0;

        &:nth-child(1) {
          width: 65%;
        }

        &:nth-child(2) {
          width: 35%;
        }
      }

      button.submit,
      [type='text'] {
        flex: unset;
        width: 100%;
        height: 4.8rem;
      }
    }
  }

  .media-content {
    @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
      height: calc(100vw + 3rem);
    }
  }

  .media-content > .carousel {
    width: 100%;
    display: block;
    overflow: hidden;

    .swiper {
      overflow: visible;
    }

    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .swiper-pagination {
      bottom: -3rem;
    }

    .swiper-pagination-bullet {
      width: 0.5rem;
      height: 0.5rem;
      background: var(--color-dark-grey);

      &.active {
        background: var(--color-light-grey);
      }
    }

    .diamond-hand {
      padding-bottom: 1rem;

      @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
        max-width: calc(100% - 4.8rem);
      }
    }
  }

  .slider-dots {
    flex: 1 1 100%;
    padding: 20px 0;
    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      display: none;
    }
    ul {
      display: flex;
      margin: 0;
      padding: 0;
      list-style: none;
      justify-content: center;

      li {
        margin-right: 5px;

        &:last-child {
          margin-right: 0px;
        }

        button {
          height: 0.8rem;
          width: 0.8rem;
          background-color: var(--color-black);
          border: none;
          border-radius: 50%;
          line-height: 1;
          padding: 0;
          opacity: 0.3;

          &.active {
            opacity: 0.75;
          }
        }
      }
    }
  }

  /* Sam D. updates */

  .desktop-media-slider {
    display: none;

    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      display: flex;
    }
  }

  .mobile-media-slider {
    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      display: none;
    }
  }

  .wishlist-button--desktop {
    display: none;

    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      display: block;
    }
  }

  .wishlist-button--mobile {
    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      display: none;
    }
  }
`;

export { StyledDiamondDetail };

export default StyledDiamondDetail;
