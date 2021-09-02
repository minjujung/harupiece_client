# Harupiece🌙

건강 챌린지 플랫폼, 하루조각

💎 [하루조각 구경하기](https://harupiece.com/)

## 📋개요

프로젝트 기간   
2021.07.23~2021.08.28

🛠기술스택   
### Language : <img alt="JavaScript" src ="https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-appveyor&logo=JavaScript&logoColor=white"/>   
### AWS : <img alt="Amazon S3" src ="https://img.shields.io/badge/Amazon S3-569A31.svg?&style=for-the-appveyor&logo=Amazon S3&logoColor=white"/>
### Front : <img alt="React" src ="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-appveyor&logo=React&logoColor=white"/> , <img alt="Redux" src ="https://img.shields.io/badge/Redux-764ABC.svg?&style=for-the-appveyor&logo=Redux&logoColor=white"/> , <img alt="styled-components" src ="https://img.shields.io/badge/styled_components-DB7093.svg?&style=for-the-appveyor&logo=styled-components&logoColor=white"/> , <img alt="axios" src ="https://img.shields.io/badge/axios-764ABC.svg?&style=for-the-appveyor&logo=axios&logoColor=white"/>   

팀원   
Front-end 김태현 정민주 편원준   
Back-end 김선용 김진태 박연우 최왕규   
Dedigner 안지혜 유수빈   

## 🛠주요기능

### 랜딩 페이지
<img src="https://i.ibb.co/J7HfZ5z/image.gif" width="550px" height="400px" title="px(픽셀) 크기 설정" alt="landingPage"></img><br/>

### 챌린지 개설하기
<img src="https://i.ibb.co/Qrpv0zV/image.gif" width="550px" height="400px" title="px(픽셀) 크기 설정" alt="CreateChallenge"></img><br/>

### 챌린지 참여하기
<img src="https://i.ibb.co/LkvyvfG/image.gif" width="550px" height="400px" title="px(픽셀) 크기 설정" alt="JoinChallenge"></img><br/>

### 챌린지 인증하기
<img src="https://i.ibb.co/cy8QrXs/image.gif" width="550px" height="400px" title="px(픽셀) 크기 설정" alt="CertificationChallenge"></img><br/>

### 챌린지 검색하기
<img src="https://i.ibb.co/SRF4MGV/image.gif" width="550px" height="400px" title="px(픽셀) 크기 설정" alt="SearchChallenge"></img><br/>


## 🚀트러블 슈팅

#### 🔍검색

처음 검색 기능을 구현할 당시 전체 챌린지가 매우 적어 서버로부터 모든 챌린지를 불러온 뒤 프론트에서 눌려진 태그에 맞게 필터링 해주는 함수를 구현

```javascript

// 서버로부터 받아오는 challenges와 사용자가 누른 태그 값 filters를 비교하는 함수
const multiPropsFilter = (challenges, filters) => {
    const filterKeys = Object.keys(filters); 
    return challenges.search.filter((challenge) => {
      return filterKeys.every((key) => {
        if (!filters[key].length) return true;
        if (Array.isArray(challenge[key])) {
          return challenge[key].some((keyEle) => filters[key].includes(keyEle)); 
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
```

하지만 점점 챌린지가 많아질수록 서버로부터 전체 데이터를 받아오는게 비효율적이라고 판단하에 태그를 누른 뒤 검색 버튼을 누를때 해당 데이터를 서버로부터 호출하는 방식으로 변경 시도

```javascript

// 사용자가 누른 태그 값을 collectedTrueKeys에 담아 서버로 전송
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
  };

  const filter = () => {
    dispatch(searchAll.searchFilterDB(filteredCollected()));
  };
```

만들면서도 태그를 누를때 바로 해당 데이터를 호출하는 방식이 더 편하지않을까했었는데 아니나 다를까 유저 피드백으로 들어와서 바로 수정 시도

```javascript

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
```
기존에는 검색하기 버튼을 통해 api를 호출했으나 태그의 상태값을 바꾸는 함수(allFilterClickListener)안에서 실행시키려하니 태그의 상태값이 변하기전에 api를 호출해서 실패

```javascript

useEffect(() => {
    if (keyWord === "ALL") {
      dispatch(searchActions.searchFilterDB(filteredCategory(), keyWord));
    } else {
      return dispatch(
        searchActions.searchFilterDB(filteredCategory(), keyWord)
      );
    }
  }, [dispatch, filteredCategory, keyWord, searchState]);
```
useEffect을 활용하여 태그를 눌러 상태값이 바뀔때마다 바로 api를 호출시키는 방식으로 해결

#### 🍪refresh token

```javascript


```


📚 [백엔드 Repository]()

📝 [팀 노션](https://pinnate-whimsey-d2c.notion.site/b4cb15aad252413c9cad64877dba3719)
