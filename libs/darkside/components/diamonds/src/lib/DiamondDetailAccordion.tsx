import { Accordion, CarbonNeutralCertification, CertificateThumb, Heading, Slider, UIString } from '@diamantaire/darkside/components/common-ui';
import { useDiamondPdpData, useDiamondTableData, useDiamondsData, useGlobalData, useTranslations } from '@diamantaire/darkside/data/hooks';
import { getFormattedCarat } from '@diamantaire/shared/constants';
import Markdown from 'markdown-to-jsx';
import Image from 'next/image';

import { StyledDiamondDetailAccordion } from './DiamondDetailAccordion.style';

const DiamondDetailAccordion = ({ lotId, locale }: { lotId?: string; locale?: string }) => {
  const { _t } = useTranslations(locale);
  const getInfo = (arr, v) => arr.find((x) => x.key === v);
  const { data: { diamond: product } = {} } = useDiamondsData({ lotId });
  const { data: { ranges } = {} } = useDiamondsData({ diamondType: product?.diamondType });
  const { data: { diamondTable: DiamondTableData } = {} } = useDiamondTableData(locale);
  const { data: { diamondProduct: DiamondPdpData } = {} } = useDiamondPdpData(locale);
  const { data: { diamondTable: { carbonNeutralCertification }}} = useGlobalData(locale)

  const createNumberArray = (number) => {
    return Array.from({ length: number }, (_, index) => index + 1);
  };

  if (!ranges) return;

  const range = [ranges?.carat?.[0], ranges?.carat?.[1]];
  const { specs } = DiamondTableData || {};

  // CARAT
  const getCaratTitle = () => {
    const { carat } = product || {};
    const title = getInfo(specs, 'carat')?.value;
    const formattedCarat = getFormattedCarat(carat, locale);
    const label = formattedCarat + 'ct';

    return (
      <>
        <strong>{title}:</strong> <span>{label}</span>
      </>
    );
  };
  const getCaratContent = () => {
    const { carat } = product || {};
    const { carat: description } = DiamondPdpData || {};
    const handleFormat = (v) => v;

    return (
      <>
        <div className="description">{description && <Markdown>{description}</Markdown>}</div>
        <div className="graph">
          <Slider
            edge={false}
            type="carat"
            range={{
              min: 0,
              max: Math.round(range[1]),
            }}
            value={[carat]}
            disabled={true}
            handleFormat={(v) => handleFormat(v)}
            tooltips={{ to: (v) => `${_t('Your diamond')} ${v.toFixed(2)}ct` }}
            pips={{
              mode: 'values',
              density: 100 / range[1],
              values: [0, ...createNumberArray(Math.round(range[1]))],
              format: { to: (v) => Math.round(v) },
            }}
          />
        </div>
      </>
    );
  };

  // CUT
  const getCutTitle = () => {
    const { cut } = product || {};
    const { cutMapAbridged } = DiamondPdpData || {};
    const label = getInfo(cutMapAbridged, cut);
    const title = getInfo(specs, 'cut')?.value;

    return (
      <>
        <strong className="label">{title}:</strong>{' '}
        <div className="value">
          <span>{label?.value}</span>{' '}
          <strong>
            <UIString>{label?.key}</UIString>
          </strong>
        </div>
      </>
    );
  };
  const getCutContent = () => {
    const cut = product?.cut || product?.cut_grade;
    const { cut: description, cutMapAbridged, cutInfoMapAbridged } = DiamondPdpData || {};
    const sub = getInfo(cutInfoMapAbridged, cut)?.value;
    const cuts: string[] = cutMapAbridged.map((v) => v.key);
    const index = cuts.findIndex((v) => v === cut);

    return (
      <>
        <div className="description">{description && <Markdown>{description}</Markdown>}</div>
        <div className="graph">
          <Slider
            edge={false}
            type="cut"
            step={1}
            range={{
              min: 0,
              '20%': 1,
              '38%': 2,
              '60%': 3,
              '79%': 4,
              '90%': 5,
              max: 6,
            }}
            value={[index]}
            disabled={true}
            tooltips={{ to: () => _t('Your diamond') }}
            pips={{
              mode: 'steps',
              density: 100 / cuts.length,
              format: { to: (v) => _t(cuts[v]) },
            }}
            boldPip={true}
          />
        </div>
        <div className="row">
          <div className="thb">
            <Image
              src="https://www.datocms-assets.com/25216/1661530410-4c-cut.jpg"
              alt={getInfo(specs, 'cut')}
              height={100}
              width={90}
            />
          </div>
          <div className="sub">
            <Heading type="h3">
              {cut} <UIString>cut</UIString>
            </Heading>
            {sub && <Markdown>{sub}</Markdown>}
          </div>
        </div>
      </>
    );
  };

  // COLOR
  const getColorTitle = () => {
    const { color } = product || {};
    const { colorMapAbridged } = DiamondPdpData || {};
    const label = getInfo(colorMapAbridged, color);
    const title = getInfo(specs, 'color')?.value;

    return (
      <>
        <strong className="label">{title}:</strong>{' '}
        <div className="value">
          <span>{label?.value}</span> <strong>{label?.key}</strong>
        </div>
      </>
    );
  };
  const getColorContent = () => {
    const { color } = product || {};
    const { color: description, colorMapAbridged, colorInfoMapAbridged } = DiamondPdpData || {};
    const sub = getInfo(colorInfoMapAbridged, color)?.value;
    const colors: string[] = colorMapAbridged
      .map((v) => v.key.length < 2 && v.key)
      .filter(Boolean)
      .sort();
    const index = colors.findIndex((v) => v === color);

    return (
      <>
        <div className="description">{description && <Markdown>{description}</Markdown>}</div>
        <div className="graph">
          <Slider
            edge={false}
            type="color"
            step={1}
            range={{
              min: 0,
              max: colors.length - 1,
            }}
            value={[index]}
            disabled={true}
            tooltips={{ to: () => _t('Your diamond') }}
            pips={{
              mode: 'steps',
              density: 100 / colors.length,
              format: { to: (v) => colors[v] },
            }}
            boldPip={true}
          />
        </div>
        <div className="thb">
          <Image
            alt={getInfo(specs, 'color')?.value}
            src="https://www.datocms-assets.com/25216/1678265887-color-2.png"
            width={323}
            height={129}
            loading="eager"
          />
        </div>
        <div className="sub">
          <Heading type="h3">
            {color} - {colorMapAbridged[index]?.value}
          </Heading>
          {sub && <Markdown>{sub}</Markdown>}
        </div>
      </>
    );
  };

  // CLARITY
  const getClarityTitle = () => {
    const { clarity } = product || {};
    const { clarityMapAbridged } = DiamondPdpData || {};
    const label = getInfo(clarityMapAbridged, clarity);
    const title = getInfo(specs, 'clarity')?.value;

    return (
      <>
        <strong className="label">{title}:</strong>{' '}
        <div className="value">
          <span>{label?.value}</span> <strong>{label?.key}</strong>
        </div>
      </>
    );
  };
  const getClarityContent = () => {
    const { clarity } = product || {};
    const { clarity: description, clarityInfoMapAbridged, clarityMapAbridged } = DiamondPdpData || {};
    const sub = getInfo(clarityInfoMapAbridged, clarity)?.value;
    const clarities: string[] = ['FL', 'VVS1 VVS2', 'VS1 VS2', 'SI1 SI2', 'I1 I2 I3'];
    const index = clarities.findIndex((v) => v.split(' ').includes(clarity));

    return (
      <>
        <div className="description">{description && <Markdown>{description}</Markdown>}</div>
        <div className="graph">
          <Slider
            edge={false}
            type="clarity"
            step={1}
            range={{
              min: 0,
              max: clarities.length - 1,
            }}
            value={[index]}
            disabled={true}
            tooltips={{ to: () => _t('Your diamond') }}
            pips={{
              mode: 'steps',
              density: 100 / clarities.length,
              format: { to: (v) => clarities[v] },
            }}
            boldPip={true}
          />
        </div>
        <div className="thb">
          <Image
            alt={getInfo(specs, 'clarity')?.value}
            src="https://www.datocms-assets.com/25216/1678265893-clarity-2.png"
            width={323}
            height={125}
            loading="eager"
          />
        </div>
        <div className="sub">
          <Heading type="h3">
            {clarity} - {clarityMapAbridged[index]?.value}
          </Heading>
          {sub && <Markdown>{sub}</Markdown>}
        </div>
      </>
    );
  };

  // CERTIFICATE
  const getCertificateTitle = () => {
    const { certificateLabel: label } = DiamondPdpData || {};
    const title = getInfo(specs, 'certificate')?.value;

    return (
      <>
        <strong>{title}:</strong>
        <span>{label}</span>
      </>
    );
  };
  const getCertificateContent = () => {
    const { dfCertificateUrl } = product || {};
    const { certificate, dfCertificateDetail, certificateLabel } = DiamondPdpData || {};

    return (
      <>
        <div className="row">
          <CertificateThumb certificateUrl={dfCertificateUrl} title={certificateLabel} />

          <div className="description">{dfCertificateDetail && <Markdown>{dfCertificateDetail}</Markdown>}</div>
        </div>

        <div className="sub">{certificate && <Markdown>{certificate}</Markdown>}</div>
      </>
    );
  };

  // ORIGIN
  const getOriginTitle = () => {
    const { origin: label } = DiamondTableData || {};
    const title = getInfo(specs, 'origin')?.value;

    return (
      <>
        <strong>{title}:</strong>
        <span>{label}</span>
      </>
    );
  };
  const getOriginContent = () => {
    const { originContent } = DiamondTableData || {};

    return (
      <>
        <div className="row">
          <div className="description">{<Markdown>{originContent}</Markdown>}</div>
        </div>
        {carbonNeutralCertification && (
          <CarbonNeutralCertification 
            url={carbonNeutralCertification.url}
            className='carbon-neutral-certification-container'
          />
        )}
      </>
    );
  };

  // ACCORDION
  const accordionContent = [
    {
      title: getCaratTitle(),
      children: getCaratContent(),
      className: 'carat',
    },
    {
      title: getCutTitle(),
      children: getCutContent(),
      className: 'cut',
    },
    {
      title: getColorTitle(),
      children: getColorContent(),
      className: 'color',
    },
    {
      title: getClarityTitle(),
      children: getClarityContent(),
      className: 'clarity',
    },
    {
      title: getCertificateTitle(),
      children: getCertificateContent(),
      className: 'certificate',
      withHeading: false,
    },
    {
      title: getOriginTitle(),
      children: getOriginContent(),
      className: 'origin',
    },
  ];

  return (
    <StyledDiamondDetailAccordion>
      <Accordion rows={accordionContent} isDiamondDetail={true} enableScroll={true} />
    </StyledDiamondDetailAccordion>
  );
};

export { DiamondDetailAccordion };

export default DiamondDetailAccordion;
