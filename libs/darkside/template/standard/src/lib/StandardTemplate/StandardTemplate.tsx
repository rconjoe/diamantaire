import { getTemplate as getGlobalTemplate } from '@diamantaire/darkside/template/global';
import { ReactElement, ReactNode } from 'react';

/* eslint-disable-next-line */
export interface StandardTemplateProps {
  children: ReactNode;
  headerData?: any;
}

export function StandardTemplate({ children }: StandardTemplateProps) {
  /* eslint-disable-next-line */
  return <>{children}</>;
}

export const getTemplate = (page: ReactElement) => getGlobalTemplate(<StandardTemplate>{page}</StandardTemplate>);

export default StandardTemplate;
