import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  border: 1px solid
    ${({ theme, invalid }) =>
      invalid ? theme.colors.orange : theme.colors.gray};
  border-radius: 15px;
  padding: ${({ hasCount }) =>
    hasCount ? "25px 95px 25px 20px" : "25px 20px"};
  font-size: ${({ theme }) => theme.fontSizes.l};
  &:focus {
    outline: ${({ theme, invalid }) =>
      invalid ? "none" : `1px solid ${theme.colors.black}`};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }
  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobile}) {
    padding: ${({ hasCount }) =>
      hasCount ? "20px 70px 20px 10px" : "20px 15px"};
    font-size: ${({ theme }) => theme.fontSizes.m};
  }
`;

export const InputTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.l};
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 8px;
  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.m};
  }
`;

export const HelpText = styled.div`
  color: ${({ theme }) => theme.colors.orange};
  height: 1em;
  margin-top: 8px;
  margin-bottom: 24px;
`;

export const Required = styled.span`
  color: ${({ theme }) => theme.colors.orange};
  font-size: 5px;
  padding-left: 5px;
  vertical-align: top;
`;
