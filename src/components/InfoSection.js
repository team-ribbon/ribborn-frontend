import styled from "styled-components";
import Regions from "../shared/Regions";
import Categories from "../shared/Categories";

const InfoSection = ({ reform, region, category }) => {
  return (
    <InfoDiv reform={reform}>
      <TopInfoDiv>
        <ReformCategoryDiv>
          <InfoTitleSpan>✂️ 리폼 종류</InfoTitleSpan>
          {Categories.map((w) => {
            return w.value === category ? (
              <InfoContentSpan key={"detailCategory" + w.value}>
                {w.text}
              </InfoContentSpan>
            ) : null;
          })}
        </ReformCategoryDiv>
        <VerticalLineDiv />
        <LocationDiv>
          <InfoTitleSpan>
            {reform ? "📍 의뢰 위치" : "📍 스튜디오 위치"}
          </InfoTitleSpan>
          {reform ? (
            Regions.map((w) => {
              return w.value === region ? (
                <InfoContentSpan key={"detailRegion" + w.value}>
                  {w.text}
                </InfoContentSpan>
              ) : null;
            })
          ) : (
            <InfoContentSpan>{region}</InfoContentSpan>
          )}
        </LocationDiv>
      </TopInfoDiv>
      {reform ? (
        <BottomInfoDiv>
          <ChattingCountTitle>🤓️ 채팅중인 디자이너</ChattingCountTitle>
          <ChattingCount>+ 0명</ChattingCount>
        </BottomInfoDiv>
      ) : null}
    </InfoDiv>
  );
};

const InfoDiv = styled.div`
  width: 314px;
  height: ${(props) => (props.reform ? "154px" : "102px")};
  background: #fafafa;
  border-radius: 8px;
  margin: ${(props) =>
    props.reform ? "48px 16px auto 0" : "48px 0 auto 16px"};
`;

const TopInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const InfoTitleSpan = styled.span`
  color: #afb0b3;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.s};
  line-height: 14px;
`;

const InfoContentSpan = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 18px;
  margin-top: 8px;
`;

const ReformCategoryDiv = styled.div`
  margin: 27px 30px auto 51px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const VerticalLineDiv = styled.div`
  margin-top: 27px;
  border-left: 1px solid #f2f2f2;
  border-bottom: none;
  border-top: none;
  border-right: none;
  height: 48px;
`;

const LocationDiv = styled.div`
  margin: 27px 51px auto 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const ChattingCountTitle = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 18px;
  margin: 32px 20px auto 0;
`;

const ChattingCount = styled.span`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
  margin-top: 26px;
`;

const BottomInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export default InfoSection;
