import React, { useEffect, useState } from "react";
import styled from "styled-components";
import levelData from "../../shared/level";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as myInfo } from "../../redux/modules/mypage";
import { Image } from "../../elements";

function MyPieces(props) {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.userInfo);
  const point_history = useSelector(
    (state) => state.mypage.myInfo.pointHistoryList
  );

  useEffect(() => {
    dispatch(myInfo.getPointDB());
  }, []);

  const [show, setShow] = useState(false);

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

  // 사용자의 level에 맞게 구슬 보여주기 위한 함수
  const levelArray = Array.from({ length: levelDivided5 }, (item, idx) => {
    return idx;
  });

  //에시 구슬 모음
  // const levelArray = Array.from({ length: 5 }, (item, idx) => {
  //   return idx;
  // });

  return (
    <Container>
      <PointGrid>
        <InfoBox mainGreen>
          <p>나의 하루조각 등급은?</p>
          <strong>{userLevel}(1위)</strong>
        </InfoBox>
        <InfoBox>
          <p>하루조각 총 개수</p>
          <strong>{user_info.point}개</strong>
        </InfoBox>
        <InfoBox>
          <p>다음 등급까지 필요 개수</p>
          <strong> {levelState - user_info.point}개</strong>
        </InfoBox>
        <InfoBox>
          <p>내가 모은 구슬</p>
          <MarbleList>
            {levelArray.map((idx) => (
              <Image
                width="60px"
                height="60px"
                borderRadius="30px"
                marbleBorder={levelArray.length < 2 ? "2px solid #fff" : null}
                margin="0 0 0 -1.56vw"
                src={levelData[idx].img}
                alt="level_img"
              />
            ))}
          </MarbleList>
        </InfoBox>
      </PointGrid>
      <PointHistory>
        <Header>
          <h2>조각 히스토리</h2>
          <button onClick={() => setShow(!show)}>
            {show ? "접어두기" : "펼치기"}
          </button>
        </Header>
        {show ? (
          <>
            {props.pointHistoryList.length !== 0 ? (
              <HistoryBox>
                {props.pointHistoryList.map((history) => (
                  <p key={props.pointHistoryList.pointHistoryId}>
                    [{history.challengeTitle}]챌린지를 통해 {history.point}조각
                    획득
                  </p>
                ))}
              </HistoryBox>
            ) : (
              // {point_history?.length !== 0 ? (
              //   point_history?.map((history) => (
              //     <div key={history.pointHistoryId}>
              //       <p>
              //         <strong>{history.challengeTitle}</strong> 챌린지에서 조각을
              //         획득했어요!
              //       </p>
              //       <p>
              //         획득한 조각 <strong>{history.point}</strong>개!
              //       </p>
              //     </div>
              //   ))
              <NoPointMent>
                아직 모은 조각이 없어요.
                <br /> 챌린지를 달성하고 조각을 모아서 구슬을 만들어 보세요!
              </NoPointMent>
            )}
          </>
        ) : null}
      </PointHistory>
      {/* <section>
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
        {point_history &&
          point_history.map((history) => (
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
      </section> */}
    </Container>
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

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PointGrid = styled.section`
  width: 66.67vw;
  height: auto;
  display: grid;
  gap: 0.83vw;
  grid-template-columns: repeat(4, 16.04vw);
  grid-template-rows: repeat(1, 16.11vh);
  margin-bottom: 5.55vh;
`;

const InfoBox = styled.div`
  width: 16.04vw;
  height: 16.11vh;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.mainGreen
      ? props.theme.colors.mainGreen
      : props.theme.colors.lightGray};
  color: ${(props) =>
    props.mainGreen ? props.theme.colors.white : props.theme.colors.mainGreen};
  p {
    font-size: ${({ theme }) => theme.fontSizes.md};
    margin-bottom: 2.22vh;
  }
  strong {
    font-weight: bold;
    font-size: 56px;
  }
`;

const MarbleList = styled.div`
  width: 9.38vw;
  display: flex;
  justify-content: center;
  margin-left: 1.56vw;
`;

const PointHistory = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.22vh;
  h2 {
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
  button {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const NoPointMent = styled.p`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.gray};
  font-weight: bold;
  line-height: normal;
`;

const HistoryBox = styled.div`
  width: 100%;
  height: auto;
  grid-template-rows: repeat(1, 5.55vh);
  grid-auto-rows: 5.55vh;
  gap: 1.48vh;
  p {
    height: 5.55vh;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.lightGray};
    color: ${({ theme }) => theme.colors.DarkGray};
    padding: 2.13vh 0 1.85vh 0.99vw;
  }
`;
