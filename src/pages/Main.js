import React, { useEffect } from "react";
import styled from "styled-components";

import Footer from "../components/Footer";
import MainSlider from "../components/MainSlider";
import Category from "../components/Category";

import { history } from "../redux/configureStore";
import { MainCreators } from "../redux/modules/main";
import { useDispatch, useSelector } from "react-redux";
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
    <div style={{ height: "auto" }}>
      <Container>
        <MainSlider />
        <Category />
        <button onClick={goToCreate}>챌린지 개설하기</button>
      </Container>
      <Footer />
    </div>
  );
};

export default Main;

const Container = styled.div`
  max-width: 43.75em;
  margin: 0 auto;
  width: 100%;
  height: 75vh;
  overflow-y: scroll;
  position: absolute;
  left: 50%;
  top: 6em;
  transform: translateX(-50%);
`;
