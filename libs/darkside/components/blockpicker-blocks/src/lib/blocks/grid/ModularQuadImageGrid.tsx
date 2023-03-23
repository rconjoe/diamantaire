/** This section is a 2x2 image grid on desktop,
 * and a centered slider on mobile */

import { DatoImage, Heading } from '@diamantaire/darkside/components/common-ui';
import clsx from 'clsx';
import Link from 'next/link';

import { ModularQuadImageGridContainer } from './ModularQuadImageGrid.style';
import ModularCarouselBlock from '../carousels/ModularCarouselBlock';

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
  _modelApiKey: string;
};

const ModularQuadImageGrid = ({
  headingType,
  headingAdditionalClass,
  title,
  subtitle,
  blocks,
  countryCode,
  _modelApiKey,
  shouldLazyLoad,
}: ModularGridCarouselBlockProps) => {
  return (
    <ModularQuadImageGridContainer>
      <div className="title__container text-center">
        <Heading type={headingType} className={clsx('primary', headingAdditionalClass)}>
          {title}
        </Heading>

        <p>{subtitle}</p>
      </div>

      <div className="blocks__grid">
        {blocks.map((block) => {
          if (countryCode === 'US' && block.supportedCountries.length > 0) {
            return null;
          }

          const { desktopImage, id, title: blockTitle, link } = block;

          return (
            <div className="item__container" key={id}>
              <div className="item__image">
                <Link href={link}>
                  <DatoImage image={desktopImage} shouldLazyLoad={shouldLazyLoad} />
                </Link>
              </div>
              <div className="item__title text-center">
                <h3>
                  <Link href={link}>{blockTitle}</Link>
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mobile-slider">
        <ModularCarouselBlock
          _modelApiKey={_modelApiKey}
          // TODO: what's the right logic for country specific blocks???
          blocks={blocks.filter((block) => countryCode === 'US' && block.supportedCountries.length === 0)}
        />
      </div>
    </ModularQuadImageGridContainer>
  );
};

export default ModularQuadImageGrid;
