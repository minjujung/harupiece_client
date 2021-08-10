import React from "react";
import styled from "styled-components";
import logo from "../assets/images/logo/large.png";

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
  height: 22.22vh;
  width: 100vw;
  bottom: 0;
  border-top: 1px solid #efefef;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

const LeftBox = styled.div`
  width: 50vw;
  height: 9.25vh;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  padding-top: 3.7vh;
  margin-left: 16vw;
  div {
    img {
      width: 250px;
      height: 40px;
    }
  }
`;

const RightBox = styled.div`
  width: 25vw;
  height: 9.25vh;
  padding-top: 12vh;
`;
