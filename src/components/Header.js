import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const Header = () => {
  return (
    <HeaderWrap>
      <NavWrap>
        <UserNav>
          <Link to="/mypage">
            <span>마이페이지</span>
          </Link>
          <Link to="/login">
            <span>로그인</span>
          </Link>
          <Link to="/signup/user">
            <span>회원가입</span>
          </Link>
        </UserNav>
      </NavWrap>
      <CategoryNav>
        <Link to="/">로고예정</Link>

        <div>
          <Link to="/knowhow">
            <span>커뮤니티</span>
          </Link>
          <Link to="">
            <span>LOOKBOOK</span>
          </Link>
          <Link to="">
            <span>견적</span>
          </Link>
          <Link to="">
            <span>후기</span>
          </Link>
          <Link to="">
            <span>알림</span>
          </Link>
        </div>
      </CategoryNav>
    </HeaderWrap>
  );
};

const MaxWidth = css`
  max-width: 1256px;
`;

const HeaderWrap = styled.header`
  border-bottom: 1px solid #ddd;
  span {
    margin: 0 10px;
  }
`;

const UserNav = styled.nav`
  ${MaxWidth}
  margin: auto;
  padding: 0 20px;
`;

const NavWrap = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 20px 0;
  text-align: end;
`;

const CategoryNav = styled.nav`
  ${MaxWidth}
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

export default Header;
