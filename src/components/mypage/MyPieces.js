import React from "react";
import levelData from "../../shared/level";

import { useSelector } from "react-redux";

function MyPieces(props) {
  const { memberLevel, point, pointHistoryList } = props;
  const user_info = useSelector((state) => state.user.userInfo);

  const userLevel = user_info.memberLevel;
  const levelDivided5 = parseInt((userLevel - 1) / 5) + 1;

  //다음 레벨까지 얼마나 남았는지 계산
  let levelState = 0;
  if (userLevel <= 5) {
    levelState = (((userLevel - 1) % 5) + 1) * (levelDivided5 * 100);
  } else if (5 < userLevel && userLevel <= 10) {
    levelState = (((userLevel - 1) % 5) + 1) * (levelDivided5 * 100) + 500;
  } else if (10 < userLevel && userLevel <= 15) {
    levelState = (((userLevel - 1) % 5) + 1) * (levelDivided5 * 100) + 1500;
  } else if (15 < userLevel && userLevel <= 20) {
    levelState = (((userLevel - 1) % 5) + 1) * (levelDivided5 * 100) + 3000;
  } else if (20 < userLevel && userLevel <= 25) {
    levelState = (((userLevel - 1) % 5) + 1) * (levelDivided5 * 100) + 5000;
  } else {
    levelState = (((userLevel - 1) % 5) + 1) * (levelDivided5 * 100) + 7500;
  }

  const levelDataIdx = parseInt((userLevel - 1) / 5);

  const levelArray = Array.from({ length: levelDivided5 }, (item, idx) => {
    return idx;
  });

  return (
    <>
      <section>
        <div>
          <h3>나의 등급: {userLevel}</h3>
          <img
            src={levelData[levelDataIdx] && levelData[levelDataIdx].img}
            alt="level_image"
            style={{ width: "5em", height: "5em" }}
          />{" "}
          level {user_info.memberLevel}
        </div>
        <div>
          <h3>조각 모음:</h3> 총 {user_info.point}개 / 다음 레벨 까지{" "}
          {levelState - user_info.point} 개가 더 필요해요!{" "}
        </div>
        <div>
          <h3>모은 구슬: </h3>
          {levelArray.map((idx) => (
            <img
              src={levelData[idx].img}
              alt="level_img"
              style={{ width: "5em", height: "5em" }}
            />
          ))}
        </div>
      </section>
      <section>
        <h4>조각 모음 일지</h4>
        {pointHistoryList.map((history) => (
          <div key={history.pointHistoryId}>
            <p>
              <strong>{history.challengeTitle}</strong> 챌린지에서 조각을
              획득했어요!
            </p>
            <p>
              획득한 조각 <strong>{history.point}</strong>개!
            </p>
          </div>
        ))}
      </section>
    </>
  );
}

MyPieces.defaultProps = {
  memberLevel: 3,
  point: 350,
  pointHistoryList: [
    {
      pointHistoryId: 1,
      createdAt: "2021-07-31",
      challengeTitle: "달리는게 좋아",
      point: 1,
    },
  ],
};

export default MyPieces;
