import styled from 'styled-components';

export const SocialMediaContainer = styled.div`
  padding: 5rem 2.5rem;
  background-color: var(--color-lightest-grey);

  @media (min-width: 1200px) {
    padding: 8rem 2.5rem;
  }

  .title__container {
    text-align: center;
    margin-bottom: 2rem;

    h2 {
      margin-bottom: 2rem;
    }
  }

  .icons__container {
    text-align: center;
    ul {
      display: inline-flex;
      justify-content: center;
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        flex: 1;
        margin-right: 2rem;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`;
