import React from "react";
import styled from "styled-components";

const Footer = () => {
  return <Wrap>푸터라네</Wrap>;
};

const Wrap = styled.footer`
  height: 300px;
  background-color: ${({ theme }) => theme.colors.lighterGray};
`;

export default Footer;
