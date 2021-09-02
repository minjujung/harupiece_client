# Harupiece🌙
건강 챌린지 플랫폼, 하루조각
💎 [하루조각 구경하기](https://harupiece.com/)
## 하루조각 소개  
* 코로나 때문에 늘 지쳐있고 체력과 건강을 생각해서 뭔가는 해야 할 것 같은데 의지가 안 생기는 경우가 대부분이죠 ??   
*  __" 어떻게 하면 스트래스는 덜 받으면서 , 즐겁게 , 건강한 습관을 만들 수 있을까?"__ 하고 기획한 것이 바로 바로 !! 
* __건강챌린지 플랫폼 하루조각입니다!!__
### ✨ 챌린지를 통해 원하는 목표에 한 발자국 더 다가갈 수 있습니다
> 자신이 원하는 목표에 맞는 챌린지를 신청하고 응원 하면 목표 달성이 쉬워집니다
### 📅 기간을 설정하고 원하는 챌린지를 만들수 있습니다
> 본인이 원하는 챌린지가 없거나 기간이 안 맞는다면 챌린지를 만들어 진행할 수 있습니다
> 기간을 짧게 진행하여 성공하는 습관도 기를수 있습니다 
### 💖 응원하기를 통해 다른 챌린저들에게 힘을 줄 수 있습니다
> 다른 챌린저들의 응원을 확인하며 나도 할수 있다 라는 자신감을 얻고 서로 응원하여 목표를 달성할수 있습니다
### 📧 채팅을 통해 소통 할 수 있습니다
> 채팅을 통해 목표달성에 관한 꿀팁 이나 잔잔한 소통으로 친해질수 있습니다
### 💎 조각을 모아 성취감을 달성하세요
> 다른 챌린저를 응원하거나 인증샷을 올리면 조각을 받을수 있습니다   
> 일정 조각을 모으면 구슬로 변경되며 구슬을 모으는 재미에 챌린지를 더 열심히 하게 됩니다
## 개요

### ⏰개발기간   
2021년 07월 23일 ~ 2021년 08월 31일

### ⚙ 기술스택   
### Language : <img alt="JavaScript" src ="https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-appveyor&logo=JavaScript&logoColor=white"/>   
### AWS : <img alt="Amazon S3" src ="https://img.shields.io/badge/Amazon S3-569A31.svg?&style=for-the-appveyor&logo=Amazon S3&logoColor=white"/>
### Front : <img alt="React" src ="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-appveyor&logo=React&logoColor=white"/> , <img alt="Redux" src ="https://img.shields.io/badge/Redux-764ABC.svg?&style=for-the-appveyor&logo=Redux&logoColor=white"/> , <img alt="styled-components" src ="https://img.shields.io/badge/styled_components-DB7093.svg?&style=for-the-appveyor&logo=styled-components&logoColor=white"/> , <img alt="axios" src ="https://img.shields.io/badge/axios-764ABC.svg?&style=for-the-appveyor&logo=axios&logoColor=white"/>   

### 👨‍👨‍👧‍👧 팀원   
Front-end 김태현 정민주 편원준   
Dedigner 안지혜 유수빈     
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

처음 검색 기능을 구현할 당시 전체 챌린지가 매우 적었기에

서버로부터 모든 챌린지를 불러온 뒤 프론트에서 눌려진 태그에 맞게 필터링 해주는 함수를 구현

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

하지만 점점 챌린지가 많아질수록 서버로부터 전체 데이터를 받아오는게 비효율적이라고 판단하에 

태그를 누른 뒤 검색 버튼을 누를때 해당 데이터를 서버로부터 호출하는 방식으로 변경 시도

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

기존에는 검색하기 버튼을 통해 api를 호출했으나 

태그의 상태값을 바꾸는 함수(allFilterClickListener)안에서 실행시키려하니 태그의 상태값이 변하기전에 api를 호출해서 실패
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

로그인시 받아오는 accessToken이 만료되었을때 같이 받아온 refreshToken을 서버에 전송하고 

새로운 accessToken과 refreshToken을 가져와 쿠키에 저장하는 방식을 구현

```javascript

instance.interceptors.request.use(function (config) {
  const accessToken = getCookie("token");
  config.headers.common["Authorization"] = ` Bearer ${accessToken}`;
  return config;
});

instance.interceptors.response.use((response) => {
  return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
      if (error.response.data.message  === "TokenExpiredError") {
        const originalRequest = config;
        const refresh_token = getCookie("refreshToken");
        const token = getCookie("token");
        const { data } = await instance.post(
          `api/member/reissue`,
          {
            accessToken : token,
            refreshToken : refresh_token,
          }
        );
          const {
            accessToken,
            refreshToken,
          } = data;
          const accessCookie = {name: "token", value: accessToken} 
          const refreshCookie = {name: "refreshToken", value: refreshToken} 
          await multiCookie (accessCookie, refreshCookie)
          instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
          originalRequest.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return instance(originalRequest);
      }
    }
  }
);
``` 
1. 401에러를 interceptor를 활용해하여 처리했으나 기존에 에러가 난 api요청을 다시 하는 로직이 없었고, 

2. 토큰이 만료된 상태로 여러 종류의 api를 동시 호출할때 호출된 모든 api마다 위에 로직이 실행되어 한번에 토큰 교체가 여러번 일어남

3. 또한 로그인시 발생하는 오류(아이디 또는 비밀번호 오류 등) 또한 401에러여서 해당 오류 발생시 기존에 정해둔 에러처리가 동작하지 않음.

```javascript

const getAccessToken = () => {
  const accessToken = getCookie("token");
  return accessToken;
};

const getRefreshToken = () => {
  const refreshToken = getCookie("refreshToken");
  return refreshToken;
};

let isTokenRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback, idx) => {
    return callback(accessToken);
  });
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = ` Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "api/member/login" && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        if (!isTokenRefreshing) {
          isTokenRefreshing = true;

          const rs = await refreshTokens();
          const { accessToken, refreshToken } = rs.data;

          setCookie("token", accessToken);
          setCookie("refreshToken", refreshToken);

          isTokenRefreshing = false; // 토큰 생성중 상태를 fasle로 바꿔주고

          instance.defaults.headers.common.Authorization = ` Bearer ${accessToken}`;
          originalConfig.headers.Authorization = `Bearer ${accessToken}`;

          onTokenRefreshed(accessToken); // 첫 요청이 아닌 다른 쌓여있던 요청 다시 요청보내기
          refreshSubscribers = []; // 요청 배열 초기화
          return instance(originalConfig); // 첫 요청 다시 요청
        }
        const retryOriginalRequest = new Promise((resolve) => {
          addRefreshSubscriber((accessToken) => {
            originalConfig.headers.Authorization = "Bearer " + accessToken;
            resolve(instance(originalConfig));
          });
        });
        return retryOriginalRequest;
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  }
);

const refreshTokens = () => {
  return instance.post("/api/member/reissue", {
    refreshToken: getRefreshToken(),
    accessToken: getAccessToken(),
  });
};
``` 
1 & 2. 여러 종류의 api를 동시 호출하여 발생한 에러들을 

let refreshSubscribers = []; 안에 담아두고 차례로 실행시킴으로 

에러가 난 api 요청을 하나만 처리 실행하고 accessToken을 교체한 뒤

나머지 api 요청을 실행하는것으로 해결

3. 로그인시 발생하는 401 에러는 if (originalConfig.url !== "api/member/login" && err.response)으로 예외 처리함

📚 [백엔드 Repository]()

📝 [팀 노션](https://pinnate-whimsey-d2c.notion.site/b4cb15aad252413c9cad64877dba3719)
