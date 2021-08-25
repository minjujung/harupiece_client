import React from "react";
import styled, { keyframes } from "styled-components";

const Toast = ({ msg }) => <Message>{msg}</Message>;

Toast.defaultProps = {
  msg: "",
};

export default Toast;

const fadeout = keyframes`
0% {
    opacity: 1;
}
30% {
    opacity: 1;
    
}
80% {
    opacity: 0;
    
}

100% {
    opacity: 0;
}
`;

const Message = styled.p`
  width: 155px;
  color: white;
  background-color: darkgray;
  padding: 2%;
  position: absolute;
  right: 0;
  bottom: 3vw;
  border-radius: 8px;
  text-align: center;
  animation: ${fadeout} 3s;
  -moz-animation: ${fadeout} 2s; /* Firefox */
  -webkit-animation: ${fadeout} 2s; /* Safari and Chrome */
  ${({ theme }) => theme.device.mobileLg} {
    height: auto;
    top: -12vw;
    bottom: inherit;
    padding: 3%;
  }
`;
