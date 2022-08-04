import styled from "styled-components";
import { Link } from "react-router-dom";
import { FixedSizeBlackBtn } from "../elements/Buttons";

const NotFound = () => {
  return (
    <Wrap>
      <Logo>RIBBORN</Logo>
      <Margin />
      <Content>페이지를 찾을 수가 없어요 😥</Content>
      <Margin />
      <Link to="/">
        <GobackBtn>메인으로 돌아가기</GobackBtn>
      </Link>
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: ${({ theme }) => theme.width.maxWidth};
  margin: 30px auto;
  text-align: center;
`;

const Logo = styled.span`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const Margin = styled.div`
  height: 90px;
`;

const Content = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 20px;
  @media screen and (min-width: 350px) {
    font-size: ${({ theme }) => theme.fontSizes.l};
    line-height: 27px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 32px;
    line-height: 45px;
  }
`;

const GobackBtn = styled(FixedSizeBlackBtn)`
  @media screen and (max-width: 350px) {
    padding: 25px 30px;
  }
`;

export default NotFound;
