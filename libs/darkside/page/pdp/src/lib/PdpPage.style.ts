import styled from 'styled-components';

export const PageContainerStyles = styled.div`
  .product-container {
    display: flex;
    flex-direction: row;
    .media-container {
      display: flex;
      flex: 2 1 0%;
      padding: 0 20px;
    }
    .info-container {
      flex: 0 0 450px;
      padding: 0 40px 0 20px;
      h1 {
        font-size: 2.8rem;
      }
    }
  }
`;
