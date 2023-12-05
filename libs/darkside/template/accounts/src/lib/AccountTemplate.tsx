import { getTemplate as getGlobalTemplate } from '@diamantaire/darkside/template/global';
import { ReactElement, ReactNode } from 'react';

/* eslint-disable-next-line */
export interface AccountTemplateProps {
  children: ReactNode;
  headerData?: any;
}

export function AccountsTemplate({ children }: AccountTemplateProps) {
  /* eslint-disable-next-line */

  return <>{children}</>;
}

export const getTemplate = (page: ReactElement) => getGlobalTemplate(<AccountsTemplate>{page}</AccountsTemplate>);

export default AccountsTemplate;
