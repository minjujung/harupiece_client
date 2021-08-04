import React, { useEffect } from "react";
import styled from "styled-components";

import { RadioButtonUnchecked, NotInterested } from "@material-ui/icons";

import InfinityScroll from "../shared/InfinityScroll";
import PostList from "../components/challengedetail/PostList";
import ConditionBtn from "../components/challengedetail/ConditionBtn";
import { Image, Tag } from "../elements/index";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator as challengeDetailActions } from "../redux/modules/challengeDetail";
import { actionCreator as postActions } from "../redux/modules/post";
import StateBox from "../components/challengedetail/StateBox";

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

  //카테고리 이름 한글로 변경
  let category = "";
  if (challenge.categoryName === "EXERCISE") {
    category = "운동";
  } else if (challenge.categoryName === "NODRINKNOSMOKE") {
    category = "금연 / 금주";
  } else {
    category = "생활습관";
  }

  //navbar 지금 클릭되어 있는 거 확인할 수 있는 hash
  const {
    location: { hash },
  } = props;

  return (
    <>
      <ChallengeHeader>
        <StateContainer>
          <Banner bgImg={challenge.challengeImgUrl}>
            <Title>{challenge.challengeTitle}</Title>
            <TotalNum>
              참여 {challenge.challengeMember.length}명 | 진행률{" "}
              {parseInt(progressDays / totalDay) * 100} %
            </TotalNum>
          </Banner>
          <NavBar>
            <ul>
              <Item selected={hash === "#intro" || hash === ""}>
                <a href="#intro">챌린지 소개</a>
              </Item>
              <Item selected={hash === "#shot_list"}>
                <a href="#shot_list">인증목록</a>
              </Item>
            </ul>
          </NavBar>
        </StateContainer>
        <StateBox />
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
      <div style={{ height: "40.55vh" }}></div>
      <div
        style={{
          position: "relative",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span
          id="intro"
          style={{ position: "absolute", left: "0", top: "-50vh" }}
        >
          &nbsp;
        </span>

        <SectionTitle> 챌린지 소개</SectionTitle>
      </div>
      <ChallengeInfo>
        <Section>
          <h3>기본정보</h3>
          <Info>
            <span>카테고리</span>
            {category}
          </Info>
          <Info>
            <span>인증기간</span>
            {challenge.challengeStartDate.split("T")[0]} ~{" "}
            {challenge.challengeEndDate.split("T")[0]} (
            {challenge.challengeHollyday === "0, 6" ? "주말포함" : "주말제외"})
          </Info>
          <Info>
            <span>모집방식</span>
            {challenge.challengePassword === "" ? "공개" : "비공개"}
          </Info>
          {/* <p>개시자: {challenge.memberName}</p> */}
          {/* <p>{status}</p> */}
          <Info>
            <span>진행상태</span>
            {status}
          </Info>
          <Example>
            <span>인증샷예시</span>
            <div>
              <Image
                width="10em"
                height="10em"
                borderRadius="16px"
                border
                src={challenge.challengeGood}
                alt="vegan_diet"
              />
              <ExTitle good>
                <RadioButtonUnchecked style={{ marginRight: "8px" }} /> 좋은
                인증샷
              </ExTitle>
            </div>
            <div>
              <Image
                width="10em"
                height="10em"
                borderRadius="16px"
                border
                src={challenge.challengeBad}
                alt="nonvegan_diet"
              />
              <ExTitle>
                <NotInterested style={{ marginRight: "8px" }} />
                나쁜 인증샷
              </ExTitle>
            </div>
          </Example>
          <h3>소개글</h3>
          <Desc>{challenge.challengeContent}</Desc>
          <TagFrame>
            <Tag bg="mainGreen" color="white">
              #2주
            </Tag>
            <Tag bg="mainGreen" color="white">
              #인기챌린지
            </Tag>
          </TagFrame>
        </Section>
      </ChallengeInfo>
      <div
        style={{
          position: "relative",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span
          id="shot_list"
          style={{ position: "absolute", left: "0", top: "-50vh" }}
        >
          &nbsp;
        </span>
        <SectionTitle list>인증 목록</SectionTitle>
      </div>
      <ChallengeInfo list>
        <Section>
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
        </Section>
      </ChallengeInfo>
    </>
  );
};

export default ChallengeDetail;

const ChallengeHeader = styled.div`
  display: flex;
  width: 100vw;
  height: 40.55vh;
  justify-content: center;
  position: fixed;
  z-index: 10;
  padding-top: 5.37vh;
  background-color: ${({ theme }) => theme.colors.white};
`;

const StateContainer = styled.div`
  width: 49.48vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Banner = styled.div`
  background-image: url(${(props) => props.bgImg});
  background-position: center;
  width: 100%;
  height: 28.7vh;
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
  margin-bottom: 2.5%;
`;

const TotalNum = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

const NavBar = styled.nav`
  width: 100%;
  height: 7.4vh;
  display: flex;
  align-items: center;
  ul {
    width: 100%;
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
  font-size: ${({ theme }) => theme.fontSizes.md};
  ${(props) =>
    props.selected
      ? `border-bottom: 4px solid ${props.theme.colors.mainGreen};`
      : null}
`;

const ChallengeInfo = styled.section`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${(props) => (props.list ? "20%" : "0")};
`;

const SectionTitle = styled.h3`
  position: absolute;
  top: 0;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: bold;
  width: 66.67vw;
  text-align: left;
  padding-top: ${(props) => (props.list ? "0" : "2.4%")};
`;

const Section = styled.section`
  width: 66.67vw;
  padding-top: 5%;
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: bold;
    margin: 1.2em 0;
  }
`;

const Info = styled.p`
  margin-bottom: 0.8em;
  span {
    font-size: ${({ theme }) => theme.fontSizes.ms};
    color: ${({ theme }) => theme.colors.gray};
    margin-right: 2em;
    font-weight: bold;
  }
`;

const Example = styled.article`
  display: flex;

  span {
    font-size: ${({ theme }) => theme.fontSizes.ms};
    color: ${({ theme }) => theme.colors.gray};
    margin-right: 2em;
    font-weight: bold;
  }
  div {
    margin-right: 2em;
  }
`;

const ExTitle = styled.h4`
  height: 2em;
  display: flex;
  align-items: center;
  color: ${(props) =>
    props.good ? props.theme.colors.mainGreen : props.theme.colors.mainOrange};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.ms};
`;

const Desc = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: 1.2em;
`;

const TagFrame = styled.div`
  display: flex;
  margin-bottom: 80px;
`;
