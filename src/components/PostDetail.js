import styled from "styled-components";

const PostDetail = () => {
  return (
    <CenterPostDiv>
      <Community>질문과 답변</Community>
      <Title>자켓 리폼하기</Title>
      <IDDiv>
        <ID>@내이름은라채채</ID>
        <CircleDiv />
        <Time>1시간 전</Time>
      </IDDiv>
      <TagDiv>
        <Category>옷 리폼</Category>
      </TagDiv>
      <Image
        alt="card"
        src="https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2021%2F10%2Fthe-reason-why-you-should-pay-attention-to-upcycling-clothes-03.jpg?q=90&w=1090&cbr=1&fit=max"
      />
      <TextArea>
        저는 블라블라 이런 내용이 들어가요 저는 블라블라 이런 내용이 들어가요
        저는 블라블라 이런 내용이 들어가요 저는 블라블라 이런 내용이 들어가요
        저는 블라블라 이런 내용이 들어가요 저는 블라블라 이런 내용이 들어가요
        저는 블라블라 이런 내용이 들어가요 저는 블라블라 이런 내용이 들어가요
        저는 블라블라 이런 내용이 들어가요 저는 블라블라 이런 내용이 들어가요
        저는 블라블라 이런 내용이 들어가요저는 블라블라 이런 내용이
        들어가요(본문 내용)
      </TextArea>
      <Image
        alt="card"
        src="https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2021%2F10%2Fthe-reason-why-you-should-pay-attention-to-upcycling-clothes-03.jpg?q=90&w=1090&cbr=1&fit=max"
      />
      <Image
        alt="card"
        src="https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2021%2F10%2Fthe-reason-why-you-should-pay-attention-to-upcycling-clothes-03.jpg?q=90&w=1090&cbr=1&fit=max"
      />
    </CenterPostDiv>
  );
};

const CenterPostDiv = styled.div`
  width: 700px;
  margin-left: calc(50vw - 350px);
`;

const Community = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #222222;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 27px;
  line-height: 36px;
  color: #222222;
`;

const IDDiv = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  align-items: center;
`;

const ID = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #afb0b3;
`;

const CircleDiv = styled.div`
  background-color: #afb0b3;
  width: 6px;
  height: 6px;
  border-radius: 6px;
`;

const Time = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #afb0b3;
`;

const TagDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const Category = styled.button`
  font-weight: 700;
  font-size: 11px;
  line-height: 14px;
  height: 29px;
  width: 77px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 8px;
  margin-top: 30px;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  margin: 50px auto;
`;

const TextArea = styled.div`
  border: none;
  width: 100%;
  height: auto;
  resize: none;
  overflow: hidden;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
`;

export default PostDetail;
