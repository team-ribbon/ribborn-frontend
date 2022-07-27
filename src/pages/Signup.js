import React from "react";
import { Link, Outlet, useMatch } from "react-router-dom";
import styled from "styled-components";
import { FixedSizeSubBtn, SubBtnActive } from "../elements/Buttons";

const Signup = () => {
  const isMain = useMatch("/signup");
  const isUser = useMatch("/signup/user");
  const isTech = useMatch("/signup/tech");

  return (
    <Wrap>
      <h1>회원가입</h1>
      <Link to={"/signup/user"}>
        <TypeBtn isUser={isUser}>일반 회원</TypeBtn>
      </Link>
      <Link to={"/signup/tech"}>
        <TypeBtn isTech={isTech}>디자이너/기술자</TypeBtn>
      </Link>
      {isMain && (
        <HelpWrap>
          <Eye>👀</Eye>
          <HelpText>어떤 회원이신가요? 회원 종류를 선택해주세요!</HelpText>
        </HelpWrap>
      )}
      {isTech && (
        <HelpWrap>
          <Eye>🚧</Eye>
          <HelpText>
            디자이너/기술자 회원가입은 준비 중입니다.
            <br />
            계정 생성은 이메일을 통해 문의해주세요.
            <br />
            <p>ribborn.kr@gmail.com</p>
          </HelpText>
        </HelpWrap>
      )}
      <Outlet />
    </Wrap>
  );
};
const Wrap = styled.div`
  max-width: 740px;
  margin: 0 auto 150px auto;
  padding: 0 20px;
  h1 {
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: 700;
    margin: 90px 0 50px 0;
  }
`;
const TypeBtn = styled(FixedSizeSubBtn)`
  ${(props) => props?.isUser && SubBtnActive}
  ${(props) => props?.isTech && SubBtnActive}
  margin-right: 25px;
  margin-bottom: 20px;
`;
const HelpWrap = styled.div`
  text-align: center;
  margin: 50px 0 400px 0;
`;
const Eye = styled.div`
  width: 130px;
  height: 130px;
  font-size: 50px;
  border-radius: 15px;
  line-height: 130px;
  margin: 0 auto 24px auto;
  background-color: ${({ theme }) => theme.colors.lighterGray}; ;
`;
const HelpText = styled.div`
  line-height: 1.5;
  font-size: ${({ theme }) => theme.fontSizes.l};
  p {
    margin-top: 20px;
    text-decoration: underline;
  }
`;
export default Signup;
