import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const Signup = () => {
  return (
    <Wrap>
      <span>회원가입</span>
      <Link to={"/signup/user"}>일반 회원</Link>
      <Link to={"/signup/tech"}>디자이너 / 기술자</Link>
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
