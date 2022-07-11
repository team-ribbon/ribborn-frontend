import styled from "styled-components";

import Categories from "../shared/Categories";

const CategoryBtn = (props) => {
  return Categories.map((v) => {
    return (
      <Button
        onClick={() => {
          props.categorySet(v.value);
        }}
        key={"categorybtn" + v.value}
        current={props.category === v.value}
      >
        {v.text}
      </Button>
    );
  });
};

const Button = styled.button`
  background-color: ${(props) => (props.current ? "#222222" : "#FAFAFA")};
  color: ${(props) => (props.current ? "white" : "#222222")};
  border: ${(props) => (props.current ? "none" : "1px solid #AFB0B2")};
  font-weight: ${(props) => (props.current ? "bold" : "")};
  font-size: 18px;
  margin: 40px 10px;
  width: 118px;
  height: 64px;
  border-radius: 25px;
  :hover {
    cursor: pointer;
  }
`;

export default CategoryBtn;
