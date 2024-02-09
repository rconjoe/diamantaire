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
          <Image alt={itemTitle} src={url} width={245} height={245} style={{ aspectRatio: `1/1` }} />
        </div>
        <div className="text">
          <div className="title">{itemTitle}</div>
        </div>
      </UniLink>
    </div>
  );
};

export { WishListNoResultItem };
