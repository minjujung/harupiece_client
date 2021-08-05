import React from "react";
import styled from "styled-components";
import { getCookie } from "../../shared/Cookie";
import { useSelector } from "react-redux";

function Info() {
  const is_login = getCookie("token") ? true : false;
  const user = useSelector((state) => state.user.userInfo);

  return (
    <>
      <InfoContainer>
        {is_login ? (
          <>
            <InfoBox>
              <div>
                <span style={{ fontWeight: "bold" }}>{user.nickname}</span>님은
              </div>
              <div>{user.challengeCount}개의 챌린지를 진행중!</div>
            </InfoBox>
            <InfoBox2>
              <LeftBox>
                <img src="" alt="" />
                {/* 민주님 dev pull 받은 뒤 재 설정 필요함 */}
                <div>등급:노랑</div>
              </LeftBox>
              <RightBox>
                <img src="" alt="" />
                <div>총 조각:{user.point}개</div>
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
`;

const InfoBox2 = styled.div`
  width: 16.12vw;
  height: 6.47vh;
  border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
  display: flex;
`;

const LeftBox = styled.div`
  width: 8.05vw;
  border-radius: 0px 0px 8px 8px / 0px 0px 0px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.gray};
`;
const RightBox = styled.div`
  width: 8.05vw;
  border-radius: 0px 0px 0px 0px / 0px 0px 8px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray};
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
