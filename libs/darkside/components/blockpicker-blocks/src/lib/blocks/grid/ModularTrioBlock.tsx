import { Heading, ImageTile } from '@diamantaire/darkside/components/common-ui';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { ModularTrioBlockContainer } from './ModularTrioBlock.style';

// type ModularTrioBlockProps = {
//   shouldLazyLoad?: boolean;
//   aboveCopy?: string;
//   belowCopy?: string;
//   id?: string;
//   headingType?: string;
//   headingAdditionalClass?: string;
//   copy1: string;
//   copy2: string;
//   copy3: string;
//   ctaCopy1: string;
//   ctaCopy2: string;
//   ctaCopy3: string;

//   ctaRoute1: string;
//   ctaRoute2: string;
//   ctaRoute3: string;

//   image1: string;
//   image2: string;
//   image3: string;
// };

const ModularTrioBlock = (props) => {
  const { id, belowCopy, aboveCopy, headingType, headingAdditionalClass } = props;
  const [trioBlocks, setTrioBlocks] = useState([]);

  useEffect(() => {
    const uniqueAttributes = ['copy', 'ctaCopy', 'ctaRoute', 'title', 'image'];

    function normalizeDatoNumberedContent(datoProps, arrayOfUniqueAttributes) {
      let arrayOfBlocks = [];

      Object.keys({ ...datoProps }).map((prop) => {
        const basePropName = prop.substring(0, prop.length - 1);
        const doesPropMatchAnAttribute = arrayOfUniqueAttributes.includes(basePropName);

        if (doesPropMatchAnAttribute) {
          const basePropNumber = parseFloat(prop.slice(-1));

          return (arrayOfBlocks[basePropNumber] = {
            ...arrayOfBlocks[basePropNumber],
            [basePropName]: datoProps[prop],
          });
        }

        return null;
      });

      arrayOfBlocks = arrayOfBlocks.filter((block) => block !== '');

      return arrayOfBlocks;
    }

    const trioBlocksTemp = normalizeDatoNumberedContent(props, uniqueAttributes);

    setTrioBlocks(trioBlocksTemp);
  }, []);

  return (
    <ModularTrioBlockContainer className="container-emotion">
      {aboveCopy && (
        <Heading type={headingType} className={clsx('above-copy secondary', headingAdditionalClass)}>
          {aboveCopy}
        </Heading>
      )}
      <div className="content-block__container">
        {trioBlocks.map((block, index) => (
          <ImageTile key={`${id}-${index}-${block.title}`} {...block} />
        ))}
      </div>

      {belowCopy && (
        <Heading type={headingType} className={clsx('below-copy secondary', headingAdditionalClass)}>
          {belowCopy}
        </Heading>
      )}
    </ModularTrioBlockContainer>
  );
};

export default ModularTrioBlock;
