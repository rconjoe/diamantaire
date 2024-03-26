import { Accordion, CarbonNeutralCertification, CertificateThumb, Markdown } from '@diamantaire/darkside/components/common-ui';
import { useDiamondTableData, useGlobalData, useTranslations } from '@diamantaire/darkside/data/hooks';
import { DiamondDataTypes } from '@diamantaire/shared/types';
import { useRouter } from 'next/router';

import StyledDiamondTableRowAccordion from './DiamondTableRowAccordion.style';

const DiamondDetailRowAccordion = ({
  product,
  productPair,
}: {
  product?: DiamondDataTypes;
  productPair?: DiamondDataTypes;
}) => {
  const { locale } = useRouter();
  const { data: diamondTableData } = useDiamondTableData(locale);
  const { data: { diamondTable: { carbonNeutralCertification }}} = useGlobalData(locale);
  const { _t } = useTranslations(locale);

  if (!product) return;

  const { diamondTable } = diamondTableData || {};
  const { cut: productCut, clarity: productClarity, color: productColor, dfCertificateUrl, _id } = product;
  const { cut: productTwoCut, clarity: productTwoClarity, color: productTwoColor, _id: _id2 } = productPair || {};

  const {
    specs,
    cutMapAbridged,
    clarityMapAbridged,
    colorMapAbridged,
    color: colorContent,
    cut: cutContent,
    clarity: clarityContent,
    certificateLabel: labelCertificate,
    certificate: certificateContent,
    origin,
    originContent,
  } = diamondTable || {};

  if (!specs) return;

  const titleCut = specs.find((v) => v.key === 'cut');
  const labelCut = cutMapAbridged.find((v) => v.key === productCut);
  const titleColor = specs.find((v) => v.key === 'color');
  const labelColor = colorMapAbridged.find((v) => v.key === productColor);
  const titleClarity = specs.find((v) => v.key === 'clarity');
  const labelClarity = clarityMapAbridged.find((v) => v.key === productClarity);
  const titleCertificate = specs.find((v) => v.key === 'certificate');
  const titleOrigin = specs.find((v) => v.key === 'origin');

  const cutOrder = ['Ideal+Hearts', 'Ideal', 'Excellent+', 'Excellent', 'Very Good'];

  let mappedValues = [
    {
      id: _id,
      cut: productCut,
      clarity: productClarity,
      color: productColor,
    },
  ];

  if (productPair) {
    mappedValues.push({
      id: _id2,
      cut: productTwoCut,
      clarity: productTwoClarity,
      color: productTwoColor,
    });
  }

  mappedValues = mappedValues.sort((a, b) => {
    const indexA = cutOrder.indexOf(a.cut);
    const indexB = cutOrder.indexOf(b.cut);

    // Compare the indices
    return indexA - indexB;
  });

  const accordionContent = [
    {
      title: (
        <>
          <strong className="label">{titleCut?.value}:</strong>{' '}
          <div className="value">
            <span>{labelCut?.value}</span>{' '}
            {mappedValues?.map((diamond, index) => (
              <strong key={`cut-${diamond.id}`}>
                {_t(diamond.cut)} {index === mappedValues.length - 1 ? '' : ' - '}
              </strong>
            ))}
          </div>
        </>
      ),
      children: (
        <Markdown withStyles={false} imageConfig={{ w: 86, h: 77, alt: titleCut?.value }}>
          {cutContent}
        </Markdown>
      ),
      className: 'cut',
    },
    {
      title: (
        <>
          <strong className="label">{titleColor?.value}:</strong>{' '}
          <div className="value">
            <span>{labelColor?.value}</span>{' '}
            {mappedValues?.map((diamond, index) => (
              <strong key={`color-${diamond.id}`}>
                {diamond.color} {index === mappedValues.length - 1 ? '' : ' - '}
              </strong>
            ))}
          </div>
        </>
      ),
      children: (
        <Markdown withStyles={false} imageConfig={{ w: 431, h: 171, alt: titleColor?.value }}>
          {colorContent}
        </Markdown>
      ),
      className: 'color',
    },
    {
      title: (
        <>
          <strong className="label">{titleClarity?.value}:</strong>{' '}
          <div className="value">
            <span>{labelClarity?.value}</span>{' '}
            {mappedValues?.map((diamond, index) => (
              <strong key={`clarity-${diamond.id}`}>
                {diamond.clarity} {index === mappedValues.length - 1 ? '' : ' - '}
              </strong>
            ))}
          </div>
        </>
      ),
      children: (
        <Markdown withStyles={false} imageConfig={{ w: 431, h: 166, alt: titleClarity?.value }}>
          {clarityContent}
        </Markdown>
      ),
      className: 'clarity',
    },
    {
      title: (
        <>
          <strong>{titleCertificate?.value}:</strong>
          <span>{labelCertificate}</span>
        </>
      ),
      children: (
        <>
          <CertificateThumb certificateUrl={dfCertificateUrl} productPair={productPair} />
          <Markdown withStyles={false}>{certificateContent}</Markdown>
        </>
      ),
      className: 'certificate product-pair',
    },
    {
      title: (
        <>
          <strong>{titleOrigin?.value}:</strong>
          <span>{origin}</span>
        </>
      ),
      children: (
        <>
          <Markdown withStyles={false}>{originContent}</Markdown>
          {carbonNeutralCertification && (
            <CarbonNeutralCertification 
              url={carbonNeutralCertification.url}
              className='carbon-neutral-certification-container'
            />
          )}
        </>
      ),
      className: 'origin',
    },
  ];

  return (
    <StyledDiamondTableRowAccordion>
      <Accordion rows={accordionContent} id={product.id} />
    </StyledDiamondTableRowAccordion>
  );
};

export { DiamondDetailRowAccordion };

export default DiamondDetailRowAccordion;
