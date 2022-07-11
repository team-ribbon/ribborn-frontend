import { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changeMyDataDB } from "../modules/UserPage";
import { AddressCategory } from "../shared/AddressCategory";

const InfoChange = ({ change, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate;
  const [passwordChange, setPasswordChange] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onValid = (data) => {
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
          currentPassword: null,
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
          currentPassword: null,
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
      change(false);
    });
  };

  return (
    <Template>
      <Form onSubmit={handleSubmit(onValid)}>
        <span>이메일 주소</span>
        <span>{user.username}</span>
        <span>
          {user.userType === 1 ? "이름 또는 업체이름 (닉네임 가능)" : "닉네임"}
        </span>
        <input
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
        <span>{errors?.nickname?.message}</span>
        {user.userType === 1 ? (
          <>
            <span>연락처</span>
            <input
              {...register("phoneNum", {
                required: "연락처를 입력해주세요.",
                pattern: {
                  value: /^([0-9]{2,3})-([0-9]{3,4})-([0-9]{4})$/,
                  message:
                    "전화번호 형식이 아닙니다. -를 포함하여 입력해주세요.",
                },
              })}
              defaultValue={user.phoneNum}
              autoComplete="off"
            />
            <span>{errors?.phoneNum?.message}</span>

            <span>사업자등록번호</span>
            <input
              {...register("companyNum", {
                required: "사업자등록번호를 입력해주세요.",
                pattern: {
                  value: /^\d\d\d-\d\d-\d\d\d\d\d$/,
                  message:
                    "사업자등록번호 형식이 아닙니다. -를 포함하여 입력해주세요.",
                },
              })}
              defaultValue={user.companyNum}
              autoComplete="off"
            />
            <span>{errors?.companyNum?.message}</span>

            <span>사업자 위치</span>
            <select
              defaultValue={user.addressCategory}
              {...register("addressCategory", {
                required: "지역을 선택해주세요.",
              })}
            >
              {AddressCategory.map((element, index) => (
                <option value={element} key={index}>
                  {element}
                </option>
              ))}
            </select>

            <span>상세주소</span>
            <input
              {...register("addressDetail", {
                required: "상세주소를 입력해주세요.",
              })}
              defaultValue={user.addressDetail}
              autoComplete="off"
            />

            <span>브랜드/자기소개</span>
            <textarea
              {...register("introduction", {})}
              defaultValue={user.introduction}
              autoComplete="off"
            />
          </>
        ) : null}

        <input
          type="button"
          onClick={() => {
            setPasswordChange(!passwordChange);
          }}
          value={passwordChange ? "비밀번호 수정취소" : "비밀번호 수정"}
        />

        {passwordChange ? (
          <>
            <span>현재 비밀번호</span>
            <input
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
            <span>{errors?.currentPassword?.message}</span>

            <span>변경 비밀번호</span>
            <input
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
            <span>{errors?.newPassword?.message}</span>

            <span>변경 비밀번호 확인</span>
            <input
              {...register("newPasswordCheck", {})}
              placeholder="변경 비밀번호 확인"
              type="password"
            />
            <span>{errors?.newPasswordCheck?.message}</span>
          </>
        ) : null}

        <ButtonDiv>
          <FakeButton
            type="button"
            onClick={() => {
              change(false);
            }}
            value="수정취소"
          />

          <Button>회원정보 수정</Button>
        </ButtonDiv>
      </Form>
    </Template>
  );
};

const Template = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ButtonDiv = styled.div``;

const FakeButton = styled.input`
  width: 100px;
  height: 40px;
  margin: auto 10px;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  margin: auto 10px;
`;

export default InfoChange;
