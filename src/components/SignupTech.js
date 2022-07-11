import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { signupDB, usernameCheckDB } from "../redux/modules/user";
import SignupAgree from "./SignupAgree";

// 기술자 회원가입
const SignupTech = () => {
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

  const addressCategory = [
    "서울특별시",
    "부산광역시",
    "대구광역시",
    "인천광역시",
    "광주광역시",
    "대전광역시",
    "울산광역시",
    "세종특별자치시",
    "경기도",
    "강원도",
    "충청북도",
    "충청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주특별자치도",
    "기타(해외)",
  ];

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
    data.userType = 1;
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

        <span>이름 또는 업체이름 (닉네임 가능)</span>
        <input
          {...register("nickname", {
            required: "이름 또는 업체이름을 입력하세요.",
            pattern: {
              value: /^[가-힣|a-z|A-Z|0-9|&*()]+$/,
              message: "업체명은 한글, 영어, 숫자, &*()만 입력 할 수 있습니다.",
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
          placeholder="실명 또는 업체명"
          autoComplete="off"
        />
        <span>{errors?.nickname?.message}</span>

        <span>연락처</span>
        <input
          {...register("phoneNum", {
            required: "연락처를 입력해주세요.",
            pattern: {
              // value: /^([0-9]{2,3})-([0-9]{3,4})-([0-9]{4})$/,
              value: /^([0-9]{9,11})$/,
              message:
                "전화번호 형식이 아닙니다. -를 제외하고 숫자만 입력해주세요.",
            },
          })}
          placeholder="연락처"
          autoComplete="off"
        />
        <span>{errors?.phoneNum?.message}</span>

        <span>사업자등록번호</span>
        <input
          {...register("companyNum", {
            required: "사업자등록번호를 입력해주세요.",
            pattern: {
              // value: /^\d\d\d-\d\d-\d\d\d\d\d$/,
              value: /^([0-9]{10,10})$/,
              message:
                "사업자등록번호 형식이 아닙니다. -를 제외하고 숫자만 입력해주세요.",
            },
          })}
          placeholder="사업자등록번호"
          autoComplete="off"
        />
        <span>{errors?.companyNum?.message}</span>

        <span>사업자 위치</span>
        <select
          {...register("addressCategory", {
            required: "지역을 선택해주세요.",
          })}
        >
          {addressCategory.map((element, index) => (
            <option value={element} key={index}>
              {element}
            </option>
          ))}
        </select>
        <span>{errors?.addressCategory?.message}</span>

        <span>상세주소</span>
        <input
          {...register("addressDetail", {
            required: "상세주소를 입력해주세요.",
          })}
          placeholder="상세 위치"
          autoComplete="off"
        />
        <span>{errors?.addressDetail?.message}</span>

        <span>브랜드/자기소개</span>
        <textarea {...register("introduction")} />

        <SignupAgree ref={checkRef} />
        <span>{agreeError}</span>
        <button
          disabled={
            errors.username ||
            errors.password ||
            errors.password2 ||
            errors.nickname ||
            errors.phoneNum ||
            errors.companyNum ||
            errors.addressCategory ||
            errors.addressDetail
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

export default SignupTech;
