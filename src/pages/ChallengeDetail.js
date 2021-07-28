import React, { useEffect } from "react";
import styled from "styled-components";

import InfinityScroll from "../shared/InfinityScroll";

import { consoleLogger } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator as challengeActions } from "../redux/modules/challenge";
import { actionCreator as postActions } from "../redux/modules/post";
import PostList from "../components/PostList";
import PostWrite from "../components/PostWrite";

const ChallengeDetail = (props) => {
  const dispatch = useDispatch();
  const challenge = useSelector((state) => state.challenge.detail);
  const { list, paging, is_loading } = useSelector((state) => state.post);

  const challengeId = props.match.params.id;

  useEffect(() => {
    dispatch(challengeActions.getChallengeDetailDB(challengeId));
    dispatch(postActions.getPostDB(challengeId));
  });

  const start = challenge.challengeStartDate.split("-");
  const date1 = new Date(start[0], start[1][1] - 1, start[2]);

  const end = challenge.challengeEndDate.split("-");
  const date2 = new Date(end[0], end[1][1] - 1, end[2]);

  const totalSecond = date2.getTime() - date1.getTime();
  const totalDay = totalSecond / 1000 / 60 / 60 / 24;

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
        <p>{challenge.challengePassword}</p>
        <p>카테고리: {challenge.categoryName}</p>
        <p>
          인증기간: {challenge.challengeStartDate} ~{" "}
          {challenge.challengeEndDate}
        </p>
        <p>
          {challenge.challengeHollyday === "0, 6" ? "주말포함" : "주말제외"}
        </p>
        <p>개시자: {challenge.memberName}</p>
        <p>{challenge.challengeProgress}</p>
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
            totalNumber={challenge.challengeMember.length}
            totalDay={totalDay}
          />
        </InfinityScroll>
        <div>
          <button>챌린지 신청하기</button>
          <PostWrite />
          <button>챌린지 신청 취소하기</button>
        </div>
      </section>

      {/* <a href="#challenge_title">
          <button>맨위로 가기</button>
        </a> */}
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
