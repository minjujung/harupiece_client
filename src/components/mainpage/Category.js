import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { history } from "../../redux/configureStore";
import { useSelector } from "react-redux";
import { getCookie } from "../../shared/Cookie";

import { Tag } from "../../elements";

const Category = (props) => {
  const main_list = useSelector((state) => state.main.usermain.exercise);

  return (
    <>
      <Contain>
        <div>하루조각 건강챌린지</div>
        <CardBox>
          <Tag bg="mainOrange" color="white">
            #금주
          </Tag>
          <Tag>#습관챌린지</Tag>
          <Tag>#금연</Tag>
          <Tag>#운동</Tag>
        </CardBox>
        <span style={{ fontSize: "12px", paddingLeft: "44vw" }}>전체보기</span>
        <CardBox2>
          {main_list &&
            main_list.map((l, idx) => {
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
  div {
    padding-bottom: 24px;
  }
`;

const CardBox = styled.div`
  display: flex;
`;

const CardBox2 = styled.div`
  display: flex;
`;

const Card = styled.div`
  width: 210px;
  height: 225px;
  background-color: slategrey;
  display: flex;
  margin-right: 10px;

  div {
    img {
      border-radius: 10px;
      width: 100px;
      height: 100px;
      margin-top: 10px;
    }
  }
`;
