import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { history } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../shared/Cookie";

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const MainSlider = (props) => {
  const dispatch = useDispatch();

  const [autoplay, setAutoplay] = useState(true);

  const main_list = useSelector((state) => state.main);
  console.log(main_list);

  const slideImages = [
    "https://images.theconversation.com/files/35050/original/hws8ftp8-1384300615.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop",
    "https://live-production.wcms.abc-cdn.net.au/3ddf1568faa0c258bf2a734aafbeeb68?impolicy=wcms_crop_resize&cropH=1688&cropW=3000&xPos=0&yPos=0&width=862&height=485",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Mmg90FMgb9CTBC3ft6h0RPjrdsqeHZ5TWA&usqp=CAU",
  ];

  return (
    <>
      <Contain>
        <Slide easing="ease">
          <div style={{ height: "350px" }} className="each-slide">
            <div style={{ height: "350px", backgroundImage: `url(${slideImages[0]})` }}>
              <span>Slide 1</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{ backgroundImage: `url(${slideImages[1]})` }}>
              <span>Slide 2</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{ backgroundImage: `url(${slideImages[2]})` }}>
              <span>Slide 3</span>
            </div>
          </div>
        </Slide>
      </Contain>
    </>
  );
};

export default MainSlider;

const Contain = styled.div`
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
// ? main_list.usermain.slider?.map((l, idx) => (
//     <div
//       key={l.challengeId}
//       onClick={() => history.push(`/challenge/${l.challengeId}`)}
//     >
//       <p>배경 이미지 : {l.challengeImgUrl}</p>
//       <p>카테고리 이름 : {l.categoryName}</p>
//       <p>챌린지 재목 : {l.challengeTitle}</p>
//       <p>챌린지 참여 명수 : {l.challengeMember.length}</p>
//       <p>챌린지 시작 날짜 : {l.challengeStartDate}</p>
//       <p>챌린지 마감 날짜 : {l.challengeEndDate}</p>
//     </div>
//   ))
// : main_list.guestmain.slider?.map((l, idx) => (
//     <div
//       key={l.challengeId}
//       onClick={() => history.push(`/challenge/${l.challengeId}`)}
//     >
//       {/* <p>배경 이미지 : {l.challengeImgUrl}</p> */}
//       <p>카테고리 이름 : {l.categoryName}</p>
//       <p>챌린지 재목 : {l.challengeTitle}</p>
//       <p>챌린지 참여 명수 : {l.challengeMember.length}</p>
//       <p>챌린지 시작 날짜 : {l.challengeStartDate}</p>
//       <p>챌린지 마감 날짜 : {l.challengeEndDate}</p>
//     </div>
//   ))}
