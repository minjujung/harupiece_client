import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Down from "../assets/images/icons/arrow/down.svg";
import greenclose from "../assets/images/icons/greenclose.svg";
import CreateImgSelect from "../components/challenge/CreateImgSelect";
import CreateCertification from "../components/challenge/CreateCertification";
import CreateCalendar from "../components/challenge/CreateCalendar";
import guideline from "../assets/images/info/guideline.png";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as createActions } from "../redux/modules/challengeCreate";
import { actionCreator as challengeDetailActions } from "../redux/modules/challengeDetail";
import { Button, Image } from "../elements";
import PwdModal from "../components/challenge/PwdModal";

function ChallengeCreate(props) {
  const dispatch = useDispatch();
  const challenge_info = useSelector((state) => state.challengeDetail.detail);

  const challenge_id = props.match.params.id;

  useEffect(() => {
    dispatch(challengeDetailActions.getChallengeDetailDB(challenge_id));
  }, [dispatch, challenge_id]);

  const [challengeInfo, setChallengeInfo] = useState({
    ...challenge_info,
    challengeStartDate: "",
    challengeEndDate: "",
    challengeHoliday: "",
    challengeBad: "",
    challengeGood: "",
  });

  // 챌린지 이름
  const saveTitle = (e) => {
    setChallengeInfo({ ...challengeInfo, challengeTitle: e.target.value });
  };

  // 모집 형식
  const [pwdCheck, setPwdCheck] = useState(false);
  const [pwd, setPwd] = useState("");
  const [open, setOpen] = useState(false);
  const [gopen, setGopen] = useState(false);

  const choosePublic = (e) => {
    if (e.target.value === "PRIVATE") {
      setPwd("");
      setPwdCheck(true);
      setOpen(true);
    } else if (e.target.value === "PUBLIC") {
      setPwd("");
      setChallengeInfo({ ...challengeInfo, challengePassword: "" });
      setPwdCheck(false);
      setPwd("PUBLIC");
    } else {
      setPwdCheck(false);
      setPwd("");
    }
  };

  // 하단 이미지 안내 뱃지
  const [badge, setBadge] = useState(true);

  const hideBadge = () => {
    setBadge(false);
  };

  //모집형식이 비공개일때 비밀번호 설정
  const [pwdNumCheck, setPwdNumCheck] = useState("");
  const savePwd = () => {
    if (pwd.length < 4 || pwd.length > 13) {
      setPwdNumCheck("조건을 확인 해주세요!");
      return;
    }
    setPwdNumCheck("");
    setChallengeInfo({ ...challengeInfo, challengePassword: pwd });
    setOpen(false);
  };

  // 챌린지 설명
  const saveDesc = (e) => {
    setChallengeInfo({ ...challengeInfo, challengeContent: e.target.value });
  };

  // 챌린지  수정 전 날짜
  // const oldDate = `${challenge_info.challengeStartDate.split("T")[0]} ~
  // ${challenge_info.challengeEndDate.split("T")[0]}`;

  // 챌린지 수정
  const editChallenge = () => {
    if (challengeInfo.challengeStartDate === "") {
      setTimeout(() => window.alert("챌린지 시작날짜를 선택해주세요."), 300);

      return;
    }
    if (challengeInfo.challengeEndDate === undefined) {
      setTimeout(() => window.alert("챌린지 종료날짜를 선택해주세요."), 300);

      return;
    }
    if (challengeInfo.challengeGood === "") {
      setTimeout(() => window.alert("챌린지 인증 예시를 재등록해주세요."), 300);

      return;
    }
    if (challengeInfo.challengeBad === "") {
      setTimeout(() => window.alert("챌린지 인증 예시를 재등록해주세요."), 300);

      return;
    }

    if (!pwdCheck && pwd !== "PUBLIC") {
      setTimeout(() => window.alert("공개 / 비공개 설정을 등록해주세요."), 300);

      return;
    }

    if (
      (pwdCheck && pwd === "") ||
      (pwdCheck && challengeInfo.challengePassword === "")
    ) {
      setTimeout(
        () => window.alert("비공개 챌린지는 비밀번호가 반드시 필요합니다!"),
        300
      );

      setOpen(true);
      return;
    }
    dispatch(
      challengeDetailActions.editChallengeDB(challenge_id, challengeInfo)
    );
    dispatch(createActions.setGoodPreview(""));
    dispatch(createActions.setBadPreview(""));
  };

  const openGuideLine = () => {
    setGopen(true);
  };

  const closeGuideLine = () => {
    setGopen(false);
  };

  return (
    <>
      <Container>
        <LeftContainer isBadge={badge}>
          <MobileBadge>
            <Button
              width="100%"
              height="11.11vw"
              margin="6.67vw 0 4.44vw 0"
              bg="white"
              color="mainGreen"
              border="mainGreen"
              shadow
              _onClick={openGuideLine}
            >
              <MobileText>챌린지 가이드 라인</MobileText>
            </Button>
            {gopen ? (
              <MobileG>
                <MobileClose>
                  <Image
                    chatClose
                    width="30px"
                    height="30px"
                    borderRadius="0"
                    src={greenclose}
                    onClick={closeGuideLine}
                  />
                </MobileClose>
                <MobileImage>
                  <img src={guideline} alt="guideline" />
                </MobileImage>
              </MobileG>
            ) : null}
          </MobileBadge>
          <Title>
            <h2>챌린지 수정</h2>
          </Title>
          <Guid>
            <Image
              width="32.81vw"
              height="65vh"
              margin="0  2.92vh 0 0 "
              borderRadius="16px"
              src={guideline}
              alt="guideline"
            />
          </Guid>
        </LeftContainer>
        <RightContainer>
          <AllInputContainer isBadge={badge}>
            <InputLeftContainer>
              <div>
                <Label>제목</Label>
                <br />
                <Input
                  onChange={saveTitle}
                  placeholder={challenge_info.challengeTitle}
                />
              </div>
              {/* 카테고리 */}
              <CategoryInfo>
                <h4>{challenge_info.categoryName}</h4>
                <p>
                  카테고리는 수정이 불가해요! 다른 카테고리의 챌린지를 원하시면
                  삭제하고 다시 만들어주세요!
                </p>
              </CategoryInfo>
              {/* 대표 이미지 */}
              <CreateImgSelect
                challengeInfo={challengeInfo}
                setChallengeInfo={setChallengeInfo}
                id={challenge_id}
              />
              {/* 인증샷 예시 */}
              <CreateCertification
                challengeInfo={challengeInfo}
                setChallengeInfo={setChallengeInfo}
              />
            </InputLeftContainer>
            <InputRightContainer>
              {/* date picker */}
              <div>
                <CreateCalendar
                  challengeInfo={challengeInfo}
                  setChallengeInfo={setChallengeInfo}
                  id={challenge_id}
                />
              </div>
              {/* 모집형식 */}
              <MobileCont>
                <Label htmlFor="isPwd">모집 방식</Label>
                <br />
                <SelectContainer>
                  <img src={Down} alt="down" />
                  <SelectBox id="isPwd" onChange={choosePublic}>
                    <option value="CATEGORY">비밀번호 설정</option>
                    <option value="PUBLIC">공개</option>
                    <option value="PRIVATE">비공개</option>
                  </SelectBox>
                  <PwdModal
                    pwd={pwd}
                    setPwd={setPwd}
                    savePwd={savePwd}
                    open={open}
                    setOpen={setOpen}
                    pwdNumCheck={pwdNumCheck}
                  />
                </SelectContainer>
              </MobileCont>
              {/* 챌린지 설명 */}
              <MobileCont>
                <Label>챌린지 소개</Label>
                <br />
                <Textarea
                  onChange={saveDesc}
                  placeholder={challenge_info.challengeContent}
                />
              </MobileCont>
              <MobilBtns>
                <Button
                  width="15.00vw"
                  height="5.92vh"
                  margin="7.03vh 0 0 0"
                  _onClick={editChallenge}
                >
                  챌린지 수정하기
                </Button>
              </MobilBtns>
            </InputRightContainer>
          </AllInputContainer>
          {badge ? (
            <MobilBadge>
              <Button
                width="100%"
                height="64px"
                margin="7.4vh 0 0 0"
                bg="white"
                color="mainGreen"
                border="mainGreen"
                shadow
              >
                <BadgeText>
                  이미지를 변경하려면 다시 선택해 주세요.
                  <Image
                    width="20px"
                    height="20px"
                    src={greenclose}
                    alt="closeBtn"
                    borderRadius="0"
                    onClick={hideBadge}
                  />
                </BadgeText>
              </Button>
            </MobilBadge>
          ) : null}
        </RightContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 3.02vw;
  justify-content: center;
  /* padding: 0 16.66vw 23.24vh 16.66vw; */
  ${({ theme }) => theme.device.mobileLg} {
    display: flex;
    flex-direction: column;
  }
`;

const LeftContainer = styled.div`
  flex-direction: column;
  ${(props) =>
    !props.isBadge ? "margin-bottom: 7.4vh;" : "margin-bottom: 11.1vh;"}
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    margin-bottom: 0;
    padding: 0 4.44vw 0 4.44vw;
  }
`;

const Guid = styled.div`
  ${({ theme }) => theme.device.mobileLg} {
    img {
      display: none;
    }
  }
`;

const Title = styled.div`
  width: 100%;
  height: 4.81vh;
  & > h2 {
    font-size: 36px;
    font-weight: 700;
  }
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    margin-top: 11vw; /* 모바일 가이드 라인 변경면 없애기 */
    height: auto;
    font-size: 24px;
  }
`;

const InputLeftContainer = styled.div`
  flex-direction: column;
  margin-right: 0.94vw;
  ${({ theme }) => theme.device.mobileLg} {
    padding: 0 4.44vw;
  }
`;

const InputRightContainer = styled.div`
  flex-direction: column;
  ${({ theme }) => theme.device.mobileLg} {
  }
`;

const MobileBadge = styled.div`
  display: none;
  ${({ theme }) => theme.device.mobileLg} {
    display: none; /* inherit 모바일 가이드 라인 변경해서 적용하기 */
    margin-left: 40vw;
  }
`;
const MobileText = styled.div``;

const MobileG = styled.div`
  position: absolute;
  z-index: 4;
`;

const MobileImage = styled.div`
  position: relative;
  & > img {
    width: 32.81vw;
    height: 65vh;
    margin: 0 2.92vh 0 0;
    border-radius: 16px;
  }
`;

const MobileClose = styled.div`
  z-index: 5;
  right: 160px;
  position: absolute;
`;

const BadgeText = styled.div`
  display: flex;
  width: 27.66vw;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  margin-left: 16px;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    font-size: 15px;
    & > img {
      width: 20px;
      height: 20px;
      z-index: 15;
      margin-top: 0;
      margin-left: 16px;
      margin-right: 9.5vw;
    }
  }
`;

const RightContainer = styled.div`
  width: 30.94vw;
  height: 66.84vh;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const AllInputContainer = styled.div`
  display: flex;
  width: 30.93vw;
  /* height: 53.79vh; */
  margin-top: 5vh;
  ${(props) => (!props.isBadge ? "margin-bottom: 7.4vh;" : null)}
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    flex-direction: column;
  }
`;

const Input = styled.input`
  width: 15vw;
  height: 40px;
  margin-top: 8px;
  margin-bottom: 2.96vh;
  background-color: ${({ theme }) => theme.colors.lightGray};
  font-size: ${({ theme }) => theme.fontSizes.ms};
  padding-left: 0.83vw;
  padding-top: 1.1vh;
  padding-bottom: 1.01vh;
  border-radius: 8px;
  :focus {
    border: 2px solid ${({ theme }) => theme.colors.mainGreen};
  }
  ::placeholder{
    color: ${({ theme }) => theme.colors.darkGray};
  }
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    height: 6.875vh;
    font-size: 24px;
    margin-top: 16px;
    margin-bottom: 5.18vh;
    padding: 1.48vh 4.44vw 1.48vh 4.44vw;
  }
`;

const Textarea = styled.textarea`
  width: 15vw;
  height: 12.59vh;
  resize: none;
  margin-top: 8px;
  padding-left: 0.83vw;
  padding-right: 0.83vw;
  padding-top: 1.01vh;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.ms};
  color: ${({ theme }) => theme.colors.darkGray};
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  ::placeholder {
    font-size: ${({ theme }) => theme.fontSizes.ms};
    color: ${({ theme }) => theme.colors.darkGray};
    font-weight: 400;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
  }
  :focus {
    border: 2px solid ${({ theme }) => theme.colors.mainGreen};
  }
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    height: 20vh;
    margin-top: 16px;
    padding: 1.48vh 4.44vw;
    font-size: 24px;
    ::placeholder {
      font-size: 24px;
    }
  }
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
  ${({ theme }) => theme.device.mobileLg} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const SelectBox = styled.select`
  width: 100%; /* 원하는 너비설정 */
  height: 40px;
  padding-left: 0.83vw;
  margin: 8px 0 2.96vh 0;
  font-family: inherit; /* 폰트 상속 */
  font-size: ${({ theme }) => theme.fontSizes.ms};
  color: ${({ theme }) => theme.colors.darkGray};
  background-color: ${({ theme }) => theme.colors.lightGray};
  border: none;
  border-radius: 8px; /* iOS 둥근모서리 제거 */
  -webkit-appearance: none; /* 네이티브 외형 감추기 */
  -moz-appearance: none;
  appearance: none;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    height: 6.875vh;
    font-size: 24px;
    margin-top: 16px;
    margin-bottom: 5.18vh;
    padding: 1.48vh 4.44vw 1.48vh 4.44vw;
  }
`;

const SelectContainer = styled.div`
  width: 15vw;
  position: relative;
  & > img {
    width: 15px;
    height: 15px;
    position: absolute;
    right: 16px;
    top: 22px;
    pointer-events: none;
  }
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    & > img {
      width: 30px;
      height: 30px;
      position: absolute;
      margin-top: 2vw;
      pointer-events: none;
    }
  }
`;

const CategoryInfo = styled.div`
  height: 48px;
  margin-bottom: 4.39vh;
  h4 {
    font-weight: bold;
    line-height: normal;
  }
  p {
    color: ${({ theme }) => theme.colors.mainGreen};
  }

  ${({ theme }) => theme.device.mobileLg} {
    margin-bottom: 6.67vh;
    h4 {
      font-weight: bold;
      line-height: normal;
      font-size: 24px;
    }
    p {
      margin-top: 16px;
    }
  }
`;

const MobilBtns = styled.div`
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    height: 11.875vh;
    flex-direction: row;
    position: fixed;
    z-index: 15;
    top: auto;
    bottom: 0;

    display: flex;
    align-items: center;
    background-color: white;
    box-shadow: 0 4px 11px 0px ${({ theme }) => theme.colors.mainGreen};
    padding: 0 4.44vw 0 4.44vw;
    & > button {
      font-size: 17px;
      width: 100%;
      z-index: 15;
      margin-top: 0;
    }
  }
`;

const MobilBadge = styled.div`
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    flex-direction: row;
    position: fixed;
    z-index: 15;
    top: auto;
    bottom: 14.375vh;

    display: flex;
    align-items: center;
    padding: 0 4.44vw 0 4.44vw;
    & > button {
      font-size: 17px;
      width: 100%;
      z-index: 15;
      margin-top: 0;
    }
  }
`;

const MobileCont = styled.div`
  ${({ theme }) => theme.device.mobileLg} {
    padding: 0 4.44vw 0 4.44vw;
  }
`;

export default ChallengeCreate;
