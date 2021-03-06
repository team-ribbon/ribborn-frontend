import { Link } from "react-router-dom";
import styled from "styled-components";

import { BlackBtn as Btn } from "../elements/Buttons";

const PostComplete = () => {
  return (
    <>
      <HelpWrap>
        <Emoji>ππ»</Emoji>
        <HelpText>κ²μλ¬Όμ΄ μ μμ μΌλ‘ λ°νλμμ΅λλ€!</HelpText>
        <Link to="/mypage">
          <BlackBtn>λ΄ κ²μλ¬Ό λ³΄λ¬κ°κΈ°</BlackBtn>
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
