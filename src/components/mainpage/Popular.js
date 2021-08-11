import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { history } from "../../redux/configureStore";
import { useSelector } from "react-redux";
import { getCookie } from "../../shared/Cookie";
import left from "../../assets/images/icons/arrow/left.svg";
import Right from "../../assets/images/icons/arrow/right.svg";

const TOTAL_SLIDES = 2;
const Popular = (props) => {
  const hot_list = useSelector((state) => state.main);

  const is_login = getCookie("token") ? true : false;

  // slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFlowing, setIsFlowing] = useState(true);
  const slideRef = useRef(null);

  useEffect(() => {
    slideRef.current.style.transition = "all .5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

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

  return (
    <>
      <Contain>
        <Title>
          <span>HOT</span>챌린지
        </Title>
        <div>
          {is_login ? (
            <>
              {hot_list.usermain.popular &&
                hot_list.usermain.popular.map((l, idx) => {
                  return (
                    <div
                      key={idx}
                      onClick={() =>
                        history.push(`/challenge/${l.challengeId}/intro`)
                      }
                    >
                      <CardBox>
                        <div>
                          <img src={l.challengeImgUrl} alt="" />
                        </div>
                        <CardTitle>
                          <div>{l.challengeTitle}</div>
                          <div>
                            {l.challengeMember.length}명이 대화에 참여중
                          </div>
                        </CardTitle>
                      </CardBox>
                    </div>
                  );
                })}
            </>
          ) : (
            <>
              {hot_list.guestmain.popular &&
                hot_list.guestmain.popular.map((l, idx) => {
                  return (
                    <div
                      key={idx}
                      onClick={() =>
                        history.push(`/challenge/${l.challengeId}/intro`)
                      }
                    >
                      <CardBox>
                        <div>
                          <img src={l.challengeImgUrl} alt="" />
                        </div>
                        <CardTitle>
                          <div>{l.challengeTitle}</div>
                          <div>
                            {l.challengeMember.length}명이 대화에 참여중
                          </div>
                        </CardTitle>
                      </CardBox>
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </Contain>
      {/* mobile */}
      <MobileBox>
        <Title>
          <span>HOT</span>챌린지
        </Title>
        <div>
          {is_login ? (
            <>
              <SliderContainer
                onMouseOver={() => setIsFlowing(false)}
                onMouseOut={() => setIsFlowing(true)}
                ref={slideRef}
              >
                {hot_list.usermain.popular &&
                  hot_list.usermain.popular.map((l, idx) => {
                    return (
                      <Slide key={idx}>
                        <div
                          key={idx}
                          onClick={() =>
                            history.push(`/challenge/${l.challengeId}/intro`)
                          }
                        >
                          <CardBox>
                            <div>
                              <img src={l.challengeImgUrl} alt="" />
                            </div>
                            <CardTitle>
                              <div>{l.challengeTitle}</div>
                              <div>
                                {l.challengeMember.length}명이 대화에 참여중
                              </div>
                            </CardTitle>
                          </CardBox>
                        </div>
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
            </>
          ) : (
            <>
              {hot_list.guestmain.popular &&
                hot_list.guestmain.popular.map((l, idx) => {
                  return (
                    <div
                      key={idx}
                      onClick={() =>
                        history.push(`/challenge/${l.challengeId}/intro`)
                      }
                    >
                      <CardBox>
                        <div>
                          <img src={l.challengeImgUrl} alt="" />
                        </div>
                        <CardTitle>
                          <div>{l.challengeTitle}</div>
                          <div>
                            {l.challengeMember.length}명이 대화에 참여중
                          </div>
                        </CardTitle>
                      </CardBox>
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </MobileBox>
    </>
  );
};

export default Popular;

// mobile
const MobileBox = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 54vh;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  div {
    span {
      color: ${({ theme }) => theme.colors.mainGreen};
    }
  }
  ${({ theme }) => theme.device.desktop} {
    display: none;
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  display: flex; //이미지들을 가로로 나열합니다.
  ${({ theme }) => theme.device.mobileLg} {
    width: 330px;
    display: flex;
  }
`;

const Slide = styled.div`
  width: 950px;
  border-radius: 10px;
  padding-bottom: 20px;
  padding-right: 10px;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100vw;
    border-radius: 10px;
    margin-left: 15px;
    display: flex;
    flex-direction: column;
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
  }
`;

//desktop
const Contain = styled.div`
  width: 16.15vw;
  height: 55.39vh;
  padding: 30px 31px 38px 22px;
  border-radius: 10px;
  border: 2px solid #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${({ theme }) => theme.device.mobileLg} {
    display: none;
  }
`;

const Title = styled.div`
  width: 9vw;
  height: 5.3vh;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  letter-spacing: -1.92px;
  line-height: 1.5;
  padding-left: 1vw;

  span {
    padding-right: 0.4vw;
    color: ${({ theme }) => theme.colors.mainGreen};
  }
`;

const CardBox = styled.div`
  width: 13.02vw;
  display: flex;
  cursor: pointer;

  div {
    img {
      border-radius: 10px;
      width: 100px;
      height: 100px;
      margin-top: 10px;
    }
  }
`;

const CardTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 10px;
  div:nth-child(2) {
    padding-top: 13px;
    color: ${({ theme }) => theme.colors.gray};
  }
`;
