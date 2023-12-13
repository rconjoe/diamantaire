import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { useStandardPage } from '@diamantaire/darkside/data/hooks';
import { useRouter } from 'next/router';

import { StyledErrorPage } from './darkside-page-error.style';

export interface DarksidePageErrorProps {
  locale: string;
  countryCode: string;
  currencyCode: string;
  error?: object;
}

const DarksidePageError = (props: DarksidePageErrorProps) => {
  const router = useRouter();
  const { currencyCode, countryCode, error } = props;

  const { data }: any = useStandardPage('error-page', router.locale) || {};
  const { standardPage } = data || {};
  const { content1 = [], seo = {} } = standardPage || {};
  const { seoTitle, seoDescription } = seo;

  return (
    <>
      <StandardPageSeo title={seoTitle} description={seoDescription} />
      <StyledErrorPage>
        {content1?.map((contentBlockData, idx) => {
          const { _modelApiKey } = contentBlockData;

          return (
              <BlockPicker
                key={`${_modelApiKey}_${idx}`}
                _modelApiKey={_modelApiKey}
                modularBlockData={{ ...contentBlockData }}
                countryCode={countryCode}
                currencyCode={currencyCode}
                shouldLazyLoad={false}
              />
          );
        })}
        {error && <p>{JSON.stringify(error)}</p>}
      </StyledErrorPage>
    </>
  );
};

export { DarksidePageError };

export default DarksidePageError;
