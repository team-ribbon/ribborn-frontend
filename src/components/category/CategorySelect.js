import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";

import Categories from "../../shared/Categories";

const CategorySelect = ({ setCategory, category }) => {
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
        {category === 0 && (
          <>
            <Text>리폼종류</Text>
            <IoIosArrowDown
              size="22"
              style={{ marginLeft: "auto", marginRight: "10px" }}
            />
          </>
        )}
        {Categories.map((v) => {
          return category === v.value ? (
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
          <Modal>
            {Categories.map((v, i) => {
              return (
                i !== 0 && (
                  <span
                    key={"CategorySpan" + v.value}
                    onClick={() => {
                      setCategory(v.value);
                      setIsModalOn(false);
                    }}
                  >
                    {v.text}
                  </span>
                )
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
  width: ${(props) => (props.left ? "179px" : "187px")};
  height: 54px;
  border: 1px solid #afb0b3;
  border-radius: 15px;
  :active {
    border: none;
  }
  outline: none;
  text-align: center;
  align-items: center;
`;
const Text = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 20px;
  margin: auto 14px auto 18px;
`;

const Modal = styled.div`
  position: absolute;
  height: 270px;
  width: 170px;
  left: 0px;
  z-index: 1;
  background: #ffffff;
  box-shadow: 3px 4px 11px rgba(0, 0, 0, 0.14);
  border-radius: 11px;
  display: flex;
  flex-direction: column;
  span {
    font-size: ${({ theme }) => theme.fontSizes.l};
    margin: 30px 0 0 30px;
    cursor: pointer;
  }
`;
export default CategorySelect;
