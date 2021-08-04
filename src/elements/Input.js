import React from "react";
import styled from "styled-components";

function Input(props) {
  const {
    width,
    label,
    placeholder,
    type,
    multiLine,
    value,
    is_Submit,
    onSubmit,
    onChange,
  } = props;

  const styles = { width: width };
  return (
    <>
      <ElInput
        {...styles}
        label={label}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
      />
    </>
  );
}

Input.defaultProps = {
  width: "100%",
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  is_Submit: false,
  onChange: () => {},
};

const ElInput = styled.input`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  width: ${(props) => props.width};
  padding: 12px 4px;
  box-sizing: border-box;
  :focus {
    border: 2px solid ${({ theme }) => theme.colors.mainGreen};
  }
`;

export default Input;
