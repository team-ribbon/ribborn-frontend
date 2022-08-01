import { FaHourglass } from "react-icons/fa";
import styled from "styled-components";

const LoadingSpinner = () => {
  return (
    <FloatWrap>
      <Wrap>
        <Spinner>
          <FaHourglass />
        </Spinner>
      </Wrap>
    </FloatWrap>
  );
};
const FloatWrap = styled.div`
  z-index: 999;
  position: fixed;
`;
const Wrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  max-width: 1360px;
  max-height: 1160px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  display: flex;
  border-radius: 24px;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;
const Spinner = styled.div`
  z-index: 1000;
  margin: auto;
  font-size: 60px;
  color: ${({ theme }) => theme.colors.orange};
  animation: rotate 2.5s infinite;
  transform: rotate(0deg);
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingSpinner;
