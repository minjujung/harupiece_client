import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Card, Tag } from "../../elements";
import { history } from "../../redux/configureStore";
import { actionCreators as myInfo } from "../../redux/modules/mypage";

// 2021-08-07T23:59:59 형태를 2021, 8, 7의 형태로 바꿔주는 함수
const changeForm = (dates) => {
  let _year = dates?.map((y) => {
    return y.split("-")[0];
  });

  let _month = dates?.map((m) => {
    return m.split("-")[1];
  });

  let _date = dates?.map((d) => {
    return d.split("-")[2];
  });

  return { _year, _month, _date };
};

function ChallengesInProgress(props) {
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
                search
                key={list.challengeId}
                inProcess={list.participateSize}
                onClick={() =>
                  history.push(`/challenge/${list.challengeId}/intro`)
                }
                width="100%"
                height="34.63vh"
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
            아직 참여중인 챌린지가 없어요!{/* 아직 진행중인 챌린지가 없어요! */}
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

export { changeForm };

export default ChallengesInProgress;

const Container = styled.div`
  width: 100%;
`;

const CardGrid = styled.div`
  width: 66.67vw;
  display: grid;
  gap: 1.04vw;
  grid-template-columns: repeat(4, 16.04vw);
  grid-template-rows: repeat(1, 34.63vh);
  grid-auto-rows: 34.63vh;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    gap: 3.13vh;
    grid-template-columns: repeat(1, 91.11vw);
    grid-template-rows: repeat(1, 558px);
  }
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
  ${({ theme }) => theme.device.mobileLg} {
    height: 25vh;
    font-size: 20px;
    button {
      width: 55.56vw;
    }
  }
`;
