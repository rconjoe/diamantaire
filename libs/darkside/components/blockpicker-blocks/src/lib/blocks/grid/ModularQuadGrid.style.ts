import styled from 'styled-components';

export const ModularQuadGridContainer = styled.div`
  padding: 50px 25px;
  @media (min-width: 1440px) {
    max-width: calc(1280px + 100px);
    margin: 0 auto;
  }
  .title__container {
    text-align: center;
    padding-bottom: 25px;
  }

  .grid__container {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    max-width: 650px;

    @media (min-width: 1024px) {
      margin: 0 -15px;
      max-width: 100%;
    }
    .item__container {
      flex: 0 0 50%;
      margin-bottom: 40px;
      padding: 0 15px;
      @media (min-width: 1024px) {
        flex: 0 0 25%;
        padding: 0 15px;
        margin-bottom: 50px;
      }
      .item__inner {
        .imageTileCopyContainer {
          display: none;
        }

        .item__content {
          padding: 1.6rem 0 0;
          text-align: left;

          @media (min-width: 767px) {
            text-align: center;
            padding: 0 1.6rem;
          }
          h4 {
            font-size: 1.6rem;
            font-weight: 450;
            line-height: 1.3;

            @media (min-width: 1200px) {
              font-size: 2.2rem;
            }
          }

          .item__caption {
            margin-top: 10px;
            p {
              font-size: 1.6rem;
            }
            a {
              color: #719093;
              text-decoration: underline;
              font-weight: 450;
              margin-top: 15px;
              display: inline-block;
            }
          }
        }
      }
    }
  }

  .grid-footer__container {
    text-align: center;
    margin-top: 30px;
    a {
      margin: 0 auto;
      max-width: 335px;
      width: 100%;
      display: block;
      button {
        width: 100%;
      }
    }
  }
`;
