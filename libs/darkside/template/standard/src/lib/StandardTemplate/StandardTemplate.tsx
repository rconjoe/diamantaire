import { getTemplate as getGlobalTemplate } from '@diamantaire/darkside/template/global';
import { ReactElement, ReactNode } from 'react';

/* eslint-disable-next-line */
export interface StandardTemplateProps {
  children: ReactNode;
  headerData?: any;
}

export function StandardTemplate({ children }: StandardTemplateProps) {
  // const { headerHeight } = useGlobalContext();

  // return <main style={{ paddingTop: headerHeight + 'px' }}>{children}</main>;
  return <main>{children}</main>;
}

export const getTemplate = (page: ReactElement) => getGlobalTemplate(<StandardTemplate>{page}</StandardTemplate>);

export default StandardTemplate;
