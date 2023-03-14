import { PinterestCircleIcon, InstagramCircleIcon, FacebookCircleIcon, TiktokCircleIcon } from '@diamantaire/shared/icons';

import { SocialMediaContainer } from './SocialMediaSection.style';

type SocialMediaSectionProps = {
  title?: string;
  caption?: string;
};

const SocialMediaSection = ({ title, caption }: SocialMediaSectionProps) => {
  return (
    <SocialMediaContainer>
      <div className="title__container">
        <h2 className="h1 primary">{title}</h2>
        <div className="content" dangerouslySetInnerHTML={{ __html: caption }}></div>
      </div>

      <div className="icons__container">
        <ul>
          <li>
            <a href="https://www.instagram.com/vraiofficial/" target="_blank" rel="noreferrer">
              <InstagramCircleIcon />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/VRAIjewelry/" target="_blank" rel="noreferrer">
              <FacebookCircleIcon />
            </a>
          </li>
          <li>
            <a href="https://www.tiktok.com/@vraiofficial/" target="_blank" rel="noreferrer">
              <TiktokCircleIcon />
            </a>
          </li>
          <li>
            <a href="https://www.pinterest.com/vrai/" target="_blank" rel="noreferrer">
              <PinterestCircleIcon />
            </a>
          </li>
        </ul>
      </div>
    </SocialMediaContainer>
  );
};

export default SocialMediaSection;
