import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, Card, Tag } from "../../elements";

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
      {myChallengeList && myChallengeList.length !== 0 ? (
        <CardGrid>
          {myChallengeList.map((list, idx) => {
            let category = "";
            if (list.categoryName === "NODRINKNOSMOKE") {
              category = "금연&금주";
            } else if (list.categoryName === "EXERCISE") {
              category = "운동";
            } else {
              category = "생활습관";
            }
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
                  {category}
                </Tag>
                {my_info.memberId === list.challengeMember ? (
                  <Tag bg="mainGreen" color="white" padding="8px 20px">
                    내가 만든 챌린지
                  </Tag>
                ) : null}
              </Card>
            );
          })}
        </CardGrid>
      ) : (
        <NoListMent>
          <p>
            아직 진행중인 챌린지가 없어요!
            <br /> 새로운 챌린지를 찾아 볼까요?
          </p>
          <Button
            width="16.15vw"
            height="5.93vh"
            color="white"
            bg="mainGreen"
            margin="0 3.23vw 0 2.08vw"
            _onClick={() => history.push(`/search/1/NODRINKNOSMOKE`)}
          >
            챌린지 둘러보기!
          </Button>
        </NoListMent>
      )}
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

const NoListMent = styled.div`
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
  p {
    margin-bottom: 10%;
    line-height: 2.5;
  }
`;

export default UpcomingChallenge;
