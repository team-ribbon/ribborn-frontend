import styled from "styled-components";
import { FaqText, FaqCategories } from "../shared/FaqText";
import { SubBtn } from "../elements/Buttons";
import { useState } from "react";

const Faq = () => {
  const [category, setCategory] = useState("전체");
  const [selected, setSelected] = useState(null);
  return (
    <Wrap>
      <FaqWrap>
        <Title>자주 묻는 질문</Title>
        <BoldHR />
        <Category>
          {FaqCategories.map((v, i) => {
            return category === v ? (
              <SubBtnActive key={"subBtn" + i}>{v}</SubBtnActive>
            ) : (
              <NewSubBtn
                key={"subBtn" + i}
                onClick={() => {
                  setCategory(v);
                }}
              >
                {v}
              </NewSubBtn>
            );
          })}
        </Category>
        {FaqText.map((v, i) => {
          return category === "전체" || category === v.category ? (
            <FAQWrap>
              <TitleWrap
                onClick={() => {
                  selected === i ? setSelected(null) : setSelected(i);
                }}
              >
                <CategoryTitle>{v.category}</CategoryTitle>
                <FAQTitle>{v.question}</FAQTitle>
                <SVGDiv>
                  {selected === i ? (
                    <svg
                      width="15"
                      height="7"
                      viewBox="0 0 15 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.4443 6L7.04464 1L1.00047 6"
                        stroke="#AFB0B3"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="15"
                      height="7"
                      viewBox="0 0 15 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.4443 1L7.04464 6L1.00047 1"
                        stroke="#AFB0B3"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </SVGDiv>
              </TitleWrap>
              {selected === i ? (
                <FAQContent>{v.answer}</FAQContent>
              ) : (
                <Margin
                  onClick={() => {
                    selected === i ? setSelected(null) : setSelected(i);
                  }}
                />
              )}
            </FAQWrap>
          ) : null;
        })}
      </FaqWrap>
    </Wrap>
  );
};

const Wrap = styled.div``;

const FaqWrap = styled.div`
  max-width: 700px;
  margin: 40px 16px;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 40px auto;
  }
`;

const Title = styled.span`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  line-height: 36px;
`;

const BoldHR = styled.div`
  border-top: 3px solid #000000;
  margin: 16px 0;
`;

const Category = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 10px;
  margin-bottom: 50px;
  @media all and (min-width: 400px) {
    display: flex;
    justify-content: space-between;
  }
`;

const NewSubBtn = styled(SubBtn)`
  @media ${({ theme }) => theme.device.mobile} and (max-width: 900px) {
    padding: 20px 30px;
    font-size: ${({ theme }) => theme.fontSizes.l};
    border-radius: 25px;
  }
`;

const SubBtnActive = styled(NewSubBtn)`
  background-color: ${({ theme }) => theme.colors.black};
  color: #fff;
  border: none;
  &:hover {
    filter: none;
  }
`;

const FAQWrap = styled.div`
  border-top: 1px solid #afb0b3;
`;

const TitleWrap = styled.div`
  padding: 30px 0 16px 0;
  cursor: pointer;
`;

const CategoryTitle = styled.span`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
`;

const FAQTitle = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
  margin-left: 30px;
`;

const SVGDiv = styled.div`
  float: right;
  margin-right: 20px;
`;

const FAQContent = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.colors.lighterGray};
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 28px;
  color: rgba(34, 34, 34, 0.7);
`;

const Margin = styled.div`
  height: 14px;
  cursor: pointer;
`;

export default Faq;
