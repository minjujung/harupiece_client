import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { RadioButtonUnchecked, NotInterested, Link } from "@material-ui/icons";
import { Image, Tag } from "../../elements/index";

import { useDispatch, useSelector } from "react-redux";
import { actionCreator as challengeDetailActions } from "../../redux/modules/challengeDetail";

const ChallengeInfo = (props) => {
  const dispatch = useDispatch();
  const challenge = useSelector((state) => state.challengeDetail.detail);

  const challengeId = props.match.params.id;

  const urlRef = useState();

  //현재 페이지 url 복사
  const copy = (e) => {
    if (!document.queryCommandSupported("copy")) {
      return alert("복사 기능이 지원되지 않는 브라우저입니다.");
    }
    console.log(urlRef.current);
    navigator.clipboard.writeText(urlRef.current.value);
    // document.execCommand("copy");
    e.target.focus();
  };

  // challenge상세 내용 불러오기
  useEffect(() => {
    if (!challengeId) {
      return;
    }
    dispatch(challengeDetailActions.getChallengeDetailDB(challengeId));
  }, [challengeId]);

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
        <Title>
          <h3>기본정보</h3>
          <ShareBtn onClick={copy}>
            <Link style={{ transform: "rotate(-45deg)" }} /> 챌린지 공유하기
            <textarea
              style={{ display: "none" }}
              ref={urlRef}
              value={window.location.href}
            />
          </ShareBtn>
        </Title>
        <Info>
          <span>카테고리</span>
          {category}
        </Info>
        <Info>
          <span>인증기간</span>
          {challenge.challengeStartDate.split("T")[0]} ~{" "}
          {challenge.challengeEndDate.split("T")[0]} (
          {challenge.challengeHoliday === "0,6" ? "주말 제외" : "주말 포함"})
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
                borderRadius="12px"
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
                borderRadius="12px"
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
            {challenge.tagList[0]}
          </Tag>
          <Tag bg="mainOrange" color="white">
            {category}
          </Tag>
        </TagFrame>
      </Section>
    </ChallengeDesc>
  );
};

export default ChallengeInfo;

const ChallengeDesc = styled.section`
  width: 49.48vw;
  margin: 0vh 0 14.81vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    margin: 0px;
  }
`;

const Section = styled.section`
  width: 49.48vw;
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: bold;
    margin-bottom: 16px;
  }
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    height: 100%;
    padding: 0 4.44vw;
    margin: 0px;
    h3 {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      font-size: 16px;
    }
  }

  ${({ theme }) => theme.device.desktop} {
    h3 {
      font-size: 18px;
    }
  }

  ${({ theme }) => theme.device.tablet} {
    h3 {
      font-size: 16px;
    }
  }
`;

const Info = styled.div`
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
    font-size: 14px;
    span {
      font-size: 14px;
    }
  }

  ${({ theme }) => theme.device.desktop} {
    font-size: 16px;
    span {
      font-size: 16px;
    }
  }

  ${({ theme }) => theme.device.tablet} {
    font-size: 14px;
    span {
      font-size: 14px;
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
    span {
      font-size: ${({ theme }) => theme.fontSizes.xs};
    }
    flex-direction: column;
    div {
      margin-right: 0;
    }
  }

  ${({ theme }) => theme.device.desktop} {
    span {
      font-size: 16px;
    }
  }

  ${({ theme }) => theme.device.tablet} {
    span {
      font-size: 14px;
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
    font-size: ${({ theme }) => theme.fontSizes.xs};
    margin-top: 0.74vh;
  }

  ${({ theme }) => theme.device.desktop} {
    font-size: 16px;
  }

  ${({ theme }) => theme.device.tablet} {
    font-size: 14px;
  }
`;

const Desc = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: 1.2em;
  line-height: normal;
  white-space: pre-wrap;
`;

const TagFrame = styled.div`
  display: flex;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ShareBtn = styled.button`
  display: none;
  ${({ theme }) => theme.device.mobileLg} {
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    margin-bottom: 24px;
    color: gray;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;
