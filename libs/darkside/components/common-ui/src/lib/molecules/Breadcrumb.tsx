import Link from 'next/link';
import styled from 'styled-components';

const BreadcrumbStyles = styled.div`
  padding-bottom: calc(var(--gutter) / 5);
  ul {
    li {
      a {
        font-size: var(--font-size-xxxsmall);
      }
      span {
        margin: 0 5px;
      }
    }
  }
`;

const Breadcrumb = ({ breadcrumb }) => {
  return (
    <BreadcrumbStyles className="container-wrapper">
      <ul className="list-unstyled flex">
        <li>
          <Link href="/">Home</Link>
          <span>/</span>
        </li>
        {breadcrumb?.map((item, index) => {
          return (
            <li key={item.id}>
              <Link href={item?.link?.slug}>{item?.name?.trim()}</Link>
              {breadcrumb.length - 1 !== index && <span>/</span>}
            </li>
          );
        })}
      </ul>
    </BreadcrumbStyles>
  );
};

export { Breadcrumb };
