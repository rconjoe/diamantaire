import clsx from 'clsx';
import { default as MarkdownPackage } from 'markdown-to-jsx';
import { PropsWithChildren } from 'react';

import { MarkdownContainer } from './Markdown.style';

type MarkdownProps = {
  extraClass?: string;
  options?: object;
  children: string;
  withStyles?: boolean;
};

const Markdown = ({ children, options, extraClass, withStyles = true }: PropsWithChildren<MarkdownProps>) => {
  return (
    <MarkdownContainer
      className={clsx({
        [extraClass]: Boolean(extraClass),
        'with-styles': withStyles,
      })}
    >
      <MarkdownPackage
        options={{
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
