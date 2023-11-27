import styled from 'styled-components';

export const ModularQuadGridContainer = styled.div`
  padding: 5rem 2.5rem;
  @media (min-width: 144rem) {
    max-width: calc(128rem + 10rem);
    margin: 0 auto;
  }
  .title__container {
    text-align: center;
    padding-bottom: 2.5rem;
  }

  .grid__container {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    max-width: 65rem;

    @media (min-width: 102.4rem) {
      margin: 0 -1.5rem;
      max-width: 100%;
    }
    .item__container {
      flex: 0 0 50%;
      margin-bottom: 4rem;
      padding: 0 1.5rem;
      @media (min-width: 102.4rem) {
        flex: 0 0 25%;
        padding: 0 1.5rem;
        margin-bottom: 5rem;
      }
      .item__inner {
        .imageTileCopyContainer {
          display: none;
        }

        .item__content {
          padding: 1.6rem 0 0;
          text-align: left;

          @media (min-width: 76.7rem) {
            text-align: center;
            padding: 0 1.6rem;
          }
          h4 {
            font-size: 1.6rem;
            font-weight: 450;
            line-height: 1.3;

            @media (min-width: 120rem) {
              font-size: 2.2rem;
            }
          }

          .item__caption {
            margin-top: 1rem;
            p {
              font-size: 1.6rem;
            }
            a {
              color: #719093;
              text-decoration: underline;
              font-weight: 450;
              margin-top: 1.5rem;
              display: inline-block;
            }
          }
        }
      }
    }
  }

  .grid-footer__container {
    text-align: center;
    margin-top: 3rem;
    a {
      margin: 0 auto;
      max-width: 33.5rem;
      width: 100%;
      display: block;
      button {
        width: 100%;
      }
    }
  }
`;
