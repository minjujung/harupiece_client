import { createGlobalStyle } from "styled-components";
import reset from "styled-reset-advanced";

const GlobalStyle = createGlobalStyle`
${reset};

* {
    box-sizing: border-box;
}

html {
    /* overflow-y: auto; */
    /* overflow-x: hidden; */ // 검색창에서 검색 클릭시 아래 컨텐츠들이 가려짐
  }


body {
    /* padding-top: 5em;
    padding-bottom:50px; */
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
