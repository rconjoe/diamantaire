/** This section is a 2x2 image grid on desktop, and a centered slider on mobile */

import React from 'react';

type ModularGridCarouselBlockProps = {
  title?: string;
  subtitle?: string;
  blocks?: Array<any>;
  additionalClass?: string;
  id?: string;
  isMobile?: boolean;
  headingAdditionalClass?: string;
  headingType?: string;
  countryCode: string;
  shouldLazyLoad?: boolean;
};

const ModularQuadImageGrid = ({
  blocks,
  additionalClass,
  title,
  subtitle,
  headingType,
  headingAdditionalClass,
  isMobile,
  shouldLazyLoad,
  countryCode,
}: ModularGridCarouselBlockProps) => {
  console.log('blocks govner', blocks);

  return <h1>Modular blocksssss</h1>;
};

export default ModularQuadImageGrid;
