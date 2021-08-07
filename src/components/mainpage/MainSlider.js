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
      <div
        style={{
          width: "48px",
          marginRight: "-50px",
        }}
      >
        <img
          style={{ paddingLeft: "15px" }}
          src="https://i.ibb.co/nMW8sSq/banner-arrow-left.png"
          alt=""
        />
      </div>
    ),
    nextArrow: (
      <div
        style={{
          width: "48px",
          marginLeft: "-60px",
        }}
      >
        <img src="https://i.ibb.co/hM4W1HZ/banner-arrow-right.png" alt="" />
      </div>
    ),
  };

  return (
    <>
      <Contain>
        <Slide easing="ease" {...properties}>
          {slideImages.map((l, idx) => (
            <div key={idx} className="each-slide">
              <SliderBox style={{ backgroundImage: `url(${l})` }}>
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
          ))}
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
  margin-bottom: 20px;
`;

const SliderBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 250px;
  padding: 0px 80px;
  font-size: 16px;
  border-radius: 10px;
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
