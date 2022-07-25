import { Link } from "react-router-dom";
import styled from "styled-components";

import { BlackBtn as Btn } from "../elements/Buttons";

const PostComplete = () => {
  return (
    <>
      <HelpWrap>
        <Emoji>👏🏻</Emoji>
        <HelpText>게시물이 정상적으로 발행되었습니다!</HelpText>
        <Link to="/mypage">
          <BlackBtn>내 게시물 보러가기</BlackBtn>
        </Link>
      </HelpWrap>
    </>
  );
};
const HelpWrap = styled.div`
  text-align: center;
  margin: 100px 0 50px 0;
`;
const Emoji = styled.div`
  width: 130px;
  height: 130px;
  font-size: 50px;
  border-radius: 15px;
  line-height: 130px;
  margin: 0 auto 24px auto;
  background-color: ${({ theme }) => theme.colors.lighterGray}; ;
`;
const HelpText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.l};
  margin-bottom: 50px;
`;
const BlackBtn = styled(Btn)`
  margin: 0 auto 40px auto;
`;
export default PostComplete;
