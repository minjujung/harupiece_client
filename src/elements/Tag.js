import React from "react";
import styled from "styled-components";

const Tag = ({ children, bg, color, onClick }) => {
  const styles = { bg, color };
  return (
    <TagFrame onClick={onClick} {...styles}>
      {children}
    </TagFrame>
  );
};

Tag.defaultProps = {
  children: null,
  bg: false,
  color: false,
  onClick: () => {},
};

export default Tag;

const TagFrame = styled.div`
  cursor: pointer;
  border: 1px solid white;
  background-color: ${(props) =>
    props.bg ? props.theme.colors[props.bg] : props.theme.colors.lightGray};
  color: ${(props) =>
    props.color
      ? props.theme.colors[props.color]
      : props.theme.colors.darkGray};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border-radius: 27px;
  padding: 10px;
  margin-right: 0.5em;
`;
