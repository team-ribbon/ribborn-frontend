import styled, { css } from "styled-components";

export const MainBtn = styled.button`
  border-radius: 10px;
  width: 90px;
  height: 50px;
  font-size: ${({ theme }) => theme.fontSizes.s};
  border: none;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.orange};
  cursor: pointer;
  @media all and (min-width: 345px) {
    width: fit-content;
    height: fit-content;
    border-radius: 15px;
    padding: 15px 40px;
    font-size: ${({ theme }) => theme.fontSizes.m};
  }
  @media all and (min-width: 385px) {
    width: fit-content;
    height: fit-content;
    border-radius: 15px;
    padding: 25px 60px;
    font-size: ${({ theme }) => theme.fontSizes.l};
  }
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
  padding: 10px 10px;
  border: 1px solid #afb0b3;
  background-color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.m};
  cursor: pointer;
  @media ${({ theme }) => theme.device.mobile} and (max-width: 900px) {
    padding: 10px 15px;
    font-size: ${({ theme }) => theme.fontSizes.l};
  }
  @media all and (min-width: 900px) {
    padding: 20px 30px;
    font-size: ${({ theme }) => theme.fontSizes.l};
  }
`;
export const SubBtnActive = css`
  background-color: ${({ theme }) => theme.colors.black};
  color: #fff;
  border: none;
`;

export const Category = styled.div`
  display: flex;
  justify-content: ${(props) => (props.userpage ? "left" : "space-between")};
  max-width: ${(props) => (props.userpage ? "100%" : "850px")};
  width: 100%;
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
  @media all and (max-width: 550px) {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media all and (max-width: 375px) {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr;
  }
`;
