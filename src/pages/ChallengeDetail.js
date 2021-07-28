import React, { useEffect, useState } from "react";
import styled from "styled-components";

import InfinityScroll from "../shared/InfinityScroll";

import { consoleLogger } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator as challengeDetailActions } from "../redux/modules/challengeDetail";
import { actionCreator as postActions } from "../redux/modules/post";
import PostList from "../components/PostList";
import PostWrite from "../components/PostWrite";
import ConditionBtn from "../components/ConditionBtn";

const ChallengeDetail = (props) => {
  const dispatch = useDispatch();
  const challenge = useSelector((state) => state.challengeDetail.detail);
  const { list, paging, is_loading } = useSelector((state) => state.post);

  console.log(list);
  const challengeId = props.match.params.id;

  // challenge상세 내용과 인증샷 목록 불러오기
  useEffect(() => {
    dispatch(challengeDetailActions.getChallengeDetailDB(challengeId));
    dispatch(postActions.getPostDB(challengeId));
  }, []);

  //포인트 계산을 위한 challenge날짜수 계산
  const start = challenge.challengeStartDate.split("T")[0].split("-");
  const date1 = new Date(start[0], start[1][1] - 1, start[2]);

  const end = challenge.challengeEndDate.split("T")[0].split("-");
  const date2 = new Date(end[0], end[1][1] - 1, end[2]);

  const totalSecond = date2.getTime() - date1.getTime();
  const totalDay = totalSecond / 1000 / 60 / 60 / 24;

  //관리자 권한 삭제
  const adminDelete = () => {
    dispatch(
      challengeDetailActions.adminChallengeDeleteDB(challenge.challengeId)
    );
  };

  //오늘 날짜를 특정 날짜와 비교하기 위해 형태 변경해주는 함수
  // 2021-07-06 이런 형태로 만들어줌
  const leadingZeros = (n, digits) => {
    let zero = "";
    n = n.toString();

    if (n.length < digits) {
      for (let i = 0; i < digits - n.length; i++) zero += "0";
    }
    return zero + n;
  };

  let today = new Date();
  today =
    leadingZeros(today.getFullYear(), 4) +
    "-" +
    leadingZeros(today.getMonth() + 1, 2) +
    "-" +
    leadingZeros(today.getDate(), 2);

  //사용자가 자기가 만든 챌린지 삭제 => 챌린지 시작전에만 삭제 가능
  const deleteChallenge = () => {
    if (today < challenge.challengeStartDate) {
      dispatch(challengeDetailActions.challengeDeleteDB(challenge.challengeId));
    } else {
      window.alert(
        "이미 챌린지가 진행중이에요🏃‍♀️🏃‍♂️ 챌린지 시작 전에만 삭제가 가능합니다!"
      );
    }
  };

  //챌린지 상태 문자로 표현 해주기
  let status = "";
  if (challenge.challengeProgress === 1) {
    status = "진행 예정";
  } else if (challenge.challengeProgress === 2) {
    status = "진행 중";
  } else {
    status = "진행 종료";
  }

  return (
    <>
      <ChallengeHeader>
        <h1>{challenge.challengeTitle}</h1>
        <h2>총 {challenge.challengeMember.length}명이 참여중입니다!</h2>
        <nav>
          <ul>
            <li>
              <a href="#intro">소개</a>
            </li>
            <li>
              <a href="#shot_list">인증목록</a>
            </li>
          </ul>
        </nav>
        <button onClick={adminDelete}>관리자 권한 삭제</button>
        {/* 챌린지 개설한 사용자의 memberId와 로그인한 유저의 memberId가 일치할 때 이 버튼 띄우기 */}
        <button onClick={deleteChallenge}>
          챌린지 없애기(챌린지 개설한 사용자)
        </button>
      </ChallengeHeader>
      <div style={{ height: "15em" }}></div>
      <div style={{ position: "relative" }}>
        <span
          id="intro"
          style={{ position: "absolute", left: "0", top: "-15em" }}
        >
          &nbsp;
        </span>
        <h3
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            margin: "0",
          }}
        >
          챌린지 소개
        </h3>
      </div>
      <section style={{ paddingTop: "1em", boxSizing: "border-box" }}>
        <p>{challenge.challengePassword === "" ? "공개" : "비공개"}</p>
        <p>카테고리: {challenge.categoryName}</p>
        <p>
          인증기간: {challenge.challengeStartDate.split("T")[0]} ~{" "}
          {challenge.challengeEndDate.split("T")[0]}
        </p>
        <p>
          {challenge.challengeHollyday === "0, 6" ? "주말포함" : "주말제외"}
        </p>
        <p>개시자: {challenge.memberName}</p>
        <p>{status}</p>
        <p>챌린지 설명: {challenge.challengeContent}</p>
        <article>
          <p>좋은 예시</p>
          <img src={challenge.challengeGood} alt="vegan_diet" />
        </article>
        <article>
          <p>나쁜 예시</p>
          <img src={challenge.challengeBad} alt="nonvegan_diet" />
        </article>
      </section>
      <div style={{ position: "relative" }}>
        <span
          id="shot_list"
          style={{ position: "absolute", left: "0", top: "-15em" }}
        >
          &nbsp;
        </span>
        <h3
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            margin: "0",
          }}
        >
          인증 목록
        </h3>
      </div>
      <section style={{ paddingTop: "2em", boxSizing: "border-box" }}>
        <InfinityScroll
          callNext={() => {
            dispatch(postActions.getPostDB(challengeId, paging.next));
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          <PostList
            list={list}
            challengeId={challenge.challengeId}
            totalNumber={challenge.challengeMember.length}
            totalDay={totalDay}
          />
        </InfinityScroll>
        <div>
          <ConditionBtn {...challenge} />
        </div>
      </section>
    </>
  );
};

export default ChallengeDetail;

const ChallengeHeader = styled.div`
  width: 100%;
  background: lightblue;
  position: fixed;
  top: 0;
  height: 15em;
  opacity: 0.75;
`;
