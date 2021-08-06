import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { MainCreators as searchActions } from "../redux/modules/main";
import { Tag } from "../elements";
import { history } from "../redux/configureStore";

function SearchChallenge(props) {
  const dispatch = useDispatch();

  // 전체보기 키워드
  const searchWord = props.match.params.searchWords;

  // 검색 키워드
  const searchList = useSelector((state) => state.main.search);

  const [searchParam] = useState(["categoryName", "challengeTitle"]);
  const [filterParam, setFilterParam] = useState(searchWord);

  const getCategory = (e) => {
    let category = e.target.textContent;
    console.log(category);
    dispatch(searchActions.searchAllDB(category));
    history.push(`/search/1/${filterParam}`);
  };

  function search(searchList) {
    return searchList.filter((searchLists) => {
      if (searchLists.categoryName === filterParam) {
        return searchParam.some((newList) => {
          return searchLists[newList].toString().toLowerCase();
        });
      } else if (filterParam == searchWord) {
        return searchParam.some((newList) => {
          return searchLists[newList].toString().toLowerCase();
        });
      }
    });
  }

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
            <Tag onClick={getCategory} bg="white">
              #금연금주
            </Tag>
            <Tag onClick={getCategory} bg="white">
              #생활챌린지
            </Tag>
            <Tag onClick={getCategory} bg="white">
              #운동
            </Tag>
          </TagBox>
          <TagBox>
            <Tag bg="white">#1주</Tag>
            <Tag bg="white">#2주</Tag>
            <Tag bg="white">#3주</Tag>
            <Tag bg="white">#4주 이상</Tag>
          </TagBox>
          <TagBox>
            <Tag bg="white">#공식챌린지</Tag>
            <Tag bg="white">#인기챌린지</Tag>
          </TagBox>
        </CategoryRightBox>
      </CategoryContainer>

      <BoxContainer>
        {searchList &&
          search(searchList).map((l, idx) => {
            return (
              <div key={idx}>
                <Box>
                  <span>{l.challengeTitle}</span>
                  <img
                    src={l.challengeImgUrl}
                    alt=""
                    style={{ width: "300px", height: "300px" }}
                  />
                </Box>
              </div>
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
  display: flex;
  flex-wrap: wrap;
`;

const Box = styled.div`
  width: 300px;
  height: 300px;
  margin: 10px;
  background-color: forestgreen;
`;

export default SearchChallenge;
