import React from "react";
import styled from "styled-components";
import { Image } from "./index";

import { useSelector } from "react-redux";

const Card = ({
  width,
  height,
  title,
  date,
  src,
  alt,
  inProcess,
  strongDate,
  onClick,
  children,
  search,
}) => {
  const user_info = useSelector((state) => state.user.userInfo);

  const styles = { width, height, search };
  return (
    <>
      <CardBox {...styles} onClick={onClick}>
        <Image width="100%" src={src} alt={alt} />
        <TagContainer>{children}</TagContainer>
        <Container>
          <Title>
            {title.length > 10 ? `${title.substring(0, 10)}...` : title}
          </Title>
          <Date strongDate={strongDate}>{date}</Date>
          {inProcess ? (
            <UserProfile>
              <ImageList>
                <Image
                  width="2.60vw"
                  height="4.63vh"
                  borderRadius="50%"
                  src={user_info.profileImg}
                  alt="profile"
                />
                <Plus>+</Plus>
              </ImageList>
              <span>
                {user_info && user_info.nickname}님 외 {inProcess - 1}명 참여중!
              </span>
            </UserProfile>
          ) : null}
        </Container>
      </CardBox>
    </>
  );
};

Card.defaultProps = {
  title: "",
  date: "",
  src: "",
  alr: "",
  search: false,
  card: false,
  width: "",
  height: "",
  inProcess: false,
  strongDate: false,
  children: null,
};

export default Card;

const CardBox = styled.div`
  width: ${(props) => (props.width ? props.width : "14.95vw")};
  height: ${(props) => (props.height ? props.height : "31vh")};
  border-radius: 10px;
  border: 1.8px solid ${({ theme }) => theme.colors.lightGray};
  cursor: pointer;
  ${({ theme }) => theme.device.mobileLg} {
    width: ${(props) => (props.search ? "100%" : "250px")};
    ${(props) => (props.card ? "height: 53.36vh" : null)};
  }
`;

const TagContainer = styled.div`
  display: flex;
  margin: 2.22vh 0 1.39vh 1.04vw;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    margin: 1.22vh 0 0 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 5px;
  }
`;

const Container = styled.div`
  margin-left: 1.51vw;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 5px;
  }
`;

const Title = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.black};
  margin: 1.39vh 0px 1.02vh 0;
  font-weight: bold;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    font-size: 14px;
  }
`;

const Date = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${(props) =>
    props.strongDate
      ? props.theme.colors.mainOrange
      : props.theme.colors.darkGray};
  ${(props) => (props.strongDate ? `font-weight: bold` : null)};
  width: 29.84vw;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    /* height: 4vh; */
    font-size: 14px;
  }
`;

const UserProfile = styled.div`
  height: 4.63vh;
  display: flex;
  align-items: center;
  margin-top: 2.22vh;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ImageList = styled.div`
  display: flex;
  margin-right: 0.42vw;
  ${({ theme }) => theme.device.mobileLg} {
    img {
      width: 43.5px;
      height: 43.5px;
    }
  }
`;

const Plus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.gray};
  background-color: #e9e9e9;
  width: 2.6vw;
  height: 4.63vh;
  border-radius: 50%;
  padding-bottom: 0.5vh;
  margin-left: -1.2vw;
  ${({ theme }) => theme.device.mobileLg} {
    width: 43.5px;
    height: 43.5px;
    margin-left: -22px;
  }
  ${({ theme }) => theme.device.tablet} {
    width: 43.5px;
    height: 43.5px;
    margin-left: -22px;
  }
`;
