import { getIconImageUrl } from '@diamantaire/shared/helpers';
import { ArrowNewWindowIcon } from '@diamantaire/shared/icons';
import Image from 'next/image';

import StyledCertificateThumb from './CertificateThumb.style';

interface CertificateThumbTypes {
  certificateUrl?: string;
  title?: string;
  className?: string;
}

const CertificateThumb = ({ certificateUrl, className, title }: CertificateThumbTypes) => {
  const imageUrl = getIconImageUrl('df-certificate-thumb', 'jpg');

  return (
    <StyledCertificateThumb className="thb">
      <a className={className} href={certificateUrl} target="_blank" rel="noopener noreferrer">
        <div className="thumb-wrapper">
          <Image className="thumb-image" src={imageUrl} alt={title} height={143} width={198} priority={true} />

          <ArrowNewWindowIcon />
        </div>
      </a>
    </StyledCertificateThumb>
  );
};

export default CertificateThumb;

export { CertificateThumb };
