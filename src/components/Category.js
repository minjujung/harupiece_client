import React from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { useSelector } from "react-redux";
import { getCookie } from "../shared/Cookie";

const Category = (props) => {
  const main_list = useSelector((state) => state.main);

  return (
    <React.Fragment>
      <PContain>
        운동 <span>전체보기</span>
      </PContain>
      <Contain>
        {getCookie("token")
          ? main_list.usermain.exercise?.map((l, idx) => (
              <div onClick={() => history.push(`/challenge/${l.challengeId}`)}>
                배경이미지 : {l.challengeImgUrl}
                챌린지 이름 : {l.challengeTitle}
                참여 인원 : {l.challengeMember.length}
                시작 날짜 : {l.challengeStartDate}끝 날짜 : {l.challengeEndDate}
              </div>
            ))
          : main_list.guestmain.exercise?.map((l, idx) => (
              <div onClick={() => history.push(`/challenge/${l.challengeId}`)}>
                배경이미지 : {l.challengeImgUrl}
                챌린지 이름 : {l.challengeTitle}
                참여 인원 : {l.challengeMember.length}
                시작 날짜 : {l.challengeStartDate}끝 날짜 : {l.challengeEndDate}
              </div>
            ))}
      </Contain>
      <PContain>
        금주 / 금연<span>전체보기</span>
      </PContain>
      <Contain>
        {getCookie("token")
          ? main_list.usermain.nodrinknosmoke?.map((l, idx) => (
              <div
                key={l.challengeId}
                onClick={() => history.push(`/challenge/${l.challengeId}`)}
              >
                배경이미지 : {l.challengeImgUrl}
                챌린지 이름 : {l.challengeTitle}
                참여 인원 : {l.challengeMember.length}
                시작 날짜 : {l.challengeStartDate}끝 날짜 : {l.challengeEndDate}
              </div>
            ))
          : main_list.guestmain.nodrinknosmoke?.map((l, idx) => (
              <div
                key={l.challengeId}
                onClick={() => history.push(`/challenge/${l.challengeId}`)}
              >
                배경이미지 : {l.challengeImgUrl}
                챌린지 이름 : {l.challengeTitle}
                참여 인원 : {l.challengeMember.length}
                시작 날짜 : {l.challengeStartDate}끝 날짜 : {l.challengeEndDate}
              </div>
            ))}
      </Contain>
      <PContain>
        생활 습관<span>전체보기</span>
      </PContain>
      <Contain>
        {getCookie("token")
          ? main_list.usermain.livinghabits?.map((l, idx) => (
              <div
                key={l.challengeId}
                onClick={() => history.push(`/challenge/${l.challengeId}`)}
              >
                배경이미지 : {l.challengeImgUrl}
                챌린지 이름 : {l.challengeTitle}
                참여 인원 : {l.challengeMember.length}
                시작 날짜 : {l.challengeStartDate}끝 날짜 : {l.challengeEndDate}
              </div>
            ))
          : main_list.guestmain.livinghabits?.map((l, idx) => (
              <div
                key={l.challengeId}
                onClick={() => history.push(`/challenge/${l.challengeId}`)}
              >
                배경이미지 : {l.challengeImgUrl}
                챌린지 이름 : {l.challengeTitle}
                참여 인원 : {l.challengeMember.length}
                시작 날짜 : {l.challengeStartDate}끝 날짜 : {l.challengeEndDate}
              </div>
            ))}
      </Contain>
    </React.Fragment>
  );
};

export default Category;

const Contain = styled.div`
  display: flex;

  & > div {
    background-color: #c4c4c4;
    margin-right: 1em;
    margin-bottom: 1em;
    width: 100%;
    text-align: center;
  }
`;
const PContain = styled.p`
  display: flex;
  justify-content: space-between;
  margin: 0px;
  & > span {
    vertical-align: middle;
    padding-right: 1em;
  }
`;
