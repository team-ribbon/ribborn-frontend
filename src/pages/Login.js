import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginDB } from "../redux/modules/user";
import { FixedSizeBlackBtn } from "../elements/Buttons";
import { HelpText, Input, InputTitle } from "../elements/Inputs";
import { useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = (loginObj) => {
    dispatch(loginDB(loginObj.username, loginObj.password)).then((result) => {
      if (!result) {
        setLoginError("이메일 또는 비밀번호를 잘못 입력했습니다.");
        return false;
      }
      navigate("/");
    });
  };
  return (
    <Wrap>
      <h1>
        <div>
          <Logo src={"/images/graphicLogo.png"} alt="ribborn" />
        </div>
      </h1>
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
        <HelpText>{errors?.password?.message || loginError}</HelpText>
        <ButtonWrap>
          <FixedSizeBlackBtn disabled={errors?.password && errors?.username}>
            로그인
          </FixedSizeBlackBtn>
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
  max-width: 600px;
  margin: 0 auto 150px auto;
  padding: 0 20px;
  h1 {
    text-align: center;
    margin: 90px 0 50px 0;
    @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobile}) {
      margin: 50px 0;
    }
  }
`;
const Logo = styled.img`
  width: 100%;
  max-width: 500px;
  border-radius: 25px;
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
