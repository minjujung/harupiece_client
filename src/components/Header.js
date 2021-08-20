import React, { useState } from "react";
import styled from "styled-components";

// image
import { Image } from "../elements/index";
import logo from "../assets/images/logo/large.png";
import close from "../assets/images/icons/close.svg";
import login from "../assets/images/icons/login.svg";
import myPage from "../assets/images/icons/profile.svg";
import Search from "../assets/images/icons/search.svg";
import profile from "../assets/images/logo/profile.png";
import profileGreen from "../assets/images/icons/profileGreen.svg";
import menu from "../assets/images/icons/menubar.svg";

// modal
import Dialog from "@material-ui/core/Dialog";

import { useDispatch, useSelector } from "react-redux";
import { userCreators } from "../redux/modules/user";
import { MainCreators as searchActions } from "../redux/modules/main";
import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie";
import Sidebar from "./Sidebar";

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  // modal state
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // search state
  const [q, setQ] = useState("");

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const goHome = () => {
    history.push("/");
    handleClose();
  };

  const search = () => {
    if (q === "") {
      alert("검색어를 입력해주세요");
    } else {
      dispatch(searchActions.searchDB(q));
      history.push(`/search/1/${q}`);
      setQ("");
      handleClose();
    }
  };

  //mobile sidebar
  const [xPosition, setX] = useState(-100);

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-100);
    }
  };

  return (
    <React.Fragment>
      <Sidebar
        width="100vw"
        height="100%"
        xPosition={xPosition}
        toggleMenu={toggleMenu}
      >
        <h1>hello</h1>
      </Sidebar>
      <MobileHeader>
        <Image
          width="6.25vw"
          height="6.25vw"
          src={menu}
          alt="menu"
          borderRadius="0"
          onClick={toggleMenu}
        />

        <Image
          width="30.56vw"
          height="auto"
          cursor
          src={logo}
          onClick={() => history.push("/")}
        />
        <Image
          width="6.25vw"
          height="6.25vw"
          cursor
          src={Search}
          onClick={handleClickOpen}
        />
      </MobileHeader>
      <HeaderBox>
        <div onClick={goHome}>
          <Image width="220px" height="40px" src={logo} />
        </div>
        <Container1>
          <div>
            <HeaderSerBtn onClick={handleClickOpen}>
              <Image width="22px" height="23px" src={Search} />
              <p>검색</p>
            </HeaderSerBtn>
            <Dialog
              fullWidth={true}
              open={open}
              onClose={handleClose}
              maxWidth={false}
            >
              <SDialogContent>
                <LogoBox>
                  <div onClick={goHome}>
                    <Image
                      width="220px"
                      height="40px"
                      borderRadius="0"
                      src={logo}
                    />
                  </div>
                </LogoBox>
                <SearchBox>
                  <SearchLeftBox>
                    <button onClick={search}></button>
                    <Image width="22px" height="23px" src={Search} />
                    <label htmlFor="search-form">
                      <input
                        type="text"
                        id="search-form"
                        placeholder="검색어를 입력해주세요."
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        onKeyPress={onCheckEnter}
                      />
                    </label>
                  </SearchLeftBox>
                  <SearchRightBox>
                    <Image
                      width="18px"
                      height="18px"
                      borderRadius="0"
                      src={close}
                      onClick={(() => setQ(""), handleClose)}
                    />
                  </SearchRightBox>
                </SearchBox>
              </SDialogContent>
            </Dialog>
          </div>
          {getCookie("token") && userInfo ? (
            <>
              <HeaderLogBtn
                onClick={() => {
                  dispatch(userCreators.logOutDB());
                }}
              >
                <Image width="22px" height="23px" src={login} />
                <p>로그아웃</p>
              </HeaderLogBtn>
              <HeaderMyBtn
                onClick={() => {
                  history.push("/mypage/now");
                }}
              >
                <Image width="22px" height="23px" src={myPage} />
                <p>마이페이지</p>
              </HeaderMyBtn>
              <Image
                src={
                  userInfo.profileImg === "" ||
                  userInfo.profileImg ===
                    "https://onedaypiece-shot-image.s3.ap-northeast-2.amazonaws.com/green.svg"
                    ? profileGreen
                    : userInfo.profileImg
                }
                alt="profile"
                width="42px"
                height="42px"
                borderRadius="8px"
                post
              />
            </>
          ) : (
            <>
              <HeaderLogBtn
                onClick={() => {
                  history.push("/login");
                }}
              >
                <Image width="22px" height="23px" src={login} />
                <p>로그인</p>
              </HeaderLogBtn>
              <Image
                src={profile}
                alt="profile"
                width="42px"
                height="42px"
                borderRadius="8px"
              />
            </>
          )}
        </Container1>
      </HeaderBox>
    </React.Fragment>
  );
};

export default Header;

const MobileHeader = styled.header`
  display: none;
  ${({ theme }) => theme.device.mobileLg} {
    height: 8.75vh;
    width: 100%;
    top: 0;
    padding: 0 4.44vw;
    position: fixed;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.white};
    border-bottom: 2px solid #eeeeee;
  }
`;

const SDialogContent = styled.div`
  width: 100vw;
  top: 0;
  left: 0;
  position: fixed;
  padding: 27px;
  margin: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const LogoBox = styled.div`
  width: 10vw;
  margin-left: 9.7vw;
  ${({ theme }) => theme.device.mobileLg} {
    display: none;
  }
`;

const SearchBox = styled.div`
  width: 45vw;
  border-bottom: 3px solid #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  margin-right: 10.3vw;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    margin-right: 0;
  }
`;
const SearchLeftBox = styled.div`
  display: flex;
  align-items: center;
  label {
    padding-left: 0.5vw;
    input {
      width: 42vw;
    }
  }
  ${({ theme }) => theme.device.mobileLg} {
    flex: 10;
    input {
      font-size: 14px;
      padding-left: 10px;
    }
  }
`;
const SearchRightBox = styled.div`
  ${({ theme }) => theme.device.mobileLg} {
    flex: 1;
  }
`;

const HeaderBox = styled.div`
  height: 10.55vh;
  width: 100%;
  top: 0;
  padding: 0 16.67vw;
  position: fixed;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 2px solid #eeeeee;
  ${({ theme }) => theme.device.mobileLg} {
    display: none;
  }
`;

const HeaderSerBtn = styled.button`
  width: 28px;
  height: 37px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > p {
    margin-top: 8px;
    font-size: 14px;
  }
`;
const HeaderLogBtn = styled.button`
  width: 56px;
  height: 37px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > p {
    margin-top: 8px;
    font-size: 14px;
  }
`;
const HeaderMyBtn = styled.button`
  width: 70px;
  height: 37px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > p {
    margin-top: 8px;
    font-size: 14px;
  }
`;

const Container1 = styled.div`
  width: 350px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
