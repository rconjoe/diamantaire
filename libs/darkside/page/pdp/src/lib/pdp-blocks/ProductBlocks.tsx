import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import { useProductInstagramReel, useProductVideo } from '@diamantaire/darkside/data/hooks';
import { MODULAR_INSTAGRAM_REEL_BLOCK, MODULAR_SPLIT_VIDEO_BLOCK } from '@diamantaire/shared/constants';
import { useEffect, useState } from 'react';

const ProductBlocks = ({ instagramReelId, videoBlockId }) => {
  const [pageBlocks, setPageBlocks] = useState([]);

  const { data: { instagramReelBlock } = {} } = useProductInstagramReel(instagramReelId, 'en_US');
  const { data: { diamondContentBlock: videoBlock } = {} } = useProductVideo(videoBlockId, 'en_US');

  useEffect(() => {
    const pageBlocksTemp = [];

    if (instagramReelBlock !== null) {
      const block = {
        id: instagramReelId,
        _modelApiKey: MODULAR_INSTAGRAM_REEL_BLOCK,
        ...instagramReelBlock?.content?.[0],
      };

      if (!pageBlocksTemp.includes(block)) {
        pageBlocksTemp.push(block);
      }
    }

    if (videoBlock !== null) {
      const block = {
        id: videoBlockId,
        _modelApiKey: MODULAR_SPLIT_VIDEO_BLOCK,
        ...videoBlock?.videoBlock,
      };

      if (!pageBlocksTemp.includes(block)) {
        pageBlocksTemp.push(block);
      }
    }

    setPageBlocks(pageBlocksTemp);
  }, [instagramReelBlock, videoBlock]);

  return (
    <div>
      {pageBlocks?.map((contentBlockData, idx) => {
        const { id, _modelApiKey } = contentBlockData;

        // Desktop + Mobile, anything after the first two blocks should be lazy loaded
        const contentIsAboveFold = idx < 2;
        const shouldLazyLoad = contentIsAboveFold ? false : true;

        return (
          <BlockPicker
            _modelApiKey={_modelApiKey}
            modularBlockData={{ ...contentBlockData }}
            isMobile={false}
            countryCode={'US'}
            currencyCode={'USD'}
            shouldLazyLoad={shouldLazyLoad}
            key={id}
          />
        );
      })}
    </div>
  );
};

export default ProductBlocks;
