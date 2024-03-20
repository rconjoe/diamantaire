/** This section is a 2x2 image grid on desktop,
 * and a centered slider on mobile */

import { DatoImage, Heading } from '@diamantaire/darkside/components/common-ui';
import { parseValidLocale } from '@diamantaire/shared/constants';
import { isCountrySupported } from '@diamantaire/shared/helpers';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { ModularQuadImageGridContainer } from './ModularQuadImageGrid.style';
import ModularCarouselBlock from '../carousels/ModularCarouselBlock';
// import ModularCarouselBlock from '../carousels/ModularCarouselBlock';

type ModularGridCarouselBlockProps = {
  title?: string;
  subtitle?: string;
  blocks?: Array<any>;
  additionalClass?: string;
  id?: string;
  isMobile?: boolean;
  headingAdditionalClass?: string;
  headingType?: string;
  _modelApiKey?: string;
};

const ModularQuadImageGrid = ({
  headingType,
  headingAdditionalClass,
  title,
  subtitle,
  blocks,
  _modelApiKey,
}: ModularGridCarouselBlockProps) => {
  const { locale } = useRouter();
  const { countryCode } = parseValidLocale(locale);

  return (
    <ModularQuadImageGridContainer>
      <div className="title__container text-center">
        <Heading type={headingType} className={clsx('primary', headingAdditionalClass)}>
          {title}
        </Heading>

        {subtitle ? <p>{subtitle}</p> : null}
      </div>

      <div className="blocks__grid">
        {blocks.map((block) => {
          if (!isCountrySupported(block?.supportedCountries, countryCode)) return null;

          const { desktopImage, id, title: blockTitle, link } = block;

          return (
            <div className="item__container" key={id}>
              <div className="item__image">
                <Link href={link}>
                  <DatoImage image={desktopImage} overrideAlt={title || ''} />
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

      <div className="mobile-slider">{blocks && <ModularCarouselBlock _modelApiKey={_modelApiKey} blocks={blocks} />}</div>
    </ModularQuadImageGridContainer>
  );
};

export default ModularQuadImageGrid;
