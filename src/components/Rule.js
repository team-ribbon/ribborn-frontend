import styled from "styled-components";

import RuleText from "../shared/RuleText";

const Rule = (props) => {
  const CloseModal = () => {
    props.modal(false);
  };
  return (
    <ModalCover>
      <ModalButton onClick={CloseModal}>X</ModalButton>
      <TitleSpan>이용약관</TitleSpan>
      <TextArea value={RuleText} disabled></TextArea>
    </ModalCover>
  );
};

const ModalCover = styled.div`
  width: 50vw;
  height: 80vh;
  z-index: 11;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid black;
  background-color: white;
`;

const ModalButton = styled.button`
  float: right;
`;

const TitleSpan = styled.span`
  text-align: center;
`;

const TextArea = styled.textarea`
  overflow-y: auto;
  width: 90%;
  height: calc(100% - 40px);
  margin: 10px auto 0px 5%;
  border: none;
`;

export default Rule;
