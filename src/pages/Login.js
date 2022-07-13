import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginDB } from "../redux/modules/user";
import { BlackBtn } from "../elements/Buttons";
import { HelpText, Input, InputTitle } from "../elements/Inputs";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onValid = (loginObj) => {
    dispatch(loginDB(loginObj.username, loginObj.password)).then((result) => {
      if (!result) {
        console.log(result);
        setError("password", {
          message: "이메일 또는 비밀번호를 잘못 입력했습니다.",
        });
        return false;
      }
      navigate("/");
    });
    console.log(loginObj);
  };
  return (
    <Wrap>
      <h1>RIBBORN</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <InputTitle>이메일 주소</InputTitle>
        <Input
          {...register("username", {
            required: "이메일을 입력해주세요.",
          })}
          invalid={errors?.username?.message}
          autoComplete="off"
          placeholder="ribborn@ribborn.co.kr"
        />
        <HelpText> {errors?.username?.message}</HelpText>
        <InputTitle>비밀번호 입력</InputTitle>
        <Input
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
          })}
          invalid={errors?.password?.message}
          type="password"
        />
        <HelpText>{errors?.password?.message}</HelpText>
        <ButtonWrap>
          <BlackBtn disabled={errors?.password || errors?.username}>
            로그인
          </BlackBtn>
        </ButtonWrap>
      </form>
      <ButtonWrap>
        <Link to="/signup">
          <TextBtn>회원가입</TextBtn>
        </Link>
      </ButtonWrap>
    </Wrap>
  );
};
const Wrap = styled.div`
  max-width: 700px;
  margin: 0 auto 150px auto;
  h1 {
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: 700;
    margin: 90px 0;
  }
`;
const TextBtn = styled.div`
  margin-top: 50px;
  font-size: ${({ theme }) => theme.fontSizes.l};
`;
const ButtonWrap = styled.div`
  margin: 0 auto;
  width: fit-content;
`;
export default Login;
