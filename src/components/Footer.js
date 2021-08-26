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
          <div>당신의 건강한 도전을 위한, 하루조각</div>
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
  height: 240px;
  /* height: 22.22vh; */
  width: 100%;
  border-top: 1px solid #efefef;
  /* z-index: 10; */
  /* margin-top: 11.76vh; */
  position: absolute;
  bottom: 0;
  ${({ theme }) => theme.device.mobileLg} {
    height: 50vw;
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
      width: 220px;
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
