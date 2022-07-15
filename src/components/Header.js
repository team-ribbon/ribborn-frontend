import React from "react";
import { Link, useMatch } from "react-router-dom";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { clearUserInfo } from "../redux/modules/user";

const Header = () => {
  const isReview = useMatch("/review");
  const isQna = useMatch("/qna");
  const isReviewDetail = useMatch("/reviewdetail/:postId");
  const isQnaDetail = useMatch("/qnadetail/:postId");
  const isCommunity = isReview || isQna || isReviewDetail || isQnaDetail;
  const isLookbook1 = useMatch("/lookbook");
  const isLookbook2 = useMatch("lookbookdetail/:postId");
  const isLookbook = isLookbook1 || isLookbook2;
  const isReform1 = useMatch("/reform");
  const isReform2 = useMatch("reformdetail/:postId");
  const isReform = isReform1 || isReform2;

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <HeaderWrap>
      <NavWrap>
        <UserNav>
          {isLogin ? (
            <>
              <HeaderUserSpan>
                <Link to="/mypage">마이페이지</Link>
              </HeaderUserSpan>
              <HeaderUserSpan
                onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(clearUserInfo());
                }}
              >
                로그아웃
              </HeaderUserSpan>
            </>
          ) : (
            <>
              <HeaderUserSpan>
                <Link to="/signup">회원가입</Link>
              </HeaderUserSpan>
              <HeaderUserSpan>
                <Link to="/login">로그인</Link>
              </HeaderUserSpan>
            </>
          )}
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

const HeaderUserSpan = styled.span`
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  :hover {
    cursor: pointer;
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
