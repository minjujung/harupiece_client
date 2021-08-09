import React, { useState } from "react";
import styled from "styled-components";

const Search = (props) => {
  const challenge_list = [1, 2, 3];
  const [searchState, setSearchState] = useState({
    userInputContainerClicked: false,
    searchTerm: "",
    // tags that render are inside of 'passingTags' object.
    passingTags: {
      category: {
        EXERCISE: false,
        NOSMOKENODRINK: false,
        LIVINGHABITS: false,
      },
      tags: {
        1: false,
        2: false,
        3: false,
        4: false,
        popular: false,
        public: false,
      },
    },
  });

  const allFilterClickListener = (e, filterProp) => {
    console.log("FILTER clicked", e.target.textContent);
    const name = e.target.textContent;
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

  // This function collects ALL keys that have true as a value, then create a new obj to compare to filter.
  const filteredCollected = () => {
    const collectedTrueKeys = {
      category: [],
      tags: [],
    };
    const { category, tags } = searchState.passingTags;
    for (let categoryKey in category) {
      if (category[categoryKey]) collectedTrueKeys.category.push(categoryKey);
    }
    for (let tagKey in tags) {
      if (tags[tagKey]) collectedTrueKeys.tags.push(tagKey);
    }
    return collectedTrueKeys;
  };
  //위의 함수로 만약 tag 1주, 생활습관, 인기챌린지 선택됬다고 가정했을 때
  //const collectedTrueKeys = {
  //     category: [생활습관],
  //     tags: [1주, 인기챌린지]
  //   };

  const multiPropsFilter = (challenges, filters) => {
    const filterKeys = Object.keys(filters); //[categoryName, tags]
    return challenges.filter((challenge) => {
      return filterKeys.every((key) => {
        if (!filters[key].length) return true;
        // Loops again if product[key] is an array (for material attribute).
        if (Array.isArray(challenge[key])) {
          return challenge[key].some((keyEle) => filters[key].includes(keyEle));
        } //tag안에 1주 또는 인기챌린지 있는
        return filters[key].includes(challenge[key]);
      });
    });
  };

  const searchProducts = () => {
    const filteredProducts = multiPropsFilter(
      challenge_list,
      filteredCollected
    );
    return filteredProducts.filter((product) => {
      return product.name
        .toLowerCase()
        .includes(this.state.passingTags.search.inputTerm);
    });
  };

  return (
    <>
      {" "}
      <TagBox>
        <Tag onClick={(e) => allFilterClickListener(e, "category")} bg="white">
          #운동
        </Tag>
        <Tag onClick={(e) => allFilterClickListener(e, "category")} bg="white">
          #생활습관
        </Tag>
        <Tag onClick={(e) => allFilterClickListener(e, "category")} bg="white">
          #금연 금주
        </Tag>
      </TagBox>
      <TagBox>
        <Tag onClick={(e) => allFilterClickListener(e, "tag")} bg="white">
          #1주
        </Tag>
        <Tag onClick={(e) => allFilterClickListener(e, "tag")} bg="white">
          #2주
        </Tag>
        <Tag onClick={(e) => allFilterClickListener(e, "tag")} bg="white">
          #3주
        </Tag>
        <Tag onClick={(e) => allFilterClickListener(e, "tag")} bg="white">
          #4주 이상
        </Tag>
      </TagBox>
      <TagBox>
        <Tag onClick={(e) => allFilterClickListener(e, "tag")} bg="white">
          #공식챌린지
        </Tag>
        <Tag onClick={(e) => allFilterClickListener(e, "tag")} bg="white">
          #인기챌린지
        </Tag>
      </TagBox>
    </>
  );
};

export default Search;

const Tag = styled.div``;
const TagBox = styled.div``;
