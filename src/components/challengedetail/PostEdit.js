import React, { useRef, useState } from "react";
import styled from "styled-components";
import close from "../../assets/images/icons/close.svg";

import { useDispatch, useSelector } from "react-redux";
import { actionCreator as imageActions } from "../../redux/modules/image";
import { actionCreator as postActions } from "../../redux/modules/post";
import { Button, Image } from "../../elements";

const PostEdit = (props) => {
  const {
    postingId,
    challengeId,
    memberId,
    postingImg,
    postingContent,
    postingCheckStatus,
    postingModifyOk,
    challengeStatus,
    handleClose,
  } = props;

  const dispatch = useDispatch();
  const preview = useSelector((state) => state.image.preview);
  const loading = useSelector((state) => state.post.is_loading);
  const user_info = useSelector((state) => state.user.userInfo);

  const [shotText, setShotText] = useState(postingContent);
  const shotInput = useRef();

  //인증 관련 글
  const writeText = (e) => {
    setShotText(e.target.value);
  };

  //프리뷰 보여주기
  const selectFile = () => {
    const reader = new FileReader();
    const file = shotInput.current.files[0];

    if (!file) {
      return;
    }

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  //인증샷 post수정하면서 이미지도 업로드
  const editPost = () => {
    const file = shotInput.current.files[0];

    //수정할 새로운 문구를 적지 않았을 때 default는 원래값
    if (!shotText) {
      setShotText(postingContent);
    }

    if (!file) {
      dispatch(
        postActions.editPostDB(
          postingId,
          { file: postingImg, shotText },
          challengeId
        )
      );
    } else {
      dispatch(
        postActions.editPostDB(postingId, { file, shotText }, challengeId)
      );
    }

    if (!loading) {
      props.handleClose();
    }
  };

  return (
    <>
      <div>
        <DialogInfo>
          <h3>인증 수정</h3>
          <Image
            src={close}
            alt="closeBtn"
            onClick={handleClose}
            width={window.innerWidth < 720 ? "18px" : "28px"}
            height={window.innerWidth < 720 ? "18px" : "28px"}
            borderRadius="0"
          />
        </DialogInfo>
        {challengeStatus === 2 ? (
          <StatusFrame>
            <StatusBar>
              <Status width={`${postingCheckStatus}%`} />
            </StatusBar>
            <StatusInfo>
              <span>인증상태</span>
              <Percent>
                {postingCheckStatus === 0 ? 0 : postingCheckStatus.toFixed(1)} %
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
          src={preview ? preview : postingImg}
          alt={preview ? "preview" : "before_edit_photo"}
        />
        <textarea
          value={shotText}
          type="text"
          id="shot_text"
          placeholder={postingContent}
          onChange={writeText}
        />
      </Post>
      <BtnFrame>
        {postingModifyOk && memberId === user_info.memberId ? (
          <MeBtn>
            <Button
              borderRadius="8px"
              width="100%"
              height="5.93vh"
              border="mainGreen"
              margin={window.innerWidth <= 720 ? "0 2.22vw 0 0" : "0 32px 0 0"}
              bg="white"
              color="mainGreen"
            >
              <label htmlFor="shot">사진 변경</label>
            </Button>
            <input
              ref={shotInput}
              type="file"
              id="shot"
              style={{ display: "none" }}
              onChange={selectFile}
            />
            <Button
              borderRadius="8px"
              width="100%"
              height="5.93vh"
              _onClick={editPost}
            >
              저장 하기
            </Button>
          </MeBtn>
        ) : null}
      </BtnFrame>
    </>
  );
};

export default PostEdit;

const DialogInfo = styled.div`
  width: 100%;
  height: 7.4vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: bold;
  ${({ theme }) => theme.device.mobileLg} {
    height: 64px;
    h3 {
      font-size: 18px;
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
  ${({ theme }) => theme.device.mobileLg} {
    font-size: 13px;
  }
`;

const Percent = styled.span`
  color: ${({ theme }) => theme.colors.mainGreen};
`;

const Post = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 33px;
  textarea {
    width: 15.89vw;
    height: 28.24vh;
    resize: none;
    border-radius: 16px;
    border: 2px solid ${({ theme }) => theme.colors.gray};
    padding: 0.94vw;
    font-weight: bold;
    font-family: "Noto Sans CJK KR";
    font-size: ${({ theme }) => theme.fontSizes.md};
    ::placeholder {
      font-weight: bold;
      font-size: ${({ theme }) => theme.fontSizes.md};
      font-family: "Noto Sans CJK KR";
    }
  }
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    height: 21.88vh;
    margin-top: 32px;
    textarea {
      padding: 4.44vw;
      flex: 1;
      width: 38.89vw;
      height: 38.89vw;
      margin-left: 2.22vw;
      font-size: ${({ theme }) => theme.fontSizes.xs};
      ::placeholder {
        font-size: ${({ theme }) => theme.fontSizes.xs};
      }
    }
    img {
      height: 37.89vw;
      width: 37.89vw;
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
    margin: 0;
  }
`;

const BtnFrame = styled.div`
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    button {
      font-size: 13px;
      margin-top: 16px;
    }
  }
`;
