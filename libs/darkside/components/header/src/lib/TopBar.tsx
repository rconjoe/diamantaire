import { XIcon } from '@diamantaire/shared/icons';
import { tabletAndUp } from '@diamantaire/styles/darkside-styles';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

type TopBarTypes = {
  setIsTopbarShowing: React.Dispatch<React.SetStateAction<boolean>>;
};

const TopBarContainer = styled.div`
  background-color: var(--color-teal);
  padding: 1.15rem 0;
  position: relative;
  z-index: 5000;

  * {
    color: #fff;
    font-size: var(--font-size-xxxxsmall);

    ${tabletAndUp(`
      font-size: var(--font-size-xxxsmall);
    `)}
  }

  .top-bar__content {
    display: flex;
    justify-content: center;

    p {
      margin: 0;
    }
  }

  .close__container {
    transform: scale(0.6);
    position: absolute;
    right: 1rem;
    top: 0.7rem;
    height: 2.4rem;
    width: 2.4rem;

    button {
      padding: 0;
      background-color: transparent;
      border: none;

      svg {
        stroke: #fff;
        stroke-width: 1px;
      }
    }
  }
`;

// TODO: connect to Dato instead of using static data

const menuTexts = [
  `<p><a href="">Black Friday: Tiny Studs with purchases over $450.</a></p>`,
  `<p>Talk to a diamond expert. <a href="#" class="bold">BOOK AN APPOINTMENT</a></p>`,
];

const TopBar: FC<TopBarTypes> = ({ setIsTopbarShowing }): JSX.Element => {
  const [topbarText, setTopbarText] = useState(menuTexts[0]);
  //   temp
  const [topbarIndex, setTopbarIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (topbarIndex === 0) {
        setTopbarIndex(1);
        setTopbarText(menuTexts[1]);
      } else {
        setTopbarIndex(0);
        setTopbarText(menuTexts[0]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TopBarContainer id="top-bar">
      <div className="top-bar__wrapper">
        <div className="top-bar__content" dangerouslySetInnerHTML={{ __html: topbarText }}></div>

        <div className="close__container">
          <button aria-label="Close Top Bar" onClick={() => setIsTopbarShowing(false)}>
            <XIcon />
          </button>
        </div>
      </div>
    </TopBarContainer>
  );
};

export default TopBar;
