import React from "react";
import styled from "styled-components";

import main from "../assets/images/info/pc/main.png";
import chat from "../assets/images/info/pc/chat.png";
import challenges from "../assets/images/info/pc/challenge.png";
import post from "../assets/images/info/pc/post.png";
import pieces from "../assets/images/info/pc/pieces.png";
import down from "../assets/images/icons/arrow/down.svg";
import { Button, Image } from "../elements";
import { history } from "../redux/configureStore";

const LandingPage = (props) => {
  const goToSignUp = () => {
    history.push("/signup");
  };

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
            <Button
              width="100%"
              height="5.93vh"
              padding="0.73vw 2.45vw"
              margin="26.48vh 0 0 0"
              _onClick={goToSignUp}
            >
              가입하고 챌린지 참여하기
            </Button>
          </Ment>
          <Image width="39.58vw" height="auto" src={main} alt="mainpage" />
        </Desc>
        <Down>
          <img src={down} alt="downArrow" />
        </Down>
      </MainSection>
      <ChallengeSection>
        <MentFrame>
          <h1>건강한 습관을 만들 챌린지에 참여해보세요.</h1>
          <p>
            습관챌린지, 금연&금주, 운동 중 원하는 챌린지를 찾아보세요.
            <br />
            원하는 챌린지가 없다면 새로 챌린지를 개설하여
            <br />
            함께 할 사람들을 모아보세요!{" "}
          </p>
        </MentFrame>
        <ImageFrame>
          <img src={challenges} alt="challenges"></img>
        </ImageFrame>
      </ChallengeSection>
      <PostSection>
        <img src={post} alt="post"></img>
        <MentFrame>
          <h1>다른 사람들의 인증샷을 보고 응원해주세요.</h1>
          <p>
            습관을 만들기 어렵다고 느낀 적 있으신가요? <br />
            다른 사람들과 함께 챌린지를 진행하고 인증샷을 남기며
            <br />
            인증버튼을 눌러보세요. 습관이 재밌어질 거에요!{" "}
          </p>
        </MentFrame>
      </PostSection>
      <PiecesSection>
        <MentFrame>
          <h1>챌린지를 완료해서 조각을 모아보세요.</h1>
          <p>
            챌린지에 인증샷을 올리면 1조각,
            <br />
            챌린지를 완료하면 인증기간 X 50조각,
            <br />
            공식 챌린지를 완료하면 인증기간 X 100조각을 모을 수 있어요.
            <br />
            <span>
              *인증샷을 올리고 다른 참가자의 50%가 응원해야 1조각을 모을 수
              있습니다.
            </span>
          </p>
        </MentFrame>
        <img src={pieces} alt="pieces" />
      </PiecesSection>
      <ChatSection>
        <img src={chat} alt="chat" />
        <MentFrame>
          <h1>실시간 채팅을 통해 더 깊게 소통해보세요.</h1>
          <p>
            같은 챌린지를 진행하는 사람과 챌린지를 하면서 느낀 점이나 고민을
            <br /> 공유해보세요. 팁을 얻게 될지도 몰라요.{" "}
          </p>
        </MentFrame>
      </ChatSection>
      <IntroSection>
        <h1>나를 위한 조각을 모을 준비 되셨나요?</h1>
        <Button
          width="16.15"
          height="5.93vh"
          padding="0.73vw 2.45vw"
          _onClick={goToSignUp}
        >
          가입하고 챌린지 참여하기
        </Button>
      </IntroSection>
    </Container>
  );
};

export default LandingPage;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MainSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 9vh;
  padding: 0 16vw 2.08vw 16vw;
  h1 {
    line-height: normal;
    font-size: 36px;
    font-weight: 500;
  }
  button {
    font-size: 18px;
    max-width: 16.15vw;
  }
  /* ${({ theme }) => theme.device.desktopLg} {
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
  } */
`;

const Down = styled.button`
  width: 24px;
  height: 24px;
  margin: 4.79vw auto 0 auto;
  img {
    width: 24px;
    height: 24px;
  }
`;

const Desc = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes.ms};
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
  line-height: normal;
  margin-right: 4.4vw;
`;

const ChallengeSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 8.54vw 0 7.55vw 0;
`;

const MentFrame = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 24px;
    margin-bottom: 1.25vw;
    font-weight: 500;
  }
  p {
    line-height: normal;
    font-size: ${({ theme }) => theme.fontSizes.ms};
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

const ImageFrame = styled.div`
  width: 46.86vw;
  overflow: hidden;
  margin-left: 7.66vw;
  img {
    object-fit: scale-down;
  }
`;

const PostSection = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 4.17vw 23vw;
  background-color: ${({ theme }) => theme.colors.lightGray};
  img {
    margin-right: 5vw;
  }
`;

const PiecesSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3.65vw 18.49vw;
  span {
    font-size: 12px;
  }
`;

const ChatSection = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 2.34vw 0 2.34vw 32.5vw;
  background-color: ${({ theme }) => theme.colors.lightGray};
  img {
    margin-right: 8.33vw;
  }
`;

const IntroSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 11.09vw 0 6.51vw 0;
  h1 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 1.98vw;
  }
  button {
    font-size: ${({ theme }) => theme.fontSizes.ms};
  }
`;
