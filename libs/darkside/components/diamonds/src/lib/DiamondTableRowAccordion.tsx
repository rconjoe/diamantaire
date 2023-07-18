import { Accordion, CertificateThumb, Tooltip } from '@diamantaire/darkside/components/common-ui';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { useDiamondTableData } from '@diamantaire/darkside/data/hooks';
import { DiamondDataTypes } from '@diamantaire/shared/types';
import Markdown from 'markdown-to-jsx';
import { useContext } from 'react';

import StyledDiamondTableRowAccordion from './DiamondTableRowAccordion.style';

const DiamondDetailRowAccordion = ({ product, locale = 'en_US' }: { product?: DiamondDataTypes; locale?: string }) => {
  const { isMobile } = useContext(GlobalContext);
  const { data: diamondTableData } = useDiamondTableData(locale);

  if (!product) return;

  const { diamondTable } = diamondTableData || {};
  const { lotId, cut: productCut, clarity: productClarity, color: productColor, dfCertificateUrl } = product;
  const {
    specs,
    cutMapAbridged,
    clarityMapAbridged,
    colorMapAbridged,
    color: colorContent,
    cut: cutContent,
    clarity: clarityContent,
    certificateLabel: labelCertificate,
    certificate: certificateTooltip,
  } = diamondTable || {};

  if (!specs) return;

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
    <StyledDiamondTableRowAccordion>
      <Accordion rows={accordionContent} activeDefault={isMobile ? 0 : 3} />
    </StyledDiamondTableRowAccordion>
  );
};

export { DiamondDetailRowAccordion };

export default DiamondDetailRowAccordion;
