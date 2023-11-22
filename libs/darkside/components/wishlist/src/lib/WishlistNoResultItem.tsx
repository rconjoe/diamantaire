import { UniLink } from '@diamantaire/darkside/components/common-ui';
import Image from 'next/image';

const WishListNoResultItem: React.FC<{
  itemTitle: string;
  itemUrl: string;
  itemImage: {
    url: string;
  };
}> = ({ itemTitle, itemUrl, itemImage: { url } }) => {
  return (
    <div className="item">
      <UniLink route={itemUrl}>
        <div className="media">
          <Image alt={itemTitle} src={url} width={0} height={0} sizes="100vw" />
        </div>
        <div className="text">
          <div className="title">{itemTitle}</div>
        </div>
      </UniLink>
    </div>
  );
};

export { WishListNoResultItem };
