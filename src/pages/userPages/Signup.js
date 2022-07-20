import React from "react";
import { Link, Outlet, useMatch } from "react-router-dom";
import styled from "styled-components";

import { SubBtn, SubBtnActive } from "../../elements/Buttons";

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
      <Outlet />
    </Wrap>
  );
};
const Wrap = styled.div`
  max-width: 700px;
  margin: 0 auto 150px auto;
  h1 {
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: 700;
    margin: 90px 0 50px 0;
  }
`;
const TypeBtn = styled(SubBtn)`
  ${(props) => props?.isUser && SubBtnActive}
  ${(props) => props?.isTech && SubBtnActive}
  margin-right: 25px;
`;
const HelpWrap = styled.div`
  text-align: center;
  margin: 70px 0 400px 0;
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
  font-size: ${({ theme }) => theme.fontSizes.l};
`;
export default Signup;
