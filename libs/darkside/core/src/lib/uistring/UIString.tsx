import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

type UIStringProps = {
  children: string | string[];
  replacements?: ReactNode[];
};

const UIString = ({ children, replacements }: UIStringProps) => {
  const router = useRouter();
  const { _t } = useTranslations(router.locale);

  return _t(children.toString(), replacements);
};

export { UIString };
