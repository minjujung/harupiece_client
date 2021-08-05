import React, { useEffect, useRef } from "react";
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
import Button from "../elements/Button";

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

  // 스크롤 함수
  const info = useRef(null);
  const shotList = useRef(null);

  const scrollToInfo = () => info.current.scrollIntoView();
  const scrollToList = () => shotList.current.scrollIntoView();

  return (
    <Area>
      <StateContainer>
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
              <Item
                selected={hash === "#intro" || hash === ""}
                onClick={scrollToInfo}
              >
                <a href="#intro">챌린지 소개</a>
              </Item>
              <Item selected={hash === "#shot_list"} onClick={scrollToList}>
                <a href="#shot_list">인증목록</a>
              </Item>
            </ul>
          </NavBar>
        </ChallengeHeader>

        <ChallengeDesc>
          <div
            style={{
              height: "42vh",
              width: "60vw",
              marginTop: "3vh",
              backgroundColor: "white",
            }}
          ></div>
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
              style={{ position: "absolute", left: "0", top: "-52vh" }}
            >
              &nbsp;
            </span>

            <SectionTitle ref={info}> 챌린지 소개</SectionTitle>
          </div>
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
              {challenge.challengeHollyday === "0, 6" ? "주말포함" : "주말제외"}
              )
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
        </ChallengeDesc>
        <ChallengeDesc list>
          <SectionTitle list ref={shotList}>
            인증 목록
          </SectionTitle>
          <Section list>
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
          </Section>
        </ChallengeDesc>
      </StateContainer>
      <RightNav>
        <StateBox />
        <Btns>
          <Button
            width="16.15vw"
            padding="21px 64px"
            margin="0 0 20px 0"
            _onClick={adminDelete}
          >
            관리자 권한 삭제
          </Button>
          {/* 챌린지 개설한 사용자의 memberId와 로그인한 유저의 memberId가 일치할 때 이 버튼 띄우기 */}
          {user_info?.memberId === challenge.memberId &&
          today < challenge.challengeStartDate.split("T")[0] ? (
            <>
              <Button
                width="16.15vw"
                bg="white"
                color="mainGreen"
                padding="21px 64px"
                border="lightGray"
                margin="0 0 20px 0"
                _onClick={editChallenge}
              >
                챌린지 수정하기
              </Button>
              <Button
                width="16.15vw"
                padding="21px 64px"
                margin="0 0 20px 0"
                _onClick={deleteChallenge}
              >
                {/* (챌린지 개설한 사용자) */}
                챌린지 없애기
              </Button>
            </>
          ) : null}
          <div>
            <ConditionBtn {...challenge} />
          </div>
        </Btns>
      </RightNav>
    </Area>
  );
};

export default ChallengeDetail;

const Area = styled.div`
  display: grid;
  margin: 0 auto;
  width: 66.67vw;
  height: 100vh;
  grid-template-rows: 1fr 3fr;
  grid-template-areas:
    "banner nav"
    "banner btns";
  grid-gap: 20px;
`;

const ChallengeHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 49.48vw;
  height: 40.55vh;
  justify-content: center;
  position: fixed;
  z-index: 9;
  padding-top: 5.37vh;
  margin-top: 3vh;
  background-color: ${({ theme }) => theme.colors.white};
`;

const StateContainer = styled.div`
  width: 49.48vw;
  height: 40.55vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-area: banner;
`;

const Btns = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 46.57vh;
`;

const RightNav = styled.div`
  width: 16.15vw;
  padding-top: 5.47vh;
  margin-top: 3vh;
  grid-area: nav;
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

const ChallengeDesc = styled.section`
  width: 49.48vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: bold;
  width: 49.48vw;
  height: 10vh;
  text-align: left;
  padding-top: 2.4%;
`;

const Section = styled.section`
  width: 49.48vw;
  padding-bottom: ${(props) => (props.list ? "10vh" : "0")};
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
