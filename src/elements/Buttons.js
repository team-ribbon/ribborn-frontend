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

export const BlackBtn = styled(MainBtn)`
  background-color: ${({ theme }) => theme.colors.black};
  &:disabled {
    background-color: #f2f2f2;
    cursor: default;
  }
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
  justify-content: ${(props) => (props.userpage ? "left" : "space-between")};
  width: ${(props) => (props.userpage ? "100%" : "850px")};
  margin: ${(props) => (props.userpage ? "0 0 0 0px" : "10px auto 0px auto")};
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
  #bags {
    ${({ category }) => category === "bags" && SubBtnActive}
  }
  #diy {
    ${({ category }) => category === "diy" && SubBtnActive}
  }
  #review {
    ${({ category }) => category === "review" && SubBtnActive}
  }
  #qna {
    ${({ category }) => category === "qna" && SubBtnActive}
  }
  #reform {
    ${({ category }) => category === "reform" && SubBtnActive}
  }
  #lookbook {
    ${({ category }) => category === "lookbook" && SubBtnActive}
  }
`;
