import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Tag, Card, Image, TagContainer } from "../elements";
import { history } from "../redux/configureStore";
import { MainCreators as searchActions } from "../redux/modules/main";
import InfinityScroll from "../shared/InfinityScroll";

function SearchChallenge(props) {
  // 검색 키워드
  const keyWord = props.match.params.searchWords;
  const dispatch = useDispatch();
  const searchList = useSelector((state) => state.main.search);
  const { paging, is_loading } = useSelector((state) => state.main);

  const [searchState, setSearchState] = useState({
    passingTags: {
      categoryName: {
        EXERCISE: false,
        NODRINKNOSMOKE: false,
        LIVINGHABITS: false,
      },
      tags: {
        1: false,
        2: false,
        3: false,
        4: false,
      },
      progress: {
        1: false,
        2: false,
      },
    },
  });

  const filteredCategory = useCallback(() => {
    const collectedTrueKeys = {
      categoryName: "",
      tags: "",
      challengeProgress: "",
    };

    const { categoryName, tags, progress } = searchState.passingTags;
    for (let categoryKey in categoryName) {
      if (categoryName[categoryKey])
        collectedTrueKeys.categoryName = categoryKey;
    }
    for (let tagKey in tags) {
      if (tags[tagKey]) collectedTrueKeys.tags = tagKey;
    }
    for (let progressKey in progress) {
      if (progress[progressKey]) collectedTrueKeys.progress = progressKey;
    }
    return collectedTrueKeys;
  }, [searchState.passingTags]);

  const allFilterClickListener = (e, filterProp) => {
    let name = e.target.textContent;
    if (name === "금연금주") {
      name = "NODRINKNOSMOKE";
    } else if (name === "운동") {
      name = "EXERCISE";
    } else if (name === "생활챌린지") {
      name = "LIVINGHABITS";
    } else if (name === "1주") {
      name = 1;
    } else if (name === "2주") {
      name = 2;
    } else if (name === "3주") {
      name = 3;
    } else if (name === "4주 이상") {
      name = 4;
    } else if (name === "진행 예정") {
      name = 1;
    } else if (name === "진행중") {
      name = 2;
    } else {
      name = e.target.textContent;
    }

    setSearchState({
      passingTags: {
        ...searchState.passingTags,
        [filterProp]: {
          [name]: !searchState.passingTags[filterProp][name],
        },
      },
    });
  };

  useEffect(() => {
    if (keyWord === "ALL") {
      dispatch(searchActions.searchFilterDB(filteredCategory(), keyWord));
    } else {
      return dispatch(
        searchActions.searchFilterDB(filteredCategory(), keyWord)
      );
    }
  }, [dispatch, filteredCategory, keyWord, searchState]);

  // 챌린지 기간
  const date = searchList?.map((list) => {
    let dateObj = {};
    dateObj.id = list.challengeId;
    dateObj.startDate = list.challengeStartDate.split("T")[0];
    dateObj.endDate = list.challengeEndDate.split("T")[0];
    return dateObj;
  });

  const findDate = (id) => {
    const idx = date.findIndex((d) => d.id === id);
    const challengeDate = {
      startDate: date[idx].startDate,
      endDate: date[idx].endDate,
    };
    return challengeDate;
  };

  const callNext = () => {
    if (paging.next === false) {
      return;
    }
    dispatch(searchActions.searchFilterDB(filteredCategory()));
  };

  return (
    <Container>
      <CategoryContainer>
        <CategoryLeftBox>
          <CategoryTitle>카테고리</CategoryTitle>
          <CategoryTitle>도전기간</CategoryTitle>
          <CategoryTitle>
            <div>기</div>
            <div>타</div>
          </CategoryTitle>
        </CategoryLeftBox>
        <CategoryRightBox>
          <TagBox>
            <Tag
              fontWeight="500"
              border="none"
              onClick={(e) => {
                allFilterClickListener(e, "categoryName");
              }}
              bg={
                searchState.passingTags.categoryName.NODRINKNOSMOKE === true
                  ? "mainGreen"
                  : "white"
              }
              color={
                searchState.passingTags.categoryName.NODRINKNOSMOKE === true
                  ? "white"
                  : "black"
              }
            >
              금연금주
            </Tag>
            <Tag
              fontWeight="500"
              border="none"
              onClick={(e) => allFilterClickListener(e, "categoryName")}
              bg={
                searchState.passingTags.categoryName.LIVINGHABITS === true
                  ? "mainGreen"
                  : "white"
              }
              color={
                searchState.passingTags.categoryName.LIVINGHABITS === true
                  ? "white"
                  : "black"
              }
            >
              생활챌린지
            </Tag>
            <Tag
              fontWeight="500"
              border="none"
              onClick={(e) => allFilterClickListener(e, "categoryName")}
              bg={
                searchState.passingTags.categoryName.EXERCISE === true
                  ? "mainGreen"
                  : "white"
              }
              color={
                searchState.passingTags.categoryName.EXERCISE === true
                  ? "white"
                  : "black"
              }
            >
              운동
            </Tag>
          </TagBox>
          <TagBox>
            <Tag
              fontWeight="500"
              border="none"
              onClick={(e) => allFilterClickListener(e, "tags")}
              bg={
                searchState.passingTags.tags[1] === true ? "mainGreen" : "white"
              }
              color={
                searchState.passingTags.tags[1] === true ? "white" : "black"
              }
            >
              1주
            </Tag>
            <Tag
              fontWeight="500"
              border="none"
              onClick={(e) => allFilterClickListener(e, "tags")}
              bg={
                searchState.passingTags.tags[2] === true ? "mainGreen" : "white"
              }
              color={
                searchState.passingTags.tags[2] === true ? "white" : "black"
              }
            >
              2주
            </Tag>
            <Tag
              fontWeight="500"
              border="none"
              onClick={(e) => allFilterClickListener(e, "tags")}
              bg={
                searchState.passingTags.tags[3] === true ? "mainGreen" : "white"
              }
              color={
                searchState.passingTags.tags[3] === true ? "white" : "black"
              }
            >
              3주
            </Tag>
            <Tag
              fontWeight="500"
              border="none"
              onClick={(e) => allFilterClickListener(e, "tags")}
              bg={
                searchState.passingTags.tags[4] === true ? "mainGreen" : "white"
              }
              color={
                searchState.passingTags.tags[4] === true ? "white" : "black"
              }
            >
              4주 이상
            </Tag>
          </TagBox>
          <TagBox>
            <Tag
              fontWeight="500"
              onClick={(e) => allFilterClickListener(e, "progress")}
              border="none"
              bg={
                searchState.passingTags.progress[1] === true
                  ? "mainGreen"
                  : "white"
              }
              color={
                searchState.passingTags.progress[1] === true ? "white" : "black"
              }
            >
              진행 예정
            </Tag>
            <Tag
              fontWeight="500"
              onClick={(e) => allFilterClickListener(e, "progress")}
              border="none"
              bg={
                searchState.passingTags.progress[2] === true
                  ? "mainGreen"
                  : "white"
              }
              color={
                searchState.passingTags.progress[2] === true ? "white" : "black"
              }
            >
              진행중
            </Tag>
          </TagBox>
        </CategoryRightBox>
      </CategoryContainer>
      <BoxContainer>
        <InfinityScroll
          callNext={callNext}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          {searchList &&
            searchList.map((challengeLists) => {
              //카테고리 이름 한글로 변경
              let category = "";
              if (challengeLists.categoryName === "EXERCISE") {
                category = "운동";
              } else if (challengeLists.categoryName === "NODRINKNOSMOKE") {
                category = "금연 / 금주";
              } else {
                category = "생활습관";
              }

              // progress 한글로 변경
              let progress = "";
              if (challengeLists.challengeProgress === 1) {
                progress = "진행 예정";
              } else if (challengeLists.challengeProgress === 2) {
                progress = "진행중";
              }
              return (
                <React.Fragment key={challengeLists.challengeId}>
                  <Card
                    width="100%"
                    height="auto"
                    padding="0 0 3vh 0"
                    title={challengeLists.challengeTitle}
                    date={`${
                      findDate(challengeLists.challengeId).startDate
                    } - ${findDate(challengeLists.challengeId).endDate}`}
                    onClick={() =>
                      history.push(
                        `/challenge/${challengeLists.challengeId}/intro`
                      )
                    }
                  >
                    <CardImg>
                      <Image
                        width="16.04vw"
                        height="8.33vw"
                        src={challengeLists.challengeImgUrl}
                        alt="challenge"
                      />
                    </CardImg>
                    <TagContainer>
                      <Tag
                        fontWeight="500"
                        bg="lightGray"
                        color="black"
                        padding="8px 15px"
                      >
                        {challengeLists.tag}
                      </Tag>
                      <Tag
                        fontWeight="500"
                        bg="lightGray"
                        color="black"
                        padding="8px 10px"
                      >
                        {category}
                      </Tag>
                      <Tag
                        fontWeight="500"
                        bg="lightGray"
                        color="black"
                        padding="8px 10px"
                      >
                        {progress}
                      </Tag>
                    </TagContainer>
                  </Card>
                </React.Fragment>
              );
            })}
        </InfinityScroll>
      </BoxContainer>
    </Container>
  );
}

const Container = styled.div`
  /* width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 21.5vh;
  padding-bottom: 42.5vh;*/
  /* ${({ theme }) => theme.device.mobileLg} {
    width: 100vw;
    height: 100vh;
    padding: 0px;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  } */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3.02vw;
  ${({ theme }) => theme.device.mobileLg} {
    margin-top: 0;
  }
`;

const CategoryContainer = styled.div`
  width: 66.67vw;
  height: 10.83vw;
  /* height: 100vh; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 8px;
  position: relative;
  /* ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    height: 155px;
    font-size: 16px;
  } */
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    height: 250px;
    font-size: 16px;
    border-radius: 0;
  }
`;

const CategoryLeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 48px;
  ${({ theme }) => theme.device.mobileLg} {
    font-size: 16px;
    padding-left: 12px;
  }
`;

const CategoryRightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 24px;
  ${({ theme }) => theme.device.mobileLg} {
    font-size: 16px;
    padding-left: 12px;
  }
`;

const CategoryTitle = styled.div`
  font-size: 18px;
  padding: 17px 0;
  width: 100px;
  text-align: justify;
  font-weight: bold;
  display: flex;
  justify-content: space-around;
  ${({ theme }) => theme.device.mobileLg} {
    font-size: 16px;
  }
`;

const TagBox = styled.div`
  display: flex;
  font-size: 16px;
  padding: 10px 0;
`;

const BoxContainer = styled.div`
  width: 66.67vw;
  display: grid;
  /* justify-content: center; */
  grid-template-rows: repeat(1, auto);
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding-top: 8.33vh;
  /* ${({ theme }) => theme.device.mobileLg} {
    display: grid;
    padding-top: 10vh;
    grid-template-columns: repeat(1, 91vw);
    grid-template-rows: repeat(2, 1fr);
    width: 100vw;
    height: 100vh;
    grid-row-gap: 40px;
    overflow: scroll;
    margin-bottom: 5vh;
    ::-webkit-scrollbar {
      display: none;
    }
  } */
  ${({ theme }) => theme.device.mobileLg} {
    display: grid;
    padding: 15vw 4.44vw 0 4.44vw;
    grid-template-columns: repeat(1, 91.11vw);
    grid-template-rows: repeat(1, 1fr);
    width: 100%;
    gap: 5.56vw;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const CardImg = styled.div`
  ${({ theme }) => theme.device.mobileLg} {
    img {
      width: 91.11vw;
      height: 47.22vw;
    }
  }
`;

export default SearchChallenge;
