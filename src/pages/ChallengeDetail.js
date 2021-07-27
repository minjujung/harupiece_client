import React, { useEffect } from "react";

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
      <section id="intro">
        <h3>챌린지 소개</h3>
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
      <section id="shot_list">
        <InfinityScroll
          callNext={() => {
            dispatch(postActions.getPostDB(challengeId, paging.next));
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          <h3>인증 목록</h3>
          <PostList
            list={list}
            totalNumber={challenge.challengeMember.length}
            totalDay={totalDay}
          />
        </InfinityScroll>
      </section>
      <div>
        <button>챌린지 신청하기</button>
        <PostWrite />
        <button>챌린지 신청 취소하기</button>
      </div>
    </>
  );
};

export default ChallengeDetail;
