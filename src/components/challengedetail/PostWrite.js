import React, { useRef, useState } from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";

import { useDispatch, useSelector } from "react-redux";
import { actionCreator as imageActions } from "../../redux/modules/image";
import { actionCreator as postActions } from "../../redux/modules/post";
import Button from "../../elements/Button";
import { Image } from "../../elements";
import camera from "../../images/icons/camera.svg";

const PostWrite = ({ challengeId }) => {
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.image.preview);

  const [open, setOpen] = useState(false);
  const [shotText, setShotText] = useState("");
  const shotInput = useRef();

  //"인증샷 올리기"버튼 클릭시 modal 열기
  const handleClickOpen = (id) => {
    setOpen(true);
  };

  // modal창 닫기
  const handleClose = () => {
    setOpen(false);
  };

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

  //인증샷 post게시하면서 이미지도 업로드
  const createPost = () => {
    const file = shotInput.current.files[0];
    if (!file) {
      return;
    }
    dispatch(postActions.addPostDB({ file, shotText }, challengeId));
    setShotText("");
    handleClose();
  };

  return (
    <>
      <Button
        width="16.15vw"
        bg="mainGreen"
        color="white"
        padding="21px 64px"
        border="lightGray"
        margin="0 0 20px 0"
        _onClick={handleClickOpen}
      >
        인증 하기
      </Button>
      <Dialog
        open={open}
        maxWidth={false}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          style: {
            width: "55.21vw",
            height: "66.66vh",
            padding: "32px",
            borderRadius: "0.6em ",
          },
        }}
      >
        <Title>인증</Title>
        <InputContainer>
          {preview ? (
            <Image
              src={preview}
              alt="preview"
              width="35.16vw"
              height="45.09vh"
            />
          ) : (
            <Preview>
              <PreviewBtn htmlFor="shot">
                <Image
                  width="4.17vw"
                  height="7.03vh"
                  margin="0 0 20px 0"
                  fill
                  src={camera}
                  alt="camera"
                />
                <p>업로드할 사진을 선택해 주세요.</p>
              </PreviewBtn>
            </Preview>
          )}

          <input
            ref={shotInput}
            type="file"
            id="shot"
            style={{ display: "none" }}
            onChange={selectFile}
          />
          <TextInput
            value={shotText}
            type="text"
            id="shot_text"
            placeholder="챌린지를 실천하면서 느껐던 점을 메모해보세요!"
            onChange={writeText}
          />
        </InputContainer>
        {/* <CreateBtn
          onClick={createPost}
          disabled={
            !shotInput.current?.files[0] || shotText === "" ? true : false
          }
        >
          인증 올리기
        </CreateBtn> */}
        <Button width="100%" padding="16px 0" _onClick={createPost}>
          인증내용 올리기
        </Button>
      </Dialog>
    </>
  );
};

export default PostWrite;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: 32px;
  font-weight: bold;
`;

const Preview = styled.div`
  width: 25.1vw;
  height: 45.09vh;
  background-color: #e5e5e5;
  border-radius: 16px;
  border: dashed ${({ theme }) => theme.colors.mainGreen};
  border-width: 6px;
  font-weight: bold;
`;

const PreviewBtn = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray};
`;

const InputContainer = styled.div`
  display: flex;
`;

const TextInput = styled.input`
  width: 25.1vw;
  height: 45.09vh;
  background-color: #e5e5e5;
  display: flex;
  border-radius: 16px;
  margin-left: 32px;
`;

const CreateBtn = styled.button`
  color: ${(props) => (props.disabled ? "black" : "white")};
  background-color: ${(props) => (props.disabled ? "grey" : "blue")};
`;
