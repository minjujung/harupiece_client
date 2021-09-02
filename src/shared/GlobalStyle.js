import { createGlobalStyle } from "styled-components";
import reset from "styled-reset-advanced";

const GlobalStyle = createGlobalStyle`
${reset};

* {
    box-sizing: border-box;
}

body {
    font-family: "Noto Sans CJK KR";
    padding: 114px 0px 0px 0px;
    height: 100%
  }

@media screen and (min-width: 360px) and (max-width:720px) {
    body{
      padding: 56px 0px 0px 0px;
    }
}

a {
    color: #222222;
    text-decoration: none;
  }


  button, 
  input,
  textarea {
    color: black;
    background-color: transparent;
    border: none;
    outline: none;
  }
  button {
    padding: 0;
    cursor: pointer;
  }

`;

export default GlobalStyle;
