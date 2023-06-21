import { Accordion, Button, CertificateThumb, Tooltip } from '@diamantaire/darkside/components/common-ui';
import { UIString } from '@diamantaire/darkside/core';
import { useDiamondTableData } from '@diamantaire/darkside/data/hooks';
import Markdown from 'markdown-to-jsx';

import Diamond360 from './Diamond360';
import StyledDiamondDetail from './DiamondDetail.style';
import { DiamondProductTypes } from './DiamondTable';

const DiamondDetail = ({ product, locale = 'en_US' }: { product: DiamondProductTypes; locale?: string }) => {
  const { data: diamondTableData } = useDiamondTableData(locale);
  const { diamondTable } = diamondTableData || {};
  const { lotId, diamondType, cut: productCut, clarity: productClarity, color: productColor, dfCertificateUrl } = product;
  const { cutMapAbridged, clarityMapAbridged, colorMapAbridged, specs } = diamondTable || {};
  const {
    color: colorContent,
    cut: cutContent,
    clarity: clarityContent,
    certificateLabel: labelCertificate,
    certificate: certificateTooltip,
  } = diamondTable || {};

  const titleCut = specs.find((v) => v.key === 'cut');
  const labelCut = cutMapAbridged.find((v) => v.key === productCut);
  const titleColor = specs.find((v) => v.key === 'color');
  const labelColor = colorMapAbridged.find((v) => v.key === productColor);
  const titleClarity = specs.find((v) => v.key === 'clarity');
  const labelClarity = clarityMapAbridged.find((v) => v.key === productClarity);
  const titleCertificate = specs.find((v) => v.key === 'certificate');

  const accordionContent = [
    {
      title: (
        <>
          <strong>{titleCut?.value}</strong> <span>{labelCut?.value}</span> <strong>{labelCut?.key}</strong>
        </>
      ),
      children: <Markdown>{cutContent}</Markdown>,
      className: 'cut',
    },
    {
      title: (
        <>
          <strong>{titleColor?.value}</strong> <span>{labelColor?.value}</span> <strong>{labelColor?.key}</strong>
        </>
      ),
      children: <Markdown>{colorContent}</Markdown>,
      className: 'color',
    },
    {
      title: (
        <>
          <strong>{titleClarity?.value}</strong> <span>{labelClarity?.value}</span> <strong>{labelClarity?.key}</strong>
        </>
      ),
      children: <Markdown>{clarityContent}</Markdown>,
      className: 'clarity',
    },
    {
      title: (
        <>
          <strong>{titleCertificate?.value}</strong> <strong>{labelCertificate}</strong>{' '}
          <Tooltip id={'certificate' + lotId}>{certificateTooltip}</Tooltip>
        </>
      ),
      children: <CertificateThumb certificateUrl={dfCertificateUrl} />,
      className: 'certificate',
    },
  ];

  return (
    <StyledDiamondDetail>
      <div className="detail-container">
        <div className="detail-media">
          <div className="detail-media-content">
            <Diamond360 lotId={lotId} diamondType={diamondType} />
          </div>
        </div>
        <div className="detail-text">
          <div className="detail-cta">
            <Button className="tertiary">
              <UIString>Select</UIString>
            </Button>
          </div>
          <div className="detail-info">
            <Accordion rows={accordionContent} activeDefault={3} />
          </div>
        </div>
      </div>
    </StyledDiamondDetail>
  );
};

export { DiamondDetail };

export default DiamondDetail;
