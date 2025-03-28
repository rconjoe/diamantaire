import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { getTemplate } from '@diamantaire/darkside/template/global';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { useCallback, useEffect, useState } from 'react';

import StyledReferAFriendPage from './ReferAFriendPage.style';

export interface ReferAFriendPageProps {
  locale: string;
  dehydratedState: DehydratedState;
}

const ReferAFriendPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { locale } = props;

  const { _t } = useTranslations(locale);

  const [isLoaded, setIsLoaded] = useState(false);

  const pageSeoTitle = `${_t('Referral')} | VRAI`;

  const pageSeoDescription = `${_t('Referral')} | VRAI`;

  const loadFriendBuy = useCallback(() => {
    try {
      if (!isLoaded) {
        let friendbuyAPI = window['friendbuyAPI'] || [];

        window['friendbuyAPI'] = friendbuyAPI = window['friendbuyAPI'] || [];

        friendbuyAPI.merchantId = 'b0362f44-c2c9-439f-8752-29aece68f89d';

        friendbuyAPI.push(['merchant', friendbuyAPI.merchantId]);

        ((f, r, n, d, b, u, y) => {
          console.log(d);
          while ((u = n.shift())) {
            // eslint-disable-next-line
            (b = f.createElement(r)), (y = f.getElementsByTagName(r)[0]);
            b.async = 1;
            b.src = u;
            y.parentNode.insertBefore(b, y);
          }
        })(document, 'script', [
          'https://static.fbot.me/friendbuy.js',
          'https://campaign.fbot.me/' + friendbuyAPI.merchantId + '/campaigns.js',
        ]);

        setIsLoaded(true);
      }
    } catch (e) {
      console.log('FriendBuy Script error', e);
    }
  }, [isLoaded]);

  useEffect(() => {
    loadFriendBuy();
  }, []);

  return (
    <>
      <StandardPageSeo title={pageSeoTitle} description={pageSeoDescription} />

      <StyledReferAFriendPage>
        <div id="friendbuylandingpage"></div>
      </StyledReferAFriendPage>
    </>
  );
};

ReferAFriendPage.getTemplate = getTemplate;

async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<ReferAFriendPageProps>> {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');

  const { locale } = context;

  const queryClient = new QueryClient();

  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  return {
    props: {
      locale,
      dehydratedState,
    },
  };
}

export { ReferAFriendPage, getServerSideProps as getServerSidePropsReferAFriendPage };

export default ReferAFriendPage;
