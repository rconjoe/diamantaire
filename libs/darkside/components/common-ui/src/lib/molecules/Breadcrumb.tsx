import Link from 'next/link';
import styled from 'styled-components';

const BreadcrumbStyles = styled.div`
  padding-bottom: calc(var(--gutter) / 4);
  ul {
    li {
      a {
        font-size: var(--font-size-xxxsmall);
      }
      span {
        margin: 0 0.8rem;
        font-size: var(--font-size-xxxsmall);
      }
    }
  }
`;

type BreadcrumbProps = {
  breadcrumb: {
    title: string;
    path: string;
  }[];
  lastItemBolded?: boolean;
  simple?: boolean;
};

const Breadcrumb = ({ breadcrumb, simple = false, lastItemBolded = true }: BreadcrumbProps) => {
  return (
    <BreadcrumbStyles className="container-wrapper" lastItemBolded={lastItemBolded}>
      {simple ? (
        <ul className="list-unstyled flex">
          {breadcrumb?.map((item, index) => {
            return (
              <li key={item?.path}>
                <Link href={item?.path}>{item?.title}</Link>
                {breadcrumb.length - 1 !== index && <span>/</span>}
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="list-unstyled flex">
          <li>
            <Link href="/">Home</Link>
            <span>/</span>
          </li>
          {breadcrumb?.map((item, index) => {
            if (!item.path) {
              return null;
            }

            const isLastItem = breadcrumb.length - 1 === index;

            return (
              <li key={item.path}>
                <Link href={isLastItem ? '#' : item?.path}>{item?.title?.trim()}</Link>
                {!isLastItem && <span>/</span>}
              </li>
            );
          })}
        </ul>
      )}
    </BreadcrumbStyles>
  );
};

export { Breadcrumb };
