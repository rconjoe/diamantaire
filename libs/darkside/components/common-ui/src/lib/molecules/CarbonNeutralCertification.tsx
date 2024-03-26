import styled from 'styled-components';

import { DatoImage } from "./DatoImage";


interface CarbonNeutralCertificationProps {
    url: string;
    className?:string;
};

const CarbonNeutralCertificationContainer = styled.div`
    width: 10rem;
`;

const CarbonNeutralCertification = ({ url, className }: CarbonNeutralCertificationProps) => {
    return (
        <CarbonNeutralCertificationContainer className={className}>
            <DatoImage 
              image={{
                url
              }}
              shouldLazyLoad
            />
        </CarbonNeutralCertificationContainer>
    );
};

export default CarbonNeutralCertification;
export {CarbonNeutralCertification};