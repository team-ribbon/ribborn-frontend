import styled from "styled-components";

const UserInfoCard = ({ myPage, nickname }) => {
  return (
    <CardDiv>
      <IdText>ID</IdText> <br />
      <IdText>{nickname}</IdText>
      <BookmarkDiv>
        <BookmarkP>관심</BookmarkP>
        <BookmarkP>88</BookmarkP>
      </BookmarkDiv>
      {myPage ? <Button>수정하기</Button> : <Button>채팅하기</Button>}
    </CardDiv>
  );
};

const CardDiv = styled.div`
  border: 1px solid #ccc;
  width: 200px;
  height: 250px;
`;

const IdText = styled.p`
  margin: 5px auto 0px 20px;
`;

const BookmarkDiv = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const BookmarkP = styled.p`
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  margin: 20px auto 0px calc(50% - 50px);
`;

export default UserInfoCard;
