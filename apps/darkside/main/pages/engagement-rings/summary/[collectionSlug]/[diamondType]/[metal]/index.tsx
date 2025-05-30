import { Loader } from '@diamantaire/darkside/components/common-ui';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { GetServerSidePropsContext } from 'next';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const validConfigurations = [
 'metal',
 'diamondType',
 'bandAccent',
 'caratWeight',
 'bandAccent',
 'bandWidth',
 'hiddenHalo',
 'prongStyle',
 'sideStoneShape',
 'sideStoneCarat',
 'haloSize',
 'bandStoneStyle',
 'bandStoneShape',
];

const SummaryRedirectStyles = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem 0;
`;

const SummaryRedirectPage = ({ collectionSlug, lotId, configuration, ringSize }) => {

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const searchParams = new URLSearchParams({ slug: collectionSlug });

      Object.entries(configuration).forEach(([type, value]) => {
        if (validConfigurations.includes(type)) {
          searchParams.append(type, value as string);
        }
      });

      const response = await fetch(`/api/products/filter?${searchParams.toString()}`);

      setLoading(false);
      const json = await response.json();

      setProduct(json[0] || null);
    }

    fetchData();
  },[]);

  const fixedLotId = 'F'+lotId;
  const redirectLink = `/customize/setting-to-diamond/${collectionSlug}/${product?.productSlug}/${fixedLotId}/summary${ringSize ? `?ringSize=${ringSize}` : ''}`;
  

  if (!loading && typeof window !== 'undefined'){
    const fullPathUrl = `${window.location.protocol}//${window.location.host}${redirectLink}`;

    if (product){
      window.location.href=fullPathUrl;
    } else {
      window.location.href='https://www.vrai.com';
    }
  }

  return (<SummaryRedirectStyles>
     <Loader color="#000" />
  </SummaryRedirectStyles>)
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { params, query } = context;
  
  return {
    props: {
      collectionSlug: params.collectionSlug,
      lotId: query.diamondLotId,
      ringSize: query.ringSize,
      configuration: Object.entries(query).reduce((acc,[k,v])=> {
        if (validConfigurations.includes(k)){
          acc[k] = v;
        }

        return acc;
      },{}),
    }
  }
}

SummaryRedirectPage.getTemplate = getStandardTemplate;

export default SummaryRedirectPage;