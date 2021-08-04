import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { history } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../shared/Cookie";

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const MainSlider = (props) => {
  const main_list = useSelector((state) => state.main);

  const slideImages = [
    "https://images.theconversation.com/files/35050/original/hws8ftp8-1384300615.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop",
    "https://live-production.wcms.abc-cdn.net.au/3ddf1568faa0c258bf2a734aafbeeb68?impolicy=wcms_crop_resize&cropH=1688&cropW=3000&xPos=0&yPos=0&width=862&height=485",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Mmg90FMgb9CTBC3ft6h0RPjrdsqeHZ5TWA&usqp=CAU",
  ];

  return (
    <>
      <Contain>
        <Slide easing="ease">
          <div style={{ height: "250px" }} className="each-slide">
            <div
              style={{
                height: "250px",
                backgroundImage: `url(${slideImages[0]})`,
              }}
            >
              <span>Slide 1</span>
            </div>
          </div>
          <div className="each-slide">
            <div
              style={{
                height: "250px",
                backgroundImage: `url(${slideImages[1]})`,
              }}
            >
              <span>Slide 2</span>
            </div>
          </div>
          <div className="each-slide">
            <div
              style={{
                height: "250px",
                backgroundImage: `url(${slideImages[2]})`,
              }}
            >
              <span>Slide 3</span>
            </div>
          </div>
        </Slide>
      </Contain>
    </>
  );
};

export default MainSlider;

const Contain = styled.div`
  display: flex;
  width: 49.48vw;
  height: 27.77vh;
  border-radius: 8px;
  flex-direction: column;
  & > div > p {
    margin: 0px;
  }

  & > div {
    background-color: #c4c4c4;
    width: 100%;
    text-align: center;
  }
  margin-bottom: 20px;
`;
