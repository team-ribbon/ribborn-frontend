import styled from "styled-components";
import { Link } from "react-router-dom";

const TabWrap = ({ review }) => {
  return (
    <TabWrapCover>
      <Link to="/review">
        {review ? <ActiveTab>리폼 리뷰</ActiveTab> : <Tab>리폼 리뷰</Tab>}
      </Link>
      <Link to="/qna">
        {review ? <Tab>질문과 답변</Tab> : <ActiveTab>질문과 답변</ActiveTab>}
      </Link>
    </TabWrapCover>
  );
};

const TabWrapCover = styled.div`
  text-align: center;
  margin: 40px 0;
`;

const Tab = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.m};
  padding-bottom: 5px;
  margin: 0 10px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin: 0 25px;
  }
`;

const ActiveTab = styled(Tab)`
  border-bottom: 2px solid ${({ theme }) => theme.colors.black};
  font-weight: 700;
  padding-bottom: 3px;
  @media ${({ theme }) => theme.device.mobile} {
    padding-bottom: 7px;
  }
`;

export default TabWrap;
