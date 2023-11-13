import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledPageLoadProgressBar = styled.div`
  .progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--color-teal);
    z-index: 9999;
  }
  .progress-bar.loading {
    transition: width 1s;
    width: 100%;
  }
`;

const PageLoadProgressBar = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <StyledPageLoadProgressBar>
      <div className={`progress-bar ${loading ? 'loading' : ''}`} />
    </StyledPageLoadProgressBar>
  );
};

export { PageLoadProgressBar };

export default PageLoadProgressBar;
