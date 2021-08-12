import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { MainCreators as searchActions } from "../redux/modules/main";
import { Tag, Card } from "../elements";
import { changeForm } from "../components/mypage/ChallengesInProgress";
import { history } from "../redux/configureStore";

function SearchChallenge(props) {
  const dispatch = useDispatch();

  // 검색 키워드
  const searchList = useSelector((state) => state.main);

  const [searchState, setSearchState] = useState({
    userInputContainerClicked: false,
    searchTerm: "",
    passingTags: {
      search: {
        inputTerm: "",
      },
      categoryName: {
        EXERCISE: false,
        NODRINKNOSMOKE: false,
        LIVINGHABITS: false,
      },
      tagList: {
        "#1주": false,
        "#2주": false,
        "#3주": false,
        "#4주 이상": false,
        "#공식챌린지": false,
        "#인기챌린지": false,
      },
    },
  });

  // 필터 클릭 시 해당 필터 이름과 searchState값과 비교 후 setSearchState 재정의
  const allFilterClickListener = (e, filterProp) => {
    let name = e.target.textContent;
    if (name === "#금연금주") {
      name = "NODRINKNOSMOKE";
    } else if (name === "#운동") {
      name = "EXERCISE";
    } else if (name === "#생활챌린지") {
      name = "LIVINGHABITS";
    } else {
      name = e.target.textContent;
    }
    setSearchState({
      passingTags: {
        ...searchState.passingTags,
        [filterProp]: {
          ...searchState.passingTags[filterProp],
          [name]: !searchState.passingTags[filterProp][name],
        },
      },
    });
  };

  // 선택한 필터를 빈 배열에 넣어서 새로운 배열로 만드는 함수
  const filteredCollected = () => {
    const collectedTrueKeys = {
      categoryName: [],
      tagList: [],
    };
    const { categoryName, tagList } = searchState.passingTags;
    for (let categoryKey in categoryName) {
      if (categoryName[categoryKey])
        collectedTrueKeys.categoryName.push(categoryKey);
    }
    for (let tagKey in tagList) {
      if (tagList[tagKey]) collectedTrueKeys.tagList.push(tagKey);
    }
    return collectedTrueKeys;
  };

  // 실질적인 필터 기능
  // challenges = 서버로 부터 받은 전체 데이터 // filters = 선택한 필터
  const multiPropsFilter = (challenges, filters) => {
    console.log(challenges);
    const filterKeys = Object.keys(filters); //선택한 필터를 열거할 수 있는 배열로 반환 => [categoryName, tags]
    return challenges.search.filter((challenge) => {
      return filterKeys.every((key) => {
        // 배열 안의 모든 요소가 주어진 key로 통과하는지 테스트 하나라도 조건에 안맞으면 false처리
        if (!filters[key].length) return true;
        if (Array.isArray(challenge[key])) {
          // challenge[key] = 챌린지 태그
          return challenge[key].some((keyEle) => filters[key].includes(keyEle)); // filters[key] = 챌린지 카테고리
        }
        return filters[key].includes(challenge[key]);
      });
    });
  };

  const searchProducts = () => {
    const filteredProducts = multiPropsFilter(searchList, filteredCollected());
    return filteredProducts?.filter((product) => {
      return product;
    });
  };

  let result = searchProducts();

  // 챌린지 기간
  const start = searchList.search?.map(
    (list) => list.challengeStartDate.split("T")[0]
  );

  const end = searchList.search?.map(
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
              onClick={(e) => allFilterClickListener(e, "categoryName")}
              border="none"
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
              #금연금주
            </Tag>
            <Tag
              fontWeight="500"
              onClick={(e) => allFilterClickListener(e, "categoryName")}
              border="none"
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
              #생활챌린지
            </Tag>
            <Tag
              fontWeight="500"
              onClick={(e) => allFilterClickListener(e, "categoryName")}
              border="none"
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
              #운동
            </Tag>
          </TagBox>
          <TagBox>
            <Tag
              fontWeight="500"
              onClick={(e) => allFilterClickListener(e, "tagList")}
              border="none"
              bg={
                searchState.passingTags.tagList["#1주"] === true
                  ? "mainGreen"
                  : "white"
              }
              color={
                searchState.passingTags.tagList["#1주"] === true
                  ? "white"
                  : "black"
              }
            >
              #1주
            </Tag>
            <Tag
              fontWeight="500"
              onClick={(e) => allFilterClickListener(e, "tagList")}
              border="none"
              bg={
                searchState.passingTags.tagList["#2주"] === true
                  ? "mainGreen"
                  : "white"
              }
              color={
                searchState.passingTags.tagList["#2주"] === true
                  ? "white"
                  : "black"
              }
            >
              #2주
            </Tag>
            <Tag
              fontWeight="500"
              onClick={(e) => allFilterClickListener(e, "tagList")}
              border="none"
              bg={
                searchState.passingTags.tagList["#3주"] === true
                  ? "mainGreen"
                  : "white"
              }
              color={
                searchState.passingTags.tagList["#3주"] === true
                  ? "white"
                  : "black"
              }
            >
              #3주
            </Tag>
            <Tag
              fontWeight="500"
              onClick={(e) => allFilterClickListener(e, "tagList")}
              border="none"
              bg={
                searchState.passingTags.tagList["#4주 이상"] === true
                  ? "mainGreen"
                  : "white"
              }
              color={
                searchState.passingTags.tagList["#4주 이상"] === true
                  ? "white"
                  : "black"
              }
            >
              #4주 이상
            </Tag>
          </TagBox>
          <TagBox>
            <Tag
              fontWeight="500"
              onClick={(e) => allFilterClickListener(e, "tagList")}
              border="none"
              bg={
                searchState.passingTags.tagList["#공식챌린지"] === true
                  ? "mainGreen"
                  : "white"
              }
              color={
                searchState.passingTags.tagList["#공식챌린지"] === true
                  ? "white"
                  : "black"
              }
            >
              #공식챌린지
            </Tag>
            <Tag
              fontWeight="500"
              onClick={(e) => allFilterClickListener(e, "tagList")}
              border="none"
              bg={
                searchState.passingTags.tagList["#인기챌린지"] === true
                  ? "mainGreen"
                  : "white"
              }
              color={
                searchState.passingTags.tagList["#인기챌린지"] === true
                  ? "white"
                  : "black"
              }
            >
              #인기챌린지
            </Tag>
          </TagBox>
        </CategoryRightBox>
      </CategoryContainer>

      <BoxContainer>
        {result &&
          result.map((l, idx) => {
            return (
              <>
                <Card
                  search
                  src={l.challengeImgUrl}
                  title={l.challengeTitle}
                  key={idx}
                  date={`${start_year[idx]}.${start_month[idx]}.${start_date[idx]} -
                  ${end_year[idx]}.${end_month[idx]}.${end_date[idx]}`}
                  onClick={() => history.push(`/challenge/${l.challengeId}`)}
                >
                  <Tag
                    fontWeight="500"
                    bg="lightGray"
                    color="black"
                    padding="8px 20px"
                  >
                    {l.tagList[0]}
                  </Tag>
                  <Tag
                    fontWeight="500"
                    bg="lightGray"
                    color="black"
                    padding="8px 20px"
                  >
                    {l.challengeMember.length}/10명
                  </Tag>
                </Card>
              </>
            );
          })}
      </BoxContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 21.5vh;
  padding-bottom: 42.5vh;
  ${({ theme }) => theme.device.mobileLg} {
    width: 360px;
    height: 100vh;
    padding: 0px;
    margin: 5vh 0 0 0;
  }
`;

const CategoryContainer = styled.div`
  width: 66.67vw;
  height: 20.39vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 8px;

  ${({ theme }) => theme.device.mobileLg} {
    width: 360px;
    font-size: 16px;
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
  height: 70vh;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 40px;
  grid-column-gap: 40px;
  padding-top: 40px;
  ${({ theme }) => theme.device.mobileLg} {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(2, 1fr);
    height: 100vh;
    grid-row-gap: 30px;
    overflow: scroll;
    margin-bottom: 5vh;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export default SearchChallenge;
