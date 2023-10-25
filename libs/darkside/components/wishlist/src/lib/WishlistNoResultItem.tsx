import { Heading, UniLink } from '@diamantaire/darkside/components/common-ui';
import Image from 'next/image';

import { StyledWishlistNoResultItem } from './WishListNoResultItem.style';

const WishListNoResultItem: React.FC<{
  itemTitle: string;
  itemUrl: string;
  itemImage: {
    url: string;
  };
}> = ({ itemTitle, itemUrl, itemImage: { url } }) => {
  return (
    <StyledWishlistNoResultItem>
      <UniLink route={itemUrl}>
        <div className="media">
          <Image alt={itemTitle} src={url} width={0} height={0} sizes="100vw" />
        </div>
        <div className="text">
          <Heading type="h4">{itemTitle}</Heading>
        </div>
      </UniLink>
    </StyledWishlistNoResultItem>
  );
};

export { WishListNoResultItem };
