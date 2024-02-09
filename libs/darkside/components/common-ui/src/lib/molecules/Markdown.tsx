import clsx from 'clsx';
import { default as MarkdownPackage } from 'markdown-to-jsx';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

import { MarkdownContainer } from './Markdown.style';

export type MarkdownImageConfig = {
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
  imageConfig?: any;
  target?: string;
};

const Markdown = ({
  children,
  options,
  extraClass,
  withStyles = true,
  imageConfig,
  target,
}: PropsWithChildren<MarkdownProps>) => {
  if (typeof children !== 'string') {
    // Handle cases where children is not a string (or undefined)
    return null; // or any other appropriate action
  }

  const imgOverride = {
    component: (props) => {
      const loading = imageConfig?.loading || 'lazy';
      const priority = loading === 'eager' ? true : false;

      return imageConfig ? (
        <div style={{ display: 'block', aspectRatio: `${imageConfig?.w}/${imageConfig?.h}` }}>
          <Image
            {...props}
            alt={imageConfig?.alt}
            width={imageConfig?.w}
            height={imageConfig?.h}
            loading={loading}
            priority={priority}
            style={{ aspectRatio: `${imageConfig?.w}/${imageConfig?.h}` }}
          />
        </div>
      ) : (
        <img {...props} />
      );
    },
  };

  const overrides = {
    img: imgOverride,
    a: {
      component: (props) => {
        const { children, ...otherProps } = props;

        if (!children) {
          return null;
        }

        return target ? (
          <a {...otherProps} target={target}>
            {children}
          </a>
        ) : (
          <a {...otherProps}>{children}</a>
        );
      },
    },
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
