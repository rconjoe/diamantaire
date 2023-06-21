import styled from 'styled-components';

const StyledDiamond360 = styled.div`
  display: block;
  aspect-ratio: 1/1;
  position: relative;

  .spritespin-progress-label {
    padding: 10px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.25);
    transform: translate(-50%, -50%);
    position: absolute;
    left: 50%;
    top: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default StyledDiamond360;

export { StyledDiamond360 };
