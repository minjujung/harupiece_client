import React, { useState } from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import PostEdit from "./PostEdit";
import { Button, Image } from "../../elements";
import close from "../../images/icons/close.svg";

import { useDispatch, useSelector } from "react-redux";
import { actionCreator as imageActions } from "../../redux/modules/image";
import { actionCreator as postActions } from "../../redux/modules/post";

const PostList = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.userInfo);

  const { list, totalNumber, totalDay, challengeId, challengeStatus } = props;
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState("");
  const [edit, setEdit] = useState(false);

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
      `한번 인증을 확인하시면 최소할 수 없어요! ${list[clicked]?.nickName}의 인증샷을 인정해 주시겠어요?`
    );
    dispatch(postActions.clickCheckDB(list[clicked]?.postingId, totalNumber));
    if ((list[clicked]?.postingCount / totalNumber) * 100 === 50) {
      //point조각수 총 날짜 * 50 넘겨줘서 유저정보중 point 부분 수정
      // dispatch(userActions.editUserDB(totalDay * 50))
      // window.alert(`${user_info.nickName}님의 인증으로 ${list[clicked]?.nickName}이 ${totalDay * 50}조각을 획득하셨어요!!`)
    }
  };

  //modal안의 component만 편집형태로 바꾸기
  const editPost = () => {
    setEdit(true);
  };

  //post 삭제
  const deletePost = () => {
    if (
      list[clicked]?.postingModifyOk &&
      list[clicked]?.memberId === user_info.memberId
    ) {
      dispatch(postActions.deletePostDB(list[clicked]?.postingId));
      setOpen(false);
    }
  };

  return (
    <>
      {list.map((l, idx) => (
        <ImageList key={l.postingId}>
          <Image
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
        aria-labelledby="form-dialog-title"
        PaperProps={{
          style: {
            width: "36.56vw",
            height: "60.83vh",
            padding: "1.46vw",
            borderRadius: "0.6em ",
            overflowY: "hidden",
          },
        }}
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
              {challengeStatus === 2 ? (
                <StatusFrame>
                  <StatusBar>
                    <Status
                      width={`${
                        (list[clicked]?.postingCount / totalNumber) * 100
                      }%`}
                    />
                  </StatusBar>
                  <StatusInfo>
                    <span>인증상태</span>
                    <Percent>
                      {(list[clicked]?.postingCount / totalNumber) * 100} %
                    </Percent>
                  </StatusInfo>
                </StatusFrame>
              ) : null}
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
            <div>
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
                  인증샷을 올린 다음 날에는 수정과 삭제가 어려워요!
                </Button>
              ) : null}
              {challengeStatus === 2 &&
              list[clicked]?.memberId !== user_info.memberId ? (
                <Button
                  width="100%"
                  height="5.93vh"
                  margin="4.07vh 0 0 0"
                  _onClick={check}
                >
                  인증 확인
                </Button>
              ) : null}
            </div>
          </>
        )}
      </Dialog>
    </>
  );
};

export default PostList;

const ImageList = styled.article`
  display: flex;
  width: 15.83vw;
  height: 28.15vh;
`;

const DialogInfo = styled.div`
  width: 100%;
  height: 7.4vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: bold;
`;

const UserInfo = styled.div`
  width: 8.85vw;
  height: 7.4vh;
  display: flex;
  align-items: center;
`;

const StatusFrame = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.33vh;
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
  border-radius: 10px 0 0 10px;
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
`;

const MeBtn = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 44px;
`;
