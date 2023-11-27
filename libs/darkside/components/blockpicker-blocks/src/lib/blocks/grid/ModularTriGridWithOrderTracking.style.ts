import { BP_LG, BP_MD, BP_XL, BP_XXL, BP_XXXL } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularTriGridWithOrderTrackingContainer = styled.div`
  margin: 0 auto 6rem;
  padding: 0 2.5rem;

  @media (min-width: ${BP_MD}) {
    padding: 4rem 2.5rem;
  }
  @media (min-width: ${BP_LG}) {
    max-width: 90vw;
    background-color: #f7f7f7;
  }

  @media (min-width: ${BP_XXL}) {
    max-width: 85vw;
  }
  @media (min-width: ${BP_XXXL}) {
    max-width: 70vw;
  }

  .grid-wrapper {
    max-width: 40rem;
    margin: 0 auto;
    @media (min-width: ${BP_LG}) {
      display: flex;
      max-width: 100%;
    }
    .item__container {
      padding: 0 1.5rem;
      flex: 0 0 33.33%;
      margin-bottom: 1.5rem;
      display: flex;
      @media (min-width: ${BP_XL}) {
        margin-bottom: 0;
      }

      .item__inner {
        background-color: #fff;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        @media (min-width: ${BP_LG}) {
          padding: 2.5rem;
        }

        h3 {
          font-size: 2.2rem;
          margin: 0 0 2rem;
          font-weight: 450;
          display: none;
          @media (min-width: ${BP_LG}) {
            display: block;
          }
        }

        p {
          font-size: 1.6rem;
          line-height: 1.5;
          margin: 0 0 2rem;
          display: none;
          @media (min-width: ${BP_LG}) {
            display: block;
          }
        }

        a,
        button {
          display: flex;
          align-items: center;
          justify-content: start;
          font-size: 1.8rem;
          background-color: #719093;
          color: #fff;
          padding: 1.5rem 2.5rem;
          font-weight: 450;
          width: 100%;
          border: 0.1rem solid #719093;
          @media (min-width: ${BP_XL}) {
            justify-content: center;
            padding: 1.5rem 2.5rem;
          }

          &:hover {
            cursor: pointer;
          }

          span {
            flex: 0 0 2.5rem;
            margin-right: 0.5rem;

            svg {
              height: 2.5rem;
              width: 3rem;

              path {
                fill: #fff;
              }
            }

            &.chat {
              svg {
                width: 2.1rem;
              }
            }
            &.envelope {
              margin-right: 0.7rem;
              svg {
                width: 2.3rem;
              }
            }
          }
        }
      }
    }
  }
`;
