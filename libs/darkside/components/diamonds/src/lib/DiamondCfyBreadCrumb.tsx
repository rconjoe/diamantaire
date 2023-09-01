import { DarksideButton, Tooltip } from '@diamantaire/darkside/components/common-ui';
import { UIString } from '@diamantaire/darkside/core';
import { useDiamondCfyData } from '@diamantaire/darkside/data/hooks';

import StyledDiamondCfyBreadCrumb from './DiamondCfyBreadCrumb.style';

const DiamondCfyBreadCrumb = (props) => {
  const { locale, checkAvailability, selectedDiamondType, selectedCarat, handleModifyCarat, handleModifyDiamondType } =
    props;
  const { data: { ctoDiamondTable, allDiamondShapeDescriptions } = {} } = useDiamondCfyData(locale);
  const { carat: caratLabel, modify: modifyLabel } = ctoDiamondTable;
  const selectedDiamondTypeSlug = selectedDiamondType?.slug;
  const shapeData =
    selectedDiamondTypeSlug && allDiamondShapeDescriptions.find((v) => v.diamondType === selectedDiamondTypeSlug);
  const shapeDescription = shapeData?.description;
  const shapeTitle = selectedDiamondType?.title;

  return (
    <StyledDiamondCfyBreadCrumb>
      <div className="breadcrumb">
        {selectedDiamondType && (
          <div className="row shape">
            <div className="info">
              <div className="text">
                <div className="label">
                  <UIString>Shape</UIString>
                </div>
                : <div className="value">{shapeTitle}</div>
              </div>
              <div className="tooltip">
                <Tooltip id="breadcrumb-shape" place="bottom">
                  {shapeDescription}
                </Tooltip>
              </div>
            </div>
            <div className="cta">
              <DarksideButton onClick={handleModifyDiamondType} colorTheme="teal" type="underline">
                {modifyLabel}
              </DarksideButton>
            </div>
          </div>
        )}

        {selectedCarat && checkAvailability && (
          <div className="row carat">
            <div className="info">
              <div className="text">
                <div className="label">{caratLabel}</div>: <div className="value">{selectedCarat}ct</div>
              </div>
              <div className="tooltip">
                <Tooltip id="breadcrumb-carat" place="bottom">
                  lorelipsum
                </Tooltip>
              </div>
            </div>
            <div className="cta">
              <DarksideButton onClick={handleModifyCarat} colorTheme="teal" type="underline">
                {modifyLabel}
              </DarksideButton>
            </div>
          </div>
        )}
      </div>
    </StyledDiamondCfyBreadCrumb>
  );
};

export default DiamondCfyBreadCrumb;

export { DiamondCfyBreadCrumb };
