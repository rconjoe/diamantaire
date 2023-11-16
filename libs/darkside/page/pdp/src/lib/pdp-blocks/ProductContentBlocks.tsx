import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import { useProductInstagramReel, useProductVideo } from '@diamantaire/darkside/data/hooks';
import { MODULAR_INSTAGRAM_REEL_BLOCK, MODULAR_SPLIT_VIDEO_BLOCK, getCurrency } from '@diamantaire/shared/constants';
import { getCountry } from '@diamantaire/shared/helpers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ProductContentBlocks = ({ instagramReelId, videoBlockId }) => {
  const [pageBlocks, setPageBlocks] = useState([]);
  const { locale } = useRouter();

  const { data: { instagramReelBlock } = {} } = useProductInstagramReel(instagramReelId, locale);
  const { data: { diamondContentBlock: videoBlock } = {} } = useProductVideo(videoBlockId, locale);

  const countryCode = getCountry(locale);
  const currency = getCurrency(countryCode);

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
            countryCode={locale}
            currencyCode={currency}
            shouldLazyLoad={shouldLazyLoad}
            key={id}
          />
        );
      })}
    </div>
  );
};

export default ProductContentBlocks;
