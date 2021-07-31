import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { actionCreators as myInfo } from "../redux/modules/mypage";

const changeForm = (dates) => {
  let _month = dates?.map((m) => {
    if (m.split("-")[1][0] === "0") {
      console.log(m.split("-")[1][1], m.split("-")[1]);
      return m.split("-")[1][1];
    } else {
      return m.split("-")[1];
    }
  });

  let _date = dates?.map((d) => {
    if (d.split("-")[2][0] === "0") {
      return d.split("-")[2][1];
    } else {
      return d.split("-")[2];
    }
  });

  return { _month, _date };
};

function ChallengesInProgress(props) {
  const {
    match: { path },
  } = props;

  useEffect(() => {
    dispatch(myInfo.getMyInfoDB());
  }, []);

  const dispatch = useDispatch();
  const myChallengeList = useSelector(
    (state) => state.mypage.myInfo.challengeList
  );
  const my_info = useSelector((state) => state.mypage.myInfo);

  const start = myChallengeList?.map(
    (list) => list.challengeStartDate.split("T")[0]
  );

  const { _month: start_month, _date: start_date } = changeForm(start);

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
                  <span>
                    {start_month[idx]}월 {start_date[idx]}일 부터 시작했어요!
                  </span>
                </div>
                <div>
                  <span>{list.challengeTitle}</span>
                </div>
                <div>
                  <div>
                    <img alt="" />
                  </div>
                  <div>
                    {list.participateSize && list.participateSize > 1 ? (
                      <span>
                        {my_info && my_info.nickname}님 외{" "}
                        {list.participateSize - 1}명이 함께 도전 중이에요!
                      </span>
                    ) : (
                      <span>
                        혼자 도전중이에요! 친구에게 챌린지를 추천해보세요!
                      </span>
                    )}
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

export { changeForm };

export default ChallengesInProgress;
