import React from "react";
import { Link, Outlet, useMatch } from "react-router-dom";
import styled from "styled-components";

const Signup = () => {
  const match = useMatch("/signup");
  return (
    <Wrap>
      <span>회원가입</span>
      <Link to={"/signup/user"}>일반 회원</Link>
      <Link to={"/signup/tech"}>디자이너 / 기술자</Link>
      {match && <span>회원가입 유형을 선택하세요.</span>}
      <Outlet />
    </Wrap>
  );
};
const Wrap = styled.div`
  width: 400px;
  margin: 50px auto;
  span {
    display: block;
  }
`;
export default Signup;
