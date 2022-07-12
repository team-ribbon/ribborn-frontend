import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BlackBtn } from "../elements/Buttons";
import { HelpText, Input, InputTitle } from "../elements/Inputs";

import { signupDB, usernameCheckDB } from "../redux/modules/user";
import SignupAgree from "./SignupAgree";

// 일반 유저 회원가입
const SignupUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkRef = useRef(false);
  const [agreeError, setAgreeError] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onValid = (data) => {
    if (data.password !== data.password2) {
      setError(
        "password2",
        { message: "동일한 비밀번호를 입력해주세요." },
        { shouldFocus: true }
      );
      return false;
    }
    if (!checkRef.current?.checked) {
      setAgreeError("필수 항목에 모두 동의해주세요.");
      return false;
    }
    delete data.password2;
    data.userType = 0;
    console.log(data);
    dispatch(signupDB(data));
    // navigate("/login");
  };
  return (
    <Wrap>
      <form onSubmit={handleSubmit(onValid)}>
        <InputTitle>
          이메일 주소<Required>●</Required>
        </InputTitle>
        <Input
          {...register("username", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*[.][a-zA-Z]{2,4}$/i,
              message: "이메일 형식이 올바르지 않습니다.",
            },
            maxLength: {
              value: 30,
              message: "30자까지만 입력할 수 있습니다.",
            },
            validate: async (username) => {
              const result = await dispatch(usernameCheckDB(username));
              if (!result) return "이미 존재하는 이메일입니다.";
              else return true;
            },
          })}
          invalid={errors?.username?.message}
          placeholder="ribborn@ribborn.co.kr"
          autoComplete="off"
        />
        <HelpText>{errors?.username?.message}</HelpText>
        <InputTitle>
          비밀번호<Required>●</Required>
        </InputTitle>
        <Input
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()-_=+]{1,}$/,
              message: "영문과 숫자가 반드시 포함되어야 합니다.",
            },
            minLength: {
              value: 8,
              message: "8자 이상 입력해주세요.",
            },
            maxLength: {
              value: 16,
              message: "16자까지만 입력할 수 있습니다.",
            },
          })}
          invalid={errors?.password?.message}
          type="password"
          placeholder="영문과 숫자를 조합해서 입력해주세요.(8~16자)"
        />
        <HelpText>{errors?.password?.message}</HelpText>
        <InputTitle>
          비밀번호 확인<Required>●</Required>
        </InputTitle>
        <Input
          {...register("password2", {
            required: "비밀번호를 다시 입력해주세요.",
          })}
          invalid={errors?.password2?.message}
          placeholder="비밀번호를 다시 한 번 입력해주세요."
          type="password"
        />
        <HelpText>{errors?.password2?.message}</HelpText>
        <InputTitle>
          닉네임<Required>●</Required>
        </InputTitle>
        <Input
          {...register("nickname", {
            required: "닉네임을 입력하세요.",
            pattern: {
              value: /^[가-힣|a-z|A-Z|0-9|&*()]+$/,
              message: "닉네임은 한글, 영어, 숫자, &*()만 입력 할 수 있습니다.",
            },
            minLength: {
              value: 2,
              message: "2자 이상 입력해주세요.",
            },
            maxLength: {
              value: 12,
              message: "12자까지만 입력할 수 있습니다.",
            },
          })}
          invalid={errors?.nickname?.message}
          placeholder="닉네임을 입력해주세요."
          autoComplete="off"
        />
        <HelpText>{errors?.nickname?.message}</HelpText>
        <InputTitle>
          연락처<Required>●</Required>
        </InputTitle>
        <Input
          {...register("phoneNum", {
            required: "연락처를 입력해주세요.",
            pattern: {
              // value: /^([0-9]{2,3})-([0-9]{3,4})-([0-9]{4})$/,
              value: /^([0-9]{9,11})$/,
              message:
                "전화번호 형식이 아닙니다. -를 제외하고 숫자만 입력해주세요.",
            },
          })}
          invalid={errors?.phoneNum?.message}
          placeholder="01012345678"
          autoComplete="off"
        />
        <HelpText>{errors?.phoneNum?.message}</HelpText>
        <SignupAgree ref={checkRef} />
        <span>{agreeError}</span>
        <BlackBtn
          disabled={
            errors.nickname ||
            errors.password ||
            errors.username ||
            errors.password2
          }
        >
          회원가입
        </BlackBtn>
      </form>
    </Wrap>
  );
};

const Wrap = styled.div`
  margin: 90px auto 0 auto;
`;
const Form = styled.form``;
const Required = styled.span`
  color: ${({ theme }) => theme.colors.orange};
  font-size: 5px;
  padding-left: 5px;
  vertical-align: top;
`;

export default SignupUser;
