import clsx from 'clsx';
import { default as MarkdownPackage } from 'markdown-to-jsx';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

import { MarkdownContainer } from './Markdown.style';

type imageConfig = {
  alt?: string;
  h?: number;
  w?: number;
  loading?: string;
};

type MarkdownProps = {
  extraClass?: string;
  options?: object;
  children: string;
  withStyles?: boolean;
  imageConfig?: imageConfig;
};

const Markdown = ({ children, options, extraClass, withStyles = true, imageConfig }: PropsWithChildren<MarkdownProps>) => {
  if (typeof children !== 'string') {
    // Handle cases where children is not a string (or undefined)
    return null; // or any other appropriate action
  }

  const imgOverride = {
    component: (props) => {
      return imageConfig ? (
        <Image
          {...props}
          alt={imageConfig?.alt}
          width={imageConfig?.w}
          height={imageConfig?.h}
          loading={imageConfig?.loading || 'eager'}
        />
      ) : (
        <img {...props} />
      );
    },
  };

  const overrides = {
    img: imgOverride,
  };

  return (
    <MarkdownContainer
      className={clsx({
        [extraClass]: Boolean(extraClass),
        'with-styles': withStyles,
      })}
    >
      <MarkdownPackage
        options={{
          overrides,
          forceBlock: true,
          ...(options && options),
        }}
      >
        {children}
      </MarkdownPackage>
    </MarkdownContainer>
  );
};

export { Markdown };
