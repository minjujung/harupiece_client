import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
// slide 라이브러리
import { Slide } from "react-slideshow-image";
import "../../assets/styles/Slider.css";
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
      <PreveBox
        style={{
          width: "48px",
          marginRight: "-50px",
          zIndex: "1",
        }}
      >
        <img
          style={{ paddingLeft: "15px" }}
          src="https://i.ibb.co/nMW8sSq/banner-arrow-left.png"
          alt=""
        />
      </PreveBox>
    ),
    nextArrow: (
      <NextBox
        style={{
          width: "48px",
          marginLeft: "-70px",
          zIndex: "0",
        }}
      >
        <img src="https://i.ibb.co/hM4W1HZ/banner-arrow-right.png" alt="" />
      </NextBox>
    ),
  };

  return (
    <>
      <Contain>
        <Slide easing="ease" {...properties}>
          {slideImages.map((l, idx) => (
            <div
              key={idx}
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                borderRadius: "10px",
              }}
              className="each-slide"
            >
              <SliderBox style={{ backgroundImage: `url(${l})` }}>
                <TagBox>
                  <Tag bg="none" color="white">
                    #2주
                  </Tag>
                  <Tag bg="none" color="white">
                    #인기챌린지
                  </Tag>
                </TagBox>
                <TitleBox>
                  <div>주 2회</div>
                  <div>1만보 걷기</div>
                </TitleBox>
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

  ${({ theme }) => theme.device.mobileLg} {
    width: 100vw;
    height: 100vh;
    border-radius: 10px;
    padding-left: 10px;
  }
`;

const PreveBox = styled.div`
  display: none;
`;

const NextBox = styled.div`
  display: none;
`;

const SliderBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 250px;
  padding: 0px 70px;
  font-size: 16px;
  border-radius: 10px;
  ${({ theme }) => theme.device.mobileLg} {
    width: 330px;
    height: 180px;
    margin-top: 7vh;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 15px;
  }
`;

const TagBox = styled.div`
  display: flex;
  ${({ theme }) => theme.device.mobileLg} {
    font-size: 23px;
  }
`;

const TitleBox = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  padding: 15px 0;
  letter-spacing: -0.08em;
  display: flex;
  width: 14vw;
  justify-content: space-between;
  ${({ theme }) => theme.device.mobileLg} {
    font-size: 28px;
    white-space: normal;
    display: flex;
    flex-direction: column;
    width: 35vw;
    padding: 10px 0;
  }
`;

const SubTitleBox = styled.div`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: -0.08em;
  ${({ theme }) => theme.device.mobileLg} {
    font-size: 28px;
  }
  span {
    border-bottom: 1px solid white;
  }
`;
