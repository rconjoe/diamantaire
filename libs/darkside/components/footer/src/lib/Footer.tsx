import { LocaleSelector, Form } from '@diamantaire/darkside/components/common-ui';
import { facebookIcon, instagramIcon, pinterestIcon, tiktokIcon } from '@diamantaire/shared/icons';
import { BOLD_FONT_WEIGHT, desktopAndUp } from '@diamantaire/styles/darkside-styles';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styled from 'styled-components';

// import CTAForm from 'components/general/CTAForm';
// import { ReactComponent as FacebookIcon } from 'public/static/icons/social/facebook.svg';
// import { ReactComponent as InstagramIcon } from 'public/static/icons/social/instagram.svg';
// import PinterestIcon from 'public/static/icons/social/pinterest.svg';
// import TiktokIcon from 'public/static/icons/social/tiktok.svg';
// import { mq } from 'styles/mediaQueriesNew';

import FooterMobileAccordions from './FooterMobileAccordions';

type FooterTypes = {
  footerData: any;
  // footerNavigation: {
  //   columns: Array<FooterColumn>;
  //   copyright: string;
  //   emailSignUpColumn: Array<FooterSignupColType>;
  //   emailSignUpCopy: Array<FooterSignupFormType>;
  // };
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

// type FooterSignupColType = {
//   ctaCopy: string;
//   copy: string;
//   title: string;
// };

// type FooterSignupFormType = {
//   emailInputBeingSent?: string;
//   emailInputEmpty?: string;
//   emailInputNotValid?: string;
//   emailInputPlaceholder?: string;
//   emailInputSuccessfullySent?: string;
//   emailInputUnsuccessfullySent?: string;
//   gdprCtaCopy?: string;
//   gdprCtaRoute?: string;
//   gdprOptInCopy?: string;
//   phoneInputPlaceholder?: string;
// };

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
          font-weight: ${BOLD_FONT_WEIGHT};
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
    icon: instagramIcon,
    url: 'https://www.instagram.com/vraiofficial/',
    className: 'instagram',
  },
  {
    icon: facebookIcon,
    url: 'https://www.facebook.com/VRAIjewelry/',
    className: 'facebook',
  },
  {
    icon: pinterestIcon,
    url: 'https://www.pinterest.com/vrai/',
    className: 'pinterest',
  },
  {
    icon: tiktokIcon,
    url: 'https://www.tiktok.com/@vraiofficial',
    className: 'tiktok',
  },
];

const Footer: FC<FooterTypes> = ({ footerData }) => {
  const { columns, copyright, emailSignUpColumn /*, emailSignUpCopy */ } = footerData.footerNavigation;
  const { /* ctaCopy, */ copy, title } = emailSignUpColumn[0];
  // const { emailInputPlaceholder } = emailSignUpCopy[0];

  const date = new Date();

  // function handleFormSubmit(e: React.FormEvent<HTMLFormElement>, state: object) {
  //   e.preventDefault();
  //   // do something

  //   return state;
  // }

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
                          <Image src={icon} alt={className.charAt(0).toUpperCase() + className.slice(1)} />
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
