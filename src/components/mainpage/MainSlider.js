import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { Tag } from "../../elements";
import left from "../../assets/images/icons/arrow/left.svg";
import Right from "../../assets/images/icons/arrow/right.svg";

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
          {slideImages.map((l, idx) => {
            return (
              <Slide>
                <SliderBox
                  style={{
                    backgroundImage: `url(${l})`,
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
                  <TitleBox>
                    <div>주 2회</div>
                    <div>1만보 걷기</div>
                  </TitleBox>
                  <SubTitleBox>
                    <span>10일째</span> 진행중!
                  </SubTitleBox>
                </SliderBox>
              </Slide>
            );
          })}
        </SliderContainer>
        <PrevBtn onClick={prevSlide}>
          <img style={{ width: "50%" }} src={left} alt="" />
        </PrevBtn>

        <NextBtn onClick={nextSlide}>
          <img style={{ width: "50%" }} src={Right} alt="" />
        </NextBtn>
      </Container>
      {/* Moblie */}
    </>
  );
};

export default MainSlider;

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  ${({ theme }) => theme.device.mobileLg} {
    display: none;
  }
`;

const PrevBtn = styled.button`
  background-color: #fff;
  border-radius: 50%;
  opacity: 0.7;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 40%;
  left: 3%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NextBtn = styled.button`
  background-color: #fff;
  border-radius: 50%;
  opacity: 0.7;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 40%;
  right: 3%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderContainer = styled.div`
  width: 100%;
  display: flex; //이미지들을 가로로 나열합니다.
`;

const Slide = styled.div`
  width: 950px;
  border-radius: 10px;
  padding-right: 10px;
`;

const SliderBox = styled.div`
  width: 950px;
  height: 30vh;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 100px;
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
  display: flex;
  div {
    padding-right: 10px;
  }
`;

const SubTitleBox = styled.div`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: -0.08em;
  span {
    border-bottom: 1px solid white;
  }
`;
