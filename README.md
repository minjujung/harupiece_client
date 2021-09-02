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

프로젝트 기간   
2021.07.23~2021.08.28

기술스택   
### Language : <img alt="JavaScript" src ="https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-appveyor&logo=JavaScript&logoColor=white"/>   
### AWS : <img alt="Amazon S3" src ="https://img.shields.io/badge/Amazon S3-569A31.svg?&style=for-the-appveyor&logo=Amazon S3&logoColor=white"/>
### Front : <img alt="React" src ="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-appveyor&logo=React&logoColor=white"/> , <img alt="Redux" src ="https://img.shields.io/badge/Redux-764ABC.svg?&style=for-the-appveyor&logo=Redux&logoColor=white"/> , <img alt="styled-components" src ="https://img.shields.io/badge/styled_components-DB7093.svg?&style=for-the-appveyor&logo=styled-components&logoColor=white"/> , <img alt="axios" src ="https://img.shields.io/badge/axios-764ABC.svg?&style=for-the-appveyor&logo=axios&logoColor=white"/>   

팀원   
Front-end 김태현 정민주 편원준   
Back-end 김선용 김진태 박연우 최왕규   
Dedigner 안지혜 유수빈   

***

### 트러블 슈팅

#### 검색

처음 검색 기능을 구현할 당시 전체 챌린지가 매우 적어 서버로부터 모든 챌린지를 불러온 뒤 프론트에서 눌려진 태그에 맞게 필터링 해주는 함수를 구현
```javascript
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

📚 [백엔드 Repository]()

📝 [팀 노션](https://pinnate-whimsey-d2c.notion.site/b4cb15aad252413c9cad64877dba3719)
