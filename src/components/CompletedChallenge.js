import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { actionCreators as myInfo } from "../redux/modules/mypage";

function CompletedChallenge() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myInfo.getEndDB());
  }, []);

  const myChallengeList = useSelector(
    (state) => state.mypage.myInfo.challengeList
  );
  return (
    <>
      {myChallengeList &&
        myChallengeList.map((list, idx) => {
          return (
            <ChallengeContent key={idx}>
              <ChallengeImg>
                <img src={list.challengeImgUrl} alt="" />
              </ChallengeImg>
              <div>
                <div>
                  <span>완료!</span>
                </div>
                <div>
                  <span>{list.challengeTitle}</span>
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
          );
        })}
    </>
  );
}

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

export default CompletedChallenge;
