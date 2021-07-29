import React from "react";
import styled from "styled-components";

function Mypage() {
  return (
    <>
      <UserInfoContainer>
        <UserInfoBox>
          <UserImg>
            <img src="" alt="" />
          </UserImg>

          <UserInfo>
            <span>유저닉네임</span>
            <span>챌린지를 열심히 참여하고 계시군요!</span>
          </UserInfo>
        </UserInfoBox>

        <EditBox>
          <button>수정</button>
        </EditBox>
      </UserInfoContainer>

      <ChallengeCategory>
        <div>진행중인 챌린지</div>
        <div>진행 예정 챌린지</div>
        <div>완료한 챌린지</div>
        <div>FAQ</div>
      </ChallengeCategory>

      <Section>
        <ChallengeContent>
          <ChallengeImg>
            <img alt="" />
          </ChallengeImg>
          <div>
            <div>
              <span>7월 24일부터 시작했어요!</span>
            </div>
            <div>
              <span>주 2회 물 마시기</span>
            </div>
            <div>
              <div>
                <img alt="" />
              </div>
              <div>
                <span>ㅇㅇㅇ님 외 ㅇㅇ명이 함께 도전 중이에요!</span>
              </div>
            </div>
          </div>
        </ChallengeContent>
      </Section>
    </>
  );
}

const UserInfoContainer = styled.div`
  width: 100%;
  height: 150px;
  background-color: firebrick;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const UserInfoBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

const UserImg = styled.div`
  width: 50px;
  height: 50px;
  img {
    background-color: blue;
    width: 50px;
    height: 50px;
  }
`;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const EditBox = styled.div``;

const ChallengeCategory = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: blanchedalmond;
`;

const Section = styled.div`
  width: 100%;
  height: 100vh;
  background-color: chartreuse;
  padding: 20px;
`;

const ChallengeContent = styled.div`
  width: 100%;
  height: 100px;
  background-color: seashell;
  display: flex;
`;

const ChallengeImg = styled.div`
  width: 30%;
  height: 100%;
  img {
    background-color: blue;
    width: 63%;
    height: 100%;
  }
`;

export default Mypage;
