import { Heading } from '@diamantaire/darkside/components/common-ui';
import { normalizeDatoNumberedContent } from '@diamantaire/shared/helpers';
import clsx from 'clsx';

import { ModularQuadStatisticsBlockContainer } from './ModularQuadStatisticsBlock.style';

const ModularQuadStatisticsBlock = (props) => {
  const { title1, title2, additionalClass } = props;

  const arrayOfAttributes = ['statsTitle', 'image', 'copy'];

  const statistics = normalizeDatoNumberedContent(props, arrayOfAttributes);

  return (
    <ModularQuadStatisticsBlockContainer className="container-wrapper">
      <Heading type="h2" className={clsx('h1 line1 quad-block__title', additionalClass)}>
        {title1}

        <b className={clsx('line2 quad-block__title', additionalClass)}>{title2}</b>
      </Heading>

      <div className={clsx('quad-block__stats-container', additionalClass)}>
        {statistics.map((stats, index) => {
          const { image, statsTitle, copy } = stats;

          if (!statsTitle || !image || !copy) {
            return null;
          }

          const { alt, url } = image;

          return (
            <div key={index} className={clsx('quad-block__stats-outer', additionalClass)}>
              <img
                className={clsx('quad-block__image', additionalClass, {
                  '-halfmoon': url.includes('halfmoon'),
                  '-pear': url.includes('pear'),
                })}
                alt={alt}
                key={`quad-${index}`}
                src={url}
              />
              <div key={index} className={clsx('quad-block__stats-inner', additionalClass)}>
                <Heading type="h3" className={clsx('quad-block__stats-title h1', additionalClass)}>
                  {statsTitle}
                </Heading>
                <p className="quad-block__stats-copy">{copy}</p>
              </div>
            </div>
          );
        })}
      </div>
    </ModularQuadStatisticsBlockContainer>
  );
};

export default ModularQuadStatisticsBlock;
