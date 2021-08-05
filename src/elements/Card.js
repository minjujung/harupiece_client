import React from "react";
import styled from "styled-components";
import { Image, Tag } from "./index";

const Card = ({ title, date, src, onClick }) => {
  return (
    <>
      <CardBox onClick={onClick}>
        <Image width="100%" height="161px" src={src} alt="" />
        <TextContainer>
          <TagContainer>
            <Tag>#2주</Tag>
            <Tag>#인기챌린지</Tag>
          </TagContainer>
          <Title>{title}</Title>
          <Date>{date}</Date>
        </TextContainer>
      </CardBox>
    </>
  );
};

Card.defaultProps = {
  title: "",
  date: "",
  src: "",
};

export default Card;

const CardBox = styled.div`
  width: 287px;
  height: 312px;
  border-radius: 10px;
  margin-right: 16px;
  border: 1.8px solid ${({ theme }) => theme.colors.lightGray};
  cursor: pointer;
`;

const TextContainer = styled.div`
  padding: 10px;
`;

const TagContainer = styled.div`
  display: flex;
`;

const Title = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.black};
  padding: 10px;
  font-weight: bold;
`;

const Date = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.darkGray};
  padding: 0 5px;
`;
