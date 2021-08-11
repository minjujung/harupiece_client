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
  width: 100%;
  position: relative;
  bottom: 0;
  border-top: 1px solid #efefef;
  /* display: flex;
  justify-content: space-between; */
  z-index: 10;
  margin-top: 11.76vh;
  ${({ theme }) => theme.device.mobileLg} {
    margin-bottom: 40px;
    position: inherit;
  }
`;

const LeftBox = styled.div`
  height: 9.25vh;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  padding-top: 5.7vh;
  margin-left: 16vw;
  div {
    img {
      width: 252px;
      height: 40px;
      margin-bottom: 1.8vh;
    }
  }
  ${({ theme }) => theme.device.mobileLg} {
    margin-left: 20px;
    div {
      width: 100%;
      font-size: 18px;
      img {
        width: 35vw;
        height: 3.12vh;
        margin-bottom: 40px;
      }
    }
  }
`;

const RightBox = styled.div`
  div {
    position: absolute;
    right: 16.67vw;
    bottom: 5vh;
  }
  ${({ theme }) => theme.device.mobileLg} {
    div {
      display: none;
    }
  }
`;
