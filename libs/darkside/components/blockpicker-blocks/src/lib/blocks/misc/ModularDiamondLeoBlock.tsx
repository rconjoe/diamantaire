import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import { DiamondLeoBlockContainer } from './ModularDiamondLeoBlock.style';
import LazyLoadWrapper from '../molecules/LazyLoadWrapper';

type DiamondLeoBlockProps = {
  extraClass?: string;
  title?: string;
  copy?: string;
  image?: {
    width: number;
    height: number;
    url: string;
  };
  shouldLazyLoad?: boolean;
};

const DiamondLeoBlock = ({ extraClass = 'blockquote', title, copy, image, shouldLazyLoad }: DiamondLeoBlockProps) => {
  const alt = getBlockPictureAlt({ image, title });

  const { width, height, url } = image;
  const block = (
    <DiamondLeoBlockContainer>
      <div
        className={clsx('diamond-leo__wrapper', {
          '-blockquote': extraClass === 'blockquote',
        })}
      >
        <p className="diamond-leo__name">{title}</p>
        <p
          className={clsx('diamond-leo__quote', {
            '-blockquote': extraClass === 'blockquote',
          })}
        >
          {copy}
        </p>
        <Image
          className={clsx('diamond-leo__signature', {
            '-blockquote': extraClass === 'blockquote',
          })}
          src={url}
          width={width}
          height={height}
          alt={alt}
        />
      </div>
    </DiamondLeoBlockContainer>
  );

  if (shouldLazyLoad) {
    return <LazyLoadWrapper once={true}>{block}</LazyLoadWrapper>;
  }

  return block;
};

export default DiamondLeoBlock;
