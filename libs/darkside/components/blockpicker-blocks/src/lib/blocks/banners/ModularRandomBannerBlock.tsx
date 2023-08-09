import { useEffect, useState } from 'react';

import ModularBannerBlock from './ModularBannerBlock';

const ModularRandomBannerBlock = ({ blocks }) => {
  // Init the block picker with a predictable value
  const [randomIndex, setRandomIndex] = useState(-1);

  console.log('blocks', blocks);

  useEffect(() => {
    const min = 0;
    const max = blocks?.length - 1;
    const random = Math.floor(Math.random() * (max - min + 1) + min);

    setRandomIndex(random);
  }, [blocks.length]);

  const block = blocks[randomIndex];

  return (
    <div
      style={{
        opacity: randomIndex === -1 ? 0 : 1,
        transition: '.25s',
        transitionDelay: '.75s',
      }}
    >
      {randomIndex === -1 ? <ModularBannerBlock {...blocks[0]} /> : <ModularBannerBlock {...block} />};
    </div>
  );
};

export default ModularRandomBannerBlock;
