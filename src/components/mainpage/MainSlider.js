import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Tag } from "../../elements";
import { getCookie } from "../../shared/Cookie";
import left from "../../assets/images/icons/arrow/left.svg";
import Right from "../../assets/images/icons/arrow/right.svg";
import { history } from "../../redux/configureStore";

const TOTAL_SLIDES = 2;

const MainSlider = (props) => {
  const is_login = getCookie("token") ? true : false;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFlowing, setIsFlowing] = useState(true);
  const slideRef = useRef(null);

  const main_list = useSelector((state) => state.main);
  // console.log(main_list);

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
    let intViewportWidth = window.innerWidth;
    if (isFlowing && intViewportWidth > 720) {
      intervalId = setInterval(() => {
        setCurrentSlide(currentSlide + 1);
      }, 50000000);
    }
    if (currentSlide === 4) {
      setCurrentSlide(0);
    }
    return () => clearTimeout(intervalId);
  }, [currentSlide, setCurrentSlide, isFlowing]);

  // const slideImages = [
  //   "https://i.ibb.co/YQCrYJR/banner-01.png",
  //   "https://i.ibb.co/0KmsdWb/banner-02.png",
  //   "https://i.ibb.co/rcfQJhp/banner-03.png",
  //   "https://i.ibb.co/y6HNN1Q/banner-04.png",
  // ];

  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + slideRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      slideRef.current.scrollLeft = startX - e.pageX;
    }
  };

  return (
    <>
      <Container>
        <SliderContainer
          onMouseOver={() => setIsFlowing(false)}
          onMouseOut={() => setIsFlowing(true)}
          ref={slideRef}
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
        >
          {is_login ? (
            <>
              {main_list.usermain.slider?.map((l, idx) => {
                return (
                  <Slide key={idx}>
                    <SliderBox
                      style={{
                        backgroundImage: `url(${l.challengeImgUrl})`,
                      }}
                      onClick={() =>
                        history.push(`/challenge/${l.challengeId}/intro`)
                      }
                    >
                      <TagBox>
                        <Tag bg="none" color="white">
                          {l.tagList[0]}
                        </Tag>
                        <Tag bg="none" color="white">
                          #{l.categoryName}
                        </Tag>
                      </TagBox>
                      <TitleBox>
                        <div>{l.challengeTitle}</div>
                      </TitleBox>
                      <SubTitleBox>하루조각과 시작해요!</SubTitleBox>
                    </SliderBox>
                  </Slide>
                );
              })}
            </>
          ) : (
            <>
              {main_list.guestmain.slider?.map((l, idx) => {
                return (
                  <Slide key={idx}>
                    <SliderBox
                      style={{
                        backgroundImage: `url(${l.challengeImgUrl})`,
                      }}
                      onClick={() =>
                        history.push(`/challenge/${l.challengeId}/intro`)
                      }
                    >
                      <TagBox>
                        <Tag bg="none" color="white">
                          {l.tagList[0]}
                        </Tag>
                        <Tag bg="none" color="white">
                          #{l.categoryName}
                        </Tag>
                      </TagBox>
                      <TitleBox>
                        <div>{l.challengeTitle}</div>
                      </TitleBox>
                      <SubTitleBox>하루조각과 시작해요!</SubTitleBox>
                    </SliderBox>
                  </Slide>
                );
              })}
            </>
          )}
        </SliderContainer>
        <PrevBtn onClick={prevSlide}>
          <img style={{ width: "50%" }} src={left} alt="" />
        </PrevBtn>

        <NextBtn onClick={nextSlide}>
          <img style={{ width: "50%" }} src={Right} alt="" />
        </NextBtn>
      </Container>
    </>
  );
};

export default MainSlider;

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    overflow-x: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
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
  ${({ theme }) => theme.device.mobileLg} {
    width: 30px;
    height: 30px;
    top: 70%;
    border-radius: 50%;
    display: none;
  }
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
  ${({ theme }) => theme.device.mobileLg} {
    width: 30px;
    height: 30px;
    top: 70%;
    border-radius: 50%;
    display: none;
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  display: flex; //이미지들을 가로로 나열합니다.
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    display: flex;
    margin-right: 10px;
  }
`;

const Slide = styled.div`
  width: 49.48vw;
  height: 27.77vh;
  border-radius: 10px;
  padding-bottom: 20px;
  padding-right: 10px;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    border-radius: 10px;
    margin-left: 10px;
  }
`;

const SliderBox = styled.div`
  width: 49.45vw;
  height: 25.5vh;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 100px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  ${({ theme }) => theme.device.mobileLg} {
    width: 94vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 16px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  ${({ theme }) => theme.device.desktopLg} {
    width: 49vw;
    padding-left: 80px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

const TagBox = styled.div`
  display: flex;
`;

const TitleBox = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  padding: 15px 0;
  letter-spacing: -0.08em;
  display: flex;
  div {
    padding-right: 10px;
  }
  ${({ theme }) => theme.device.mobileLg} {
    font-size: 1.667em;
    display: flex;
    flex-direction: column;
  }
  ${({ theme }) => theme.device.desktopLg} {
    font-size: 32px;
  }
  ${({ theme }) => theme.device.desktop} {
    font-size: 28px;
  }
`;

const SubTitleBox = styled.div`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: -0.08em;
  span {
    border-bottom: 1px solid white;
  }
  ${({ theme }) => theme.device.mobileLg} {
    font-size: 24px;
  }
  ${({ theme }) => theme.device.desktopLg} {
    font-size: 24px;
  }
  ${({ theme }) => theme.device.desktop} {
    font-size: 24px;
  }
`;
