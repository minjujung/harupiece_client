import React from "react";
import styled from "styled-components";

import level from "../../images/icons/level.svg";
import completed from "../../images/icons/completed.svg";
import product_icon from "../../images/icons/product_icon.svg";
import levelData from "../../shared/level";
import { Image } from "../../elements";

import { useSelector } from "react-redux";

const StateBox = (props) => {
  const user_info = useSelector((state) => state.user.userInfo);
  const levelState = parseInt((user_info.userLevel - 1) / 5);

  if (user_info.memberId === null) {
    return (
      <StateContainer>
        <UserStatus>
          <Strong>
            로그인 해서
            <br />
            나에게 맞는 챌린지를
            <br />
            찾아보세요.
          </Strong>
        </UserStatus>
        <Image
          width="6.25vw"
          height="60%"
          borderRadius="50%"
          margin="0 auto"
          src={levelData[0].img}
          alt="level_image"
        />
      </StateContainer>
    );
  } else if (user_info.memberId !== null && user_info.challengeCount > 0) {
    return (
      <StateContainer>
        <UserStatus goodUser>
          <Strong>{user_info.nickname}</Strong>님은
          <br />
          {user_info.challengeCount}의 챌린지 진행중!
        </UserStatus>
        <UserLevel>
          <LevelInfo>
            <p>
              <Image
                width="1.5em"
                height="1.5em"
                margin="2%"
                src={level}
                alt="level"
              />
              등급:{" "}
              {levelData[levelState] &&
                levelData[levelState].name.split(" ")[0]}
            </p>
            <Image
              width="6.25vw"
              height="60%"
              borderRadius="50%"
              src={levelData[1].img}
              alt="level_image"
            />
          </LevelInfo>

          <Completed>
            <p>
              <Image
                width="1.5em"
                height="1.5em"
                margin="3%"
                src={completed}
                alt="level"
              />
              완료: 4개
            </p>
            <Image
              width="1.57vw"
              height="60%"
              borderRadius="50%"
              src={product_icon}
              alt="level_image"
            />
          </Completed>
        </UserLevel>
      </StateContainer>
    );
  } else {
    return (
      <StateContainer>
        <UserStatus>
          <Strong>{user_info.nickname}</Strong>은<br />
          새로운 챌린지를 찾는 중!
        </UserStatus>
        <Image
          width="6.25vw"
          height="60%"
          borderRadius="50%"
          margin="0 auto"
          src={levelData[0].img}
          alt="level_image"
        />
      </StateContainer>
    );
  }
};

export default StateBox;

const StateContainer = styled.div`
  width: 16.15vw;
  height: 28.7vh;
  display: flex;
  flex-direction: column;
  border: 2px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 10px;
  position: fixed;
`;

const UserStatus = styled.p`
  padding: 7%;
  font-size: ${({ theme }) => theme.fontSizes.md};
  ${(props) =>
    props.goodUser
      ? `border-bottom: 2px solid ${props.theme.colors.lightGray};`
      : null};
`;

const Strong = styled.strong`
  font-weight: bold;
`;

const UserLevel = styled.div`
  height: 90%;
  display: flex;
`;

const LevelInfo = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1;
  padding: 7%;
  border-right: 2px solid ${({ theme }) => theme.colors.lightGray};
  color: 2px solid ${({ theme }) => theme.colors.darkGray};
  p {
    display: flex;
    height: 15%;
    align-items: center;
  }
`;

const Completed = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1;
  color: 2px solid ${({ theme }) => theme.colors.darkGray};
  padding: 7%;
  p {
    display: flex;
    height: 15%;
    align-items: center;
  }
`;
