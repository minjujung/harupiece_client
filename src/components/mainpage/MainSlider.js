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
    "https://i.ibb.co/YQCrYJR/banner-01.png",
    "https://i.ibb.co/0KmsdWb/banner-02.png",
    "https://i.ibb.co/rcfQJhp/banner-03.png",
    "https://i.ibb.co/y6HNN1Q/banner-04.png",
  ];

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    prevArrow: (
      <PrevArrowBox>
        <img src="https://i.ibb.co/nMW8sSq/banner-arrow-left.png" alt="" />
      </PrevArrowBox>
    ),
    nextArrow: (
      <NextArrowBox>
        <img src="https://i.ibb.co/hM4W1HZ/banner-arrow-right.png" alt="" />
      </NextArrowBox>
    ),
  };

  return (
    <>
      <Contain>
        <Slide style={{ borderRadius: "10px" }} easing="ease" {...properties}>
          <div
            style={{ height: "250px", borderRadius: "10px" }}
            className="each-slide"
          >
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
          <div className="each-slide" style={{ borderRadius: "10px" }}>
            <SliderBox
              style={{
                borderRadius: "10px",
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
          <div className="each-slide" style={{ borderRadius: "10px" }}>
            <SliderBox
              style={{
                borderRadius: "10px",
                background: `url(${slideImages[3]}) no-repeat center center`,
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
