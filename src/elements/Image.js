import React from "react";
import styled from "styled-components";

const Image = ({ width, height, borderRadius, src, alt , _onClick, cursor }) => {
  const styles = { width, height, borderRadius , cursor};
  return <ImageFrame {...styles} onClick={_onClick}  src={src} alt={alt} />;
};

Image.defaultProps = {
  width: false,
  height: false,
  borderRadius: false,
  alt: "",
  src: "",
  _onClick: () => {},
};

export default Image;


const ImageFrame = styled.img`
  width: ${(props) => (props.width ? props.width : "17.8em")};
  height: ${(props) => (props.height ? props.height : "10em")};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "8px 8px 0px 0px"};
  cursor: pointer;
`;
