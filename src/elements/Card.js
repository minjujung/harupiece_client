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
}) => {
  const user_info = useSelector((state) => state.user.userInfo);

  const styles = { width, height };
  return (
    <>
      <CardBox {...styles} onClick={onClick}>
        <Image width="100%" height="14.81vh" src={src} alt={alt} />
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
                {user_info && user_info.nickname}님 외 {inProcess - 1}명 동참중!
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
  width: false,
  height: false,
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
    width: 100vw;
  }
`;

const TagContainer = styled.div`
  display: flex;
  margin: 2.22vh 0 1.39vh 1.04vw;
`;

const Container = styled.div`
  margin-left: 1.51vw;
`;

const Title = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.black};
  margin: 1.39vh 0px 1.02vh 0;
  font-weight: bold;
`;

const Date = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${(props) =>
    props.strongDate
      ? props.theme.colors.mainOrange
      : props.theme.colors.darkGray};
  ${(props) => (props.strongDate ? `font-weight: bold` : null)};
  width: 29.84vw;
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
`;
