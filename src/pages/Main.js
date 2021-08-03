import React, { useEffect } from "react";
import styled from "styled-components";

import Footer from "../components/Footer";
import MainSlider from "../components/mainpage/MainSlider";
import Category from "../components/mainpage/Category";
import Popular from "../components/mainpage/Popular";

import { history } from "../redux/configureStore";
import { MainCreators } from "../redux/modules/main";
import { useDispatch } from "react-redux";
import { getCookie } from "../shared/Cookie";

const Main = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (getCookie("token")) {
      dispatch(MainCreators.userLoadDB());
    } else {
      dispatch(MainCreators.guestLoadDB());
    }
  }, []);

  const goToCreate = () => {
    if (getCookie("token")) {
      history.push("/challenge");
    } else {
      window.alert("로그인이 필요한 서비스 입니다!");
    }
  };

  return (
    <Container>
      <MainSlider />
      <Popular />
      <Category />
      <button onClick={goToCreate}>챌린지 개설하기</button>
      <Footer />
    </Container>
  );
};

export default Main;

const Container = styled.div`
  width: 56em;
  height: 100%;
`;
