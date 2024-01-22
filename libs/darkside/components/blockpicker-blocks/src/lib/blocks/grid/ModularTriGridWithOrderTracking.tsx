import { UniLink } from '@diamantaire/darkside/components/common-ui';
import { parseValidLocale } from '@diamantaire/shared/constants';
import { isCountrySupported } from '@diamantaire/shared/helpers';
import { BookCalendarIcon, MailIcon, ChatIcon } from '@diamantaire/shared/icons';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import { ModularTriGridWithOrderTrackingContainer } from './ModularTriGridWithOrderTracking.style';

type ModularTriGridWithOrderTrackingProps = {
  col1Title?: string;
  col1Copy?: string;
  col1Icon?: string;
  col1ButtonText?: string;
  col1ButtonUrl?: string;
  col2Title?: string;
  col2Copy?: string;
  col2Icon?: string;
  col2ButtonText?: string;
  col2ButtonUrl?: string;
  col3Title?: string;
  col3Copy?: string;
  col3Icon?: string;
  col3ButtonText?: string;
  col3ButtonUrl?: string;
  supportedCountries?: Array<{
    code: string;
  }>;
};

const ModularTriGridWithOrderTracking = ({
  col1Title,
  col1Copy,
  col1Icon,
  col1ButtonText,
  col1ButtonUrl,
  col2Title,
  col2Copy,
  col2Icon,
  col2ButtonText,
  col2ButtonUrl,
  col3Title,
  col3Copy,
  col3Icon,
  col3ButtonText,
  col3ButtonUrl,
  supportedCountries,
}: ModularTriGridWithOrderTrackingProps) => {
  const items = [
    {
      title: col1Title,
      copy: col1Copy,
      icon: col1Icon,
      buttonText: col1ButtonText,
      buttonURL: col1ButtonUrl,
    },
    {
      title: col2Title,
      copy: col2Copy,
      icon: col2Icon,
      buttonText: col2ButtonText,
      buttonURL: col2ButtonUrl,
    },
    {
      title: col3Title,
      copy: col3Copy,
      icon: col3Icon,
      buttonText: col3ButtonText,
      buttonURL: col3ButtonUrl,
    },
  ];

  const { locale } = useRouter();
  const { countryCode } = parseValidLocale(locale);

  if (!isCountrySupported(supportedCountries, countryCode)) return;

  return (
    <ModularTriGridWithOrderTrackingContainer>
      <div className="grid-wrapper">
        {items?.map((item) => {
          const { title, copy, icon, buttonText, buttonURL } = item || {};
          const selectedIcon =
            icon === 'Calendar' ? (
              <BookCalendarIcon />
            ) : icon === 'Envelope' ? (
              <MailIcon />
            ) : icon === 'Chat Bubble' ? (
              <ChatIcon />
            ) : (
              ''
            );

          return (
            <div className="item__container" key={uuidv4()}>
              <div className="item__inner">
                <div className="text">
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>

                <div className="button">
                  {icon === 'Chat Bubble' ? (
                    // TODO: Implement Hubspot Chat - https://diamondfoundry.atlassian.net/jira/software/projects/DIA/boards/99/backlog?selectedIssue=DIA-126
                    // <button onClick={() => window?.HubSpotConversations?.widget?.open()}>
                    //   <span className={icon.toLowerCase()}>{selectedIcon}</span>
                    //   {buttonText}
                    // </button>
                    <button>
                      <span className={icon.toLowerCase()}>{selectedIcon}</span>
                      {buttonText}
                    </button>
                  ) : (
                    <UniLink route={buttonURL}>
                      <span className={icon.toLowerCase()}>{selectedIcon}</span>
                      {buttonText}
                    </UniLink>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ModularTriGridWithOrderTrackingContainer>
  );
};

export default ModularTriGridWithOrderTracking;
