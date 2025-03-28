/*

This should be used for every 3 column content that utilizes ImageTile.
Handles: MODULAR_TRIO_9x7_BLOCK, MODULAR_BLOG_LIST_TRIO_BLOCK

*/

import { Heading, ImageTile } from '@diamantaire/darkside/components/common-ui';
import { normalizeDatoNumberedContent } from '@diamantaire/shared/helpers';
import { DatoImageType, DatoDarksideButtonProps } from '@diamantaire/shared/types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { ModularTrioBlockContainer } from './ModularTrioBlock.style';

type ModularTrioBlockProps = {
  shouldLazyLoad?: boolean;
  aboveCopy?: string;
  belowCopy?: string;
  id?: string;
  headingType?: string;
  headingAdditionalClass?: string;
  copy1?: string;
  copy2?: string;
  copy3?: string;
  darksideButtons1: DatoDarksideButtonProps[];
  darksideButtons2: DatoDarksideButtonProps[];
  darksideButtons3: DatoDarksideButtonProps[];
  image1?: DatoImageType;
  image2?: DatoImageType;
  image3?: DatoImageType;
  blogPosts?: Array<{
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: object;
  }>;
  blogPostCtaCopy?: string;
  _modelApiKey: string;
};

const ModularTrioBlock = (props: ModularTrioBlockProps) => {
  const {
    id,
    belowCopy,
    aboveCopy,
    headingType,
    headingAdditionalClass,
    blogPosts,
    blogPostCtaCopy,
    _modelApiKey,
    shouldLazyLoad,
  } = props;

  const [trioBlocks, setTrioBlocks] = useState([]);

  const [additionalClass, setAdditionalClass] = useState('');

  useEffect(() => {
    if (_modelApiKey === 'modular_triosvg_block') {
      setAdditionalClass('trio-svg');
    }

    if (_modelApiKey === 'modular_blog_list_trio_block') {
      const trioBlocksTemp = blogPosts.map((post) => {
        const updatedPost = {
          title: post.title,
          copy: post.excerpt,
          image: post.featuredImage,
          ctaCopy: blogPostCtaCopy,
          ctaRoute: `/journal/post/${post.slug}`,
        };

        return updatedPost;
      });

      setTrioBlocks(trioBlocksTemp);
    } else {
      const arrayOfAttributes = ['copy', 'darksideButtons', 'title', 'image'];

      const trioBlocksTemp = normalizeDatoNumberedContent(props, arrayOfAttributes);

      setTrioBlocks(trioBlocksTemp);
    }
  }, []);

  return (
    <ModularTrioBlockContainer className={clsx('container-wrapper', additionalClass)}>
      {aboveCopy && (
        <Heading type={headingType} className={clsx('above-copy secondary', headingAdditionalClass)}>
          {aboveCopy}
        </Heading>
      )}
      <div className="content-block__container">
        {trioBlocks.map((block, index) => (
          <ImageTile
            isSvg={block.image.url.includes('.svg')}
            key={`${id}-${index}-${block.title}`}
            shouldLazyLoad={shouldLazyLoad}
            {...block}
          />
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
