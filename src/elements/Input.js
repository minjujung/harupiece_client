import React from "react";
import styled from "styled-components";

function Input(props) {
  const {
    label,
    placeholder,
    type,
    multiLine,
    value,
    is_Submit,
    onSubmit,
    onChange,
  } = props;
  return (
    <>
      <ElInput
        label={label}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  is_Submit: false,
  onChange: () => {},
};

const ElInput = styled.input`
  border-bottom: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input;
