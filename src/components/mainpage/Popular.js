import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { history } from "../../redux/configureStore";
import { useSelector } from "react-redux";
import { getCookie } from "../../shared/Cookie";

const Popular = (props) => {
  const hot_list = useSelector((state) => state.main);

  const is_login = getCookie("token") ? true : false;

  // slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  useEffect(() => {
    slideRef.current.style.transition = "all .5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

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
        <CardBox2>
          {is_login ? (
            <>
              <SliderContainer
                ref={slideRef}
                onMouseDown={onDragStart}
                onMouseMove={onDragMove}
                onMouseUp={onDragEnd}
                onMouseLeave={onDragEnd}
              >
                {hot_list.usermain.popular &&
                  hot_list.usermain.popular.map((l, idx) => {
                    return (
                      <Slide key={idx}>
                        <CardBox
                          onClick={() =>
                            history.push(`/challenge/${l.challengeId}/intro`)
                          }
                        >
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
                      </Slide>
                    );
                  })}
              </SliderContainer>
            </>
          ) : (
            <>
              <SliderContainer
                ref={slideRef}
                onMouseDown={onDragStart}
                onMouseMove={onDragMove}
                onMouseUp={onDragEnd}
                onMouseLeave={onDragEnd}
              >
                {hot_list.guestmain.popular &&
                  hot_list.guestmain.popular.map((l, idx) => {
                    return (
                      <Slide key={idx}>
                        <CardBox
                          onClick={() =>
                            history.push(`/challenge/${l.challengeId}/intro`)
                          }
                        >
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
                      </Slide>
                    );
                  })}
              </SliderContainer>
            </>
          )}
        </CardBox2>
      </MobileBox>
    </>
  );
};

export default Popular;

// mobile
const MobileBox = styled.div`
  ${({ theme }) => theme.device.mobileLg} {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100vw;
    margin-bottom: 25vh;
    font-size: ${({ theme }) => theme.fontSizes.xl};
    div {
      span {
        color: ${({ theme }) => theme.colors.mainGreen};
      }
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
    width: 100vw;
    height: 30vh;
    display: flex;
    overflow-x: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Slide = styled.div`
  width: 950px;
  border-radius: 10px;
  padding-bottom: 20px;
  padding-right: 10px;
  ${({ theme }) => theme.device.mobileLg} {
    width: 42%;
    border-radius: 10px;
    padding-left: 15px;
    padding-right: 0px;
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

  ${({ theme }) => theme.device.mobileLg} {
    width: 100vw;
    font-size: 20px;
    display: flex;
    justify-content: flex-start;
    padding-left: 15px;
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

  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;

    div {
      img {
        border-radius: 10px;
        width: 38vw;
        height: 17.5vh;
        margin-top: 10px;
      }
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

  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 1.22vh 0 1.39vh 0vw;
  }
  div:nth-child(2) {
    font-size: 13.5px;
    font-weight: 500;
  }
`;

const CardBox2 = styled.div`
  height: 34vh;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  padding-top: 1.6vh;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;
  }
`;
