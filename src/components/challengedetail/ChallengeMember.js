import React, { useState } from "react";
import styled from "styled-components";

import levelData from "../../shared/level";

import { useSelector } from "react-redux";

const ChallengeMember = (props) => {
  const [show, setShow] = useState(false);

  const challengeMember = useSelector(
    (state) => state.challengeDetail.detail.challengeMember
  );

  const memberCount = challengeMember?.length;

  let memberList = [];
  if (memberCount < 3) {
    const circle_list = Array.from({ length: 3 - memberCount }, (item, idx) => {
      return idx;
    });
    memberList = [...challengeMember, ...circle_list];
  } else {
    memberList = [challengeMember[0], challengeMember[1], challengeMember[2]];
  }

  const showMembers = () => {
    setShow(!show);
  };

  return (
    <>
      <Section>
        <h1>참가자</h1>
        <MemberList>
          {memberList.map((member) => {
            if (member.profileImg) {
              return (
                // 이미지 엑박 뜨는 경우 default 이미지 띄우도록 onError 함수 선언
                <ProfileImg
                  key={member.memberId}
                  src={member.profileImg}
                  onError={(e) =>
                    e.target.setAttribute("src", `${levelData[9].imageUrl}`)
                  }
                  alt="challengers"
                />
              );
            } else {
              return <Circle></Circle>;
            }
          })}
          <p onClick={showMembers}>함께하는 친구들을 확인해 보아요😉 click!</p>
        </MemberList>
        <Grid>
          {show
            ? challengeMember.map((member) => (
                <ProfileList key={member.memberId}>
                  <MemberProfile
                    src={member.profileImg}
                    onError={(e) =>
                      e.target.setAttribute("src", `${levelData[9].imageUrl}`)
                    }
                    alt="challengers"
                  />
                  <p>{member.nickname}</p>
                </ProfileList>
              ))
            : null}
        </Grid>
      </Section>
    </>
  );
};
export default ChallengeMember;

const Section = styled.section`
  h1 {
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: bold;
    margin: 56px 0 16px 0;
  }
  ${({ theme }) => theme.device.desktopLg} {
    h1 {
      font-size: 18px;
    }
  }

  ${({ theme }) => theme.device.desktop} {
    h1 {
      font-size: 18px;
    }
  }

  ${({ theme }) => theme.device.tablet} {
    h1 {
      font-size: 16px;
    }
  }
  ${({ theme }) => theme.device.mobileLg} {
    h1 {
      font-size: 16px;
    }
  }
`;
const MemberList = styled.div`
  display: flex;
  margin-left: 1.04vw;
  align-items: center;
  p {
    margin-left: 16px;
    cursor: pointer;
  }
  ${({ theme }) => theme.device.mobileLg} {
    margin-left: 4.25vw;
  }
`;

const ProfileImg = styled.img`
  width: 2.08vw;
  min-width: 40px;
  height: 2.08vw;
  min-height: 40px;
  border-radius: 50%;
  margin-left: -1.04vw;
  ${({ theme }) => theme.device.mobileLg} {
    margin-left: -4.25vw;
  }
`;

const Circle = styled.div`
  width: 2.08vw;
  min-width: 40px;
  height: 2.08vw;
  min-height: 40px;
  border-radius: 50%;
  margin: 0;
  background-color: ${({ theme }) => theme.colors.lightGray};
  margin-left: -1.04vw;
  ${({ theme }) => theme.device.mobileLg} {
    margin-left: -4.25vw;
  }
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  margin-top: 24px;
  gap: 1.04vw;
  grid-template-columns: repeat(2, 1fr);
  ${({ theme }) => theme.device.mobileLg} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ProfileList = styled.article`
  display: flex;
  align-items: center;
  p {
    margin-left: 8px;
  }
`;

const MemberProfile = styled.img`
  width: 2.08vw;
  min-width: 40px;
  height: 2.08vw;
  min-height: 40px;
  border-radius: 50%;
`;
