import React from "react";
import styled from "styled-components";

const Image = ({ width, height, borderRadius, src, alt }) => {
  const styles = { width, height, borderRadius };
  return <ImageFrame {...styles} src={src} alt={alt} />;
};

Image.defaultProps = {
  width: false,
  height: false,
  borderRadius: false,
  alt: "",
  src: "",
};

export default Image;

const ImageFrame = styled.img`
  width: ${(props) => (props.width ? props.width : "17.8em")};
  height: ${(props) => (props.height ? props.height : "10em")};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "8px 8px 0px 0px"};
`;
