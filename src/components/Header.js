import React, { useState } from "react";
import styled from "styled-components";
import { MainCreators as searchActions } from "../redux/modules/main";

import { Image } from "../elements/index";
import levelData from "../shared/level";

import logo from "../images/logo/large.png";
import login from "../images/icon/login.png";
import myPage from "../images/icon/profile.png";
import Search from "../images/icon/search.png";

import { useDispatch, useSelector } from "react-redux";
import { userCreators } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie";

const Header = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

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
          <Image width="220px" height="34px" cursor src={logo} />
        </div>
        <Container1>
          <Form>
            <label htmlFor="search-form">
              <input
                type="search"
                id="search-form"
                placeholder="Search for..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </label>
            <HeaderSerBtn type="submit" onClick={search}>
              <Image width="22px" height="23px" cursor src={Search} />
              <p>검색</p>
            </HeaderSerBtn>
          </Form>
          {getCookie("token") && userInfo ? (
            <>
              {" "}
              <HeaderLogBtn>
                <Image
                  onClick={() => {
                    dispatch(userCreators.logOutDB());
                  }}
                  width="22px"
                  height="23px"
                  cursor
                  src={login}
                />
                <p>로그아웃</p>
              </HeaderLogBtn>
              <HeaderMyBtn>
                <Image
                  onClick={() => {
                    history.push("/mypage/now");
                  }}
                  width="22px"
                  height="23px"
                  cursor
                  src={myPage}
                />
                <p>마이페이지</p>
              </HeaderMyBtn>
              <Image src={userInfo.profileImg} width="42px" height="42px" />
            </>
          ) : (
            <HeaderLogBtn>
              <Image
                onClick={() => {
                  history.push("/login");
                }}
                width="22px"
                height="23px"
                cursor
                src={login}
              />
              <p>로그인</p>
            </HeaderLogBtn>
          )}
        </Container1>
      </HeaderBox>
    </React.Fragment>
  );
};

export default Header;

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
  margin-right: 10px;
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
  margin-right: 10px;
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
`;

const Container1 = styled.div`
  display: flex;
`;
