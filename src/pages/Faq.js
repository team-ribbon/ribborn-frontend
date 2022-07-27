import styled from "styled-components";

const Faq = () => {
  return (
    <Wrap>
      <FaqWrap>
        <Title>자주 묻는 질문</Title>
        <BoldHR />
      </FaqWrap>
    </Wrap>
  );
};

const Wrap = styled.div``;

const FaqWrap = styled.div`
  max-width: 700px;
  margin: 40px auto;
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

const HR = styled.div`
  border-top: 1px solid #afb0b3;
`;

export default Faq;
