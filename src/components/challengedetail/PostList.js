import React, { useState } from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import PostEdit from "./PostEdit";
import { Button, Image } from "../../elements";
import close from "../../assets/images/icons/close.svg";

import { useDispatch, useSelector } from "react-redux";
import { actionCreator as imageActions } from "../../redux/modules/image";
import { actionCreator as postActions } from "../../redux/modules/post";

const PostList = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.userInfo);

  const { list, totalNumber, challengeId, challengeStatus, challengeMember } =
    props;
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState("");
  const [edit, setEdit] = useState(false);

  //오늘 날짜를 특정 날짜와 비교하기 위해 형태 변경해주는 함수
  const leadingZeros = (n, digits) => {
    let zero = "";
    n = n.toString();

    if (n.length < digits) {
      for (let i = 0; i < digits - n.length; i++) zero += "0";
    }
    return zero + n;
  };

  let today = new Date();

  // 2021-07-06 이런 형태로 만들어줌
  today =
    leadingZeros(today.getFullYear(), 4) +
    "-" +
    leadingZeros(today.getMonth() + 1, 2) +
    "-" +
    leadingZeros(today.getDate(), 2);

  //인증샷 클릭시 인증샷 상세페이지 modal 열기
  const handleClickOpen = (id) => {
    setClicked(list.findIndex((l) => l.postingId === id));
    setOpen(true);
  };

  // modal창 닫기,
  const handleClose = () => {
    setOpen(false);
    //수정버전으로 모달 바뀌고 닫길 때 다시 상세보기 모달로 되게끔 edit 상태 초기화
    setTimeout(() => setEdit(false), 300);
    // 수정하려고 사진 바꿨다가 모달 끄면 다시 전 사진으로 초기화
    setTimeout(() => dispatch(imageActions.setPreview(null)), 400);
  };

  //인증 버튼 눌렀을 때
  const check = () => {
    window.alert(
      `한번 인증을 확인하시면 취소할 수 없어요! ${list[clicked]?.nickName}의 인증샷을 인정해 주시겠어요?`
    );
    dispatch(postActions.clickCheckDB(list[clicked]?.postingId, totalNumber));
    if (
      (parseInt(list[clicked]?.postingCount) / (parseInt(totalNumber) - 1)) *
        100 ===
      50
    ) {
      //point조각수 총 날짜 * 50 넘겨줘서 유저정보중 point 부분 수정
      // dispatch(userActions.editUserDB(totalDay * 50))
      window.alert(
        `${user_info.nickname}님의 인증으로 ${list[clicked]?.nickName}이 1 조각을 획득하셨어요!!`
      );
    }
  };

  //modal안의 component만 편집형태로 바꾸기
  const editPost = () => {
    if (
      (parseInt(list[clicked]?.postingCount) / (parseInt(totalNumber) - 1)) *
        100 >=
      50
    ) {
      window.alert(
        "인증 확인이 50% 이상 진행된 게시물은 수정이나 삭제가 안돼요!"
      );
      return;
    }
    setEdit(true);
  };

  //post 삭제
  const deletePost = () => {
    if (
      (parseInt(list[clicked]?.postingCount) / (parseInt(totalNumber) - 1)) *
        100 >=
      50
    ) {
      window.alert(
        "인증 확인이 50% 이상 진행된 게시물은 수정이나 삭제가 안돼요!"
      );
      return;
    }
    if (
      list[clicked]?.postingModifyOk &&
      list[clicked]?.memberId === user_info.memberId
    ) {
      dispatch(postActions.deletePostDB(list[clicked]?.postingId));
      setOpen(false);
    }
  };

  let postingCheckStatus = 0;
  if (list[clicked]?.postingCount === 0 || totalNumber === 0) {
    postingCheckStatus = 0;
  } else if (totalNumber === 1) {
    postingCheckStatus = 100;
  } else {
    postingCheckStatus =
      (parseInt(list[clicked]?.postingCount) / parseInt(totalNumber)) * 100;
  }

  let intViewportWidth = window.innerWidth;

  return (
    <>
      {list.map((l, idx) => (
        <ImageList key={l.postingId}>
          <Image
            post
            width="15.83vw"
            height="28.15vh"
            borderRadius="12px"
            src={l.postingImg}
            onClick={() => handleClickOpen(l.postingId)}
            alt="vegan_post"
          />
        </ImageList>
      ))}

      <Dialog
        open={open}
        maxWidth={false}
        onClose={handleClose}
        disableScrollLock={true}
        aria-labelledby="form-dialog-title"
        PaperProps={
          intViewportWidth > 720
            ? {
                style: {
                  width: "36.56vw",
                  height: "60.83vh",
                  padding: "1.46vw",
                  borderRadius: "0.6em ",
                  overflowY: "hidden",
                },
              }
            : {
                style: {
                  width: "91.11vw",
                  minHeight: "38.37%",
                  // height: "54.38%",
                  padding: "4.44%",
                  borderRadius: "16px",
                },
              }
        }
      >
        {edit && list[clicked] ? (
          <PostEdit
            {...list[clicked]}
            handleClose={handleClose}
            challengeId={challengeId}
            totalNumber={totalNumber}
            challengeStatus={challengeStatus}
          />
        ) : (
          <>
            {" "}
            <div>
              <DialogInfo>
                <UserInfo>
                  <Image
                    width="80px"
                    height="80px"
                    borderRadius="50%"
                    margin="0 16px 0 0"
                    src={list[clicked]?.profileImg}
                    alt="profile"
                  />{" "}
                  {list[clicked]?.nickName}
                </UserInfo>
                <Image
                  src={close}
                  alt="closeBtn"
                  onClick={handleClose}
                  width="28px"
                  height="28px"
                  borderRadius="0"
                />
              </DialogInfo>
              <StatusFrame>
                <StatusBar>
                  <Status width={`${postingCheckStatus}%`} />
                </StatusBar>
                <StatusInfo>
                  <span>인증상태</span>
                  <Percent>
                    {postingCheckStatus === 0
                      ? 0
                      : postingCheckStatus.toFixed(1)}{" "}
                    %
                  </Percent>
                </StatusInfo>
              </StatusFrame>
            </div>
            <Post>
              <Image
                width="15.89vw"
                height="28.24vh"
                borderRadius="16px"
                src={list[clicked]?.postingImg}
                alt="clicked_img"
              />
              <p>{list[clicked]?.postingContent}</p>
            </Post>
            <BtnFrame>
              {list[clicked]?.postingModifyOk &&
              list[clicked]?.memberId === user_info.memberId ? (
                <MeBtn>
                  <Button
                    borderRadius="16px"
                    width="15.89vw"
                    height="5.93vh"
                    border="mainGreen"
                    bg="white"
                    color="mainGreen"
                    _onClick={deletePost}
                  >
                    삭제하기
                  </Button>
                  <Button
                    borderRadius="16px"
                    width="15.89vw"
                    height="5.93vh"
                    margin="0 0 0 36px"
                    _onClick={editPost}
                  >
                    인증샷 수정
                  </Button>
                </MeBtn>
              ) : null}
              {!list[clicked]?.postingModifyOk &&
              list[clicked]?.memberId === user_info.memberId ? (
                <Button
                  borderRadius="16px"
                  width="100%"
                  height="5.93vh"
                  border="white"
                  bg="white"
                  margin="4.07vh 0 0 0"
                  color="mainGreen"
                >
                  인증샷을 올린 당일에만 수정과 삭제가 가능합니다!
                </Button>
              ) : null}
              <CertifiCheckBtn
                challengeStatus={challengeStatus}
                challengeMember={challengeMember}
                postingMember={list[clicked]?.memberId}
                loginUser={user_info.memberId}
                checkedMembers={list[clicked]?.memberResponseDto}
                today={today}
                postingCreatedAt={list[clicked]?.createdAt}
                check={check}
              />
            </BtnFrame>
          </>
        )}
      </Dialog>
    </>
  );
};

const CertifiCheckBtn = (props) => {
  const {
    challengeStatus,
    challengeMember,
    postingMember,
    loginUser,
    checkedMembers,
    today,
    postingCreatedAt,
    check,
  } = props;
  if (challengeStatus === 2) {
    if (challengeMember.includes(loginUser)) {
      if (postingMember === loginUser) {
        return (
          <Button
            borderRadius="16px"
            width="100%"
            height="5.93vh"
            border="white"
            bg="white"
            margin="4.07vh 0 0 0"
            color="mainGreen"
          >
            본인의 인증샷은 인증 할 수 없어요^^ <br /> 다른 참가자들의 인증샷을
            인증해주세요!
          </Button>
        );
      } else {
        if (postingCreatedAt?.split("T")[0] < today) {
          return (
            <Button
              borderRadius="16px"
              width="100%"
              height="5.93vh"
              border="white"
              bg="white"
              margin="4.07vh 0 0 0"
              color="mainGreen"
            >
              인증이 끝난 게시물 입니다. <br /> 오늘 올라온 인증 게시물들을
              확인해 주세요😆
            </Button>
          );
        } else {
          if (checkedMembers?.includes(loginUser)) {
            return (
              <Button
                borderRadius="16px"
                width="100%"
                height="5.93vh"
                border="white"
                bg="white"
                margin="4.07vh 0 0 0"
                color="mainGreen"
              >
                이미 인증해주신 게시물이에요😊
              </Button>
            );
          } else {
            return (
              <Button
                width="100%"
                height="5.93vh"
                margin="4.07vh 0 0 0"
                _onClick={check}
              >
                인증 확인
              </Button>
            );
          }
        }
      }
    } else {
      return (
        <Button
          borderRadius="16px"
          width="100%"
          height="5.93vh"
          border="white"
          bg="white"
          margin="4.07vh 0 0 0"
          color="mainGreen"
        >
          챌린지에 참여한 사람만 인증 버튼을 누를 수 있어요!
        </Button>
      );
    }
  } else {
    return (
      <Button
        borderRadius="16px"
        width="100%"
        height="5.93vh"
        border="white"
        bg="white"
        margin="4.07vh 0 0 0"
        color="mainGreen"
      >
        이미 종료된 챌린지 입니다!
      </Button>
    );
  }
};

export default PostList;

const ImageList = styled.article`
  display: flex;
  width: 15.83vw;
  height: 28.15vh;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    margin-bottom: 200px;
  }
`;

const DialogInfo = styled.div`
  width: 100%;
  height: 7.4vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: bold;
  ${({ theme }) => theme.device.mobileLg} {
    height: 64px;
  }
`;

const UserInfo = styled.div`
  width: 8.85vw;
  height: 7.4vh;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.device.mobileLg} {
    height: 64px;
    img {
      width: 42px;
      height: 42px;
    }
  }
`;

const StatusFrame = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.33vh;
  ${({ theme }) => theme.device.mobileLg} {
    margin-top: 4.44%;
  }
`;

const StatusBar = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  position: relative;
`;

const Status = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.mainGreen};
  width: ${(props) => props.width};
  height: 8px;
  border-radius: 10px;
  top: 0;
  left: 0;
`;

const StatusInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 0.74vh;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray};
`;

const Percent = styled.span`
  color: ${({ theme }) => theme.colors.mainGreen};
`;

const Post = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 33px;
  p {
    width: 15.89vw;
    height: 28.24vh;
    border-radius: 16px;
    border: 2px solid ${({ theme }) => theme.colors.gray};
    font-size: ${({ theme }) => theme.fontSizes.md};
    padding: 0.94vw;
  }
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    height: 21.88vh;
    margin-top: 32px;
    p {
      flex: 1;
      width: 38.89vw;
      height: 100%;
      margin-left: 4.44%;
    }
    img {
      height: 100%;
      width: 38.89vw;
    }
  }
`;

const MeBtn = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 44px;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    button {
      margin-top: 32px;
    }
  }
`;

const BtnFrame = styled.div`
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    button {
      margin-top: 32px;
    }
  }
`;
