import styled from 'styled-components';

/* inspired by http://tobiasahlin.com/spinkit/ */
const LoaderStyles = styled.div`
  animation-delay: -0.32s;

  > div {
    width: 1rem;
    height: 1rem;
    margin: 0 0.2rem;
    background-color: ${({ color }) => color || `var(--color-white)`};
    border-radius: 100%;
    display: inline-block;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  div:nth-of-type(1) {
    animation-delay: -0.32s;
  }

  div:nth-of-type(2) {
    animation-delay: -0.16s;
  }

  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

export default LoaderStyles;
