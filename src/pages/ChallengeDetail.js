import React, { useEffect } from "react";
import styled from "styled-components";

import InfinityScroll from "../shared/InfinityScroll";
import PostList from "../components/challengedetail/PostList";
import ConditionBtn from "../components/challengedetail/ConditionBtn";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator as challengeDetailActions } from "../redux/modules/challengeDetail";
import { actionCreator as postActions } from "../redux/modules/post";

const ChallengeDetail = (props) => {
  const dispatch = useDispatch();
  const challenge = useSelector((state) => state.challengeDetail.detail);
  const user_info = useSelector((state) => state.user.userInfo);
  const { list, paging, is_loading } = useSelector((state) => state.post);

  console.log(list);
  const challengeId = props.match.params.id;

  // challenge상세 내용과 인증샷 목록 불러오기
  useEffect(() => {
    if (!challengeId) {
      return;
    }
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
  const progress = today.getTime() - date1.getTime();
  const progressDays = progress / 1000 / 60 / 60 / 24;

  today =
    leadingZeros(today.getFullYear(), 4) +
    "-" +
    leadingZeros(today.getMonth() + 1, 2) +
    "-" +
    leadingZeros(today.getDate(), 2);

  //사용자가 자기가 만든 챌린지 수정 => 챌린지 시작전에만 수정 가능
  const editChallenge = () => {
    history.push(`/challenge/${challenge.challengeId}/edit`);
  };
  //사용자가 자기가 만든 챌린지 삭제 => 챌린지 시작전에만 삭제 가능
  const deleteChallenge = () => {
    dispatch(challengeDetailActions.challengeDeleteDB(challenge.challengeId));
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

  //navbar 지금 클릭되어 있는 거 확인할 수 있는 hash
  const {
    location: { hash },
  } = props;

  console.log(props);

  return (
    <>
      <ChallengeHeader>
        <Banner bgImg={challenge.challengeImgUrl}>
          <Title>{challenge.challengeTitle}</Title>
          <TotalNum>
            참여 {challenge.challengeMember.length}명 | 진행률{" "}
            {parseInt(progressDays / totalDay) * 100} %
          </TotalNum>
        </Banner>
        <NavBar>
          <ul>
            <Item selected={hash === "#intro"}>
              <a href="#intro">챌린지 소개</a>
            </Item>
            <Item selected={hash === "#shot_list"}>
              <a href="#shot_list">인증목록</a>
            </Item>
          </ul>
        </NavBar>
        {/* <button onClick={() => history.push("/")}>홈으로 가기</button>
        <button onClick={adminDelete}>관리자 권한 삭제</button> */}
        {/* 챌린지 개설한 사용자의 memberId와 로그인한 유저의 memberId가 일치할 때 이 버튼 띄우기 */}
        {/* {user_info?.memberId === challenge.memberId &&
        today < challenge.challengeStartDate.split("T")[0] ? (
          <>
            <button onClick={editChallenge}>챌린지 수정하기</button>
            <button onClick={deleteChallenge}>
              챌린지 없애기(챌린지 개설한 사용자)
            </button>
          </>
        ) : null} */}
      </ChallengeHeader>
      <div style={{ height: "30.875em" }}></div>
      <div style={{ position: "relative" }}>
        <span
          id="intro"
          style={{ position: "absolute", left: "0", top: "-30.875em" }}
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
          style={{ position: "absolute", left: "0", top: "-30.875em" }}
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
            challengeStatus={challenge.challengeProgress}
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
  position: fixed;
  z-index: 10;
  top: 4em;
  padding-top: 3em;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Banner = styled.div`
  background-image: url(${(props) => props.bgImg});
  background-position: center;
  width: 59.38em;
  height: 18.75em;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  padding: 0.7em;
`;

const TotalNum = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

const NavBar = styled.nav`
  width: 59.38em;
  height: 5em;
  display: flex;
  align-items: center;
  ul {
    height: 100%;
    display: flex;
    align-items: center;
  }
`;

const Item = styled.li`
  width: 155px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5em;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.md};
  ${(props) =>
    props.selected
      ? `border-bottom: 4px solid ${props.theme.colors.mainGreen};`
      : null}
`;
