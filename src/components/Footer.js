import React from "react";
import styled from "styled-components";

import { Instagram } from "@material-ui/icons";
import logo from "../assets/images/logo/large.png";
import notion from "../assets/images/info/notion.png";
import github from "../assets/images/info/github.png";

import { history } from "../redux/configureStore";

const Footer = (props) => {
  const goToLanding = () => {
    history.push("/");
  };

  return (
    <>
      <FooterBox>
        <LeftBox>
          <img src={logo} alt="mainLogo" />
          <Text>당신의 건강한 도전을 위한, 하루조각</Text>
          <Menu>
            <List mobile>
              <Item onClick={goToLanding}>사이트 소개</Item>|
              <Item
                onClick={() => {
                  const link =
                    "https://docs.google.com/forms/d/e/1FAIpQLSeH4gVIXJabcI4CPQ89dffbu2MfPT__nGQr_VL7sG-J2ALGTQ/viewform";
                  window.open(link, "");
                }}
              >
                설문조사
              </Item>
              |<Item no_cursor>ver 1.0.0</Item>|
              <Item no_cursor>
                © 2021. Team. Harupiece Co. all rights reserved.
              </Item>
            </List>
            <List>
              <Item
                onClick={() => {
                  const link = "https://www.instagram.com/harupiece_official/";
                  window.open(link, "");
                }}
              >
                <Instagram
                  style={{ width: "28px", height: "28px", marginRight: "2%" }}
                />
              </Item>
              <Item
                onClick={() => {
                  const link = "https://github.com/OneDayPiece";
                  window.open(link, "");
                }}
              >
                <img
                  src={github}
                  alt="github"
                  style={{ width: "34px", height: "34px" }}
                />
              </Item>
              <Item
                onClick={() => {
                  const link =
                    "https://www.notion.so/fe1d19c624bc4746b505b50e03b396b8";
                  window.open(link, "");
                }}
              >
                <img
                  src={notion}
                  alt="notion"
                  style={{ width: "28px", height: "28px", marginRight: "2%" }}
                />
              </Item>
            </List>
          </Menu>
        </LeftBox>
      </FooterBox>
    </>
  );
};

export default Footer;

const FooterBox = styled.div`
  height: 240px;
  width: 100%;
  border-top: 1px solid #efefef;
  position: absolute;
  background-color: white;
  bottom: 0;
  z-index: 10;
`;

const LeftBox = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  padding-top: 5.7vh;
  margin: 0 15vw;
  img {
    width: 220px;
    height: 40px;
  }
  ${({ theme }) => theme.device.mobileLg} {
    margin: 0 20px;
    padding-top: 20px;
    img {
      width: 127px;
      height: 22px;
    }
  }
`;

const Menu = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  ${({ theme }) => theme.device.mobileLg} {
    margin-top: 15px;
    flex-direction: column;
  }
`;

const Text = styled.p`
  margin-top: 30px;
  font-size: 18px;
  padding-left: 10px;
  ${({ theme }) => theme.device.mobileLg} {
    padding: 0 5px;
    font-size: 14px;
  }
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.device.mobileLg} {
    ${(props) => (props.mobile ? "display: none;" : null)}
    margin-top: 10px;
  }
`;

const Item = styled.li`
  padding: 0 10px;
  font-size: 16px;
  ${(props) => (props.no_cursor ? null : "cursor:pointer;")}
  ${({ theme }) => theme.device.mobileLg} {
    padding: 0 3px;
    font-size: 12px;
    img {
      margin-right: 0;
    }
  }
`;
