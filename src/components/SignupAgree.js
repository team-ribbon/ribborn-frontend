import { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";

import RuleModal from "./RuleModal";
import { CheckSVG } from "../elements/SVG";
import RuleText from "../shared/RuleText";
import InfoText from "../shared/InfoText";

const SignupAgree = forwardRef(({ setAgreeError }, ref) => {
  const [agreeAll, setAgreeAll] = useState(false);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);
  const [ruleModal, setRuleModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);

  const onChangeAll = () => {
    if (!agreeAll) {
      setAgreeAll(true);
      setAgree1(true);
      setAgree2(true);
      setAgree3(true);
    }
    if (agreeAll) {
      setAgreeAll(false);
      setAgree1(false);
      setAgree2(false);
      setAgree3(false);
    }
  };

  const isCheckedAll = () => {
    if (agree1 && agree2 && agree3) {
      setAgreeAll(true);
      setAgreeError("");
    } else {
      setAgreeAll(false);
    }
  };
  useEffect(() => {
    isCheckedAll();
  }, [agree1, agree2, agree3]);

  return (
    <>
      <ModalWrap>
        {ruleModal && (
          <RuleModal
            isModalOn={ruleModal}
            setIsModalOn={setRuleModal}
            title="이용약관"
            content={RuleText}
          />
        )}
        {infoModal && (
          <RuleModal
            isModalOn={infoModal}
            setIsModalOn={setInfoModal}
            title="개인정보수집 및 이용동의"
            content={InfoText}
          />
        )}
      </ModalWrap>
      <Wrap>
        <Label htmlFor="agree" all>
          <input
            type="checkbox"
            id="agree"
            checked={agreeAll}
            onChange={onChangeAll}
            ref={ref}
            style={{ display: "none" }}
          />
          {agreeAll ? <CheckSVG /> : <CheckBox />}
          <RuleSpan>약관 전체동의</RuleSpan>
        </Label>

        <Label htmlFor="agree1">
          <input
            type="checkbox"
            id="agree1"
            checked={agree1}
            onChange={() => setAgree1((prev) => !prev)}
            style={{ display: "none" }}
          />
          {agree1 ? <CheckSVG /> : <CheckBox />}
          <RuleSpan>(필수) 만 14세 이상입니다.</RuleSpan>
        </Label>
        <div>
          <Label htmlFor="agree2">
            <input
              type="checkbox"
              id="agree2"
              checked={agree2}
              onChange={() => setAgree2((prev) => !prev)}
              style={{ display: "none" }}
            />
            {agree2 ? <CheckSVG /> : <CheckBox />}
            <RuleSpan>(필수) 이용약관</RuleSpan>
          </Label>
          <ShowContent
            onClick={() => {
              setRuleModal(true);
            }}
          >
            내용보기
          </ShowContent>
        </div>
        <MobileShowContent
          onClick={() => {
            setRuleModal(true);
          }}
        >
          내용보기
        </MobileShowContent>
        <div>
          <Label htmlFor="agree3">
            <input
              type="checkbox"
              id="agree3"
              checked={agree3}
              onChange={() => setAgree3((prev) => !prev)}
              style={{ display: "none" }}
            />
            {agree3 ? <CheckSVG /> : <CheckBox />}
            <RuleSpan>(필수) 개인정보 수집 및 이용 동의</RuleSpan>
          </Label>
          <ShowContent
            onClick={() => {
              setInfoModal(true);
            }}
          >
            내용보기
          </ShowContent>
        </div>
        <MobileShowContent
          onClick={() => {
            setInfoModal(true);
          }}
        >
          내용보기
        </MobileShowContent>
      </Wrap>
    </>
  );
});

const Wrap = styled.div`
  margin: 55px 0 10px 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const Label = styled.label`
  display: inline-flex;
  font-size: ${({ theme }) => theme.fontSizes.l};
  align-items: center;
  gap: 30px;
  margin-left: ${({ all }) => !all && "30px"};
`;
const CheckBox = styled.span`
  width: 32px;
  height: 32px;
  border: 2px solid ${({ theme }) => theme.colors.gray};
  border-radius: 8px;
`;
const ShowContent = styled.span`
  display: none;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.gray};
  cursor: pointer;
  @media ${({ theme }) => theme.device.mobile} {
    display: inherit;
  }
`;
const MobileShowContent = styled.span`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.gray};
  cursor: pointer;
  margin-left: 85px;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;
const ModalWrap = styled.div`
  position: relative;
`;

const RuleSpan = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
  word-break: keep-all;
  max-width: calc(100vw - 135px);
`;

export default SignupAgree;
