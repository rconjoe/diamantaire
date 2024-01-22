import { useTranslations, humanNamesMapperType } from '@diamantaire/darkside/data/hooks';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

type UIStringProps = {
  children: string | string[];
  replacements?: ReactNode[];
  types?: (keyof typeof humanNamesMapperType)[] | undefined;
};

const UIString = ({ children, replacements, types = Object.values(humanNamesMapperType) }: UIStringProps) => {
  const router = useRouter();

  const { _t } = useTranslations(router.locale, types);

  // Ensure that children is a non-empty string or provide a default value
  const stringToTranslate = children && typeof children === 'string' ? children : '';

  return _t(stringToTranslate, replacements);
};

export { UIString };
