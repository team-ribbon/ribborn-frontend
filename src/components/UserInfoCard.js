import styled from "styled-components";
import { BsBookmark } from "react-icons/bs";
import { MainBtn } from "../elements/Buttons";

const UserInfoCard = ({ myPage, user, change }) => {
  return user ? (
    <div>
      <CardDiv userType={user.userType}>
        <TitleText top={true}>☘️ 아이디</TitleText>
        <ContentText>@{user.nickname}</ContentText>
        {user.userType === 1 ? (
          <div>
            <TitleText>📍 스튜디오 위치</TitleText>
            <ContentText>{user.addressDetail}</ContentText>
            <TitleText>사업자번호</TitleText>
            <ContentText>{user.companyNum}</ContentText>
          </div>
        ) : null}
        {/* <BookmarkDiv>
          <BsBookmark size="24" />
          <TitleText top={true}>관심</TitleText>
          <ContentText>88</ContentText>
        </BookmarkDiv> */}
      </CardDiv>
      {myPage ? (
        <ModifyBtn
          onClick={() => {
            change(true);
          }}
        >
          수정하기
        </ModifyBtn>
      ) : (
        <ChatBtn>채팅하기</ChatBtn>
      )}
    </div>
  ) : null;
};

const CardDiv = styled.div`
  background: #fafafa;
  border-radius: 8px;
  width: 314px;
  height: fit-content;
  text-align: center;
  padding: ${(props) =>
    props.userType === 1 ? "17px 0 19px 0" : "30px 0 40px 0"};
`;

const TitleText = styled.p`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 18px;
  color: #afb0b3;
  margin-top: ${(props) => (props.top ? "10px" : "30px")};
`;

const ContentText = styled.p`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
  margin-top: 10px;
`;

const BookmarkDiv = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const ChatBtn = styled(MainBtn)`
  width: 100%;
  margin-top: 20px;
`;

const ModifyBtn = styled.button`
  width: 100%;
  margin-top: 20px;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 18px;
  border-radius: 15px;
  padding: 25px 60px;
  border: 1px solid #afb0b3;
  background-color: ${({ theme }) => theme.colors.lighterGray};
`;

export default UserInfoCard;
