import React from "react";
import styled from "styled-components";
import beer from "../images/test/beer.jpg";
import { Image, Tag } from "./index";

const Card = ({ title, date }) => {
  return (
    <>
      <CardBox>
        <Image src={beer} alt="beer" />
        <TextContainer>
          <TagContainer>
            <Tag bg="mainOrange" color="white">
              #2주
            </Tag>
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
};

export default Card;

const CardBox = styled.div`
  width: 17.9em;
  height: 19.5em;
  border-radius: 8px;
  border: 1.8px solid ${({ theme }) => theme.colors.lightGray}; ;
`;

const TextContainer = styled.div`
  padding: 1.2em;
`;

const TagContainer = styled.div`
  display: flex;
`;

const Title = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.black};
  padding: 0.7em 0.4em;
  font-weight: bold;
`;

const Date = styled.p`
  color: ${({ theme }) => theme.colors.darkGray};
  padding: 0 0.5em;
`;
