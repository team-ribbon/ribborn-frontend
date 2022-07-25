import { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changeMyDataDB } from "../redux/modules/userPage";
import { AddressCategory } from "../shared/AddressCategory";
import { Textarea } from "../elements/Textarea";
import { HelpText, Input, InputTitle, Required } from "../elements/Inputs";
import CustomSelect from "../elements/CustomSelect";
import { BlackBtn } from "../elements/Buttons";

const InfoChange = ({ change, user, setCategory }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate;
  const [passwordChange, setPasswordChange] = useState(false);
  const [selectError, setSelectError] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onValid = (data) => {
    console.log("startCheck");
    let sendData = null;
    if (passwordChange) {
      // password validation check
      if (data.currentPassword !== "") {
        setError(
          "currentPassword",
          { message: "현재 비밀번호를 입력해주세요!" },
          { shouldFocus: true }
        );
        return false;
      }
      if (data.newPassword !== "") {
        setError(
          "newPassword",
          { message: "새로운 비밀번호를 입력해주세요!" },
          { shouldFocus: true }
        );
        return false;
      }
      if (data.newPassword !== data.newPasswordCheck) {
        setError(
          "newPasswordCheck",
          { message: "동일한 비밀번호를 입력해주세요." },
          { shouldFocus: true }
        );
        return false;
      }
      if (user.userType === 0) {
        // 비밀번호 변경하고 일반 유저
        sendData = {
          nickname: data.nickname === user.nickname ? null : data.nickname,
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
          companyNum: null,
          phoneNum: null,
          addressCategory: null,
          addressDetail: null,
          introduction: null,
        };
      } else {
        // 비밀번호 변경하고 기술자 유저
        sendData = {
          nickname: data.nickname === user.nickname ? null : data.nickname,
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
          companyNum:
            data.companyNum === user.companyNum ? null : data.companyNum,
          phoneNum: data.phoneNum === user.phoneNum ? null : data.phoneNum,
          addressCategory:
            data.addressCategory === user.addressCategory
              ? null
              : data.addressCategory,
          addressDetail:
            data.addressDetail === user.addressDetail
              ? null
              : data.addressDetail,
          introduction:
            data.introduction === user.introduction ? null : data.introduction,
        };
      }
    } else {
      if (user.userType === 0) {
        // 비밀번호 변경 안 하고 일반 유저
        sendData = {
          nickname: data.nickname === user.nickname ? null : data.nickname,
          currentPassword: data.currentPassword,
          newPassword: null,
          companyNum: null,
          phoneNum: null,
          addressCategory: null,
          addressDetail: null,
          introduction: null,
        };
      } else {
        // 비밀번호 변경 안 하고 기술자 유저
        sendData = {
          nickname: data.nickname === user.nickname ? null : data.nickname,
          currentPassword: data.currentPassword,
          newPassword: null,
          companyNum:
            data.companyNum === user.companyNum ? null : data.companyNum,
          phoneNum: data.phoneNum === user.phoneNum ? null : data.phoneNum,
          addressCategory:
            data.addressCategory === user.addressCategory
              ? null
              : data.addressCategory,
          addressDetail:
            data.addressDetail === user.addressDetail
              ? null
              : data.addressDetail,
          introduction:
            data.introduction === user.introduction ? null : data.introduction,
        };
      }
    }
    dispatch(changeMyDataDB(sendData)).then((res) => {
      console.log(sendData);
      setCategory("all");
      change(false);
    });
  };

  return (
    <Template>
      <Form onSubmit={handleSubmit(onValid)}>
        <InputTitle>이메일 주소</InputTitle>
        <DisabledInput disabled value={user.username} />
        <HelpText></HelpText>
        <InputTitle>
          {user.userType === 1 ? "이름 또는 업체이름 (닉네임 가능)" : "닉네임"}
          <Required>●</Required>
        </InputTitle>
        <Input
          {...register("nickname", {
            required:
              user.userType === 1
                ? "이름 또는 업체이름을 입력하세요."
                : "닉네임을 입력하세요.",
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
          defaultValue={user.nickname}
          autoComplete="off"
        />
        <HelpText>{errors?.nickname?.message}</HelpText>
        {user.userType === 1 ? (
          <div>
            <InputTitle>
              연락처<Required>●</Required>
            </InputTitle>
            <Input
              {...register("phoneNum", {
                required: "연락처를 입력해주세요.",
                pattern: {
                  value: /^([0-9]{9,11})$/,
                  message: "전화번호 형식이 아닙니다.",
                },
              })}
              defaultValue={user.phoneNum}
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
                  value: /^\d\d\d\d\d\d\d\d\d\d$/,
                  message: "사업자등록번호 형식이 아닙니다.",
                },
              })}
              defaultValue={user.companyNum}
              autoComplete="off"
            />
            <HelpText>{errors?.companyNum?.message}</HelpText>

            <InputTitle>
              사업자 위치<Required>●</Required>
            </InputTitle>
            <CustomSelect
              options={AddressCategory}
              defaultValue={user.addressCategory}
              setSelectError={setSelectError}
            />
            <HelpText />
            <InputTitle>상세주소</InputTitle>
            <Input
              {...register("addressDetail", {
                required: "상세주소를 입력해주세요.",
              })}
              defaultValue={user.addressDetail}
              autoComplete="off"
            />
            <HelpText />

            <InputTitle>브랜드/자기소개</InputTitle>
            <Textarea
              {...register("introduction", {})}
              defaultValue={user.introduction}
              autoComplete="off"
            />
          </div>
        ) : null}

        <InputTitle>
          현재 비밀번호<Required>●</Required>
        </InputTitle>
        <Input
          {...register("currentPassword", {
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
          placeholder="현재 비밀번호"
        />
        <HelpText>{errors?.currentPassword?.message}</HelpText>
        <ButtonDiv>
          <FakeButton
            onClick={() => {
              setPasswordChange(!passwordChange);
            }}
          >
            {passwordChange ? "비밀번호 수정취소" : "비밀번호 수정"}
          </FakeButton>
        </ButtonDiv>

        {passwordChange ? (
          <div>
            <InputTitle>
              변경 비밀번호<Required>●</Required>
            </InputTitle>
            <Input
              {...register("newPassword", {
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
              placeholder="변경 비밀번호"
            />
            <HelpText>{errors?.newPassword?.message}</HelpText>

            <InputTitle>
              변경 비밀번호 확인<Required>●</Required>
            </InputTitle>
            <Input
              {...register("newPasswordCheck", {})}
              placeholder="변경 비밀번호 확인"
              type="password"
            />
            <HelpText>{errors?.newPasswordCheck?.message}</HelpText>
          </div>
        ) : null}

        <ButtonDiv>
          <FakeButton
            onClick={() => {
              change(false);
            }}
          >
            수정 취소
          </FakeButton>

          <NewBlackBtn>회원정보 수정</NewBlackBtn>
        </ButtonDiv>
      </Form>
    </Template>
  );
};

const Template = styled.div`
  max-width: 740px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  max-width: ${({ theme }) => theme.width.maxWidth};
`;

const DisabledInput = styled(Input)`
  color: #afb0b3;
`;

const Form = styled.form`
  width: 100%;
`;

const ButtonDiv = styled.div`
  margin: 40px 0;
  display: flex;
`;

const FakeButton = styled.div`
  word-break: keep-all;
  border-radius: 10px;
  width: 90px;
  height: 50px;
  font-size: ${({ theme }) => theme.fontSizes.s};
  margin-right: 30px;
  text-align: center;
  padding: 20px 0;
  border: none;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  @media all and (min-width: 345px) {
    width: fit-content;
    height: fit-content;
    border-radius: 15px;
    padding: 15px 30px;
    font-size: ${({ theme }) => theme.fontSizes.m};
    line-height: 18px;
  }
  @media all and (min-width: 500px) {
    width: fit-content;
    height: fit-content;
    border-radius: 15px;
    padding: 25px 60px;
    font-size: ${({ theme }) => theme.fontSizes.l};
    line-height: 24px;
  }
`;

const NewBlackBtn = styled(BlackBtn)`
  word-break: keep-all;
  @media all and (min-width: 345px) {
    width: fit-content;
    height: fit-content;
    border-radius: 15px;
    padding: 15px 30px;
    font-size: ${({ theme }) => theme.fontSizes.m};
    line-height: 18px;
  }
  @media all and (min-width: 500px) {
    width: fit-content;
    height: fit-content;
    border-radius: 15px;
    padding: 25px 60px;
    font-size: ${({ theme }) => theme.fontSizes.l};
    line-height: 24px;
  }
`;

export default InfoChange;
