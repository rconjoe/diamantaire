import styled from 'styled-components';

export const SingleJournalEntryStyles = styled.div`
  .text-block__wrapper {
    margin-bottom: 1rem;
    .with-styles {
      margin-top: 0;
      p {
        margin: 1.5rem 0;
      }
    }
    .text-block__title {
      margin-top: 1.6rem;
    }
    .text-block__copy {
      &.subtitle {
        margin: 2.6rem 0 0;
      }
    }
    .-textOnlyBlock {
      &.blog-entry:nth-first-child {
        margin: 0
    }
  }
`;
