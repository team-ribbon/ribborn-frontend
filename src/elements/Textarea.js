import styled from "styled-components";

export const Textarea = styled.textarea`
  border: none;
  resize: none;
  width: 100%;
  height: ${({ height }) => (height ? height : "180px")};
  padding: 30px 20px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.lighterGray};
  font-size: ${({ theme }) => theme.fontSizes.l};
  border: 1px solid
    ${({ theme, invalid }) => (invalid ? theme.colors.orange : "none")};
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }
`;
