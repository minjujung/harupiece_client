import React from "react";
import styled from "styled-components";

const Tag = ({ children, bg, color }) => {
  const styles = { bg, color };
  return <TagFrame {...styles}>{children}</TagFrame>;
};

Tag.defaultProps = {
  children: null,
  bg: false,
  color: false,
};

export default Tag;

const TagFrame = styled.div`
  border: 1px solid white;
  background-color: ${(props) =>
    props.bg ? props.theme.colors[props.bg] : props.theme.colors.lightGray};
  color: ${(props) =>
    props.color
      ? props.theme.colors[props.color]
      : props.theme.colors.darkGray};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border-radius: 1.7em;
  padding: 10px;
  margin-right: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
`;
