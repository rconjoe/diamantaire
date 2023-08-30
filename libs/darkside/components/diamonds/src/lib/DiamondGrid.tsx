import { DarksideButton } from '@diamantaire/darkside/components/common-ui';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { makeCurrency, updateUrlParameter } from '@diamantaire/shared/helpers';
import { useContext } from 'react';
import styled from 'styled-components';

const DiamondGridStyles = styled.div`
  .diamond-grid {
    display: flex;
    flex-wrap: wrap;

    > * {
      flex: 0 0 25%;
      margin-bottom: 20px;
      padding: 0 10px;

      .diamond-content {
        padding-top: 10px;
        display: flex;
        ul {
          /* display: flex;
          flex-wrap: wrap; */
          li {
            margin-right: 10px;
            margin-bottom: 10px;
            display: inline-block;

            span {
              font-size: 1.3rem;
              background-color: #fff;
              border: 1px solid #ccc;
              color: #000;
              display: inline-block;
              border-radius: 5px;
              padding: 2px 5px;
            }
          }
        }
        p {
          font-size: 1.3rem;
        }
      }
      .diamond-content__details-toggle {
        flex: 0 0 80px;
        text-align: right;
        button {
          font-size: 1.4rem;
        }
      }

      .diamond-grid-item__cta {
        margin-top: 10px;
      }
    }
  }
`;

const DiamondGrid = ({ items, flowIndex }) => {
  const { updateFlowData } = useContext(BuilderProductContext);

  function selectDiamond(diamond) {
    updateUrlParameter('lotId', diamond?.lotId);
    updateFlowData('ADD_DIAMOND', diamond, flowIndex + 1);
  }

  return (
    <DiamondGridStyles>
      <div className="diamond-grid">
        {items?.map((diamond) => {
          const mutatedLotId = diamond.lotId.replace(/F/g, '');
          const src = `https://videos.diamondfoundry.com/${mutatedLotId}-thumb.jpg`;
          const price = makeCurrency(diamond.price, 'en-US', 'USD');

          return (
            <div className="diamond-grid-item" key={diamond.id}>
              <img src={src} alt="" />

              <div className="diamond-content">
                <div className="diamond-content__details">
                  <ul className="list-unstyled">
                    <li>
                      <span>{diamond.type}</span>
                    </li>
                    <li>
                      <span>Carat: {diamond.carat}</span>
                    </li>
                    <li>
                      <span>Color: {diamond.color}</span>
                    </li>
                    <li>
                      <span>Clarity: {diamond.clarity}</span>
                    </li>
                    <li>
                      <span>Cut: {diamond.cut}</span>
                    </li>
                  </ul>
                  <p>{price}</p>
                </div>
                <div className="diamond-content__details-toggle">
                  <DarksideButton type="underline" colorTheme="teal">
                    Details
                  </DarksideButton>
                </div>
              </div>

              <div className="diamond-grid-item__cta">
                <DarksideButton type="outline" colorTheme="black" onClick={() => selectDiamond(diamond)}>
                  Select Diamond
                </DarksideButton>
              </div>
            </div>
          );
        })}
      </div>
    </DiamondGridStyles>
  );
};

export default DiamondGrid;
