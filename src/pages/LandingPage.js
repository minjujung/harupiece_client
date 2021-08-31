import React from "react";
import styled from "styled-components";

import main from "../assets/images/info/pc/main.png";
import chat from "../assets/images/info/pc/chat.png";
import challenges from "../assets/images/info/pc/challenge.png";
import post from "../assets/images/info/pc/post.png";
import pieces from "../assets/images/info/pc/pieces.png";
import mobilePost from "../assets/images/info/mobilePost.png";
import mobileChat from "../assets/images/info/mobileChat.png";
import down from "../assets/images/icons/arrow/down.svg";
import { Button, Image } from "../elements";
import { history } from "../redux/configureStore";

const LandingPage = (props) => {
  const goToSignUp = () => {
    history.push("/signup");
  };

  const goToHome = () => {
    history.push("/home");
  };

  return (
    <Container>
      <MainSection>
        <h1>
          당신의 건강한 습관을 위한 페이스 메이커
          <br />
          하루조각
        </h1>
        <Desc>
          <Ment>
            <p style={{ cursor: "default" }}>
              매일 스트레칭하기, 물 2L 마시기, 영양제 먹기 ...
              <br />
              사소하지만 우리의 건강을 챙겨줄 수 있는 챌린지에 참여해서
              <br />
              당신의 조각들을 모아보세요.
            </p>
            <Button
              width="fit-content"
              padding="0.73vw 2.45vw"
              margin="0"
              _onClick={goToSignUp}
            >
              가입하고 챌린지 참여하기
            </Button>
          </Ment>
          <Image
            width="39.58vw"
            height="22.24vw"
            src={main}
            alt="mainpage"
            no_cursor
          />
        </Desc>
      </MainSection>
      <MobildMain>
        <h1>
          당신의 건강한 습관을 위한 페이스
          <br />
          메이커 하루조각
        </h1>
        <p>
          하루에 30분 걷기, 물 2L 마시기 같은 간단한 챌린지부터
          <br />
          금연하기, 금주하기 같은 혼자만의 의지로 힘든 챌린지까지
          <br />
          조각을 모으면서 건강한 습관을 함께 만들어 보세요.
        </p>
        <Image
          width="39.58vw"
          height="auto"
          src={main}
          alt="mainpage"
          no_cursor
        />
        <Button
          width="91.11vw"
          padding="13px 2.45vw"
          margin="0 5.56vw"
          _onClick={goToSignUp}
        >
          가입하고 챌린지 참여하기
        </Button>
      </MobildMain>
      <Down>
        <img src={down} alt="downArrow" />
      </Down>
      <ChallengeSection>
        <MentFrame>
          <h1>좋은 습관 만들기를 위한 챌린지에 참여해 보세요.</h1>
          <p>
            생활, 금연, 금주, 운동 중 원하는 습관 만들기 챌린지를 찾아 보세요.
            <br />
            원하는 챌린지가 없나요? 그렇다면 직접 챌린지를 개설하여
            <br />
            진행해 볼 수도 있어요!
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
            혼자하는 도전이 지치셨나요? <br />
            이제는 혼자가 아닌 여럿이서 함께 도전해 보세요.
            <br />
            함께 챌린지를 진행하고, 인증을 남겨 서로를 응원하다 보면
            <br />
            습관 만들기, 더욱 재밌어질 거예요!
          </p>
        </MentFrame>
      </PostSection>
      <MobilePost>
        <MentFrame>
          <h1>다른 사람들의 인증샷을 보고 응원해주세요.</h1>
          <p>
            혼자하는 도전이 지치셨나요? <br />
            이제는 혼자가 아닌 여럿이서 함께 도전해 보세요.
            <br />
            함께 챌린지를 진행하고, 인증을 남겨 서로를 응원하다 보면
            <br />
            습관 만들기, 더욱 재밌어질 거예요!
          </p>
        </MentFrame>
        <img src={mobilePost} alt="mobilePost"></img>
      </MobilePost>
      <PiecesSection>
        <MentFrame>
          <h1>챌린지를 완주해서 조각을 모아 보세요.</h1>
          <p>
            챌린지에 일일 인증샷을 올리면 1 조각을,
            <br />
            챌린지를 완주하면 인증한 기간 X 50 조각을,
            <br />
            하루조각 공식 챌린지를 완주하면 인증한 기간 X 100 조각을 모을 수
            있어요.
            <br />
            열심히 모은 조각이 무엇이 될지 궁금하지 않으세요?
            <br />
            하루조각에서 확인해 볼 수 있어요!
            {/* <span>
              *인증샷을 올리고 다른 참가자의 50%가 응원해야 1조각을 모을 수
              있습니다.
            </span> */}
          </p>
        </MentFrame>
        <img src={pieces} alt="pieces" />
      </PiecesSection>
      <ChatSection>
        <img src={chat} alt="chat" />
        <MentFrame>
          <h1>실시간 채팅을 통해 더 가까이 소통해 보세요.</h1>
          <p>
            함께 챌린지를 진행하는 사람들과 챌린지를 하며 느낀점이나 고민을
            공유해 보세요.
            <br /> 흔들렸던 의지는 다잡아지고, 좋은 습관에 한 발짝 더 가까워질
            거예요.
            <br /> 혹시 몰라요. 의외의 팁을 얻을 수도?
          </p>
        </MentFrame>
      </ChatSection>
      <MobileChat>
        <MentFrame>
          <h1>실시간 채팅을 통해 더 가까이 소통해 보세요.</h1>
          <p>
            함께 챌린지를 진행하는 사람들과 챌린지를 하며 느낀점이나 고민을
            공유해 보세요. 흔들렸던 의지는 다잡아지고, 좋은 습관에 한 발짝 더
            가까워질 거예요.
            <br /> 혹시 몰라요. 의외의 팁을 얻을 수도?
          </p>
        </MentFrame>
        <img src={mobileChat} alt="mobileChat" />
      </MobileChat>
      <IntroSection>
        <h1>나를 위한 조각, 모을 준비 되셨나요?</h1>
        <Button width="fit-content" padding="0.73vw 2.45vw" _onClick={goToHome}>
          홈페이지 둘러보기
        </Button>
      </IntroSection>
      <MobileIntroSection>
        <h1>
          나를 위한 조각,
          <br />
          모을 준비 되셨나요?
        </h1>
        <Button
          width="91.11vw"
          padding="13px 2.45vw"
          margin="0 5.56vw"
          _onClick={goToHome}
        >
          홈페이지 둘러보기
        </Button>
      </MobileIntroSection>
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
  padding: 0 13vw 2.08vw 13vw;
  h1 {
    line-height: normal;
    font-size: 36px;
    font-weight: 500;
  }
  button {
    font-size: 22px;
  }
  ${({ theme }) => theme.device.desktopLg} {
    h1 {
      font-size: 34px;
    }
    button {
      font-size: 18px;
    }
  }
  ${({ theme }) => theme.device.desktop} {
    h1 {
      font-size: 24px;
    }
    button {
      font-size: 18px;
    }
  }

  ${({ theme }) => theme.device.tablet} {
    h1 {
      font-size: 22px;
    }
    button {
      font-size: 12px;
    }
  }
  ${({ theme }) => theme.device.mobileLg} {
    display: none;
  }
`;

const MobildMain = styled.section`
  display: none;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    margin-top: 15vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: normal;
    h1 {
      width: 100%;
      padding: 0 7.78vw;
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 20px;
    }
    p {
      width: 100%;
      padding: 0 7.78vw;
      font-size: 16px;
      color: ${({ theme }) => theme.colors.darkGray};
    }
    img {
      padding: 0 5.56vw;
      margin: 60px 0;
      width: 100%;
      height: 50vw;
    }
    button {
      margin: 0;
    }
  }
`;

const Down = styled.button`
  width: 24px;
  height: 24px;
  margin: 4.4vw auto 0 auto;
  img {
    width: 24px;
    height: 24px;
  }
  ${({ theme }) => theme.device.mobileLg} {
    margin: 40px auto 0 auto;
  }
`;

const Desc = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSizes.ms};
  p {
    color: ${({ theme }) => theme.colors.darkGray};
  }
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
  ${({ theme }) => theme.device.mobileLg} {
    flex-direction: column;
    padding: 70px 0 62px 0;
  }
`;

const MentFrame = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 30px;
    line-height: 120%;
    margin-bottom: 1.25vw;
    font-weight: 500;
  }
  p {
    line-height: normal;
    font-size: ${({ theme }) => theme.fontSizes.ms};
    color: ${({ theme }) => theme.colors.darkGray};
  }
  ${({ theme }) => theme.device.desktopLg} {
    h1 {
      font-size: 24px;
    }
    p {
      font-size: 16px;
    }
  }
  ${({ theme }) => theme.device.desktop} {
    h1 {
      font-size: 24px;
    }
    p {
      font-size: 16px;
    }
  }

  ${({ theme }) => theme.device.tablet} {
    h1 {
      font-size: 20px;
    }
    p {
      font-size: 12px;
    }
  }
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    padding: 0 7.78vw;
    h1 {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 20px;
    }
    p {
      font-size: 14px;
      color: ${({ theme }) => theme.colors.darkGray};
    }
  }
`;

const ImageFrame = styled.div`
  width: 46.86vw;
  overflow: hidden;
  margin-left: 7.66vw;
  img {
    height: 17.24vw;
    object-fit: scale-down;
  }
  ${({ theme }) => theme.device.mobileLg} {
    width: 96.22vw;
    margin-left: 0;
    align-self: flex-end;
    overflow: hidden;
    img {
      margin-top: 40px;
      height: 64.56vw;
      object-fit: scale-down;
    }
  }
`;

const PostSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4.17vw 0;
  background-color: ${({ theme }) => theme.colors.lightGray};
  img {
    width: 26.67vw;
    height: 25.1vw;
    margin-right: 5vw;
  }
  ${({ theme }) => theme.device.mobileLg} {
    display: none;
  }
`;

const MobilePost = styled.section`
  display: none;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
    background-color: ${({ theme }) => theme.colors.lightGray};
    img {
      width: 78.06vw;
      height: 82.64vw;
      margin: 40px 0 20px 0;
    }
  }
`;

const PiecesSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3.65vw 0;
  span {
    font-size: 12px;
  }
  img {
    width: 26.04vw;
    height: 26.04vw;
    margin-left: 11.15vw;
  }
  ${({ theme }) => theme.device.mobileLg} {
    flex-direction: column;
    padding: 40px 0 37px 0;
    img {
      width: 78.06vw;
      height: 78.06vw;
      margin-left: 0;
    }
  }
`;

const ChatSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.34vw 0;
  background-color: ${({ theme }) => theme.colors.lightGray};
  img {
    width: 14.58vw;
    height: 28.65vw;
    margin-right: 8.33vw;
  }
  ${({ theme }) => theme.device.mobileLg} {
    display: none;
  }
`;

const MobileChat = styled.section`
  display: none;
  ${({ theme }) => theme.device.mobileLg} {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.lightGray};
    padding: 40px 0 30px 0;
    img {
      width: 71.39vw;
      height: 140vw;
      margin-top: 40px;
    }
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
    margin-bottom: 38px;
  }
  button {
    font-size: ${({ theme }) => theme.fontSizes.ms};
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
      font-size: 22px;
    }
    button {
      font-size: 12px;
    }
  }
  ${({ theme }) => theme.device.mobileLg} {
    display: none;
  }
`;

const MobileIntroSection = styled.section`
  display: none;
  ${({ theme }) => theme.device.mobileLg} {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    padding-top: 35px;
    line-height: normal;
    button {
      margin-top: 28px;
    }
  }
`;
