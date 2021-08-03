import React, { useState } from "react";
import styled from "styled-components";
import { MainCreators as searchActions } from "../redux/modules/main";

import levelData from "../shared/level";

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
        <Container>
          <div onClick={() => history.push("/")}>로고(하루조각)</div>
          <form>
            <label htmlFor="search-form">
              <input
                type="search"
                id="search-form"
                placeholder="Search for..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </label>
            <input type="submit" onClick={search} />
          </form>
          <Container1>
            {getCookie("token") && userInfo ? (
              <>
                {" "}
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={userInfo.profileImg}
                  alt="profile"
                  onClick={() => history.push("/mypage/now")}
                />
                <p>{userInfo.nickname}</p>
                <p>포인트 : {userInfo.point}</p>
                <img
                  src={levelData[userInfo.memberLevel - 1]?.img}
                  alt="level_image"
                  style={{ width: "3em", height: "3em", margin: "0 1em" }}
                />
                <button
                  onClick={() => {
                    dispatch(userCreators.logOutDB());
                  }}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  history.push("/login");
                }}
              >
                로그인
              </button>
            )}
          </Container1>
        </Container>
      </HeaderBox>
    </React.Fragment>
  );
};

export default Header;

const HeaderBox = styled.div`
  height: 4em;
  width: 56em;
  top: 0;
  position: absolute;
  background-color: #c4c4c4;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Container1 = styled.div`
  display: flex;
`;
