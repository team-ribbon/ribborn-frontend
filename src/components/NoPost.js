import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BlackBtn } from "../elements/Buttons";

const NoPost = ({ category }) => {
  const navigate = useNavigate();
  const text = [
    {
      category: "review",
      text: "아직 후기를 쓴 적이 없어요!",
      button: "첫번째 후기 쓰기",
      link: "/review",
    },
    {
      category: "qna",
      text: "아직 질문과 답변에 글을 쓴 적이 없어요!",
      button: "첫번째 질문 쓰기",
      link: "/qna",
    },
    {
      category: "reform",
      text: "아직 견적을 낸 적이 없어요!",
      button: "첫번째 후기 쓰기",
      link: "/reform",
    },
    {
      category: "lookbook",
      text: "아직 룩북을 쓴 적이 없어요!",
      button: "첫번째 룩북 쓰기",
      link: "/lookbook",
    },
  ];

  return (
    <Cover>
      {text.map((v) => {
        return v.category === category ? <Text>{v.text}</Text> : null;
      })}
      {text.map((v) => {
        return v.category === category ? (
          <Button
            key={"nopostBtn" + v.link}
            onClick={() => {
              navigate(v.link);
            }}
          >
            {v.button}
          </Button>
        ) : null;
      })}
    </Cover>
  );
};

const Cover = styled.div``;

const Text = styled.p`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
  font-weight: bold;
  margin: 30px 0 20px 0;
  color: ${({ theme }) => theme.colors.gray};
`;

const Button = styled(BlackBtn)`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 18px;
  padding: 20px 30px;
`;

export default NoPost;
