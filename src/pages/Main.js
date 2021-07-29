import React, { useEffect } from "react";
import styled from "styled-components";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MainSlider from "../components/MainSlider";
import Category from "../components/Category";
import { MainCreators } from "../redux/modules/main";
import { useDispatch } from "react-redux";

const Main = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(MainCreators.guestLoadDB());
  }, []);

  return (
    <React.Fragment>
      <Header />
      <Container>
        <MainSlider />
        <Category />
        <Category />
        <Category />
        <Category />
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Main;

const Container = styled.div`
  max-width: 43.75em;
  margin: 0 auto;
  width: 100%;
  position: absolute;
  left: 50%;
  top: 6em;
  transform: translateX(-50%);
`;
