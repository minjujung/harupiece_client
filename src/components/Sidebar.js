import React from "react";
import styled from "styled-components";

import profileGreen from "../assets/images/icons/profileGreen.svg";
import whiteClose from "../assets/images/icons/whiteClose.svg";
import right from "../assets/images/icons/arrow/right.svg";
import Image from "../elements/Image";
import levelData from "../shared/level";

import { getCookie } from "../shared/Cookie";
import { userCreators } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

const Sidebar = ({ width, height, children, xPosition, toggleMenu }) => {
  const styles = { width, height, xPosition };

  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.userInfo);
  const levelState = parseInt((user_info?.memberLevel - 1) / 5);

  const is_login =
    getCookie("token") && user_info?.memberId !== null ? true : false;

  const goToMyPage = () => {
    if (is_login) {
      history.push("/mypage/now");
      toggleMenu();
    } else {
      setTimeout(() => window.alert("로그인이 필요합니다!"), 300);
      history.push("/login");
      toggleMenu();
    }
  };

  const goToLogin = () => {
    history.push("/login");
    toggleMenu();
  };

  const goToSignup = () => {
    history.push("/signup");
    toggleMenu();
  };

  const logout = () => {
    dispatch(userCreators.logOutDB());
    toggleMenu();
  };

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
        {" "}
        {is_login ? (
          <>
            <InfoBox login>
              <Image
                sidebar
                width="12.5vw"
                height="12.5vw"
                margin="0 auto 1.64% auto"
                src={
                  user_info?.profileImg === ""
                    ? levelData[9].img
                    : user_info?.profileImg
                }
                alt="level_image"
              />
              <UserStatus>
                <Strong>{user_info?.nickname}</Strong>님
              </UserStatus>
            </InfoBox>
            <UserInfoBox>
              <Box>
                등급
                <br />
                <strong>
                  {levelData[levelState] &&
                    levelData[levelState].name?.split(" ")[0]}
                </strong>
              </Box>
              <Box center>
                총 조각
                <br />
                <strong>{user_info?.point}개</strong>
              </Box>
              <Box>
                진행 챌린지
                <br />
                <strong>{user_info && user_info.challengeCount}개</strong>
              </Box>
            </UserInfoBox>
          </>
        ) : (
          <>
            <InfoBox>
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
          </>
        )}
        {is_login ? (
          <>
            <Menu onClick={goToMyPage}>
              마이페이지
              <Image
                sidebar
                width="10px"
                height="18px"
                src={right}
                alt="rightArrow"
              />
            </Menu>
            <Menu onClick={logout}>
              로그아웃
              <Image
                sidebar
                width="10px"
                height="18px"
                src={right}
                alt="rightArrow"
              />
            </Menu>
          </>
        ) : (
          <>
            {" "}
            <Menu onClick={goToLogin}>
              로그인
              <Image
                sidebar
                width="10px"
                height="18px"
                src={right}
                alt="rightArrow"
              />
            </Menu>
            <Menu onClick={goToSignup}>
              회원가입
              <Image
                sidebar
                width="10px"
                height="18px"
                src={right}
                alt="rightArrow"
              />
            </Menu>
          </>
        )}
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
    z-index: 200;
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
    height: ${(props) => (props.login ? "18.59%" : "29.3%")};
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

const UserInfoBox = styled.ul`
  display: flex;
  width: 100%;
  height: 10.94vh;
  border-bottom: 8px solid #eee;
`;
const Box = styled.li`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3.13vh 5vw;
  font-size: 12px;
  line-height: normal;
  text-align: center;
  strong {
    color: ${({ theme }) => theme.colors.mainGreen};
  }
  ${(props) =>
    props.center
      ? "border-color: #eee; border-style: solid; border-width:0 2px 0 2px;"
      : null}
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
    border-bottom: 0.5px solid ${({ theme }) => theme.colors.gray};
  }
`;
