import React from "react";
import styled from "styled-components";

import { getCookie } from "../../shared/Cookie";
import { useSelector } from "react-redux";

import level from "../../assets/images/icons/level.svg";
import completed from "../../assets/images/icons/completed.svg";
import levelData from "../../shared/level";
import { Image } from "../../elements";

function Info() {
  const is_login = getCookie("token") ? true : false;
  const user = useSelector((state) => state.user.userInfo);
  const levelState = parseInt((user?.memberLevel - 1) / 5);

  return (
    <>
      <InfoContainer>
        {is_login && user?.memberId !== null ? (
          <>
            <InfoBox>
              <div>
                <span style={{ fontWeight: "bold" }}>{user?.nickname}</span>님은
              </div>
              <div>{user?.challengeCount}개의 챌린지를 진행중!</div>
            </InfoBox>
            <InfoBox2>
              <LeftBox>
                <p>
                  <Image
                    width="1.5em"
                    height="1.5em"
                    margin="2%"
                    src={level}
                    alt="level"
                  />
                  등급: {levelData[levelState] && levelData[levelState].level}
                </p>
              </LeftBox>
              <RightBox>
                <p>
                  <Image
                    width="1.5em"
                    height="1.5em"
                    margin="3%"
                    src={completed}
                    alt="level"
                  />
                  완료: {user?.completeChallengeCount}개
                </p>
              </RightBox>
            </InfoBox2>
          </>
        ) : (
          <>
            <GuestBox>
              <div>
                <span>로그인을</span>하여
              </div>
              <div>자신만의 특별한</div>
              <div>하루조각을 모아보세요!</div>
            </GuestBox>
          </>
        )}
      </InfoContainer>
    </>
  );
}

const InfoContainer = styled.div`
  width: 16.15vw;
  height: 16.17vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 25px 0 0;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};

  ${({ theme }) => theme.device.mobileLg} {
    display: none;
  }
`;

const InfoBox = styled.div`
  width: 15.05vw;
  height: 9.8vh;
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding-left: 20px;
  div {
    padding-bottom: 5px;
  }
  ${({ theme }) => theme.device.desktopLg} {
    font-size: 20px;
  }
  ${({ theme }) => theme.device.desktop} {
    font-size: 18px;
  }
  ${({ theme }) => theme.device.tablet} {
    font-size: 12px;
  }
`;

const InfoBox2 = styled.div`
  width: 16.12vw;
  height: 6.47vh;
  border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
  display: flex;
`;

const LeftBox = styled.div`
  width: 8.05vw;
  height: 100%;
  border-radius: 0px 0px 8px 8px / 0px 0px 0px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.gray};
  p {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const RightBox = styled.div`
  width: 8.05vw;
  border-radius: 0px 0px 0px 0px / 0px 0px 8px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray};
  p {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const GuestBox = styled.div`
  padding: 10px;
  padding-bottom: 25px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  span {
    font-weight: bold;
  }
  div {
    padding: 5px;
  }
`;

export default Info;
