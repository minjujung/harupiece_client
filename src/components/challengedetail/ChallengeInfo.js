import React, { useEffect } from "react";
import styled from "styled-components";

import { RadioButtonUnchecked, NotInterested } from "@material-ui/icons";
import { Image, Tag } from "../../elements/index";

import { useDispatch, useSelector } from "react-redux";
import { actionCreator as challengeDetailActions } from "../../redux/modules/challengeDetail";

const ChallengeInfo = (props) => {
  const dispatch = useDispatch();
  const challenge = useSelector((state) => state.challengeDetail.detail);

  const challengeId = props.match.params.id;

  // challenge상세 내용 불러오기
  useEffect(() => {
    if (!challengeId) {
      return;
    }
    dispatch(challengeDetailActions.getChallengeDetailDB(challengeId));
  }, []);
  //카테고리 이름 한글로 변경
  let category = "";
  if (challenge.categoryName === "EXERCISE") {
    category = "운동";
  } else if (challenge.categoryName === "NODRINKNOSMOKE") {
    category = "금연 / 금주";
  } else {
    category = "생활습관";
  }

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
    <ChallengeDesc>
      <Section>
        <h3>기본정보</h3>
        <Info>
          <span>카테고리</span>
          {category}
        </Info>
        <Info>
          <span>인증기간</span>
          {challenge.challengeStartDate.split("T")[0]} ~{" "}
          {challenge.challengeEndDate.split("T")[0]}{" "}
          <p>
            {" "}
            ({challenge.challengeHoliday === "0,6" ? "주말 제외" : "주말 포함"})
          </p>
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
          <MobileFrame>
            <div>
              <Image
                width="8.33vw"
                height="14.81vh"
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
                width="8.33vw"
                height="14.81vh"
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
          </MobileFrame>
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
  );
};

export default ChallengeInfo;

const ChallengeDesc = styled.section`
  width: 49.48vw;
  margin: 40.55vh 0 14.81vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    margin-bottom: 200px;
  }
`;

const Section = styled.section`
  width: 49.48vw;
  margin-top: 3.7vh;
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: bold;
    margin-bottom: 16px;
  }
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    padding: 0 4.44vw;
    overflow: scroll;
    h3 {
      margin-bottom: 24px;
      font-size: 32px;
    }
  }
`;

const Info = styled.p`
  margin-bottom: 0.8em;
  span {
    font-size: ${({ theme }) => theme.fontSizes.ms};
    color: ${({ theme }) => theme.colors.gray};
    margin-right: 32px;
    font-weight: bold;
  }
  p {
    line-height: normal;
  }
  ${({ theme }) => theme.device.mobileLg} {
    font-size: 28px;
    span {
      font-size: 28px;
    }
  }
`;

const Example = styled.article`
  display: flex;
  margin-bottom: 4.44vh;
  span {
    font-size: ${({ theme }) => theme.fontSizes.ms};
    color: ${({ theme }) => theme.colors.gray};
    margin-right: 2em;
    font-weight: bold;
  }
  div {
    margin-right: 2em;
  }
  ${({ theme }) => theme.device.mobileLg} {
    flex-direction: column;
    div {
      margin-right: 0;
    }
  }
`;

const MobileFrame = styled.div`
  display: flex;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 1.66vh;
    img {
      width: 43.33vw;
      height: 43.33vw;
    }
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
  ${({ theme }) => theme.device.mobileLg} {
    margin-top: 0.74vh;
  }
`;

const Desc = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: 1.2em;
`;

const TagFrame = styled.div`
  display: flex;
`;
