import { forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const SignupAgree = forwardRef((prop, ref) => {
  const [agreeAll, setAgreeAll] = useState(false);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);

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
    <div>
      <label htmlFor="agree">
        <input
          type="checkbox"
          id="agree"
          checked={agreeAll}
          onChange={onChangeAll}
          ref={ref}
        />
        <span>약관 전체동의</span>
      </label>
      <label htmlFor="agree1">
        <input
          type="checkbox"
          id="agree1"
          checked={agree1}
          onChange={() => setAgree1((prev) => !prev)}
        />
        <span>(필수) 만 14세 이상입니다.</span>
      </label>
      <label htmlFor="agree2">
        <input
          type="checkbox"
          id="agree2"
          checked={agree2}
          onChange={() => setAgree2((prev) => !prev)}
        />
        <span>(필수) 이용약관</span>
      </label>
      <label htmlFor="agree3">
        <input
          type="checkbox"
          id="agree3"
          checked={agree3}
          onChange={() => setAgree3((prev) => !prev)}
        />
        <span>(필수) 개인정보수집 및 이용동의</span>
      </label>
    </div>
  );
});

export default SignupAgree;
