import React from "react";
import styled from "styled-components";

import { history } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../shared/Cookie";

import { Card } from "../../elements";

const Popular = (props) => {
  const dispatch = useDispatch();

  const main_list = useSelector((state) => state.main);

  return (
    <>
      <Contain>
        <div>
          <span>HOT</span>챌린지
        </div>
        <div>
          <Card />
        </div>
      </Contain>
    </>
  );
};

export default Popular;

const Contain = styled.div`
  width: 16.15vw;
  height: 55.39vh;
  padding: 30px 31px 38px 22px;
  border-radius: 10px;
  border: 2px solid #f3f3f3;
  display: flex;
  flex-direction: column;
  & > div > p {
    margin: 0px;
  }

  & > div {
    background-color: #c4c4c4;
    margin-right: 1em;
    margin-bottom: 1em;
    width: 100%;
    text-align: center;
  }
`;

// {getCookie("token")
//           ? main_list.usermain.popular?.map((l, idx) => (
//               <div
//                 key={l.challengeId}
//                 onClick={() => history.push(`/challenge/${l.challengeId}`)}
//               >
//                 {/* <p>배경 이미지 : {l.challengeImgUrl}</p> */}
//                 <p>카테고리 이름 : {l.categoryName}</p>
//                 <p>챌린지 재목 : {l.challengeTitle}</p>
//                 <p>챌린지 참여 명수 : {l.challengeMember.length}</p>
//                 <p>챌린지 시작 날짜 : {l.challengeStartDate}</p>
//                 <p>챌린지 마감 날짜 : {l.challengeEndDate}</p>
//               </div>
//             ))
//           : main_list.guestmain.popular?.map((l, idx) => (
//               <div
//                 key={l.challengeId}
//                 onClick={() => history.push(`/challenge/${l.challengeId}`)}
//               >
//                 {/* <p>배경 이미지 : {l.challengeImgUrl}</p> */}
//                 <p>카테고리 이름 : {l.categoryName}</p>
//                 <p>챌린지 재목 : {l.challengeTitle}</p>
//                 <p>챌린지 참여 명수 : {l.challengeMember.length}</p>
//                 <p>챌린지 시작 날짜 : {l.challengeStartDate}</p>
//                 <p>챌린지 마감 날짜 : {l.challengeEndDate}</p>
//               </div>
//             ))}
