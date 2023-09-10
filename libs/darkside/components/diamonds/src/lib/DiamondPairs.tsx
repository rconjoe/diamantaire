import { DarksideButton } from '@diamantaire/darkside/components/common-ui';
import { UIString } from '@diamantaire/darkside/core';
import { DiamondDataTypes } from '@diamantaire/shared/types';

import Diamond360 from './Diamond360';
import { StyledDiamondPairActiveRow, StyledDiamondPairCell } from './DiamondPairs.style';
import DiamondtableRowAccordion from './DiamondTableRowAccordion';

type DiamondPairCellProps = {
  diamonds: DiamondDataTypes[];
  accessorKey: string;
  renderValue?: (v: unknown) => string;
};

export const DiamondPairCell = ({ diamonds, accessorKey, renderValue }: DiamondPairCellProps) => {
  const values = diamonds.map((d) => d[accessorKey]);

  return (
    <StyledDiamondPairCell>
      {values.map((v, i) => (
        <div key={i.toString()}>{renderValue ? renderValue(v) : v}</div>
      ))}
    </StyledDiamondPairCell>
  );
};

export const DiamondPairActiveRow = ({ diamonds }: { diamonds: DiamondDataTypes[] }) => {
  const [diamond1, diamond2] = diamonds;

  const { diamondType } = diamond1;

  const handleSelectDiamond = () => {
    // TODO: add handler
    console.log(`handleSelectDiamond`, diamonds);
  };

  return (
    <StyledDiamondPairActiveRow>
      <div className="row-container">
        <div className="row-media">
          <div className="row-media-content">
            <Diamond360 lotId={diamond1.lotId} diamondType={diamondType} />
            <Diamond360 lotId={diamond2.lotId} diamondType={diamondType} />
          </div>
        </div>
        <div className="row-aside">
          <div className="row-cta">
            <DarksideButton type="solid" colorTheme="black" className="button-select" onClick={handleSelectDiamond}>
              <UIString>Select</UIString>
            </DarksideButton>
          </div>
          <div className="row-accordion">
            <DiamondtableRowAccordion product={diamond1} />
          </div>
        </div>
      </div>
    </StyledDiamondPairActiveRow>
  );
};
