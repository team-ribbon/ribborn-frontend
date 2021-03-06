import { forwardRef, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BlackBtn as Btn } from "../elements/Buttons";

import { XSVG } from "../elements/SVG";

// 공통 > 얼럿 모달
const AlertModal = forwardRef(
  (
    {
      title,
      content,
      leftButton,
      rightButton,
      leftLink,
      rightLink,
      setIsModalOn,
      isModalOn,
    },
    ref
  ) => {
    const outsideRef = useRef();
    const navigate = useNavigate();

    const onClickLeft = () => {
      setIsModalOn(false);
      if (leftLink) {
        navigate(leftLink);
      }
    };

    const onClickRight = () => {
      if (ref) ref.current = true;
      setIsModalOn(false);
      if (rightLink) navigate(rightLink);
    };

    useEffect(() => {
      document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      };
    }, []);

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
      <FloatWrap>
        <Dim />
        <Wrap ref={outsideRef}>
          <Title>{title}</Title>
          <CloseBtn onClick={() => setIsModalOn(false)}>
            <XSVG />
          </CloseBtn>
          {content && <Content>{content}</Content>}
          <Buttons>
            {leftButton && (
              <BlackBtn onClick={onClickLeft}>{leftButton}</BlackBtn>
            )}
            {rightButton && (
              <BlackBtn onClick={onClickRight}>{rightButton}</BlackBtn>
            )}
          </Buttons>
        </Wrap>
      </FloatWrap>
    );
  }
);
const FloatWrap = styled.div`
  z-index: 100;
`;
const Dim = styled.div`
  box-sizing: border-box;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
`;
const Wrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90%;
  height: 90%;
  max-width: 700px;
  max-height: 375px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 25px;
  padding: 45px 30px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 375px) {
    padding: 45px 20px 20px 20px;
  }
`;
const Title = styled.div`
  margin-bottom: 30px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  text-align: start;
`;
const Content = styled.div`
  text-align: start;
  font-size: ${({ theme }) => theme.fontSizes.l};
`;
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  width: fit-content;
  margin-top: auto;
  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobile}) {
    gap: 10px;
  }
`;
const BlackBtn = styled(Btn)`
  /* width: 220px; */
  padding: 25px 45px;
  margin-top: 10px;
  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobile}) {
    padding: 20px 30px;
    width: fit-content;
    margin: 0 auto;
  }
`;
const CloseBtn = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
`;

export default AlertModal;
