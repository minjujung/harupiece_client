import React, { useState } from "react";
import styled from "styled-components";
import { consoleLogger } from "../redux/configureStore";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// date picker style
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function ChallengeCreate() {
  // date picker style
  const classes = useStyles();

  return (
    <>
      <h2>챌린지 개설</h2>
      <CreateContainer>
        <GuideLine>개설 가이드라인</GuideLine>
        <CreateContents>
          <Contents>
            <label style={{ width: "100%" }}>
              제목 <input placeholder="제목" />
            </label>
          </Contents>
          <ContentsContainer>
            <Contents>
              <label>카테고리</label>
              <select>
                <option value="">카테고리</option>
                <option value="">돈 관리</option>
                <option value="">공부</option>
                <option value="">다이어트</option>
                <option value="">생활습관</option>
              </select>
              <label>
                대표 이미지 업로드 / 선택{" "}
                <div>
                  <input type="file" />
                </div>
              </label>
              <Certification>
                <div>인증샷 예시 등록</div>
                <CertificationBox>
                  <Good>
                    <input type="file" />
                  </Good>
                  <Bad>
                    <input type="file" />
                  </Bad>
                </CertificationBox>
              </Certification>
            </Contents>
            <Contents>
              <div>
                <form className={classes.container} noValidate>
                  <TextField
                    id="date"
                    label="기간"
                    type="date"
                    defaultValue="2021-01-01"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
              </div>

              <label>모집형식</label>
              <select>
                <option value="">카테고리</option>
                <option value="">공개</option>
                <option value="">비공개</option>
              </select>

              <label>
                챌린지 설명 <input placeholder="챌린지를 설명해주세요." />
              </label>
            </Contents>
          </ContentsContainer>
          <button>챌린지 개설하기</button>
        </CreateContents>
      </CreateContainer>
    </>
  );
}

const CreateContainer = styled.div`
  background-color: orange;
  display: flex;
  width: 100%;
  height: 100vh;
`;

const GuideLine = styled.div`
  background-color: coral;
  width: 50%;
  height: 100%;
  padding: 20px;
`;

const CreateContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background-color: palegreen;
  padding: 20px;
`;

const ContentsContainer = styled.div`
  display: flex;
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const Contents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Certification = styled.div`
  width: 100%;
  height: 100%;
`;

const CertificationBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Good = styled.image``;

const Bad = styled.image``;

export default ChallengeCreate;
