import { useHumanNameMapper } from '@diamantaire/darkside/data/hooks';
import { useRouter } from 'next/router';

const UIString = ({ children }) => {
  const router = useRouter();
  const locale = router.locale.split('-')[0];
  const { data: humanNameMapperData } = useHumanNameMapper(locale);

  if (!children) return;

  const { UI_STRINGS = {}, UI_STRINGS_2 = {}, LANGUAGES = {} } = humanNameMapperData || {};
  const strings = { ...UI_STRINGS, ...UI_STRINGS_2, ...LANGUAGES };
  const match = (strings?.[children] || strings?.[children.toLowerCase()])?.value || children;

  return match;
};

export { UIString };
