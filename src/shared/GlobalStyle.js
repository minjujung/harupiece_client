import { createGlobalStyle } from "styled-components";
import reset from "styled-reset-advanced";

const GlobalStyle = createGlobalStyle`
${reset};

* {
    box-sizing: border-box;
    transition: all .5s;
}


body {
    padding-top: 5em;
    padding-bottom:50px;
    padding: 70px 0px 50px 0px;
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
