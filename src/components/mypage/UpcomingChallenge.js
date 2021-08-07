import React, { useEffect } from "react";
import styled from "styled-components";
import { Card, Tag } from "../../elements";

import { history } from "../../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as myInfo } from "../../redux/modules/mypage";
import { changeForm } from "./ChallengesInProgress";

function UpcomingChallenge(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myInfo.getProceedDB());
  }, []);

  const my_info = useSelector((state) => state.mypage.myInfo);

  const myChallengeList = useSelector(
    (state) => state.mypage.myInfo.challengeList
  );

  const start = myChallengeList?.map(
    (list) => list.challengeStartDate.split("T")[0]
  );
  const end = myChallengeList?.map(
    (list) => list.challengeEndDate.split("T")[0]
  );

  const {
    _year: start_year,
    _month: start_month,
    _date: start_date,
  } = changeForm(start);
  const {
    _year: end_year,
    _month: end_month,
    _date: end_date,
  } = changeForm(end);

  return (
    <Container>
      <CardGrid>
        {myChallengeList &&
          myChallengeList.map((list, idx) => {
            return (
              <Card
                strongDate
                key={list.challengeId}
                onClick={() =>
                  history.push(`/challenge/${list.challengeId}/intro`)
                }
                width="16.04vw"
                height="28.89vh"
                title={list.challengeTitle}
                date={`${start_year[idx]}.${start_month[idx]}.${start_date[idx]}-${end_year[idx]}.${end_month[idx]}.${end_date[idx]}`}
                src={list.challengeImgUrl}
                alt="challenge"
              >
                <Tag bg="mainOrange" color="white" padding="8px 20px">
                  금주
                </Tag>
                {my_info.memberId === list.challengeMember}
                <Tag bg="mainGreen" color="white" padding="8px 20px">
                  내가 만든 챌린지
                </Tag>
              </Card>
            );
          })}
      </CardGrid>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CardGrid = styled.div`
  width: 66.67vw;
  display: grid;
  gap: 1.04vw;
  grid-template-columns: repeat(4, 16.04vw);
  grid-template-rows: repeat(1, 34.63vh);
  grid-auto-rows: 34.63vh;
`;

export default UpcomingChallenge;
