import React, { useState } from "react";
import styled from "styled-components";
import { MainCreators as searchActions } from "../redux/modules/main";
// image
import { Image } from "../elements/index";
import levelData from "../shared/level";
import logo from "../images/logo/large.png";
import close from "../images/icons/close.svg";
import login from "../images/icons/login.svg";
import myPage from "../images/icons/profile.svg";
import Search from "../images/icons/search.svg";
import profile from "../images/logo/profile.png";
// modal
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import { useDispatch, useSelector } from "react-redux";
import { userCreators } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie";

const Header = (props) => {
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

  const search = (e) => {
    e.preventDefault();
    dispatch(searchActions.searchDB(q));
    history.push(`/search/1/${q}`);
  };

  return (
    <React.Fragment>
      <HeaderBox>
        <div onClick={() => history.push("/")}>
          <Image width="220px" height="40px" cursor src={logo} />
        </div>
        <Container1>
          <div>
            <HeaderSerBtn onClick={handleClickOpen}>
              <Image width="22px" height="23px" cursor src={Search} />
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
                  <Image width="220px" height="40px" cursor src={logo} />
                </LogoBox>
                <SearchBox>
                  <SearchLeftBox>
                    <Image width="22px" height="23px" cursor src={Search} />
                    <label htmlFor="search-form">
                      <input
                        type="search"
                        id="search-form"
                        placeholder="검색어를 입력해주세요."
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                      />
                    </label>
                  </SearchLeftBox>
                  <SearchRightBox>
                    <Image width="18px" height="18px" cursor src={close} />
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
                <Image width="22px" height="23px" cursor src={login} />
                <p>로그아웃</p>
              </HeaderLogBtn>
              <HeaderMyBtn
                onClick={() => {
                  history.push("/mypage/now");
                }}
              >
                <Image width="22px" height="23px" cursor src={myPage} />
                <p>마이페이지</p>
              </HeaderMyBtn>
              <Image
                src={userInfo.profileImg === "" ? profile : userInfo.profileImg}
                alt="profile"
                width="42px"
                height="42px"
                borderRadius="8px"
              />
            </>
          ) : (
            <>
              <HeaderLogBtn
                onClick={() => {
                  history.push("/login");
                }}
              >
                <Image width="22px" height="23px" cursor src={login} />
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
`;

const LogoBox = styled.div`
  width: 10vw;
  margin-left: 9.7vw;
`;

const SearchBox = styled.div`
  width: 45vw;
  border-bottom: 3px solid #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  margin-right: 10.3vw;
`;
const SearchLeftBox = styled.div`
  display: flex;
  align-items: center;
`;
const SearchRightBox = styled.div``;

const HeaderBox = styled.div`
  height: 10.55vh;
  width: 100vw;
  top: 0;
  padding: 0 16.67vw;
  position: fixed;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 2px solid #eeeeee;
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

const Form = styled.form`
  display: flex;
  label {
    input {
      width: 100px;
      height: 37px;
    }
  }
`;

const Container1 = styled.div`
  width: 350px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
