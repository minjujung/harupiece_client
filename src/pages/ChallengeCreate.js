import React from "react";
import styled from "styled-components";

function ChallengeCreate() {
  return (
    <>
      <h2>챌린지 개설</h2>
      <CreateContainer>
        <GuideLine>개설 가이드라인</GuideLine>
        <CreateContents>블라</CreateContents>
      </CreateContainer>
    </>
  );
}

const CreateContainer = styled.div`
  background-color: orange;
  display: flex;
`;

const GuideLine = styled.div`
  background-color: coral;
`;

const CreateContents = styled.div`
  background-color: palegreen;
`;

export default ChallengeCreate;
