import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { history } from "../../redux/configureStore";
import { useSelector } from "react-redux";
import { getCookie } from "../../shared/Cookie";

import { Tag, Card } from "../../elements";

const Category = (props) => {
  const main_list = useSelector((state) => state.main);

  const [category, setCategory] = useState("nodrinknosmoke");

  const ChangeTag = (e) => {
    let keyWord = e.target.textContent;
    console.log(keyWord);
    if (keyWord === "#금연&금주") {
      setCategory("nodrinknosmoke");
    }
    if (keyWord === "#습관챌린지") {
      setCategory("livinghabits");
    }

    if (keyWord === "#운동") {
      setCategory("exercise");
    }
  };

  const is_login = getCookie("token") ? true : false;

  return (
    <>
      <Contain>
        <div>하루조각 건강챌린지</div>
        <CardBox>
          <Tag
            color={category === "nodrinknosmoke" ? "white" : "black"}
            onClick={ChangeTag}
            bg={category === "nodrinknosmoke" ? "mainOrange" : "lightGray"}
          >
            #금연&금주
          </Tag>
          <Tag
            color={category === "livinghabits" ? "white" : "black"}
            bg={category === "livinghabits" ? "mainOrange" : "lightGray"}
            onClick={ChangeTag}
          >
            #습관챌린지
          </Tag>
          <Tag
            color={category === "exercise" ? "white" : "black"}
            bg={category === "exercise" ? "mainOrange" : "lightGray"}
            onClick={ChangeTag}
          >
            #운동
          </Tag>
        </CardBox>
        <span style={{ fontSize: "12px", paddingLeft: "44vw" }}>전체보기</span>
        <CardBox2>
          {is_login ? (
            <>
              {main_list.usermain[category] &&
                main_list.usermain[category].map((l, idx) => {
                  return (
                    <>
                      <Card
                        src={l.challengeImgUrl}
                        key={idx}
                        onClick={() =>
                          history.push(`/challenge/${l.challengeId}`)
                        }
                      >
                        <div>
                          <img src={l.challengeImgUrl} alt="" />
                        </div>
                        <TagBox>
                          <Tag>#1달</Tag>
                          <Tag>#인기챌린지</Tag>
                        </TagBox>
                        <TextBox>
                          <span>2주 1술 (고난이도)</span>
                          <span>2021.07.27 - 2021.08.27</span>
                        </TextBox>
                      </Card>
                    </>
                  );
                })}
            </>
          ) : (
            <>
              {main_list.guestmain[category] &&
                main_list.guestmain[category].map((l, idx) => {
                  return (
                    <>
                      <Card style={{ padding: "20px", fontSize: "12px" }}>
                        <div key={idx}>
                          <div>
                            <img src={l.challengeImgUrl} alt="" />
                          </div>
                          <div></div>
                        </div>
                      </Card>
                    </>
                  );
                })}
            </>
          )}
        </CardBox2>
      </Contain>
    </>
  );
};

export default Category;

const Contain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 49.48vw;
  height: 52vh;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const CardBox = styled.div`
  display: flex;
`;

const CardBox2 = styled.div`
  display: flex;
`;

// const Card = styled.div`
//   border-radius: 10px;
//   width: 287px;
//   height: 312px;
//   background-color: slategrey;
//   display: flex;
//   flex-direction: column;
//   margin-right: 10px;

//   div {
//     img {
//       border-radius: 10px 10px 0px 0px / 10px 10px 0px 0px;
//       width: 100%;
//       height: 100px;
//     }
//   }
// `;

const TagBox = styled.div`
  display: flex;
  padding: 10px;
`;

const TextBox = styled.div`
  font-size: 22px;
  span:nth-child(2) {
    font-size: 16px;
  }
`;
