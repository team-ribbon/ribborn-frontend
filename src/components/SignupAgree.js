import { forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Rule from "./Rule";
import Info from "./Info";
import { CheckSVG } from "../elements/SVG";

const SignupAgree = forwardRef((prop, ref) => {
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
    } else {
      setAgreeAll(false);
    }
  };
  useEffect(() => {
    isCheckedAll();
  }, [agree1, agree2, agree3]);

  return (
    <Wrap>
      {ruleModal ? <Rule modal={setRuleModal} /> : null}
      {infoModal ? <Info modal={setInfoModal} /> : null}
      <Label htmlFor="agree">
        <input
          type="checkbox"
          id="agree"
          checked={agreeAll}
          onChange={onChangeAll}
          ref={ref}
          style={{ display: "none" }}
        />
        <CheckBox>
          <CheckSVG />
        </CheckBox>
        <span>약관 전체동의</span>
      </Label>

      <Label htmlFor="agree1">
        <input
          type="checkbox"
          id="agree1"
          checked={agree1}
          onChange={() => setAgree1((prev) => !prev)}
          style={{ display: "none" }}
        />
        <CheckBox />
        <span>(필수) 만 14세 이상입니다.</span>
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
          <CheckBox />
          <span>(필수) 이용약관</span>
        </Label>

        <ShowContent
          onClick={() => {
            setRuleModal(true);
          }}
        >
          내용보기
        </ShowContent>
      </div>
      <div>
        <Label htmlFor="agree3">
          <input
            type="checkbox"
            id="agree3"
            checked={agree3}
            onChange={() => setAgree3((prev) => !prev)}
            style={{ display: "none" }}
          />
          <CheckBox />
          <span>(필수) 개인정보수집 및 이용동의</span>
        </Label>
        <ShowContent
          onClick={() => {
            setInfoModal(true);
          }}
        >
          내용보기
        </ShowContent>
      </div>
    </Wrap>
  );
});

const Wrap = styled.div`
  margin: 55px 0;
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
`;
const CheckBox = styled.span`
  width: 32px;
  height: 32px;
  border: 2px solid ${({ theme }) => theme.colors.gray};
  border-radius: 8px;
  background-color: black;
`;
const ShowContent = styled.span`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.gray};
`;

export default SignupAgree;
