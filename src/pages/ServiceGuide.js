import { Link } from "react-router-dom";
import styled from "styled-components";
import { MainBtn } from "../elements/Buttons";

const ServiceGuide = () => {
  return (
    <Main>
      <div>
        <img
          src="https://marketkurly-imageupload.s3.ap-northeast-2.amazonaws.com/%EC%9D%B4%EB%B2%A4%ED%8A%B8%EC%9D%B4%EB%AF%B8%EC%A7%80.png"
          alt="guide"
        />
        <p>이제 리본 이용하러 가볼까요?</p>
        <p>👇🏻 👇🏻 👇🏻</p>
        <div>
          <Link to="/">
            <MainBtn>리본 둘러보기</MainBtn>
          </Link>
        </div>
      </div>
    </Main>
  );
};

const Main = styled.main`
  margin: 0 auto;
  text-align: center;
  max-width: 700px;

  img {
    width: 100%;
    margin-bottom: 50px;
  }
  p {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: 600;
    margin-top: 20px;
  }
  button {
    margin: 30px 0;
  }
`;

export default ServiceGuide;
