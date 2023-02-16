import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
import clsx from 'clsx';
import Image from 'next/image';

import { DiamondLeoBlockContainer } from './ModularDiamondLeoBlock.style';

type DiamondLeoBlockProps = {
  extraClass?: string;
  title?: string;
  copy?: string;
  image?: {
    width: number;
    height: number;
    url: string;
  };
};

const DiamondLeoBlock = ({ extraClass = 'blockquote', title, copy, image }: DiamondLeoBlockProps) => {
  const alt = getBlockPictureAlt({ image, title });

  const { width, height, url } = image;

  return (
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
};

export default DiamondLeoBlock;
