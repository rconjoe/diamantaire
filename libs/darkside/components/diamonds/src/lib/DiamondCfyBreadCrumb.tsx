import { DarksideButton, Tooltip, UIString, UniLink } from '@diamantaire/darkside/components/common-ui';
import { humanNamesMapperType, useDiamondCfyData, useTranslations } from '@diamantaire/darkside/data/hooks';

import StyledDiamondCfyBreadCrumb from './DiamondCfyBreadCrumb.style';

const DiamondCfyBreadCrumb = (props) => {
  const { locale, selectedDiamondType, productSlug, collectionSlug, selectedProduct } = props;
  const { data: { ctoDiamondTable, allDiamondShapeDescriptions } = {} } = useDiamondCfyData(locale);
  const { modify: modifyLabel } = ctoDiamondTable;
  const { _t } = useTranslations(locale, [humanNamesMapperType.DIAMOND_SHAPES]);
  const selectedDiamondTypeSlug = selectedDiamondType?.slug;
  const shapeData = allDiamondShapeDescriptions.find((v) => v.diamondType === selectedDiamondTypeSlug);
  const shapeDescription = shapeData?.description;
  const shapeTitle = _t(selectedDiamondTypeSlug);

  const queryLink: {
    // product?: string;
    productSlug?: string;
    collectionSlug?: string;
  } = {
    ...(selectedProduct ? { product: selectedProduct.toString() } : {}),
    ...(productSlug ? { productSlug: productSlug.toString() } : {}),
    ...(collectionSlug ? { collectionSlug: collectionSlug.toString() } : {}),
  };

  const queryParams = new URLSearchParams(queryLink);

  const str = queryParams.toString();

  const modifyRoute = `/diamonds${str.length > 0 ? `?${str}` : ''}`;

  return (
    <StyledDiamondCfyBreadCrumb>
      <div className="breadcrumb">
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
            <UniLink route={modifyRoute}>
              <DarksideButton colorTheme="teal" type="underline">
                {modifyLabel}
              </DarksideButton>
            </UniLink>
          </div>
        </div>
      </div>
    </StyledDiamondCfyBreadCrumb>
  );
};

export default DiamondCfyBreadCrumb;

export { DiamondCfyBreadCrumb };
