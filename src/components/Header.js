import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userCreators } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie";

const Header = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <React.Fragment>
      <HeaderBox>
        <Container>
          <div onClick={() => history.push("/")}>로고(하루조각)</div>
          <div>검색</div>
          <Container1>
            {getCookie("token") && userInfo ? (
              <>
                {" "}
                <img
                  width="10px"
                  src={userInfo.profileImg}
                  alt="profile"
                  onClick={() => history.push("/mypage")}
                />
                <p>{userInfo.nickname}</p>
                <p>포인트 : {userInfo.point}</p>
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
