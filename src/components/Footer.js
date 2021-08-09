import React from "react";
import styled from "styled-components";
import logo from "../images/logo/large.png";

const Footer = (props) => {
  return (
    <React.Fragment>
      <FooterBox>
        <LeftBox>
          <div>
            <img src={logo} alt="mainLogo" />
          </div>
          <div>당신의 건강 챌린지를 도와주는 서비스 하루조각</div>
        </LeftBox>
        <RightBox>
          <div>공식계정</div>
        </RightBox>
      </FooterBox>
    </React.Fragment>
  );
};

export default Footer;

const FooterBox = styled.div`
  height: 10vh;
  width: 100vw;
  bottom: 0;
  margin-top: 10px;
  background-color: #c4c4c4;
  display: flex;
  justify-content: space-between;
`;

const LeftBox = styled.div``;

const RightBox = styled.div``;
