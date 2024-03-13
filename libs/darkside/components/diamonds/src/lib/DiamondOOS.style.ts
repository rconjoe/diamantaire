import { mobileOnly } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondOOS = styled.div `
    width: 46rem;
    border: 2px solid red;
    padding: 1rem 0;
    margin: 1rem 0;
    .oss_box_content {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        > div {
            padding-bottom: 1rem;
        }
    }
    .oss-view-diamonds {
        width: 20rem;
    }
    .warning-message {
        display: flex;
        align-items: center;
        color: #E54141;
        > svg {
            margin-right: 0.5rem;
        }
    }
    .warning-message-body {
        padding-left: 2rem;
        padding-right: 2rem;
    }
    .builder-summary__content {
        border-bottom: none !important;
        color: #8E8E8E;
        padding: 0 1rem;
        .list-unstyled {
            padding-bottom: 0px !important;
        }
    }
    ${mobileOnly(`
      width: auto;
    `)}
`;

export default StyledDiamondOOS;
export { StyledDiamondOOS };