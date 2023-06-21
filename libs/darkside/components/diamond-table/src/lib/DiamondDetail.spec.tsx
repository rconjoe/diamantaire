import { render } from '@testing-library/react';

import DiamondDetail from './DiamondDetail';
import { DiamondProductTypes } from './DiamondTable';

describe('DiamondDetail', () => {
  const product: DiamondProductTypes = {
    availableForSale: true,
    carat: 0.3,
    clarity: 'VS1',
    color: 'F',
    cut: 'Excellent',
    dangerousInternalProductId: '7012839882845',
    description: '',
    dfCertificateUrl: 'https://certificate.diamondfoundry.com/v2/download/F2003325.pdf',
    diamondType: 'marquise',
    handle: 'marquise-0-30-excellent-f-vs1-f2003325',
    lotId: 'F2003325',
    productTitle: 'Marquise,0.30,Excellent,F,VS1,F2003325',
    slug: 'diamonds',
    type: 'Marquise',
    variants: [
      {
        dangerousInternalShopifyVariantId: '40765067493469',
        isForSale: true,
        price: 37500,
        title: 'Default Title',
        variantId: 'gid://shopify/ProductVariant/40765067493469',
        variantSku: 'F2003325',
        variantTitle: 'Default Title',
      },
    ],
    _id: '645c65fdfb2f161fbebeed51',
  };

  it('should render successfully', () => {
    const { baseElement } = render(<DiamondDetail product={product} />);

    expect(baseElement).toBeTruthy();
  });
});
