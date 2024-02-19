import { Heading } from '@diamantaire/darkside/components/common-ui';
import { useDiamondTableData } from '@diamantaire/darkside/data/hooks';

import StyledDiamondPromo from './DiamondPromo.style';

export interface DiamondPromoProps {
  locale?: string;
  className?: string;
}

export function DiamondPromo(props: DiamondPromoProps) {
  const { className, locale } = props;

  const diamondTableContent = useDiamondTableData(locale || 'en-US');
  const diamonTableData = diamondTableContent?.data?.diamondTable;

  if (!diamondTableContent?.data) return null;
  const { sidebarTitle: diamondPromoTitle, sidebar: diamondPromoContent } = diamonTableData || {};
  // const leoQuote = quotes.find((v) => v.title === 'LEONARDO DICAPRIO');

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
      {/* {leoQuote && (
        <div className="banner leo">
          <Heading type="h2" className="title">
            {leoQuote.title}
          </Heading>

          <p>{leoQuote.copy}</p>

          <div className="media">
            <Image alt={leoQuote.title} src={leoQuote.image?.url} width={750} height={546} />
          </div>
        </div>
      )} */}
    </StyledDiamondPromo>
  );
}

export default DiamondPromo;
