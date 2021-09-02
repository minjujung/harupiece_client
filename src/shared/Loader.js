import React from "react";
import styled, { keyframes } from "styled-components";

import levelData from "./level";

const Loader = (props) => {
  return (
    <Container>
      <Loading src={levelData[9].imageUrl} alt="loaderMarble" />
      <Ment>로딩중...</Ment>
    </Container>
  );
};

export default Loader;

const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  position: relative;
  z-index: 20;
`;

const rotate_image = keyframes`
100% {
    transform: rotate(360deg);
  }
`;

const Loading = styled.img`
  width: 200px;
  height: 200px;
  animation: ${rotate_image} 2s linear infinite;
  transform-origin: 50% 50%;
`;

const Ment = styled.p`
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray};
  margin-top: 20px;
`;
