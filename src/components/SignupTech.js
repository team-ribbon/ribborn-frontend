import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signupDB, usernameCheckDB } from "../redux/modules/user";
import SignupAgree from "./SignupAgree";
import { AddressCategory } from "../shared/AddressCategory";
import { HelpText, Input, InputTitle, Required } from "../elements/Inputs";
import { FixedSizeBlackBtn } from "../elements/Buttons";
import { Textarea } from "../elements/Textarea";
import CustomSelect from "../elements/CustomSelect";

// 기술자 회원가입
const SignupTech = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkRef = useRef(false);
  const selectRef = useRef();
  const [selectError, setSelectError] = useState("");
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
    if (!selectRef.current) {
      setSelectError("지역을 선택해주세요.");
      return false;
    }
    if (!checkRef.current?.checked) {
      setAgreeError("필수 항목에 모두 동의해주세요.");
      return false;
    }
    delete data.password2;
    data.addressCategory = selectRef.current;
    data.userType = 1;
    // console.log(data);
    dispatch(signupDB(data));
    navigate("/login");
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
              if (!result) return "이미 가입된 이메일입니다.";
              else return true;
            },
          })}
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
          placeholder="비밀번호를 다시 한 번 입력해주세요."
          type="password"
        />
        <HelpText>{errors?.password2?.message}</HelpText>

        <InputTitle>
          이름 또는 업체이름 (닉네임 가능)<Required>●</Required>
        </InputTitle>
        <Input
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
          placeholder="김리본"
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
          placeholder="01012345678"
          autoComplete="off"
        />
        <HelpText>{errors?.phoneNum?.message}</HelpText>

        <InputTitle>
          사업자등록번호<Required>●</Required>
        </InputTitle>
        <Input
          {...register("companyNum", {
            required: "사업자등록번호를 입력해주세요.",
            pattern: {
              // value: /^\d\d\d-\d\d-\d\d\d\d\d$/,
              value: /^([0-9]{10,10})$/,
              message:
                "사업자등록번호 형식이 아닙니다. -를 제외하고 숫자만 입력해주세요.",
            },
          })}
          placeholder="1234567890"
          autoComplete="off"
        />
        <HelpText>{errors?.companyNum?.message}</HelpText>

        <InputTitle>
          사업자 위치<Required>●</Required>
        </InputTitle>
        <CustomSelect
          options={AddressCategory}
          ref={selectRef}
          setSelectError={setSelectError}
        />
        <HelpText>{selectError}</HelpText>

        <InputTitle>
          상세주소<Required>●</Required>
        </InputTitle>
        <Input
          {...register("addressDetail", {
            required: "상세주소를 입력해주세요.",
          })}
          placeholder="건물명, 호수 등"
          autoComplete="off"
        />
        <HelpText>{errors?.addressDetail?.message}</HelpText>

        <InputTitle>브랜드/자기소개</InputTitle>
        <Textarea
          {...register("introduction", {
            maxLength: {
              value: 200,
              message: "200자까지만 입력할 수 있습니다.",
            },
          })}
          placeholder="브랜드 또는 디자이너에 대한 간단한 소개를 이곳에 적어주세요."
        />
        <HelpText>{errors?.introduction?.message}</HelpText>
        <SignupAgree ref={checkRef} setAgreeError={setAgreeError} />
        <HelpText>{agreeError}</HelpText>
        <FixedSizeBlackBtn
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
        </FixedSizeBlackBtn>
      </form>
    </Wrap>
  );
};

const Wrap = styled.div`
  margin: 90px auto 0 auto;
`;

export default SignupTech;
