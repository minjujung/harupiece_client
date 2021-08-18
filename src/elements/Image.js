import React from "react";
import styled from "styled-components";

const Image = ({
  width,
  height,
  borderRadius,
  margin,
  border,
  marbleBorder,
  chatClose,
  post,
  card,
  mypage,
  onClick,
  maxHeight,
  src,
  alt,
}) => {
  const styles = {
    width,
    height,
    borderRadius,
    chatClose,
    border,
    margin,
    maxHeight,
    marbleBorder,
    post,
    mypage,
  };
  return <ImageFrame {...styles} src={src} alt={alt} onClick={onClick} />;
};

Image.defaultProps = {
  width: false,
  height: "",
  borderRadius: false,
  border: false,
  margin: false,
  marbleBorder: false,
  maxHeight: "",
  chatClose: false,
  post: false,
  mypage: false,
  onClick: () => {},
  alt: "",
  src: "",
};

export default Image;

const ImageFrame = styled.img`
  width: ${(props) => (props.width ? props.width : "17.8em")};
  height: ${(props) => (props.height ? props.height : "14.81vh")};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "8px 8px 0px 0px"};
  ${(props) =>
    props.border ? `border: 1px solid ${props.theme.colors.black};` : null}
  ${(props) => (props.marbleBorder ? `border: 2px solid #fff;` : null)}
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)};
  ${(props) =>
    props.chatClose ? `position:absolute; top: 1.3vh; right: 1.04vw;` : null};
  padding: 0;
  object-fit: fill;
  cursor: pointer;
  ${(props) => (props.post ? `object-fit: cover` : null)};
  ${(props) => (props.maxHeight ? `max-height: ${props.maxHeight}` : null)};
  /* ${({ theme }) => theme.device.mobileLg} {
  } */
`;
