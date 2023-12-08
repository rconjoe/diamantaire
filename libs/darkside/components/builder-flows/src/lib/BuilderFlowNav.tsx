import { DarksideButton, Heading } from '@diamantaire/darkside/components/common-ui';
import { GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { useGlobalContext } from '@diamantaire/darkside/data/hooks';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useState } from 'react';
import styled from 'styled-components';

import SummaryItem from './SummaryItem';

const BuilderFlowNavStyles = styled.div`
  position: fixed;
  bottom: 0;
  padding: 2rem 4rem;
  background-color: #fff;
  width: 100%;
  border-top: 0.1rem solid #ccc;
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
          flex: 0 0 28rem;
          display: flex;
          margin-right: 1rem;

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
            padding: 1.5rem 2rem;
            text-align: left;
            border: 0.1rem solid #ccc;
            background-color: transparent;
            border-radius: 0.4rem;

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
      flex: 0 0 28rem;
      justify-content: flex-end;
      > div {
        flex: 0 0 28rem;
        &.active {
          button {
            background-color: var(--color-white);
            color: var(--color-teal);
          }
        }
        button {
          flex: 1;
          width: 100%;
          padding: 1.5rem 2rem;

          border: 0.1rem solid #ccc;
          border-radius: 0.4rem;

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
    bottom: 10rem;
    height: 40rem;
    width: 450px;
    background-color: #fff;
    border: 0.1rem solid #ccc;
    border-radius: 0.4rem;
    padding: 2rem;

    .summary__title {
      margin-bottom: 2rem;
      &::after {
        content: ' ';
        height: 0.2rem;
        background-color: var(--color-teal);
        display: block;
        max-width: 3.5rem;
        margin-top: 0.5rem;
      }
    }

    .summary-item {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      .item__image {
        flex: 0 0 12rem;
        margin-right: 2rem;
      }

      .item__content {
        h4 {
          font-size: 1.6rem;
          margin-bottom: 0.5rem;
        }

        p {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: #777;
        }
      }
      .item__edit-toggle {
        flex: 1;
        margin-left: 1rem;
        text-align: right;
      }
    }
  }
`;

const BuilderFlowNav = ({ currentStep, steps, type }) => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const { updateStep, builderProduct } = useContext(BuilderProductContext);
  const { isCartOpen } = useGlobalContext();
  const updateGlobalContext = useContext(GlobalUpdateContext);

  const allowedKeys = ['product', 'diamond'];

  const sortedKeys = Object.keys(builderProduct)
    .filter((key) => allowedKeys.includes(key))
    .sort((a, b) => {
      return allowedKeys.indexOf(a) - allowedKeys.indexOf(b);
    });

  return (
    <BuilderFlowNavStyles>
      <div className="nav__inner">
        <nav>
          <div className="steps-container">
            <ul>
              {steps.map((step, index) => {
                return (
                  <li key={`step-${index}`}>
                    <DarksideButton
                      className={clsx(currentStep === index ? 'active' : '', {
                        disabled: !step.enabled,
                      })}
                      type="outline"
                      disabled={!step.enabled}
                      onClick={() => updateStep(index)}
                    >
                      <span>Step {index + 1}</span> {step.title}
                    </DarksideButton>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="summary-container">
            {currentStep === steps?.length - 1 ? (
              <DarksideButton
                onClick={() =>
                  updateGlobalContext({
                    isCartOpen: !isCartOpen,
                  })
                }
              >
                View Cart
              </DarksideButton>
            ) : (
              <DarksideButton
                className={clsx({
                  active: isSummaryOpen,
                  disabled: !builderProduct?.diamond && !builderProduct?.product,
                })}
                type="solid"
                colorTheme="teal"
                disabled={!builderProduct?.diamond && !builderProduct?.product}
                onClick={() => setIsSummaryOpen(!isSummaryOpen)}
              >
                Summary
              </DarksideButton>
            )}
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
                  {builderProduct &&
                    sortedKeys.map((key: string, index) => {
                      if (!builderProduct[key] || (key !== 'product' && key !== 'diamond')) return null;

                      const summaryItem = builderProduct[key];

                      const modifyIndex =
                        key === 'diamond' && type === 'setting-to-diamond'
                          ? 1
                          : key === 'diamond' && type === 'diamond-to-setting'
                          ? 0
                          : key === 'product' && type === 'diamond-to-setting'
                          ? 2
                          : key === 'product' && type === 'setting-to-diamond'
                          ? 0
                          : key === 'product' && type === 'diamond-to-setting'
                          ? 2
                          : null;

                      return (
                        <SummaryItem
                          item={summaryItem}
                          itemType={key}
                          modifyIndex={modifyIndex}
                          key={`summary-item-${index}`}
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
