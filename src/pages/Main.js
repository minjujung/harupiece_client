import React, { useEffect } from "react";
import styled from "styled-components";

import Footer from "../components/Footer";
import MainSlider from "../components/mainpage/MainSlider";
import Category from "../components/mainpage/Category";
import Popular from "../components/mainpage/Popular";
import Info from "../components/mainpage/Info";

import { getCookie } from "../shared/Cookie";
import { history } from "../redux/configureStore";
import { MainCreators } from "../redux/modules/main";
import { actionCreators as createActions } from "../redux/modules/challengeCreate";
import { useDispatch } from "react-redux";

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
    dispatch(createActions.setGoodPreview(""));
    dispatch(createActions.setBadPreview(""));
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
            <Button onClick={goToCreate}>챌린지등록하기+</Button>
          ) : (
            <Button onClick={goToLogin}>로그인 하기</Button>
          )}

          <Popular />
        </ContainerRight>
      </Container>
      {/* <Footer /> */}
    </>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 50vh;
  padding-left: 320px;
  padding-right: 320px;
  margin: 70px auto;
`;

const ContainerLeft = styled.div`
  width: 49.48vw;
  height: 77.22vh;
  margin-right: 20px;
`;

const ContainerRight = styled.div`
  width: 16.15vw;
  height: 77.22vh;
`;

const Button = styled.button`
  width: 16.15vw;
  height: 6.27vh;
  background-color: ${({ theme }) => theme.colors.mainGreen};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
