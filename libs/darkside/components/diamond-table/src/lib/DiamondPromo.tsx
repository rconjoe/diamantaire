import { Heading } from '@diamantaire/darkside/components/common-ui';
import { useDiamondTableData } from '@diamantaire/darkside/data/hooks';
import Image from 'next/image';

import StyledDiamondPromo from './DiamondPromo.style';

export interface DiamondPromoProps {
  locale?: string;
  className?: string;
}

export function DiamondPromo(props: DiamondPromoProps) {
  const { locale = 'en_US', className } = props;
  const DiamondTableContent = useDiamondTableData(locale);
  const diamonTableData = DiamondTableContent.data.diamondTable;
  const { sidebarTitle: diamondPromoTitle, sidebar: diamondPromoContent, blockquote: quotes } = diamonTableData;
  const leoQuote = quotes.find((v) => v.title === 'LEONARDO DICAPRIO');

  return (
    <StyledDiamondPromo className={className}>
      <div className="banner">
        <Heading type="h2" className="title">
          {diamondPromoTitle}
        </Heading>

        <ul className="list">
          {diamondPromoContent.map((v, index) => {
            return (
              <li key={v.title + index}>
                <Heading type="h3">{v.title}</Heading>
                <p>{v.description}</p>
              </li>
            );
          })}
        </ul>
      </div>

      {leoQuote && (
        <div className="banner leo">
          <Heading type="h2" className="title">
            {leoQuote.title}
          </Heading>

          <p>{leoQuote.copy}</p>

          <div className="media">
            <Image alt={leoQuote.title} src={leoQuote.image?.url} width={750} height={546} />
          </div>
        </div>
      )}
    </StyledDiamondPromo>
  );
}

export default DiamondPromo;
