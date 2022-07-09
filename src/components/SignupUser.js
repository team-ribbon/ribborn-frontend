import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
    navigate("/login");
  };
  return (
    <Wrap>
      <Form onSubmit={handleSubmit(onValid)}>
        <span>이메일 주소</span>
        <input
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
          placeholder="이메일"
          autoComplete="off"
        />
        <span>{errors?.username?.message}</span>
        <span>비밀번호</span>
        <input
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
          type="password"
          placeholder="비밀번호"
        />
        <span>{errors?.password?.message}</span>
        <span>비밀번호 확인</span>
        <input
          {...register("password2", {
            required: "비밀번호를 다시 입력해주세요.",
          })}
          placeholder="비밀번호 확인"
          type="password"
        />
        <span>{errors?.password2?.message}</span>
        <span>닉네임</span>
        <input
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
          placeholder="닉네임"
          autoComplete="off"
        />
        <span>{errors?.nickname?.message}</span>

        <SignupAgree ref={checkRef} />
        <span>{agreeError}</span>
        <button
          disabled={
            errors.nickname ||
            errors.password ||
            errors.username ||
            errors.password2
          }
        >
          회원가입
        </button>
      </Form>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 400px;
  margin: 50px auto;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export default SignupUser;
