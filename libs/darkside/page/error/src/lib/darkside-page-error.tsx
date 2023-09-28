import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { useStandardPage } from '@diamantaire/darkside/data/hooks';
import { Fragment } from 'react';

import { StyledErrorPage } from './darkside-page-error.style';

export interface DarksidePageErrorProps {
  locale: string;
  countryCode: string;
  currencyCode: string;
}

const DarksidePageError = (props: DarksidePageErrorProps) => {
  const { locale, currencyCode, countryCode } = props;

  const { data }: any = useStandardPage('error-page', locale) || {};
  const { standardPage } = data || {};
  const { content1 = [], seo = {} } = standardPage || {};
  const { seoTitle, seoDescription } = seo;

  return (
    <>
      <h1>500</h1>
      <StandardPageSeo title={seoTitle} description={seoDescription} />
      <StyledErrorPage>
        {content1?.map((contentBlockData, idx) => {
          const { _modelApiKey } = contentBlockData;

          return (
            <Fragment key={`${_modelApiKey}_${idx}`}>
              <BlockPicker
                _modelApiKey={_modelApiKey}
                modularBlockData={{ ...contentBlockData }}
                countryCode={countryCode}
                currencyCode={currencyCode}
                shouldLazyLoad={false}
              />
            </Fragment>
          );
        })}
      </StyledErrorPage>
    </>
  );
};

export { DarksidePageError };

export default DarksidePageError;
