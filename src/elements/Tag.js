import React from "react";
import styled from "styled-components";

const Tag = ({ children, bg, color, padding, onClick, border, fontWeight }) => {
  const styles = { bg, color, padding, border, fontWeight };
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
  padding: false,
  onClick: () => {},
  border: "1px solid white",
  fontWeight: "",
};

export default Tag;

const TagFrame = styled.div`
  /* cursor: pointer; */
  border: ${(props) => props.border};
  background-color: ${(props) =>
    props.bg ? props.theme.colors[props.bg] : props.theme.colors.lightGray};
  color: ${(props) =>
    props.color
      ? props.theme.colors[props.color]
      : props.theme.colors.darkGray};
  ${(props) => (props.fontWeight ? `font-weight: ${props.fontWeight};` : null)};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border-radius: 27px;
  padding: ${(props) => (props.padding ? props.padding : "7px")};
  margin-right: 0.5em;

  ${({ theme }) => theme.device.desktopLg} {
    font-size: 14px;
  }
  ${({ theme }) => theme.device.desktop} {
    font-size: 13px;
  }
  ${({ theme }) => theme.device.tablet} {
    font-size: 12px;
  }
  /* mobile */
  ${({ theme }) => theme.device.mobileLg} {
    font-size: 13px;
  }
`;
