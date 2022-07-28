import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    a {
        text-decoration:none;
        color:inherit;
    }
    * {
        box-sizing:border-box;
        font-family: 'Apple SD Gothic Neo', 'Apple SD 산돌고딕 Neo' !important ;
    }
    html {
        font-family: 'Apple SD Gothic Neo';
        font-size: ${({ theme }) => theme.fontSizes.m};
        margin : 0;
        padding: 0;
        color: ${({ theme }) => theme.colors.black};
        
    }
    body{
        background-color:#FFF;
        width:100%;
	    height:100vh;
    }
    input, textarea, button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    border-radius: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
}
`;

export default GlobalStyles;
