import React, { useRef, useState } from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";

import { useDispatch, useSelector } from "react-redux";
import { actionCreator as imageActions } from "../../redux/modules/image";
import { actionCreator as postActions } from "../../redux/modules/post";
import Button from "../../elements/Button";
import { Image } from "../../elements";
import camera from "../../assets/images/icons/camera.svg";
import close from "../../assets/images/icons/close.svg";

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
    dispatch(imageActions.setPreview(""));
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
    if (!file || !shotText) {
      window.alert("인증샷과 게시글 모두 작성해주세요!");
      return;
    }
    dispatch(postActions.addPostDB({ file, shotText }, challengeId));
    setShotText("");
    handleClose();
  };

  return (
    <>
      <Button
        width="100%"
        height="5.93vh"
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
            padding: "32px",
            borderRadius: "16px",
          },
        }}
      >
        <Container>
          <Title>인증</Title>
          <Image
            src={close}
            alt="closeBtn"
            onClick={handleClose}
            width="28px"
            height="28px"
            borderRadius="0"
          />
        </Container>
        <InputContainer>
          {preview ? (
            <Image
              src={preview}
              alt="preview"
              width="25.1vw"
              height="45.09vh"
              borderRadius="16px"
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
                <p>
                  업로드할 사진을 선택 <br />
                  해주세요.
                </p>
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
            placeholder="이번 챌린지에서 느낀 점을 기록해보세요."
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
        <BtnContainer>
          <PreviewBtn htmlFor="shot" again>
            인증샷 수정하기
          </PreviewBtn>
          <Button
            width="25.10vw"
            height="5.92vh"
            padding="16px 0"
            margin="0 0 0 32px"
            _onClick={createPost}
          >
            인증글 올리기
          </Button>
        </BtnContainer>
      </Dialog>
    </>
  );
};

export default PostWrite;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

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
  ${(props) => (props.again ? `margin-right: 32px;` : null)}
`;

const PreviewBtn = styled.label`
  width: ${(props) => (props.again ? "25.1vw" : "100%")};
  height: ${(props) => (props.again ? "5.92vh" : "100%")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.again ? props.theme.colors.mainGreen : props.theme.colors.gray};
  font-weight: bold;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.md};
  ${(props) =>
    props.again
      ? `border: 2px solid ${props.theme.colors.lightGray} `
      : props.theme.colors.gray};
  ${(props) => (props.again ? `border-radius: 8px` : null)};
`;

const InputContainer = styled.div`
  display: flex;
`;

const TextInput = styled.textarea`
  width: 25.1vw;
  height: 45.09vh;
  resize: none;
  background-color: #e5e5e5;
  border-radius: 16px;
  margin-left: 32px;
  padding: 20px;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.md};
  caret-color: ${({ theme }) => theme.colors.mainGreen};
  ::placeholder {
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: ${({ theme }) => theme.colors.gray};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
  }
  :focus {
    background-color: ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.mainGreen};
  }
`;

const BtnContainer = styled.div`
  display: flex;
  margin-top: 32px;
`;
