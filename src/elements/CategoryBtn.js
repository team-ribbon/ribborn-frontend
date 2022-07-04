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
      >
        {v.text}
      </Button>
    );
  });
};

const Button = styled.button`
  background-color: #ddd;
  border: none;
  margin: auto 10px;
  width: 100px;
  height: 60px;
  :hover {
    cursor: pointer;
  }
`;

export default CategoryBtn;
