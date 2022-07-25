import React from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { VscBell } from "react-icons/vsc";
import { clearUserInfo } from "../redux/modules/user";
import HeaderModal from "./HeaderModal";

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
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.user);

  return (
    <HeaderWrap>
      <NavWrap>
        <UserNav>
          <HeaderBellDiv>
            <VscBell size="18" />
          </HeaderBellDiv>
          {isLogin ? (
            <HeaderUserSpan
              onClick={() => {
                navigate("/mypage");
              }}
            >
              {user.nickname}님의 마이페이지
            </HeaderUserSpan>
          ) : (
            <HeaderUserSpan
              onClick={() => {
                navigate("/login");
              }}
            >
              마이페이지
            </HeaderUserSpan>
          )}
          <HeaderUserSpan
            onClick={() => {
              isLogin ? navigate("/mypage") : navigate("/login");
            }}
          >
            관심 리폼
          </HeaderUserSpan>
          {isLogin ? (
            <HeaderUserSpan
              onClick={() => {
                localStorage.removeItem("token");
                dispatch(clearUserInfo());
              }}
            >
              로그아웃
            </HeaderUserSpan>
          ) : (
            <div>
              <HeaderUserSpan
                onClick={() => {
                  !isLogin && navigate("/signup");
                }}
              >
                회원가입
              </HeaderUserSpan>
              <HeaderUserSpan
                onClick={() => {
                  !isLogin && navigate("/login");
                }}
              >
                로그인
              </HeaderUserSpan>
            </div>
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
      <MobileWrap>
        <TopWrap>
          <Link to="/">RIBBORN</Link>
          <HeaderModal isLogin={isLogin} user={user} />
        </TopWrap>
        <BottomWrap>
          <Community isCommunity={isCommunity}>
            <Link to="/review">커뮤니티</Link>
          </Community>
          <Lookbook isLookbook={isLookbook}>
            <Link to="/lookbook">LOOKBOOK</Link>
          </Lookbook>
          <Reform isReform={isReform}>
            <Link to="/reform">견적</Link>
          </Reform>
        </BottomWrap>
      </MobileWrap>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.header`
  margin: 0 auto;
  position: fixed;
  width: 100%;
  z-index: 10;
  background-color: #fff;
  @media ${({ theme }) => theme.device.mobile} {
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  }
`;

const UserNav = styled.nav`
  max-width: ${({ theme }) => theme.width.maxWidth};
  margin: 10px auto;
  padding: 0 40px;
  display: flex;
  flex-direction: row;
  justify-content: right;
`;

const NavWrap = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  padding: 8px 0 6px 0;
  text-align: end;
  display: none;
  font-size: ${({ theme }) => theme.fontSizes.s};
  span {
    margin-left: 24px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    display: inherit;
  }
`;

const HeaderUserSpan = styled.span`
  margin-top: 2px;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.s};
  line-height: 14px;
  :hover {
    cursor: pointer;
  }
`;

const HeaderBellDiv = styled.div``;

const CategoryNav = styled.nav`
  max-width: ${({ theme }) => theme.width.maxWidth};
  margin: 0 auto;
  padding: 30px 40px;
  display: none;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSizes.l};
  span {
    margin-left: 40px;
    padding-bottom: 7px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
  }
`;
const Active = css`
  border-bottom: 2px solid ${({ theme }) => theme.colors.black};
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

const MobileWrap = styled.div`
  padding: 54px 0 0 0;
  margin-bottom: 10px;
  span {
    padding-bottom: 7px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const TopWrap = styled.div`
  padding: 0 16px 10px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

const BottomWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 15px;
`;

export default Header;
