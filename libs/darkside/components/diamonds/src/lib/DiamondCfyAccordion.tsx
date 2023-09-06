import { Accordion, Markdown } from '@diamantaire/darkside/components/common-ui';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { useDiamondCfyData, useDiamondTableData, useHumanNameMapper } from '@diamantaire/darkside/data/hooks';
import { useContext } from 'react';

import StyledDiamondCfyAccordion from './DiamondCfyAccordion.style';

const DiamondCfyAccordion = ({ product, locale }: { product?: { [key: string]: any }; locale?: string }) => {
  const getInfo = (arr, v) => arr.find((x) => x.key === v);
  const { isMobile } = useContext(GlobalContext);
  const { data: humanStrings = {} } = useHumanNameMapper(locale);
  const { data: { diamondTable: DiamondTableData } = {} } = useDiamondTableData(locale);
  const { data: { ctoDiamondTable: DiamondCfyData } = {} } = useDiamondCfyData(locale);
  const { specs } = DiamondTableData || {};
  const { DIAMOND_COLOR_GROUPS = {}, DIAMOND_COLOR_GROUP_TYPES = {} } = humanStrings;

  // COLOR
  const getColorTitle = () => {
    const { color } = product || {};
    const title = getInfo(specs, 'color')?.value;

    return (
      <>
        <strong>{title}:</strong>
        <span>{DIAMOND_COLOR_GROUPS[color]?.value}</span>
        <strong>{DIAMOND_COLOR_GROUP_TYPES[color]?.value}</strong>
      </>
    );
  };
  const getColorContent = () => {
    const { color } = product || {};
    const { colorDetails, colorNearcolorlessDetails } = DiamondCfyData || {};
    const desc = color === 'NearColorless' ? colorNearcolorlessDetails : colorDetails;

    return (
      <div className="description">
        <Markdown withStyles={false}>{desc}</Markdown>
      </div>
    );
  };

  // CLARITY
  const getClarityTitle = () => {
    const { clarity } = product || {};
    const { clarityMapAbridged } = DiamondTableData || {};
    const label = getInfo(clarityMapAbridged, clarity)?.value || '';
    const title = getInfo(specs, 'clarity')?.value;

    return (
      <>
        <strong>{title}:</strong>
        <span>{label}</span>
        <strong>{clarity}</strong>
      </>
    );
  };
  const getClarityContent = () => {
    const { clarityDetails } = DiamondCfyData || {};

    return (
      <div className="description">
        <Markdown withStyles={false}>{clarityDetails}</Markdown>
      </div>
    );
  };

  // // CUT
  const getCutTitle = () => {
    const { cut } = product || {};
    const { cutMapAbridged } = DiamondTableData || {};
    const label = getInfo(cutMapAbridged, cut)?.value || '';
    const title = getInfo(specs, 'cut')?.value;

    return (
      <>
        <strong>{title}</strong>
        <span>{label}</span>
        <strong>{cut}</strong>
      </>
    );
  };
  const getCutContent = () => {
    const { cutDetails } = DiamondCfyData || {};

    return (
      <div className="description">
        <Markdown withStyles={false}>{cutDetails}</Markdown>
      </div>
    );
  };

  // ACCORDION
  const accordionContent = [
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
      title: getCutTitle(),
      children: getCutContent(),
      className: 'cut',
    },
  ];

  return (
    <StyledDiamondCfyAccordion>
      <Accordion rows={accordionContent} activeDefault={isMobile ? 0 : 4} isDiamondDetail={true} />
    </StyledDiamondCfyAccordion>
  );
};

export { DiamondCfyAccordion };

export default DiamondCfyAccordion;
