import React from "react";
import styled from "styled-components";
import { Image } from "./index";

import { useSelector } from "react-redux";

const Card = ({
  width,
  height,
  padding,
  title,
  date,
  src,
  alt,
  maxHeight,
  inProcess,
  mypage,
  strongDate,
  onClick,
  children,
  search,
}) => {
  const user_info = useSelector((state) => state.user.userInfo);

  const styles = { width, height, search, padding, maxHeight };
  return (
    <>
      <CardBox {...styles} onClick={onClick}>
        <Image
          width="100%"
          height="auto"
          maxHeight={maxHeight}
          padding="51.83% 0 0 0"
          src={src}
          alt={alt}
        />
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
                  // height="4.63vh"
                  height="auto"
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
  maxHeight: "",
  padding: "",
  inProcess: false,
  strongDate: false,
  children: null,
};

export default Card;

const CardBox = styled.div`
  width: ${(props) => (props.width ? props.width : "14.95vw")};
  height: ${(props) => (props.height ? props.height : "31vh")};

  /* height: auto; */

  ${(props) => (props.padding ? `padding: ${props.padding};` : null)}
  border-radius: 10px;
  border: 1.8px solid ${({ theme }) => theme.colors.lightGray};
  cursor: pointer;
  /* width: ${(props) => (props.search ? "100%" : "250px")}; */
  ${({ theme }) => theme.device.mobileLg} {
    width: ${(props) => (props.search ? "55vw" : "91.11vw")};
  }
`;

const TagContainer = styled.div`
  display: flex;
  margin: 2.22vh 0 1.39vh 1.04vw;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 1.22vh 0 0 4.44vw;
  }
`;

const Container = styled.div`
  margin: 0 1.77vw 0 1.51vw;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 0 5.56vw;
  }
`;

const Title = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.black};
  margin: 1.39vh 0px 1.02vh 0;
  font-weight: bold;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    font-size: 16px;
  }
`;

const Date = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${(props) =>
    props.strongDate
      ? props.theme.colors.mainOrange
      : props.theme.colors.darkGray};
  ${(props) => (props.strongDate ? `font-weight: bold` : null)};
  word-break: break-all;
  /* padding-bottom: 3.28vh; */
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    font-size: 14px;
  }
`;

const UserProfile = styled.div`
  /* height: 4.63vh; */
  display: flex;
  align-items: center;
  padding: 2.22vh 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ImageList = styled.div`
  display: flex;
  margin-right: 0.42vw;
  ${({ theme }) => theme.device.mobileLg} {
    margin-right: 2.22vw;
    img {
      width: 12.08vw;
      height: auto;
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
  height: auto;
  border-radius: 50%;
  padding-bottom: 0.5vh;
  margin-left: -1.2vw;
  ${({ theme }) => theme.device.mobileLg} {
    width: 12.08vw;
    height: auto;
    margin-left: -22px;
  }
`;
