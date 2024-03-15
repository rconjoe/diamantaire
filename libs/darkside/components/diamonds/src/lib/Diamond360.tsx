import { UIString } from '@diamantaire/darkside/components/common-ui';
import { generateDiamondSpriteImage, generateDiamondSpriteUrl } from '@diamantaire/shared/helpers';
import { DiamondCtoDataTypes, DiamondDataTypes } from '@diamantaire/shared/types';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
// import Image from 'next/image';
import { useEffect, useState } from 'react';

import StyledDiamond360 from './Diamond360.style';
import DiamondImage from './DiamondImage';
// See https://www.npmjs.com/package/react-player
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

interface Diamond360Props {
  diamond?: DiamondDataTypes | DiamondCtoDataTypes;
  className?: string;
  diamondType?: string;
  lotId?: string;
  useImageOnly?: boolean;
  isCto?: boolean;
  disabled?: boolean;
  noCaption?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  caption?: string;
}

const Diamond360 = ({
  diamond,
  lotId,
  diamondType,
  useImageOnly,
  className,
  isCto,
  disabled,
  noCaption,
  // width = 500,
  // height = 500,
  // priority = false,
  caption = 'Example of how it will look cut and polished',
}: Diamond360Props) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [showFallbackImage, setShowFallbackImage] = useState(false);

  const diamondID = diamond?.lotId || lotId;

  useEffect(() => {
    const id = diamondID?.includes('cfy-')
      ? diamondID
      : diamondID
          .split('')
          .filter((v) => !isNaN(Number(v)))
          .join('');

    if (!disabled && !useImageOnly) {
      const videoUrl = generateDiamondSpriteUrl(id, 'mp4');

      setVideoUrl(videoUrl);
    }
  }, [diamondID, disabled, useImageOnly]);

  const spriteImageUrl = generateDiamondSpriteImage({ diamondID, diamondType });

  return (
    <StyledDiamond360 className={className}>
      {showFallbackImage ? (
        <div className="img">
          <DiamondImage diamondType={diamondType} />{' '}
        </div>
      ) : null}

      {!disabled && !useImageOnly && videoUrl && (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className={clsx('vid', { '-fallback': showFallbackImage })}>
              <ReactPlayer
                url={videoUrl}
                playing
                playsinline
                loop
                muted
                height="100%"
                width="100%"
                controls={false}
                onError={() => {
                  console.error('Error loading video, showing fallback image.');
                  setShowFallbackImage(true);
                }}
                config={{
                  file: {
                    attributes: {
                      title: diamondType,
                      poster: spriteImageUrl,
                    },
                  },
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {!noCaption && (
        <>
          {isCto && (
            <div className="caption">
              <UIString>{caption}</UIString>
            </div>
          )}

          {!disabled && !useImageOnly && !isCto && !showFallbackImage && (
            <div className="caption">
              <UIString>Interactive actual diamond video</UIString>
            </div>
          )}
        </>
      )}
    </StyledDiamond360>
  );
};

export default Diamond360;

export { Diamond360 };
