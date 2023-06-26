import { Heading, ImageTile } from '@diamantaire/darkside/components/common-ui';
import { normalizeDatoNumberedContent } from '@diamantaire/shared/helpers';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { ModularTrioStaggeredBlockContainer } from './ModularTrioStaggeredBlock.style';

const ModularTrioStaggeredBlock = (props) => {
  const { aboveCopy, belowCopy, headingType, headingAdditionalClass } = props;
  const [trioBlocks, setTrioBlocks] = useState([]);

  useEffect(() => {
    const uniqueArray = ['copy', 'ctaCopy', 'ctaRoute', 'image', 'title'];

    const refinedData = normalizeDatoNumberedContent(props, uniqueArray);

    setTrioBlocks(refinedData);
  }, [props]);

  return (
    <ModularTrioStaggeredBlockContainer className="container-wrapper">
      {aboveCopy && (
        <Heading type={headingType} className={clsx('trio-block__above-copy secondary', headingAdditionalClass)}>
          {aboveCopy}
        </Heading>
      )}

      <div className="trio-block__content-block-container">
        {trioBlocks.map((block, index) => (
          <div
            className={clsx('trio-block__tile-wrapper', {
              '-end': index === 1,
            })}
            key={`${block.id}-${block.title}`}
          >
            <ImageTile {...block} />
          </div>
        ))}
      </div>

      {belowCopy && (
        <Heading type={headingType} className={clsx('trio-block__below-copy secondary', headingAdditionalClass)}>
          {belowCopy}
        </Heading>
      )}
    </ModularTrioStaggeredBlockContainer>
  );
};

export default ModularTrioStaggeredBlock;
