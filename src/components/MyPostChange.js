import styled from "styled-components";

const MyPostChange = () => {
  return (
    <ChangeDiv>
      <Button>수정</Button>
      <Button>삭제</Button>
    </ChangeDiv>
  );
};

const ChangeDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #ddd;
  border: none;
  margin: 20px 50px;
  width: 200px;
  height: 60px;
  :hover {
    cursor: pointer;
  }
`;

export default MyPostChange;
