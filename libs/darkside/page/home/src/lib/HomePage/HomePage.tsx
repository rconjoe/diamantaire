import { useStandardPage } from '@diamantaire/darkside/data/hooks';
import { StandardPageEntry } from '@diamantaire/darkside/page/standard-pages';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';

export interface HomePageProps {
  isMobile: boolean;
  countryCode: string;
  currencyCode: string;
}

const HomePage = (props: HomePageProps) => {
  const { data }: any = useStandardPage('darkside-home');

  console.log('data', data);
  const page = data?.allStandardPages?.[0];

  return (
    <StandardPageEntry
      page={page}
      isMobile={props?.isMobile}
      countryCode={props?.countryCode}
      currencyCode={props?.currencyCode}
    />
  );
};

HomePage.getTemplate = getStandardTemplate;

export { HomePage };
