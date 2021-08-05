import { createGlobalStyle } from "styled-components";
import reset from "styled-reset-advanced";

const GlobalStyle = createGlobalStyle`
${reset};

* {
    box-sizing: border-box;
}

<<<<<<< HEAD
body {
    padding: 70px 0px 50px 0px;
 
}
=======
/* body {
    padding: 70px 20em 50px 20em;
} */
>>>>>>> 692716e6ddd356b57161cd50648abf0084ed6366

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
