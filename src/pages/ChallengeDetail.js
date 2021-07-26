import React, { useEffect } from "react";

import InfinityScroll from "../shared/InfinityScroll";
import vegan from "../images/vegan.jfif";
import non_vegan from "../images/non_vegan.jfif";

import { consoleLogger } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator as challengeActions } from "../redux/modules/challenge";
import { actionCreator as postActions } from "../redux/modules/post";

const ChallengeDetail = (props) => {
  const dispatch = useDispatch();
  const challenge = useSelector((state) => state.challenge.detail);
  const { list, paging, is_loading } = useSelector((state) => state.post);

  const challengeId = props.match.params.id;

  useEffect(() => {
    dispatch(challengeActions.getChallengeDetailDB(challengeId));
    dispatch(postActions.getPostDB(challengeId));
  });

  return (
    <>
      <h1>{challenge.challengeTitle}</h1>
      <h2>총 {challenge.member.length}명이 참여중입니다!</h2>
      <nav>
        <ul>
          <li>소개</li>
          <li>인증목록</li>
        </ul>
      </nav>
      <section>
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
          <img src={vegan} alt="vegan_diet" />
        </article>
        <article>
          <p>나쁜 예시</p>
          <img src={non_vegan} alt="nonvegan_diet" />
        </article>
      </section>
      <section>
        <InfinityScroll
          callNext={() => {
            dispatch(postActions.getPostDB(challengeId, paging.next));
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        />
        <h3>인증 목록</h3>
      </section>
      <div>
        <button>챌린지 신청하기</button>
        <button>인증샷 올리기</button>
        <button>챌린지 신청하기</button>
      </div>
    </>
  );
};

export default ChallengeDetail;
