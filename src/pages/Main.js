import React, { useEffect } from "react";
import styled from "styled-components";

import MainSlider from "../components/mainpage/MainSlider";
import Category from "../components/mainpage/Category";
import Popular from "../components/mainpage/Popular";
import Info from "../components/mainpage/Info";

import { getCookie } from "../shared/Cookie";
import { history } from "../redux/configureStore";
import { MainCreators } from "../redux/modules/main";
import { actionCreators as createActions } from "../redux/modules/challengeCreate";
import { useDispatch } from "react-redux";
import { Button } from "../elements";

const Main = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (getCookie("token")) {
      dispatch(MainCreators.userLoadDB());
    } else {
      dispatch(MainCreators.guestLoadDB());
    }
  }, []);

  const is_login = getCookie("token") ? true : false;

  const goToCreate = () => {
    history.push("/challenge");
  };

  const goToLogin = () => {
    history.push("/login");
  };

  return (
    <>
      <Container>
        <ContainerLeft>
          <MainSlider />
          <Category />
        </ContainerLeft>
        <ContainerRight>
          <Info />
          {is_login ? (
            <Button
              width="16.15vw"
              height="6.27vh"
              margin="0px 0px 20px 0px"
              _onClick={goToCreate}
            >
              챌린지등록하기+
            </Button>
          ) : (
            <Button
              width="16.15vw"
              height="6.27vh"
              margin="0px 0px 20px 0px"
              _onClick={goToLogin}
            >
              로그인 하기
            </Button>
          )}
          <Popular />
        </ContainerRight>
      </Container>
    </>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 78vh;
  margin-top: 70px;

  ${({ theme }) => theme.device.mobileLg} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    margin-top: 10px;
  }
`;

const ContainerLeft = styled.div`
  width: 49.48vw;
  height: 77.22vh;
  margin-right: 1.04vw;

  ${({ theme }) => theme.device.mobileLg} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
  }
`;

const ContainerRight = styled.div`
  width: 16.15vw;
  height: 77.22vh;
`;
