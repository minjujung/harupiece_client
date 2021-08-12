import React from "react";
import styled from "styled-components";
import logo from "../assets/images/logo/large.png";

const Footer = (props) => {
  return (
    <>
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
    </>
  );
};

export default Footer;

const FooterBox = styled.div`
  height: 22.22vh;
  width: 100%;
  border-top: 1px solid #efefef;
  z-index: 10;
  margin-top: 11.76vh;
  ${({ theme }) => theme.device.mobileLg} {
    margin: 0vh 0 3vh 0;
    position: inherit;
    height: 180px;
  }
`;

const LeftBox = styled.div`
  height: 12vh;
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
      font-size: 13px;
      img {
        width: 35vw;
        height: 3.12vh;
        margin-bottom: 40px;
      }
    }
  }
`;

const RightBox = styled.div`
  width: 100%;
  height: 15vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 25vw;
  div {
  }
  ${({ theme }) => theme.device.mobileLg} {
    div {
      display: none;
    }
  }
`;
