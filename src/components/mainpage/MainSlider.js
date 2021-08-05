import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { history } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../shared/Cookie";

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import { Tag } from "../../elements";

const MainSlider = (props) => {
  const main_list = useSelector((state) => state.main);

  const slideImages = [
    // "https://images.theconversation.com/files/35050/original/hws8ftp8-1384300615.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop",
    // "https://live-production.wcms.abc-cdn.net.au/3ddf1568faa0c258bf2a734aafbeeb68?impolicy=wcms_crop_resize&cropH=1688&cropW=3000&xPos=0&yPos=0&width=862&height=485",
    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Mmg90FMgb9CTBC3ft6h0RPjrdsqeHZ5TWA&usqp=CAU",
  ];

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    prevArrow: (
      <PrevArrowBox>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        </svg>
      </PrevArrowBox>
    ),
    nextArrow: (
      <NextArrowBox>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        </svg>
      </NextArrowBox>
    ),
  };

  return (
    <>
      <Contain>
        <Slide easing="ease" {...properties}>
          <div style={{ height: "250px" }} className="each-slide">
            <SliderBox
              style={{
                background: `url(${slideImages[0]}) no-repeat center center`,
              }}
            >
              <TagBox>
                <Tag bg="none" color="white">
                  #2주
                </Tag>
                <Tag bg="none" color="white">
                  #인기챌린지
                </Tag>
              </TagBox>
              <TitleBox>주 2회 1만보 걷기</TitleBox>
              <SubTitleBox>
                <span>10일째</span> 진행중!
              </SubTitleBox>
            </SliderBox>
          </div>
          <div className="each-slide">
            <SliderBox
              style={{
                background: `url(${slideImages[1]}) no-repeat center center`,
              }}
            >
              <TagBox>
                <Tag bg="none" color="white">
                  #2주
                </Tag>
                <Tag bg="none" color="white">
                  #인기챌린지
                </Tag>
              </TagBox>
              <TitleBox>주 2회 1만보 걷기</TitleBox>
              <SubTitleBox>
                <span>10일째</span> 진행중!
              </SubTitleBox>
            </SliderBox>
          </div>
          <div className="each-slide">
            <SliderBox
              style={{
                background: `url(${slideImages[2]}) no-repeat center center`,
              }}
            >
              <TagBox>
                <Tag bg="none" color="white">
                  #2주
                </Tag>
                <Tag bg="none" color="white">
                  #인기챌린지
                </Tag>
              </TagBox>
              <TitleBox>주 2회 1만보 걷기</TitleBox>
              <SubTitleBox>
                <span>10일째</span> 진행중!
              </SubTitleBox>
            </SliderBox>
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
  height: 25.77vh;
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

const PrevArrowBox = styled.button`
  width: 34px;
  height: 32px;
  background-color: white;
  border-radius: 50%;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  svg {
    font-size: 12px;
    width: 14px;
  }
`;

const NextArrowBox = styled.button`
  width: 34px;
  height: 32px;
  background-color: white;
  border-radius: 50%;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  svg {
    font-size: 12px;
    width: 14px;
  }
`;

const SliderBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 250px;
  background-size: cover;
  padding: 0px 15px;
  font-size: 16px;
`;

const TagBox = styled.div`
  display: flex;
`;

const TitleBox = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  padding: 15px 0;
`;

const SubTitleBox = styled.div`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.white};
  span {
    border-bottom: 1px solid white;
  }
`;
