import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userCreators } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie";
import { MainCreators as searchActions } from "../redux/modules/main";

const Header = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const [q, setQ] = useState("");

  const search = (e) => {
    e.preventDefault();
    dispatch(searchActions.searchDB(q));
    history.push(`/search/1/${q}`);
  };

  if (getCookie("token")) {
    return (
      <React.Fragment>
        <HeaderBox>
          <Container>
            <div>로고(하루조각)</div>
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
              <img width="10px" src={userInfo.profileImg} alt="" />
              <p>{userInfo.nickname}</p>
              <p>포인트 : {userInfo.point}</p>
              <button
                onClick={() => {
                  dispatch(userCreators.logOutDB());
                }}
              >
                로그아웃
              </button>
            </Container1>
          </Container>
        </HeaderBox>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <HeaderBox>
        <Container>
          <div>로고(하루조각)</div>
          <div>검색</div>
          <Container1>
            <button
              onClick={() => {
                history.push("/login");
              }}
            >
              로그인
            </button>
          </Container1>
        </Container>
      </HeaderBox>
    </React.Fragment>
  );
};

export default Header;

const HeaderBox = styled.div`
  height: 4em;
  width: 100%;
  top: 0;
  position: fixed;
  background-color: #c4c4c4;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Container1 = styled.div`
  display: flex;
`;
