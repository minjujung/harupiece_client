import React from "react";
import styled from "styled-components";

function Info() {
  return (
    <>
      <InfoContainer>
        <InfoBox>
          <div>
            <span style={{ fontWeight: "bold" }}>홍길동님은</span>
          </div>
          <div>4개의 챌린지를 진행중!</div>
        </InfoBox>
        <InfoBox2>
          <LeftBox>
            <img src="" alt="" />
            <div>등급:노랑</div>
          </LeftBox>
          <RightBox>
            <img src="" alt="" />
            <div>총 조각:4개</div>
          </RightBox>
        </InfoBox2>
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
`;

const InfoBox = styled.div`
  width: 62.26vw;
  height: 30.9vh;
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin: 0 97px 23px 20px;
  border-radius: 8px;
`;

const InfoBox2 = styled.div`
  width: 62.26vw;
  height: 40vh;
  border-radius: 8px;
  display: flex;
`;

const LeftBox = styled.div`
  width: 8.05vw;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray};
`;
const RightBox = styled.div`
  width: 8.05vw;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray};
`;

export default Info;
