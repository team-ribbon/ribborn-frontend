import { useRef, useState, useEffect, forwardRef } from "react";
import styled from "styled-components";

import React from "react";
import { ThinArrowSVG } from "./SVG";

const CustomSelect = forwardRef(({ options, setSelectError }, ref) => {
  const [selectToggle, setSelectToggle] = useState(false);
  const [currentValue, setCurrentValue] = useState("지역을 선택해주세요.");
  const outsideRef = useRef();

  const onClickSelect = () => {
    setSelectToggle((prev) => !prev);
  };

  const onClickOption = (event) => {
    setCurrentValue(event.target.id);
    ref.current = event.target.id;
    setSelectError("");
  };

  useEffect(() => {
    const clickOutside = (e) => {
      if (
        selectToggle &&
        outsideRef.current &&
        !outsideRef.current.contains(e.target)
      ) {
        setSelectToggle(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [selectToggle]);

  return (
    <SelectBox
      isOpen={selectToggle}
      onClick={onClickSelect}
      ref={outsideRef}
      isDefault={currentValue === "지역을 선택해주세요."}
    >
      <label>{currentValue}</label>
      <span>
        <ThinArrowSVG />
      </span>
      <SelectOptions isOpen={selectToggle}>
        {options.map((option) => {
          return (
            <Option onClick={onClickOption} id={option} key={option}>
              {option}
            </Option>
          );
        })}
      </SelectOptions>
    </SelectBox>
  );
});

const SelectBox = styled.div`
  position: relative;
  width: 100%;
  padding: 30px 20px;
  border-radius: 15px;
  background-color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.l};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  cursor: pointer;
  span {
    position: absolute;
    top: 30px;
    right: 20px;
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  }
  label {
    color: ${({ isDefault, theme }) => isDefault && theme.colors.gray};
  }
`;
const SelectOptions = styled.ul`
  position: absolute;
  top: 90px;
  left: 0;
  width: 100%;
  overflow-y: scroll;
  height: 340px;
  max-height: ${({ isOpen }) => (isOpen ? "none" : "0")};
  padding: 0;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 3px 4px 11px rgba(0, 0, 0, 0.14);
`;
const Option = styled.li`
  padding: 15px 28px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
`;

export default CustomSelect;
