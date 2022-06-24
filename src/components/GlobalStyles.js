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
        
    }
    html {
        font-size:82.5%;
        margin : 0;
        padding: 0;
        
    }
    body{
        background-color:#F8F8F8;
        
    }
`;

export default GlobalStyles;
