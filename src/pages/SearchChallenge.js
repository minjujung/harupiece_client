import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { MainCreators as searchActions } from "../redux/modules/main";
import { Tag, Card } from "../elements";
import { getCookie } from "../shared/Cookie";
import { changeForm } from "../components/mypage/ChallengesInProgress";
import { history } from "../redux/configureStore";
import { TablePagination } from "@material-ui/core";

function SearchChallenge(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchActions.searchAllDB());
  }, []);

  // 검색 키워드
  const searchList = useSelector((state) => state.main);

  const [searchState, setSearchState] = useState({
    userInputContainerClicked: false,
    searchTerm: "",
    // tags that render are inside of 'passingTags' object.
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

  console.log(searchState.passingTags.categoryName);

  const allFilterClickListener = (e, filterProp) => {
    console.log("FILTER clicked", e.target.textContent);
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

  // 클릭한 버튼 값을 true로 변환시켜줌
  // console.log("선택한 필터", filteredCollected());

  const multiPropsFilter = (challenges, filters) => {
    const filterKeys = Object.keys(filters); //[categoryName, tags]
    return challenges.search.filter((challenge) => {
      return filterKeys.every((key) => {
        if (!filters[key].length) return true;
        if (Array.isArray(challenge[key])) {
          return challenge[key].some((keyEle) => filters[key].includes(keyEle));
        }
        console.log("작동안함");
        return filters[key].includes(challenge[key]);
      });
    });
  };

  const searchProducts = () => {
    const filteredProducts = multiPropsFilter(searchList, filteredCollected());
    console.log(filteredProducts);
    return filteredProducts.filter((product) => {
      console.log(product);
      return product;
    });
  };

  let result = searchProducts();

  return (
    <Container>
      <CategoryContainer>
        <CategoryLeftBox>
          <CategoryTitle>카테고리</CategoryTitle>
          <CategoryTitle>도전기간</CategoryTitle>
          <CategoryTitle>기타</CategoryTitle>
        </CategoryLeftBox>
        <CategoryRightBox>
          <TagBox>
            <Tag
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
                  src={l.challengeImgUrl}
                  title={l.challengeTitle}
                  key={idx}
                  onClick={() => history.push(`/challenge/${l.challengeId}`)}
                ></Card>
              </>
            );
          })}
      </BoxContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 78px;
`;

const CategoryContainer = styled.div`
  width: 66.67vw;
  height: 20.39vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 8px;
`;

const CategoryLeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 48px;
`;

const CategoryRightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 24px;
`;

const CategoryTitle = styled.div`
  font-size: 18px;
  padding: 17px 0;
  width: 100px;
  text-align: justify;
  font-weight: bold;
`;

const TagBox = styled.div`
  display: flex;
  font-size: 16px;
  padding: 10px 0;
`;

const BoxContainer = styled.div`
  height: 200px;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 40px;
  grid-column-gap: 40px;
  padding-top: 40px;

  Card {
    margin-right: 0px;
  }
`;

export default SearchChallenge;
