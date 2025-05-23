import styled from 'styled-components';

export const ModularTallHalfWidthBlockContainer = styled.div`
  position: relative;
  max-width: var(--max-width-small);
  margin: 0 auto;

  &.-vertical-margins {
    margin: 5rem auto;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      margin: 8rem auto;
      width: 100%;
      padding: 0 2.4rem;
    }

    @media (min-width: ${({ theme }) => theme.sizes.xxl}) {
      padding: 0;
    }
  }

  &.-full-screen {
    max-width: 100%;
  }

  .special_shapes & {
    margin: 0 auto !important;
  }

  .image-container {
    width: 100%;
    max-width: 76.7rem;

    height: auto;
    margin: auto;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      max-width: 60%;
      min-height: calc(60vw / 8 * 5);
      max-height: unset;

      &.-left {
        margin-left: auto;
        margin-right: 0;
      }

      &.-right {
        margin-right: auto;
        margin-left: 0;
      }
    }

    @media (min-width: ${({ theme }) => theme.sizes.xxl}) {
      min-height: 54rem;
    }

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  .content-container {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 100%;
    margin: calc(var(--space-gutter) * 5) auto;
    width: calc(var(--space-gutter) * 40);

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      text-align: left;
      margin-top: 0;
      margin-bottom: calc(var(--space-gutter) * 3.5);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      min-height: calc(var(--space-gutter) * 28);
    }

    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      min-height: calc(var(--space-gutter) * 41);
      width: calc(var(--space-gutter) * 63);
    }

    &.-white {
      .primary,
      .secondary {
        @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
          color: var(--color-white);
          border-color: var(--color-white);
          &:hover {
            color: var(--color-white);
            border-color: var(--color-white);
          }
        }
      }
    }

    &.-bg {
      max-width: 100%;
      width: calc(var(--space-gutter) * 40);
      background: #fff;
      padding: calc(var(--space-gutter) * 3);
      margin: -10rem auto calc(var(--space-gutter) * 5);
      position: relative;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        position: absolute;
        margin: unset;
        bottom: unset;
        width: calc(var(--space-gutter) * 70);
        padding: calc(var(--space-gutter) * 4);
      }

      @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
        width: calc(var(--space-gutter) * 70);
      }
      @media (min-width: ${({ theme }) => theme.sizes.xl}) {
        width: calc(var(--space-gutter) * 80);
      }
    }

    &.-bg.-wide {
      max-width: 100%;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        padding: calc(var(--space-gutter) * 3);
        width: calc(var(--space-gutter) * 60);
      }

      @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
        width: calc(var(--space-gutter) * 80);
        padding: calc(var(--space-gutter) * 5);
      }

      @media (min-width: ${({ theme }) => theme.sizes.xl}) {
        width: calc(var(--space-gutter) * 78);
      }

      @media (min-width: ${({ theme }) => theme.sizes.xxl}) {
        width: calc(var(--space-gutter) * 90);
        padding: calc(var(--space-gutter) * 7);
      }
    }

    &.-left {
      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        left: 0;
      }

      @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
        padding: calc(var(--space-gutter) * 7) calc(var(--space-gutter) * 6);
      }
    }

    &.-right {
      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        right: 0;
      }

      @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
        padding: calc(var(--space-gutter) * 7) calc(var(--space-gutter) * 6);
      }
    }

    &.-right.-bg.-wide {
      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        right: calc(var(--space-gutter) * 3);
      }

      @media (min-width: ${({ theme }) => theme.sizes.xl}) {
        right: calc(var(--space-gutter) * 5);
      }

      @media (min-width: ${({ theme }) => theme.sizes.xxl}) {
        right: 0;
      }
    }

    &.-tall-block {
      max-width: 100%;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        width: calc(var(--space-gutter) * 70);
      }
    }

    .cta {
      display: flex;
      flex-direction: column;
      margin-left: calc(var(--space-gutter) * -3);
      margin-right: calc(var(--space-gutter) * -3);

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        margin-left: 0;
        margin-right: 0;
      }
    }

    .cta.-first {
      button {
        @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
          margin-top: calc(var(--space-gutter) * 2);
        }
      }
    }

    .cta__button {
      > .button-style--outline {
        width: 99% !important;
        @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
          width: 60% !important;
        }
      }

      button {
        margin-top: var(--space-gutter);

        @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
          font-size: 1.6rem !important;
        }
        @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
          margin-top: var(--space-gutter);
        }
        @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
          margin-top: calc(var(--space-gutter) * 3);
        }
      }
    }
  }
  .content__title {
    margin-bottom: calc(var(--space-gutter) * 2);

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      &.-white {
        color: var(--color-white);
        border-color: var(--color-white);
      }
    }

    &.-no-margin {
      margin-bottom: 0;
    }
  }

  .logo__title-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7rem;
    margin: 0 auto 2rem;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      gap: 1rem;
      flex-direction: row;
      align-items: baseline;
    }
  }

  .content__title-image {
    max-width: 18rem;

    img {
      max-height: 3rem;
    }
  }

  .content__desktop-copy {
    p {
      line-height: 1.5 !important;
    }

    p:nth-child(odd) {
      font-weight: 500 !important;
    }

    p:nth-child(even) {
      margin-bottom: calc(var(--space-gutter) * 1.7);
      font-size: 1.7rem;
      font-weight: 400 !important;
    }

    p:only-child {
      font-weight: 400 !important;
    }

    font-size: var(--font-size-xsmall);

    a {
      text-decoration-line: underline;
      text-decoration-style: solid;
      text-decoration-thickness: 0.1rem;
    }

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      &.-white {
        color: var(--color-white);
        border-color: var(--color-white);
        a {
          color: inherit;
        }
      }
      &.-tall-block p {
        margin-bottom: 1rem;
      }
    }
  }
`;
