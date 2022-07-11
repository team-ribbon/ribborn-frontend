import styled, { css } from "styled-components";

export const MainBtn = styled.button`
  border-radius: 15px;
  padding: 25px 60px;
  border: none;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.orange};
  font-size: ${({ theme }) => theme.fontSizes.l};
  cursor: pointer;
`;

export const SubBtn = styled.button`
  border-radius: 25px;
  padding: 20px 30px;
  border: 1px solid #afb0b3;
  background-color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.l};
  cursor: pointer;
`;
export const SubBtnActive = css`
  background-color: ${({ theme }) => theme.colors.black};
  color: #fff;
  border: none;
`;

export const Category = styled.div`
  display: flex;
  justify-content: space-between;
  width: 850px;
  margin: 10px auto;
  #all {
    ${({ category }) => category === "all" && SubBtnActive}
  }
  #clothes {
    ${({ category }) => category === "clothes" && SubBtnActive}
  }
  #furniture {
    ${({ category }) => category === "furniture" && SubBtnActive}
  }
  #shoes {
    ${({ category }) => category === "shoes" && SubBtnActive}
  }
  #goods {
    ${({ category }) => category === "goods" && SubBtnActive}
  }
  #diy {
    ${({ category }) => category === "diy" && SubBtnActive}
  }
`;
