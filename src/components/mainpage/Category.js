import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { history } from "../../redux/configureStore";
import { useSelector } from "react-redux";

import { Tag, Card, Image, TagContainer } from "../../elements";
import { changeForm } from "../mypage/ChallengesInProgress";
import Right from "../../assets/images/icons/arrow/right.svg";

const Category = (props) => {
  const main_list = useSelector((state) => state.main.guestmain);

  const [category, setCategory] = useState("livinghabits");

  const searchAll = (e) => {
    e.preventDefault();
    history.push(`/search/ALL/1`);
  };

  const ChangeTag = (e) => {
    let keyWord = e.target.textContent;
    if (keyWord === "#금연&금주") {
      setCategory("nodrinknosmoke");
    }
    if (keyWord === "#습관챌린지") {
      setCategory("livinghabits");
    }

    if (keyWord === "#운동") {
      setCategory("exercise");
    }
  };

  const start = main_list[category]?.map(
    (list) => list.challengeStartDate?.split("T")[0]
  );
  const end = main_list[category]?.map(
    (list) => list.challengeEndDate?.split("T")[0]
  );

  const {
    _year: start_year,
    _month: start_month,
    _date: start_date,
  } = changeForm(start);
  const {
    _year: end_year,
    _month: end_month,
    _date: end_date,
  } = changeForm(end);

  // slider
  const [currentSlide] = useState(0);
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
        <div
          style={{
            paddingTop: "20px",
            paddingBottom: "24px",
            fontWeight: "bold",
          }}
        >
          하루조각 <span>건강챌린지</span>
        </div>
        <TagBox>
          <Tag
            color={category === "livinghabits" ? "white" : "black"}
            bg={category === "livinghabits" ? "mainOrange" : "lightGray"}
            onClick={ChangeTag}
            padding="10px"
            fontWeight="500"
            pointer
          >
            #습관챌린지
          </Tag>
          <Tag
            color={category === "nodrinknosmoke" ? "white" : "black"}
            onClick={ChangeTag}
            bg={category === "nodrinknosmoke" ? "mainOrange" : "lightGray"}
            padding="10px"
            fontWeight="500"
            pointer
          >
            #금연&금주
          </Tag>
          <Tag
            color={category === "exercise" ? "white" : "black"}
            bg={category === "exercise" ? "mainOrange" : "lightGray"}
            onClick={ChangeTag}
            padding="10px"
            fontWeight="500"
            pointer
          >
            #운동
          </Tag>
        </TagBox>
        <ViewAll onClick={searchAll}>전체보기</ViewAll>
        <CardBox2>
          {main_list &&
            main_list[category]?.map((l, idx) => {
              return (
                <div key={l.challengeId}>
                  <Card
                    width="15vw"
                    height="auto"
                    title={l.challengeTitle}
                    date={`${start_year[idx]}.${start_month[idx]}.${start_date[idx]} -
                        ${end_year[idx]}.${end_month[idx]}.${end_date[idx]}`}
                    onClick={() =>
                      history.push(`/challenge/${l.challengeId}/intro`)
                    }
                  >
                    <CardImg>
                      <Image
                        width="14.8vw"
                        height="14.81vh"
                        src={l.challengeImgUrl}
                        alt="challenge"
                      />
                    </CardImg>
                    <TagContainer>
                      <Tag
                        fontWeight="500"
                        bg="lightGray"
                        color="black"
                        padding="8px 15px"
                      >
                        {l.tag && l.tag}
                      </Tag>
                      <Tag
                        fontWeight="500"
                        bg="lightGray"
                        color="black"
                        padding="8px 15px"
                      >
                        {l.challengeMember.length}/10명
                      </Tag>
                    </TagContainer>
                  </Card>
                </div>
              );
            })}
        </CardBox2>
      </Contain>
      {/* Mobile */}
      <MobileBox>
        <TitleBox>
          <div
            onClick={searchAll}
            style={{
              paddingTop: "20px",
              paddingBottom: "24px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            하루조각 <span>건강챌린지</span>
          </div>
          <img
            style={{ width: "20px", paddingBottom: "3px" }}
            src={Right}
            alt=""
            onClick={searchAll}
          />
        </TitleBox>
        <TagBox>
          <Tag
            color={category === "livinghabits" ? "white" : "black"}
            bg={category === "livinghabits" ? "mainOrange" : "lightGray"}
            onClick={ChangeTag}
            padding="10px"
            fontWeight="500"
          >
            #습관챌린지
          </Tag>
          <Tag
            color={category === "nodrinknosmoke" ? "white" : "black"}
            onClick={ChangeTag}
            bg={category === "nodrinknosmoke" ? "mainOrange" : "lightGray"}
            padding="10px"
            fontWeight="500"
          >
            #금연&금주
          </Tag>
          <Tag
            color={category === "exercise" ? "white" : "black"}
            bg={category === "exercise" ? "mainOrange" : "lightGray"}
            onClick={ChangeTag}
            padding="10px"
            fontWeight="500"
          >
            #운동
          </Tag>
        </TagBox>
        <CardBox2>
          <SliderContainer
            ref={slideRef}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
          >
            {main_list[category] &&
              main_list[category].map((l, idx) => {
                return (
                  <div key={l.challengeId}>
                    <Slide>
                      <Card
                        width="55vw"
                        height="auto"
                        title={l.challengeTitle}
                        date={`${start_year[idx]}.${start_month[idx]}.${start_date[idx]} -
                        ${end_year[idx]}.${end_month[idx]}.${end_date[idx]}`}
                        onClick={() =>
                          history.push(`/challenge/${l.challengeId}/intro`)
                        }
                      >
                        <Image
                          width="54.5vw"
                          height="33.33vw"
                          src={l.challengeImgUrl}
                          alt="challenge"
                        />
                        <TagContainer>
                          <Tag
                            fontWeight="500"
                            bg="lightGray"
                            color="black"
                            padding="8px 10px"
                          >
                            {l.tag && l.tag}
                          </Tag>
                          <Tag
                            fontWeight="500"
                            bg="lightGray"
                            color="black"
                            padding="8px 10px"
                          >
                            {l.challengeMember.length}/10명
                          </Tag>
                        </TagContainer>
                      </Card>
                    </Slide>
                  </div>
                );
              })}
          </SliderContainer>
        </CardBox2>
      </MobileBox>
    </>
  );
};

export default Category;

// mobile
const MobileBox = styled.div`
  ${({ theme }) => theme.device.mobileLg} {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100vw;
    height: auto;
    font-size: ${({ theme }) => theme.fontSizes.xl};
    div {
      span {
        color: ${({ theme }) => theme.colors.mainGreen};
      }
    }
  }
  ${({ theme }) => theme.device.desktopXl} {
    display: none;
  }
  ${({ theme }) => theme.device.desktopLg} {
    display: none;
  }
  ${({ theme }) => theme.device.desktop} {
    display: none;
  }
  ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  display: flex; //이미지들을 가로로 나열합니다.
  ${({ theme }) => theme.device.mobileLg} {
    width: 100vw;
    height: auto;
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
    width: 100%;
    height: auto;
    border-radius: 10px;
    margin-left: 25px;
    padding-right: 0px;
  }
`;

const TitleBox = styled.div`
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
  }
`;

// desktop
const Contain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 49.48vw;
  height: 54vh;
  padding-top: 20vh;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  div {
    span {
      color: ${({ theme }) => theme.colors.mainGreen};
    }
  }

  ${({ theme }) => theme.device.mobileLg} {
    display: none;
  }
  ${({ theme }) => theme.device.desktop} {
    font-size: 24px;
  }
`;

const TagBox = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  padding-bottom: 1.38vh;
  ${({ theme }) => theme.device.mobileLg} {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

const CardBox2 = styled.div`
  height: 55vh;
  display: grid;
  grid-template-rows: repeat(1, auto);
  grid-template-columns: repeat(3, auto);
  grid-column-gap: 10px;
  padding-top: 1.6vh;
  ${({ theme }) => theme.device.mobileLg} {
    height: auto;
  }
`;

const CardImg = styled.div`
  ${({ theme }) => theme.device.mobileLg} {
    img {
      width: 46.67vw;
      height: 33.33vw;
    }
  }
`;

const ViewAll = styled.span`
  font-size: 15px;
  padding-left: 43vw;
  color: #a9a9a9;
  cursor: pointer;
  ${({ theme }) => theme.device.tablet} {
    font-size: 14px;
    padding-left: 40vw;
  }
  ${({ theme }) => theme.device.desktop} {
    font-size: 14px;
    padding-left: 40vw;
  }
`;
