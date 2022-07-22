import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { clearUserInfo } from "../redux/modules/user";

const HeaderModal = ({ isLogin, user }) => {
  const [isModalOn, setIsModalOn] = useState(false);
  const outsideRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const clickOutside = (e) => {
      if (
        isModalOn &&
        outsideRef.current &&
        !outsideRef.current.contains(e.target)
      ) {
        setIsModalOn(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isModalOn]);

  return (
    <Wrap>
      <ButtonWrap onClick={() => setIsModalOn(true)}>
        <HRs />
        <HRs />
        <HRs />
      </ButtonWrap>
      {isModalOn && (
        <Dim isModalOn={isModalOn}>
          <Modal ref={outsideRef}>
            <XDiv>
              <GrClose
                size="15"
                onClick={() => {
                  setIsModalOn(false);
                }}
              >
                X
              </GrClose>
            </XDiv>
            <span
              onClick={() => {
                setIsModalOn(false);
              }}
            >
              알림
            </span>
            <HR />
            {isLogin ? (
              <span
                onClick={() => {
                  setIsModalOn(false);
                }}
              >
                <Link to="/mypage">{user.nickname}님의 마이페이지</Link>
              </span>
            ) : (
              <span
                onClick={() => {
                  setIsModalOn(false);
                }}
              >
                <Link to="/login">마이페이지</Link>
              </span>
            )}
            <HR />
            <span
              onClick={() => {
                setIsModalOn(false);
                isLogin ? navigate("/userpage") : navigate("/login");
              }}
            >
              관심 리폼
            </span>
            <HR />
            {isLogin ? (
              <span
                onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(clearUserInfo());
                  setIsModalOn(false);
                }}
              >
                로그아웃
              </span>
            ) : (
              <div>
                <span
                  onClick={() => {
                    setIsModalOn(false);
                  }}
                >
                  <Link to="/signup">회원가입</Link>
                </span>
                <span
                  onClick={() => {
                    setIsModalOn(false);
                  }}
                >
                  <HR />
                  <Link to="/login">로그인</Link>
                </span>
              </div>
            )}
          </Modal>
        </Dim>
      )}
    </Wrap>
  );
};

const Dim = styled.div`
  z-index: 100;
  box-sizing: border-box;
  display: ${({ isModalOn }) => (isModalOn ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Wrap = styled.div`
  float: right;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 16px;
  height: 14px;
  cursor: pointer;
`;
const HRs = styled.div`
  width: 16px;
  height: 7px;
  border-top: 1px solid #222;
`;
const Modal = styled.div`
  position: fixed;
  height: 100vh;
  width: 64vw;
  right: 0px;
  top: 0px;
  z-index: 2;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  span {
    font-size: ${({ theme }) => theme.fontSizes.m};
    line-height: 18px;
    cursor: pointer;
    margin-left: 16px;
    display: block;
    word-break: keep-all;
  }

  /* &::after {
    content: "";
    position: absolute;
    right: 50px;
    margin-top: -25px;
    border-top: 30px solid none;
    border-bottom: 25px solid red;
    border-right: 30px solid transparent;
    border-left: 30px solid transparent;
    box-shadow: 2px -2px 2px 0 rgba(178, 178, 178, 0.14);
  } */
`;

const XDiv = styled.div`
  margin: 46px 16px 97px auto;
`;

const HR = styled.div`
  margin: 15px 0;
  border-top: 1px solid #ececec;
`;
export default HeaderModal;
