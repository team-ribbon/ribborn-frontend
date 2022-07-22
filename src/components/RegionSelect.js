import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Regions from "../shared/Regions";
import { IoIosArrowDown } from "react-icons/io";

const RegionSelect = ({ setRegion, region, write }) => {
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
      <ButtonWrap onClick={() => setIsModalOn((prev) => !prev)}>
        {region === 0 && (
          <>
            <Text>지역</Text>
            <IoIosArrowDown
              size="22"
              style={{ marginLeft: "auto", marginRight: "10px" }}
            />
          </>
        )}
        {Regions.map((v) => {
          return region === v.value ? (
            <>
              <Text>{v.text}</Text>
              <IoIosArrowDown
                size="22"
                style={{ marginLeft: "auto", marginRight: "10px" }}
              />
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
                  }}
                >
                  {v.text}
                </span>
              );
            })}
          </Modal>
        </>
      )}
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
  border: 1px solid #afb0b3;
  border-radius: 15px;
  :active {
    border: none;
  }
  outline: none;
  text-align: center;
  align-items: center;
  @media all and (max-width: 320px) {
    height: 50px;
    padding: 5px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: ${(props) => (props.left ? "179px" : "187px")};
    margin-left: ${(props) => (props.left ? "auto" : "30px")};
    height: 54px;
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
  right: 0;
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
    height: ${(props) => (props.write ? "265px" : "310px")};
    width: 170px;
    span {
      font-size: ${({ theme }) => theme.fontSizes.l};
      margin: 30px 0 0 30px;
    }
  }

  /* &::after {
    content: "";
    position: absolute;
    right: 50px;
    margin-top: -25px;
    border-top: 30px solid none;
    border-bottom: 25px solid red;
    border-right: 30px solid transparent;
    border-left: 30px solid transparent;
    box-shadow: 2px -2px 2px 0 rgba(178, 178, 178, 0.14);
  } */
`;
export default RegionSelect;
