import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { Tag } from "../../elements";

const TOTAL_SLIDES = 3;

const MainSlider = (props) => {
  const main_list = useSelector((state) => state.main);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFlowing, setIsFlowing] = useState(true);
  const slideRef = useRef(null);

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = "all .5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
    let intervalId;
    if (isFlowing) {
      intervalId = setInterval(() => {
        setCurrentSlide(currentSlide + 1);
      }, 5000);
    }
    if (currentSlide === 4) {
      setCurrentSlide(0);
    }
    return () => clearTimeout(intervalId);
  }, [currentSlide, setCurrentSlide, isFlowing]);

  const slideImages = [
    "https://i.ibb.co/YQCrYJR/banner-01.png",
    "https://i.ibb.co/0KmsdWb/banner-02.png",
    "https://i.ibb.co/rcfQJhp/banner-03.png",
    "https://i.ibb.co/y6HNN1Q/banner-04.png",
  ];

  return (
    <>
      <Container>
        <SliderContainer
          onMouseOver={() => setIsFlowing(false)}
          onMouseOut={() => setIsFlowing(true)}
          ref={slideRef}
        >
          <Slide>
            <IMG src={slideImages[0]} />
          </Slide>
          <Slide>
            <IMG src={slideImages[1]} />
          </Slide>
          <Slide>
            <IMG src={slideImages[2]} />
          </Slide>
          <Slide>
            <IMG src={slideImages[3]} />
          </Slide>
        </SliderContainer>
        <div onClick={prevSlide}>Previous Slide</div>
        <div onClick={nextSlide}>Next Slide</div>
      </Container>
    </>
  );
};

export default MainSlider;

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  ${({ theme }) => theme.device.mobileLg} {
  }
`;

const Button = styled.button`
  all: unset;
  border: 1px solid coral;
  padding: 0.5em 2em;
  color: coral;
  border-radius: 10px;
`;

const SliderContainer = styled.div`
  width: 100%;
  display: flex; //이미지들을 가로로 나열합니다.
`;

const Slide = styled.div`
  width: 950px;
  padding-right: 10px;
`;

const IMG = styled.img`
  width: 950px;
  height: 30vh;
`;

const SliderBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 250px;
  padding: 0px 70px;
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
  letter-spacing: -0.08em;
`;

const SubTitleBox = styled.div`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: -0.08em;
  span {
    border-bottom: 1px solid white;
  }
`;
