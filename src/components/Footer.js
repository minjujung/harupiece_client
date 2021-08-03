import React from "react";
import styled from "styled-components";

const Footer = (props) => {
  return (
    <React.Fragment>
      <FooterBox>Footer</FooterBox>
    </React.Fragment>
  );
};

export default Footer;

const FooterBox = styled.div`
  height: 4em;
  width: 56em;
  bottom: 0;
  position: relative;
  background-color: #c4c4c4;
`;
