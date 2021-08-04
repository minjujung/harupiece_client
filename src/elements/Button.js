import React from "react";
import styled from "styled-components";

const Button = ({ width, height, bg, color, fontsize, _onClick, text ,children  }) => {
  const styles = { width, height, bg, color, fontsize };
  return <ElButton onClick={_onClick} {...styles}>{text ? text : children}</ElButton>;
};

Image.defaultProps = {
  children: null,
  width: "100%",
  color: false,
  bg: false,
  text: false,
  fontsize: false,
  _onClick: () => {},
};

export default Button;

const ElButton = styled.button`
  background-color: ${(props) =>
    props.bg ? props.theme.colors[props.bg] : props.theme.colors.mainGreen};
  color: ${(props) =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.white};
  font-size: ${(props) =>
    props.fontsize ? props.theme.fontSizes[props.fontSizes] : props.theme.fontSizes.md};
  border-radius: 0.5em;
`;
