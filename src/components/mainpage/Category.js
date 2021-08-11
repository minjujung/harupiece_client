import React, { useState } from "react";
import styled from "styled-components";

import { history } from "../../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { MainCreators as searchActions } from "../../redux/modules/main";
import { getCookie } from "../../shared/Cookie";
// slide 라이브러리
import { Slide } from "react-slideshow-image";
import "../../assets/styles/Slider.css";

import { Tag, Card } from "../../elements";
import { changeForm } from "../mypage/ChallengesInProgress";

const Category = (props) => {
  const dispatch = useDispatch();
  const main_list = useSelector((state) => state.main);

  const [category, setCategory] = useState("nodrinknosmoke");

  const searchAll = (e) => {
    e.preventDefault();
    dispatch(searchActions.searchAllDB());
    history.push(`/search/1/all`);
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

  const is_login = getCookie("token") ? true : false;

  const start = main_list.usermain[category]?.map(
    (list) => list.challengeStartDate.split("T")[0]
  );
  const end = main_list.usermain[category]?.map(
    (list) => list.challengeEndDate.split("T")[0]
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

  const GuestStart = main_list.guestmain[category]?.map(
    (list) => list.challengeStartDate.split("T")[0]
  );
  const GuestEnd = main_list.guestmain[category]?.map(
    (list) => list.challengeEndDate.split("T")[0]
  );
  const {
    _year: GuestStart_year,
    _month: GuestStart_month,
    _date: GuestStart_date,
  } = changeForm(GuestStart);

  const {
    _year: GuestEnd_year,
    _month: GuestEnd_month,
    _date: GuestEnd_date,
  } = changeForm(GuestEnd);

  return (
    <>
      <Contain>
        <div
          style={{
            paddingTop: "20px",
            paddingBottom: "24px",
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          하루조각 <span>건강챌린지</span>
        </div>
        <TagBox>
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
            color={category === "livinghabits" ? "white" : "black"}
            bg={category === "livinghabits" ? "mainOrange" : "lightGray"}
            onClick={ChangeTag}
            padding="10px"
            fontWeight="500"
          >
            #습관챌린지
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
        <ViewAll onClick={searchAll}>전체보기</ViewAll>
        <CardBox2>
          {is_login ? (
            <>
              {main_list.usermain[category] &&
                main_list.usermain[category].map((l, idx) => {
                  return (
                    <>
                      <Card
                        src={l.challengeImgUrl}
                        title={l.challengeTitle}
                        date={`${start_year[idx]}.${start_month[idx]}.${start_date[idx]} -
                        ${end_year[idx]}.${end_month[idx]}.${end_date[idx]}`}
                        key={idx}
                        onClick={() =>
                          history.push(`/challenge/${l.challengeId}/intro`)
                        }
                      >
                        <Tag
                          fontWeight="500"
                          bg="lightGray"
                          color="black"
                          padding="8px 20px"
                        >
                          {l.tagList[0]}
                        </Tag>
                        <Tag
                          fontWeight="500"
                          bg="lightGray"
                          color="black"
                          padding="8px 20px"
                        >
                          {l.challengeMember.length}/10명
                        </Tag>
                      </Card>
                    </>
                  );
                })}
            </>
          ) : (
            <>
              {main_list.guestmain[category] &&
                main_list.guestmain[category].map((l, idx) => {
                  return (
                    <>
                      <Card
                        src={l.challengeImgUrl}
                        title={l.challengeTitle}
                        date={`${GuestStart_year[idx]}.${GuestStart_month[idx]}.${GuestStart_date[idx]} -
                        ${GuestEnd_year[idx]}.${GuestEnd_month[idx]}.${GuestEnd_date[idx]}`}
                        key={idx}
                        onClick={() =>
                          history.push(`/challenge/${l.challengeId}/intro`)
                        }
                      >
                        <Tag
                          fontWeight="500"
                          bg="lightGray"
                          color="black"
                          padding="8px 20px"
                        >
                          #금주
                        </Tag>
                        <Tag
                          fontWeight="500"
                          bg="lightGray"
                          color="black"
                          padding="8px 20px"
                        >
                          1/10명
                        </Tag>
                      </Card>
                    </>
                  );
                })}
            </>
          )}
        </CardBox2>
      </Contain>
      {/* Mobile */}
      <MobileBox></MobileBox>
    </>
  );
};

export default Category;

// mobile
const MobileBox = styled.div``;

// desktop
const Contain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 49.48vw;
  height: 54vh;
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
`;

const TagBox = styled.div`
  display: flex;
  padding-bottom: 1.38vh;
`;

const CardBox2 = styled.div`
  height: 34vh;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  padding-top: 1.6vh;
`;

const ViewAll = styled.span`
  font-size: 15px;
  padding-left: 43vw;
  color: #a9a9a9;
  cursor: pointer;
`;
