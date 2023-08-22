import { DarksideButton, Heading } from '@diamantaire/darkside/components/common-ui';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import styled from 'styled-components';

import SummaryItem from './SummaryItem';

const BuilderFlowNavStyles = styled.div`
  position: fixed;
  bottom: 0;
  padding: 20px 40px;
  background-color: #fff;
  width: 100%;
  border-top: 1px solid #ccc;
  z-index: 3000;

  .nav__inner {
    position: relative;
  }

  nav {
    display: flex;
    align-items: center;
    .steps-container {
      display: flex;
      align-items: center;
      flex: 1.5;
      ul {
        display: flex;
        margin: 0;
        padding: 0;
        list-style: none;
        margin-left: var(--gutter);

        li {
          flex: 0 0 280px;
          display: flex;
          margin-right: 10px;

          > div {
            flex: 1;
            display: flex;

            &.active {
              button {
                background-color: var(--color-black);
                color: var(--color-white);
              }
            }
          }
          button {
            flex: 1;
            width: 100%;
            padding: 15px 20px;
            text-align: left;
            border: 1px solid #ccc;
            background-color: transparent;
            border-radius: 4px;

            span {
              display: block;
              font-size: 1.3rem;
              font-style: italic;
              color: #777;
              font-weight: 400;
            }
          }
        }
      }
    }
    .summary-container {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      > div {
        flex: 0 0 280px;
        &.active {
          button {
            background-color: var(--color-white);
            color: var(--color-teal);
          }
        }
        button {
          flex: 1;
          width: 100%;
          padding: 15px 20px;

          border: 1px solid #ccc;
          border-radius: 4px;

          span {
            display: block;
            font-size: 1.3rem;
            font-style: italic;
            color: #777;
            font-weight: 400;
          }
        }
      }
    }
  }
  .builder-summary__container {
    position: absolute;
    right: 0;
    bottom: 100px;
    height: 400px;
    width: 450px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 20px;

    .summary__title {
      margin-bottom: 20px;
      &::after {
        content: ' ';
        height: 2px;
        background-color: var(--color-teal);
        display: block;
        max-width: 35px;
        margin-top: 5px;
      }
    }

    .summary-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .item__image {
        flex: 0 0 120px;
        margin-right: 20px;
      }

      .item__content {
        h4 {
          font-size: 1.6rem;
          margin-bottom: 5px;
        }

        p {
          font-size: 1.5rem;
          margin-bottom: 5px;
          color: #777;
        }
      }
      .item__edit-toggle {
        flex: 1;
        margin-left: 10px;
        text-align: right;
      }
    }
  }
`;

const BuilderFlowNav = ({ changeStep, product, currentStep, builderFlowState, type }) => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const allowedKeys = ['product', 'diamond'];

  const sortedKeys = Object.keys(builderFlowState)
    .filter((key) => allowedKeys.includes(key))
    .sort((a, b) => {
      return allowedKeys.indexOf(a) - allowedKeys.indexOf(b);
    });

  const steps = {
    'setting-to-diamond': [
      {
        title: 'Choose a setting',
        enabled: true,
      },
      {
        title: 'Choose a diamond',
        enabled: builderFlowState?.product,
      },
      {
        title: 'Review and Purchase',
        enabled: builderFlowState?.diamond && builderFlowState?.product,
      },
    ],
    'diamond-to-setting': [
      {
        title: 'Choose a diamond',
        enabled: true,
      },
      {
        title: 'Choose a setting',
        enabled: builderFlowState?.diamond,
      },
      {
        title: 'Review and Purchase',
        enabled: builderFlowState?.diamond && builderFlowState?.product,
      },
    ],
  };

  return (
    <BuilderFlowNavStyles>
      <div className="nav__inner">
        <nav>
          <div className="steps-container">
            <Heading type="h2" className="primary">
              {/* {product?.title} Engagement Ring */}
            </Heading>
            <ul>
              {steps[type].map((step, index) => {
                return (
                  <li key={`step-${index}`}>
                    <DarksideButton
                      className={clsx(currentStep === index ? 'active' : '', {
                        disabled: !step.enabled,
                      })}
                      type="outline"
                      disabled={!step.enabled}
                      onClick={() => changeStep(index)}
                    >
                      <span>Step {index + 1}</span> {step.title}
                    </DarksideButton>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="summary-container">
            <DarksideButton
              className={clsx({
                active: isSummaryOpen,
                disabled: !builderFlowState?.diamond && !builderFlowState?.product,
              })}
              type="solid"
              colorTheme="teal"
              disabled={!builderFlowState?.diamond && !builderFlowState?.product}
              onClick={() => setIsSummaryOpen(!isSummaryOpen)}
            >
              Summary
            </DarksideButton>
          </div>
        </nav>

        {/* Might need to hoist this */}
        <AnimatePresence>
          {isSummaryOpen && (
            <motion.div
              className="builder-summary__container"
              key="summary-container"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { y: 0, opacity: 1 },
                collapsed: { y: 100, opacity: 0 },
              }}
              transition={{
                duration: 0.25,
              }}
            >
              <div className="builder-summary__content">
                <Heading type="h2" className="primary summary__title">
                  Summary
                </Heading>
                <div className="builder-summary__content__inner">
                  {builderFlowState &&
                    sortedKeys.map((key: string, index) => {
                      if (!builderFlowState[key] || (key !== 'product' && key !== 'diamond')) return null;

                      const summaryItem = builderFlowState[key];

                      return (
                        <SummaryItem
                          item={summaryItem}
                          type={key}
                          index={index}
                          key={`summary-item-${index}`}
                          changeStep={changeStep}
                          showPrice={false}
                        />
                      );
                    })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BuilderFlowNavStyles>
  );
};

export default BuilderFlowNav;
