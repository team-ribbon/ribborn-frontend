import styled, { css } from "styled-components";

export const MainBtn = styled.button`
  font-weight: 700;
  border-radius: 8px;
  line-height: 14px;
  padding: 10px 5px;
  font-size: ${({ theme }) => theme.fontSizes.m};
  border: none;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.orange};
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    opacity: 0.7;
  }
  @media all and (min-width: 300px) {
    border-radius: 10px;
    line-height: 17px;
    padding: 10px 20px;
    font-size: ${({ theme }) => theme.fontSizes.m};
  }
  @media all and (min-width: 320px) {
    width: fit-content;
    height: fit-content;
    border-radius: 15px;
    line-height: 17px;
    padding: 20px 30px;
    font-size: ${({ theme }) => theme.fontSizes.m};
  }
  @media all and (min-width: 450px) {
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

export const FixedSizeMainBtn = styled.button`
  border: none;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.orange};
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  border-radius: 15px;
  padding: 25px 60px;
  font-size: ${({ theme }) => theme.fontSizes.l};
  transition: all 0.1s ease-in-out;
  &:hover {
    opacity: 0.7;
  }
`;

export const FixedSizeBlackBtn = styled(FixedSizeMainBtn)`
  background-color: ${({ theme }) => theme.colors.black};
  &:disabled {
    background-color: #f2f2f2;
    cursor: default;
  }
`;

export const SubBtn = styled.button`
  word-break: keep-all;
  border-radius: 8px;
  padding: 10px 10px;
  border: 1px solid #afb0b3;
  background-color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.m};
  cursor: pointer;
  @media ${({ theme }) => theme.device.mobile} and (max-width: 900px) {
    padding: 10px 15px;
    font-size: ${({ theme }) => theme.fontSizes.l};
    border-radius: 8px;
  }
  @media all and (min-width: 900px) {
    padding: 20px 30px;
    font-size: ${({ theme }) => theme.fontSizes.l};
    border-radius: 25px;
  }
  transition: all 0.1s ease-in-out;
  &:hover {
    filter: brightness(90%);
  }
`;
export const SubBtnActive = css`
  background-color: ${({ theme }) => theme.colors.black};
  color: #fff;
  border: none;
  &:hover {
    filter: none;
  }
`;
export const FixedSizeSubBtn = styled.button`
  border-radius: 25px;
  padding: 20px 30px;
  font-size: ${({ theme }) => theme.fontSizes.l};
  border: 1px solid #afb0b3;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    filter: brightness(90%);
  }
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
  @media all and (min-width: 376px) and (max-width: 550px) {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media all and (max-width: 375px) {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr;
  }
  @media all and (min-width: 551px) and (max-width: 768px) {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
