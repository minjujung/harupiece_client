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

  return (
    <StateContainer>
      <UserStatus>
        {user_info.nickname}은<br />
        4개의 챌린지 진행중!
      </UserStatus>
      <UserLevel>
        <LevelInfo>
          <p>
            <Image width="1.5em" height="1.5em" src={level} alt="level" />
            등급: {levelData[levelState] && levelData[levelState].name}
          </p>
          <Image
            width="7.5em"
            height="7.5em"
            borderRadius="50%"
            src={levelData[levelState] && levelData[levelState].img}
            alt="level_image"
          />
        </LevelInfo>
        <section>
          <p>
            <Image width="1.5em" height="1.5em" src={completed} alt="level" />
            완료: 4개
          </p>
          <Image
            width="1.89em"
            height="2.5em"
            borderRadius="50%"
            src={product_icon}
            alt="level_image"
          />
        </section>
      </UserLevel>
    </StateContainer>
  );
};

export default StateBox;

const StateContainer = styled.div`
  width: 16.15vw;
  height: 28.7vh;
  border: 2px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 10px;
  margin-left: 1%;
`;

const UserStatus = styled.p`
  padding: 1em;
  border-bottom: 2px solid ${({ theme }) => theme.colors.lightGray};
`;

const UserLevel = styled.div`
  height: 100%;
  display: flex;
`;

const LevelInfo = styled.section`
  border-right: 2px solid ${({ theme }) => theme.colors.lightGray};
`;
