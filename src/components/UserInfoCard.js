import styled from "styled-components";

const UserInfoCard = ({ myPage, user, change }) => {
  return user ? (
    <CardDiv>
      <TitleText>ID</TitleText>
      <ContentText>{user.nickname}</ContentText>
      {user.userType === 1 ? (
        <>
          <TitleText>위치</TitleText>
          <ContentText>{user.addressDetail}</ContentText>
          <TitleText>사업자번호</TitleText>
          <ContentText>{user.companyNum}</ContentText>
        </>
      ) : null}
      <BookmarkDiv>
        <BookmarkP>관심</BookmarkP>
        <BookmarkP>88</BookmarkP>
      </BookmarkDiv>
      {myPage ? (
        <Button
          onClick={() => {
            change(true);
          }}
        >
          수정하기
        </Button>
      ) : (
        <Button>채팅하기</Button>
      )}
    </CardDiv>
  ) : null;
};

const CardDiv = styled.div`
  border: 1px solid #ccc;
  width: 200px;
  height: 250px;
`;

const TitleText = styled.p`
  margin: 5px auto 10px 20px;
`;

const ContentText = styled.p`
  margin: 5px auto 20px 20px;
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
