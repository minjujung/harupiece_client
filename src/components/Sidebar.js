import React from "react";
import styled from "styled-components";

import whiteClose from "../assets/images/icons/whiteClose.svg";
import right from "../assets/images/icons/arrow/right.svg";
import Image from "../elements/Image";
import levelData from "../shared/level";

const Sidebar = ({ width, height, children, xPosition, toggleMenu }) => {
  const styles = { width, height, xPosition };

  return (
    <ElSidebar {...styles}>
      <NavBtn>
        <Image
          sidebar
          width="18.5px"
          height="18.5px"
          borderRadius="0"
          src={whiteClose}
          alt="closeBtn"
          onClick={toggleMenu}
        />
      </NavBtn>{" "}
      <SideMenu>
        <InfoBox>
          {" "}
          <Image
            sidebar
            width="15.83vw"
            height="29.07%"
            borderRadius="50%"
            margin="0 auto 1.64% auto"
            src={levelData[9].img}
            alt="level_image"
          />
          <UserStatus>
            <Strong>로그인</Strong> 하여 자신만의 특별한
            <br />
            하루조각을 모아보세요!
          </UserStatus>
        </InfoBox>
        <Menu>
          마이페이지
          <Image
            sidebar
            width="10px"
            height="18px"
            src={right}
            alt="rightArrow"
          />
        </Menu>
      </SideMenu>
    </ElSidebar>
  );
};

export default Sidebar;

const ElSidebar = styled.header`
  display: none;
  ${({ theme }) => theme.device.mobileLg} {
    display: block;
    width: ${(props) => props.width};
    padding: 0;
    min-height: ${(props) => props.height};
    transform: ${(props) => `translateX(${props.xPosition}vw)`};
    background-color: #0000009c;
    position: fixed;
    top: 0;
    z-index: 20;
  }
`;

const NavBtn = styled.div`
  ${({ theme }) => theme.device.mobileLg} {
    width: 18.5px;
    height: 18.5px;
    position: absolute;
    right: 11.25vw;
    top: 5.09vh;
  }
`;

const SideMenu = styled.div`
  ${({ theme }) => theme.device.mobileLg} {
    width: 79.72vw;
    height: 100vh;
    background-color: white;
  }
`;

const InfoBox = styled.div`
  ${({ theme }) => theme.device.mobileLg} {
    width: 79.72vw;
    height: 29.3%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.mainGreen};
    position: relative;
  }
`;

const UserStatus = styled.p`
  ${({ theme }) => theme.device.mobileLg} {
    color: white;
    line-height: normal;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    text-align: center;
  }
`;

const Strong = styled.strong`
  ${({ theme }) => theme.device.mobileLg} {
    font-weight: bold;
  }
`;

const Menu = styled.div`
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    padding: 4.72vw;
    font-size: 12px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
