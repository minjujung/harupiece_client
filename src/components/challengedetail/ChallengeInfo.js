import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { RadioButtonUnchecked, NotInterested, Link } from "@material-ui/icons";
import { Image, Tag } from "../../elements/index";

import { useDispatch, useSelector } from "react-redux";
import { actionCreator as challengeDetailActions } from "../../redux/modules/challengeDetail";
import Toast from "../../elements/Toast";
import ChallengeMember from "./ChallengeMember";

const ChallengeInfo = (props) => {
  const dispatch = useDispatch();
  const challenge = useSelector((state) => state.challengeDetail.detail);

  const challengeId = props.match.params.id;

  const [toastAlert, setToastAlert] = useState(false);
  const urlRef = useRef();

  // useEffect(() => {
  //   if (toastAlert) {
  //     setTimeout(() => setToastAlert(false), 1000);
  //   }
  // }, [toastAlert]);

  //현재 페이지 url 복사
  const copy = (e) => {
    if (!document.queryCommandSupported("copy")) {
      return alert("복사 기능이 지원되지 않는 브라우저입니다.");
    }
    navigator.clipboard.writeText(urlRef.current.value);
    e.target.focus();
    setToastAlert(true);
  };

  // challenge상세 내용 불러오기
  useEffect(() => {
    if (!challengeId) {
      return;
    }
    console.log("챌린지 소개");
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
        <Noti>매일 인증샷을 올리지 않으면 챌린지에서 제외돼요🙄</Noti>
        <Title>
          {toastAlert && <Toast msg="url 복사 완료!" />}
          <h3>기본정보</h3>
          <ShareBtn onClick={copy}>
            <Link style={{ transform: "rotate(-45deg)" }} /> 챌린지 공유하기
            <textarea
              style={{
                position: "absolute",
                width: "0px",
                height: "0px",
                top: "0",
                left: "0",
                opacity: "0",
              }}
              ref={urlRef}
              value={window.location.href}
              readOnly
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
            <PostFrame>
              <Image
                width="8.33vw"
                height="8.33vw"
                borderRadius="12px"
                src={challenge.challengeGood}
                alt="vegan_diet"
              />
              <ExTitle good>
                <RadioButtonUnchecked style={{ marginRight: "8px" }} /> 좋은
                인증샷
              </ExTitle>
            </PostFrame>
            <PostFrame>
              <Image
                width="8.33vw"
                height="8.33vw"
                borderRadius="12px"
                src={challenge.challengeBad}
                alt="nonvegan_diet"
              />
              <ExTitle>
                <NotInterested style={{ marginRight: "8px" }} />
                나쁜 인증샷
              </ExTitle>
            </PostFrame>
          </MobileFrame>
        </Example>
        <h3>소개글</h3>
        <Desc>{challenge.challengeContent}</Desc>
        <TagFrame>
          <Tag bg="mainGreen" color="white">
            {challenge.tag}
          </Tag>
          <Tag bg="mainOrange" color="white">
            {category}
          </Tag>
        </TagFrame>
        <ChallengeMember />
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
  position: relative;
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: bold;
    margin-bottom: 16px;
  }
  ${({ theme }) => theme.device.desktopLg} {
    h3 {
      font-size: 18px;
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
`;

const Noti = styled.p`
  width: fit-content;
  background-color: ${({ theme }) => theme.colors.mainOrange};
  color: white;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  ${({ theme }) => theme.device.desktopLg} {
    font-size: 18px;
  }

  ${({ theme }) => theme.device.desktop} {
    font-size: 18px;
  }

  ${({ theme }) => theme.device.tablet} {
    font-size: 16px;
  }

  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    text-align: center;
    font-size: 14px;
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

  ${({ theme }) => theme.device.desktopLg} {
    font-size: 16px;
    span {
      font-size: 16px;
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
  ${({ theme }) => theme.device.mobileLg} {
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
    margin-right: 1.67vw;
    font-weight: bold;
  }
  div {
    margin-right: 1.67vw;
  }
  ${({ theme }) => theme.device.desktopLg} {
    span {
      font-size: 16px;
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
  ${({ theme }) => theme.device.mobileLg} {
    span {
      font-size: ${({ theme }) => theme.fontSizes.xs};
    }
    flex-direction: column;
    div {
      margin-right: 0;
    }
  }
`;

const PostFrame = styled.div`
  & > img {
    cursor: default;
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
  ${({ theme }) => theme.device.desktopLg} {
    font-size: 16px;
  }
  ${({ theme }) => theme.device.desktop} {
    font-size: 16px;
  }

  ${({ theme }) => theme.device.tablet} {
    font-size: 14px;
  }
  ${({ theme }) => theme.device.mobileLg} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    margin-top: 0.74vh;
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
    top: 0;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;
