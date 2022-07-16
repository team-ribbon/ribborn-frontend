import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const Sort = ({ setSort, sort }) => {
  const [isModalOn, setIsModalOn] = useState(false);
  const outsideRef = useRef();

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
    <Wrap ref={outsideRef}>
      <ButtonWrap onClick={() => setIsModalOn((prev) => !prev)}>
        <svg
          width="36"
          height="23"
          viewBox="0 0 36 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 22C7 22.5523 7.44772 23 8 23C8.55228 23 9 22.5523 9 22L7 22ZM8.70711 0.292892C8.31658 -0.0976315 7.68342 -0.0976314 7.29289 0.292892L0.928932 6.65685C0.538407 7.04738 0.538407 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292892ZM9 22L9 1L7 1L7 22L9 22Z"
            fill="black"
          />
          <path
            d="M27 1C27 0.447715 27.4477 -1.68532e-08 28 0C28.5523 1.68532e-08 29 0.447715 29 1L27 1ZM28.7071 22.7071C28.3166 23.0976 27.6834 23.0976 27.2929 22.7071L20.9289 16.3431C20.5384 15.9526 20.5384 15.3195 20.9289 14.9289C21.3195 14.5384 21.9526 14.5384 22.3431 14.9289L28 20.5858L33.6569 14.9289C34.0474 14.5384 34.6805 14.5384 35.0711 14.9289C35.4616 15.3195 35.4616 15.9526 35.0711 16.3431L28.7071 22.7071ZM29 1L29 22L27 22L27 1L29 1Z"
            fill="black"
          />
        </svg>
        <Text>{sort === "likeCount" ? "인기순" : "최신순"}</Text>
      </ButtonWrap>
      {isModalOn && (
        <>
          <Modal>
            <span
              onClick={() => {
                setSort("likeCount");
                setIsModalOn(false);
              }}
            >
              인기순
            </span>
            <span
              onClick={() => {
                setSort("createAt");
                setIsModalOn(false);
              }}
            >
              최신순
            </span>
          </Modal>
        </>
      )}
    </Wrap>
  );
};
const Wrap = styled.div`
  position: relative;
  margin-left: auto;
`;

const ButtonWrap = styled.div`
  display: flex;
  cursor: pointer;
`;
const Text = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.l};
  margin-left: 20px;
  padding-top: 4px;
`;
const Modal = styled.div`
  position: absolute;
  height: 170px;
  width: 170px;
  right: -25px;
  margin-top: 15px;
  z-index: 1;
  background: #ffffff;
  box-shadow: 3px 4px 11px rgba(0, 0, 0, 0.14);
  border-radius: 11px;

  display: flex;
  flex-direction: column;
  span {
    font-size: ${({ theme }) => theme.fontSizes.l};
    margin: 40px 0 0 30px;
    cursor: pointer;
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
export default Sort;
