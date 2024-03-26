import { DarksideButton, UIString } from "@diamantaire/darkside/components/common-ui";
import { WarningIcon } from "@diamantaire/shared/icons";

import StyledDiamondOOS from "./DiamondOOS.style";

interface DiamondOOSProps {
    items;
    viewDiamonds?: () => void;
};

const DiamondOOS = ({
    viewDiamonds,
    items
}: DiamondOOSProps) => {
    return (
        <StyledDiamondOOS>
            <div className='oss_box_content'>
                <div className="warning-message">
                    <WarningIcon/>
                    <div><p><UIString>The diamond you selected is no longer available.</UIString></p></div>
                </div>
                <div className="warning-message-body">
                    <p><UIString>We have other diamonds with similar properties and price points.</UIString></p>
                </div>
                <DarksideButton 
                    className="oss-view-diamonds" 
                    onClick={() => viewDiamonds()}
                >
                    <UIString>View diamonds</UIString>
                </DarksideButton>
            </div>
            <div className="builder-summary__content">
                <div className='builder-summary__content__inner'>
                    <ul className="list-unstyled">
                    {items?.map((item, index) => {
                        return (
                        <li key={`summary-1-${index}`}>
                            <span className="label">
                                <UIString>{item.label}</UIString>:
                            </span>
                            <span className="value">
                                <UIString>{item.value}</UIString>
                            </span>
                            <span className="toggle">
                                <button onClick={() => item.onClick()}>
                                    <UIString>Modify</UIString>
                                </button>
                            </span>
                        </li>
                        );
                    })}
                    </ul>
                </div>
            </div>
        </StyledDiamondOOS>
    )
}

export default DiamondOOS;
export { DiamondOOS };