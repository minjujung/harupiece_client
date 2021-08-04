import React from "react";
import styled from "styled-components";

const Input = ({ 
  width,
  type, 
  placeholder,
  id,
  }) => {
  const styles =
  { 
    width,
    type,
    placeholder,
    id,
  };
  return (
    <ElInput 
    {...styles} 
    placeholder={placeholder} 
    type={type} 
    id={id}
    /> 
  );
};

Input.defaultProps = {
  width: "100%",
  placeholder: "",
  type: "",
  id: "",
  bg : "#ffffff",
};

const ElInput = styled.input`
  width: ${(props) => props.width};
  border-bottom: 2px solid ${({theme}) => theme.colors.black}
`;

export default Input;
