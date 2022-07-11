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
        font-size:82.5%;
        margin : 0;
        padding: 0;
    }
    body{
        background-color: #FFFFFF;
    }
`;

export default GlobalStyles;
