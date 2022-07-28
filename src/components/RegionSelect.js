import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Regions from "../shared/Regions";
import { ThinArrowSVG } from "../elements/SVG";
import { HelpText } from "../elements/Inputs";

const RegionSelect = ({ setRegion, region, write, setError, error }) => {
  const [isModalOn, setIsModalOn] = useState(false);
  const outsideRef = useRef();

  useEffect(() => {
    const clickOutside = (e) => {
      if (
        isModalOn &&
        outsideRef.current &&
        !outsideRef.current.contains(e.target)
      ) {
        setIsModalOn(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isModalOn]);

  return (
    <Wrap ref={outsideRef}>
      <ButtonWrap
        onClick={() => setIsModalOn((prev) => !prev)}
        isModalOn={isModalOn}
        invalid={error?.regionError}
      >
        {region === 0 && (
          <>
            <Text>지역</Text>
            <div>
              <ThinArrowSVG />
            </div>
          </>
        )}
        {Regions.map((v) => {
          return region === v.value ? (
            <>
              <Text>{v.text}</Text>
              <div>
                <ThinArrowSVG />
              </div>
            </>
          ) : null;
        })}
      </ButtonWrap>
      {isModalOn && (
        <>
          <Modal write={write}>
            {Regions.map((v, i) => {
              return write && i === 0 ? null : (
                <span
                  key={"RegionSpan" + v.value}
                  onClick={() => {
                    setRegion(v.value);
                    setIsModalOn(false);
                    write && setError({ ...error, regionError: null });
                  }}
                >
                  {v.text}
                </span>
              );
            })}
          </Modal>
        </>
      )}
      {error?.regionError && <ErrorMessage>{error?.regionError}</ErrorMessage>}
    </Wrap>
  );
};
const Wrap = styled.div`
  position: relative;
`;

const ButtonWrap = styled.div`
  display: flex;
  cursor: pointer;
  margin-left: ${(props) => (props.left ? "auto" : "10px")};
  width: 100%;
  height: 44px;
  border: 1px solid
    ${({ invalid, theme }) => (invalid ? theme.colors.orange : "#afb0b3")};
  border-radius: 8px;
  outline: none;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  div {
    transform: ${({ isModalOn }) =>
      isModalOn ? "rotate(180deg)" : "rotate(0deg)"};
  }
  @media all and (max-width: 320px) {
    height: 50px;
    padding: 5px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: ${(props) => (props.left ? "179px" : "187px")};
    margin-left: ${(props) => (props.left ? "auto" : "30px")};
    height: 54px;
    border-radius: 15px;
  }
`;

const Text = styled.span`
  word-break: keep-all;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 20px;
  margin: auto 5px auto 6px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.l};
    margin: auto 48px auto 18px;
  }
`;

const Modal = styled.div`
  right: -5px;
  position: absolute;
  height: ${(props) => (props.write ? "180px" : "215px")};
  width: 100%;
  z-index: 1;
  background: #ffffff;
  box-shadow: 3px 4px 11px rgba(0, 0, 0, 0.14);
  border-radius: 11px;
  display: flex;
  flex-direction: column;
  span {
    font-size: ${({ theme }) => theme.fontSizes.m};
    margin: 20px 0 0 20px;
    cursor: pointer;
  }
  @media ${({ theme }) => theme.device.mobile} {
    right: 10px;
    height: ${(props) => (props.write ? "265px" : "310px")};
    width: 170px;
    span {
      font-size: ${({ theme }) => theme.fontSizes.l};
      margin: 30px 0 0 30px;
    }
  }
`;
const ErrorMessage = styled(HelpText)`
  margin-left: 15px;
  @media ${({ theme }) => theme.device.mobile} {
    margin-left: 35px;
  }
`;
export default RegionSelect;
