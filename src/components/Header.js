import React from "react";
import { Link, useMatch } from "react-router-dom";
import styled, { css } from "styled-components";

const Header = () => {
  const isReview = useMatch("/review");
  const isQna = useMatch("/qna");
  const isCommunity = isReview || isQna;
  const isLookbook = useMatch("/lookbook");
  const isReform = useMatch("/reform");

  return (
    <HeaderWrap>
      <NavWrap>
        <UserNav>
          <span>
            <Link to="/mypage">마이페이지</Link>
          </span>
          <span>
            <Link to="/signup">회원가입</Link>
          </span>
          <span>
            <Link to="/login">로그인</Link>
          </span>
        </UserNav>
      </NavWrap>
      <CategoryNav>
        <Link to="/">🌈로고✨</Link>
        <div>
          <Community isCommunity={isCommunity}>
            <Link to="/review">커뮤니티</Link>
          </Community>
          <Lookbook isLookbook={isLookbook}>
            <Link to="/lookbook">LOOKBOOK</Link>
          </Lookbook>
          <Reform isReform={isReform}>
            <Link to="/reform">견적</Link>
          </Reform>
        </div>
      </CategoryNav>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.header`
  margin: 0 auto;
  position: fixed;
  width: 100%;
  z-index: 10;
  background-color: #fff;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

const UserNav = styled.nav`
  max-width: ${({ theme }) => theme.width.maxWidth};
  margin: 10px auto;
  padding: 0 40px;
`;

const NavWrap = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  padding: 8px 0;
  text-align: end;
  font-size: ${({ theme }) => theme.fontSizes.s};
  span {
    margin-left: 24px;
  }
`;

const CategoryNav = styled.nav`
  max-width: ${({ theme }) => theme.width.maxWidth};
  margin: 0 auto;
  padding: 30px 40px;
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSizes.l};
  span {
    margin-left: 40px;
    padding-bottom: 7px;
  }
`;
const Active = css`
  border-bottom: 2px solid black;
  font-weight: 700;
`;
const Community = styled.span`
  ${({ isCommunity }) => isCommunity && Active}
`;
const Lookbook = styled.span`
  ${({ isLookbook }) => isLookbook && Active}
`;
const Reform = styled.span`
  ${({ isReform }) => isReform && Active}
`;

export default Header;
