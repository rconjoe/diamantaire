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

  // return _t(children.toString(), replacements);

  // Ensure that children is a non-empty string or provide a default value
  const stringToTranslate = children && typeof children === 'string' ? children : '';

  return _t(stringToTranslate, replacements);
};

export { UIString };
