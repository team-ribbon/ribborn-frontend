import { useEffect, useRef } from "react";
import styled from "styled-components";

const RuleModal = ({ isModalOn, setIsModalOn, title, content }) => {
  const outsideRef = useRef();
  const closeModal = () => {
    setIsModalOn(false);
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
  }, [isModalOn, setIsModalOn]);

  return (
    <Dim isModalOn={isModalOn}>
      <ModalCover ref={outsideRef}>
        <ModalButton onClick={closeModal}>
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 1L1 16M16 16L1 1" stroke="#222222" />
          </svg>
        </ModalButton>
        <Title>{title}</Title>
        <TextArea value={content} disabled></TextArea>
      </ModalCover>
    </Dim>
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
const ModalCover = styled.div`
  z-index: 101;
  max-width: 700px;
  width: calc(100% - 40px);
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 15px;
  padding: 30px 20px;
`;

const ModalButton = styled.span`
  float: right;
  cursor: pointer;
`;

const Title = styled.div`
  text-align: center;
  font-weight: 700;
  margin-bottom: 50px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const TextArea = styled.textarea`
  width: 90%;
  height: calc(100% - 90px);
  margin: 10px auto 0px 5%;
  border: none;
  resize: none;
  &:disabled {
    background-color: #fff;
    color: ${({ theme }) => theme.colors.black};
  }
`;

export default RuleModal;
