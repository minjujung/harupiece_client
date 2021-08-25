import React from "react";
import styled from "styled-components";

import main from "../assets/images/info/landing_m_01.png";
import down from "../assets/images/icons/arrow/down.svg";
import chat from "../assets/images/info/landing_m_04.png";
import { Button, Image } from "../elements";

const LandingPage = (props) => {
  return (
    <Container>
      <MainSection>
        <h1>
          당신의 건강 챌린지를 도와주는 서비스
          <br />
          하루조각
        </h1>
        <Desc>
          <Ment>
            <p>
              매일 스트레칭하기, 물 2L 마시기, 영양제 먹기 ...
              <br />
              사소하지만 우리의 건강을 챙겨줄 수 있는 챌린지에 참여해서
              <br />
              당신의 조각들을 모아보세요.
            </p>
            <Button width="100%" height="5.93vh" margin="26.48vh 0 0 0">
              가입하고 챌린지 참여하기
            </Button>
          </Ment>
          <Image width="39.58vw" height="auto" src={main} alt="mainpage" />
        </Desc>
        <button>
          <img src={down} alt="downArrow" />
        </button>
      </MainSection>
      <ChallengeSection>
        <h1>건강한 습관을 만들 챌린지에 참여해보세요.</h1>
        <p>
          습관챌린지, 금연&금주, 운동 중 원하는 챌린지를 찾아보세요.
          <br />
          원하는 챌린지가 없다면 새로 챌린지를 개설하여
          <br />
          함께 할 사람들을 모아보세요!{" "}
        </p>
        <img></img>
      </ChallengeSection>
      <PostSection>
        <img></img>
        <h1>다른 사람들의 인증샷을 보고 응원해주세요.</h1>
        <p>
          습관을 만들기 어렵다고 느낀 적 있으신가요? <br />
          다른 사람들과 함께 챌린지를 진행하고 인증샷을 남기며
          <br />
          인증버튼을 눌러보세요. 습관이 재밌어질 거에요!{" "}
        </p>
      </PostSection>
      <ChatSection>
        <h1>실시간 채팅을 통해 더 깊게 소통해보세요.</h1>
        <p>
          같은 챌린지를 진행하는 사람과 챌린지를 하면서 느낀 점이나 고민을
          <br /> 공유해보세요. 팁을 얻게 될지도 몰라요.{" "}
        </p>
        <img src={chat} alt="chat"></img>
      </ChatSection>
      <IntroSection>
        <h1>나를 위한 조각을 모을 준비 되셨나요?</h1>
        <button>가입하고 챌린지 참여하기</button>
      </IntroSection>
    </Container>
  );
};

export default LandingPage;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 16.67vw;
`;

const MainSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 11.85vh;
  h1 {
    line-height: normal;
    font-size: 36px;
    font-weight: bold;
  }
  button {
    max-width: 16.15vw;
  }
  ${({ theme }) => theme.device.desktopLg} {
    h1 {
      font-size: 24px;
    }
    button {
      font-size: 16px;
    }
  }
  ${({ theme }) => theme.device.desktop} {
    h1 {
      font-size: 24px;
    }
    button {
      font-size: 16px;
    }
  }

  ${({ theme }) => theme.device.tablet} {
    h1 {
      font-size: 24px;
    }
    button {
      font-size: 12px;
    }
  }
`;

const Desc = styled.div`
  display: flex;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.darkGray};
  margin-top: 3.7%;
  img {
    min-width: 39.58vw;
  }
  ${({ theme }) => theme.device.desktopLg} {
    font-size: 16px;
  }
  ${({ theme }) => theme.device.desktop} {
    font-size: 16px;
  }

  ${({ theme }) => theme.device.tablet} {
    font-size: 12px;
  }
`;

const Ment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 5.21vw;
`;

const ChallengeSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const PostSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ChatSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const IntroSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
