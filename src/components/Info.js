import styled from "styled-components";

import InfoText from "../shared/InfoText";

const Info = (props) => {
  const CloseModal = () => {
    props.modal(false);
  };
  return (
    <ModalCover>
      <ModalButton onClick={CloseModal}>X</ModalButton>
      <TitleSpan>개인정보 수집 및 이용 안내</TitleSpan>
      <TextArea value={InfoText} disabled></TextArea>
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

export default Info;
