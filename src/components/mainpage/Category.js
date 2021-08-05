import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { history } from "../../redux/configureStore";
import { useSelector } from "react-redux";
import { getCookie } from "../../shared/Cookie";

import { Tag, Card } from "../../elements";
import { changeForm } from "../mypage/ChallengesInProgress";

const Category = (props) => {
  const main_list = useSelector((state) => state.main);

  const [category, setCategory] = useState("nodrinknosmoke");

  const ChangeTag = (e) => {
    let keyWord = e.target.textContent;
    console.log(keyWord);
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

  // const guestStart = main_list.guestmain[category]?.map(
  //   (list) => list.challengeStartDate.split("T")[0]
  // );
  // const guestEnd = main_list.guestmain[category]?.map(
  //   (list) => list.challengeEndDate.split("T")[0]
  // );

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

  // const {
  //   _year: guestStart_year,
  //   _month: guestStart_month,
  //   _date: guestStart_date,
  // } = changeForm(guestStart);
  // const {
  //   _year: guestEnd_year,
  //   _month: guestEnd_month,
  //   _date: guestEnd_date,
  // } = changeForm(guestEnd);

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
          >
            #금연&금주
          </Tag>
          <Tag
            color={category === "livinghabits" ? "white" : "black"}
            bg={category === "livinghabits" ? "mainOrange" : "lightGray"}
            onClick={ChangeTag}
          >
            #습관챌린지
          </Tag>
          <Tag
            color={category === "exercise" ? "white" : "black"}
            bg={category === "exercise" ? "mainOrange" : "lightGray"}
            onClick={ChangeTag}
          >
            #운동
          </Tag>
        </TagBox>
        <ViewAll onClick={() => history.push(`/search/1/`)}>전체보기</ViewAll>
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
                          history.push(`/challenge/${l.challengeId}`)
                        }
                      ></Card>
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
                        // date={`${guestStart_year[idx]}.${guestStart_month[idx]}.${guestStart_date[idx]} -
                        // ${guestEnd_year[idx]}.${guestEnd_month[idx]}.${guestEnd_date[idx]}`}
                        key={idx}
                        onClick={() =>
                          history.push(`/challenge/${l.challengeId}`)
                        }
                      ></Card>
                    </>
                  );
                })}
            </>
          )}
        </CardBox2>
      </Contain>
    </>
  );
};

export default Category;

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
`;

const TagBox = styled.div`
  display: flex;
  padding-bottom: 15px;
`;

const CardBox2 = styled.div`
  display: flex;
  padding-top: 10px;
`;

const ViewAll = styled.span`
  font-size: 15px;
  padding-left: 44vw;
  color: #a9a9a9;
  cursor: pointer;
`;
