import { X } from '@diamantaire/shared/icons';
import { TEAL } from '@diamantaire/styles/darkside-styles';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

type TopBarTypes = {
  setIsTopbarShowing: React.Dispatch<React.SetStateAction<boolean>>;
};

const TopBarContainer = styled.div`
  background-color: ${TEAL};
  padding: 1.15rem 0;
  position: relative;

  .top-bar__content {
    display: flex;
    justify-content: center;
    p {
      margin: 0;
      color: #fff;
      font-size: 1.4rem;
    }
  }
  .close__container {
    position: absolute;
    right: 20px;
    top: 10px;

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
    <TopBarContainer>
      <div className="top-bar__wrapper">
        <div className="top-bar__content" dangerouslySetInnerHTML={{ __html: topbarText }}></div>

        <div className="close__container">
          <button aria-label="Close Top Bar" onClick={() => setIsTopbarShowing(false)}>
            <X />
          </button>
        </div>
      </div>
    </TopBarContainer>
  );
};

export default TopBar;
