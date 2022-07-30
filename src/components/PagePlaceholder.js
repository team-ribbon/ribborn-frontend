import styled from "styled-components";

const PagePlaceholder = ({ emoji, content }) => {
  return (
    <Wrap>
      <Emoji>{emoji}</Emoji>
      <Content>{content}</Content>
    </Wrap>
  );
};
const Wrap = styled.div`
  text-align: center;
  margin: 50px 0 200px 0;
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
const Content = styled.div`
  line-height: 1.5;
  font-size: ${({ theme }) => theme.fontSizes.l};
  p {
    margin-top: 20px;
    text-decoration: underline;
  }
`;
export default PagePlaceholder;
