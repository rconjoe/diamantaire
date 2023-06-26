import { Form, LocaleSelector } from '@diamantaire/darkside/components/common-ui';
import { FacebookIcon, InstagramIcon, PinterestIcon, TiktokIcon } from '@diamantaire/shared/icons';
import { desktopAndUp } from '@diamantaire/styles/darkside-styles';
import Link from 'next/link';
import { FC } from 'react';
import styled from 'styled-components';

import FooterMobileAccordions from './FooterMobileAccordions';

type FooterTypes = {
  footerData: any;
};

export type FooterColumn = {
  title: string;
  links: Array<FooterLink>;
};

type FooterLink = {
  copy: string;
  flags: string;
  route: string;
  supportedCountries: Array<string>;
};

const FooterStyles = styled.footer`
  padding: 4rem 2.4rem 0;
  border-top: 1px solid #ddd;

  .footer__column-wrapper {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;

    .footer-col {
      flex: 1;
      display: none;

      ${desktopAndUp(`
        display: block;
      `)}
      &:first-child ul {
        li:first-child {
          a {
            font-weight: bold;
          }
        }
      }

      &__inner {
        p.col-heading {
          font-size: 1.4rem;
          margin: 0 0 10px;
          font-weight: var(--font-weight-bold);
        }
        ul {
          padding: 0;
          margin: 0;
          list-style: none;

          li {
            margin-bottom: 10px;
            &:last-child {
              margin-bottom: 0px;
            }

            a {
              font-size: 1.7rem;
              transition: 0.25s;
              &:hover {
                opacity: 0.6;
              }
            }
          }
        }
      }

      &.footer-email-signup {
        flex: 1.5;
        display: block;

        .footer-col__inner {
          max-width: 420px;
        }
        h4 {
          margin: 0 0 10px;
          font-size: 1.9rem;
        }

        p {
          font-size: 1.7rem;
          margin: 0 0 10px;
        }

        .footer-social {
          padding-top: 20px;
          ul {
            display: flex;
            align-items: end;
            margin: 0;
            padding: 0;
            list-style: none;

            li {
              flex: 0 0 28px;
              margin-bottom: 0px;
              margin-right: 5px;
              text-align: center;
              a {
                display: inline-block;
                img {
                  height: 23px;
                }

                &.pinterest,
                &.tiktok {
                  img {
                    height: 19px;
                    width: auto;
                  }
                }
                &.instagram {
                  img {
                    position: relative;
                    top: 4px;
                  }
                }
                &.facebook {
                  img {
                    position: relative;
                    top: 2px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .footer-mobile {
    display: block;

    ${desktopAndUp(`
        display: none;
      `)}
  }

  .footer__copyright-wrapper {
    padding: 2.4rem 0px;
    text-align: center;

    p {
      margin: 0;
      font-size: 1.4rem;
    }
  }
`;

const socialItems = [
  {
    icon: <InstagramIcon alt="Instagram" />,
    url: 'https://www.instagram.com/vraiofficial/',
    className: 'instagram',
  },
  {
    icon: <FacebookIcon alt="Facebook" />,
    url: 'https://www.facebook.com/VRAIjewelry/',
    className: 'facebook',
  },
  {
    icon: <PinterestIcon alt="Pinterest" />,
    url: 'https://www.pinterest.com/vrai/',
    className: 'pinterest',
  },
  {
    icon: <TiktokIcon alt="Tiktok" />,
    url: 'https://www.tiktok.com/@vraiofficial',
    className: 'tiktok',
  },
];

const Footer: FC<FooterTypes> = ({ footerData }) => {
  const { columns, copyright, emailSignUpColumn } = footerData.footerNavigation;
  const { copy, title } = emailSignUpColumn[0];

  const date = new Date();

  return (
    <FooterStyles>
      <div className="footer-desktop">
        <div className="footer__column-wrapper">
          {columns?.map((col, index) => {
            const { title, links } = col;

            return (
              <div className="footer-col" key={`footer-col-${index}`}>
                <div className="footer-col__inner">
                  <p className="col-heading">{title}</p>
                  <ul>
                    {links?.map((link, linkIndex) => {
                      const { route, copy } = link;

                      return (
                        <li key={`footer-col-${index}-link-${linkIndex}`}>
                          <Link href={route} legacyBehavior>
                            {copy}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}

          <div className="footer-col footer-email-signup">
            <div className="footer-col__inner">
              <p className="col-heading">{title}</p>
              <p>{copy}</p>

              <Form onSubmit={(e) => e.preventDefault()} />
              <div className="footer-social">
                <ul>
                  {socialItems.map((item, index) => {
                    const { url, className, icon } = item;

                    return (
                      <li key={`footer-social-link-${index}`}>
                        <a target="_blank" href={url} rel="noreferrer" className={className}>
                          {icon}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <LocaleSelector locale={'en-US'} />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-mobile">
        <FooterMobileAccordions columns={columns} />
      </div>
      <div className="footer__copyright-wrapper">
        <p>
          &copy; {date.getFullYear()} {copyright}
        </p>
      </div>
    </FooterStyles>
  );
};

export { Footer };
