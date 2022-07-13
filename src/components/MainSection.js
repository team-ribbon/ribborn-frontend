import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CardA from "./CardA";
import CardB from "./CardB";

// 메인 > 기본 섹션
const MainSection = ({ type, title, url, postList }) => {
  const navigate = useNavigate();
  return (
    <section>
      <Header>
        <Title>{title}</Title>
        <More
          onClick={() => {
            type === "A" ? navigate("/review") : navigate("/reform");
          }}
        >
          더보기
        </More>
      </Header>
      <Grid type={type}>
        {type === "C"
          ? postList.map((postObj) => {
              return <CardA postObj={postObj} key={postObj.id} reform={true} />;
            })
          : postList.map((postObj) => {
              return <CardA postObj={postObj} key={postObj.id} type={type} />;
            })}
      </Grid>
      {url ? <Link to={url}></Link> : null}
    </section>
  );
};

const Grid = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: ${({ type }) =>
    type === "B"
      ? "repeat(auto-fill, minmax(650px, 1fr))"
      : "repeat(auto-fill, minmax(330px, 1fr))"};
  margin: 20px 0 50px 0;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;
const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  margin-bottom: 30px;
`;
const More = styled.div`
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.fontSizes.l};
  font-weight: 700;
  cursor: pointer;
`;

export default MainSection;
