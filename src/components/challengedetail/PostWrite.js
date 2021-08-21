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

const PostWrite = ({ challengeId, challengeHoliday }) => {
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
      setTimeout(() => window.alert("인증샷과 게시글 모두 작성해주세요!"), 300);
      return;
    }
    dispatch(postActions.addPostDB({ file, shotText }, challengeId));
    setShotText("");
    handleClose();
  };

  let intViewportWidth = window.innerWidth;

  const today = new Date().getDay();

  return (
    <>
      <PostBtn
        onClick={handleClickOpen}
        disabled={challengeHoliday !== "" ? true : false}
      >
        인증 하기
      </PostBtn>
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
                  width: "55.21vw",
                  padding: "32px",
                  borderRadius: "16px",
                },
              }
            : {
                style: {
                  width: "91.11vw",
                  height: "81.37%",
                  padding: "16px",
                  borderRadius: "16px",
                },
              }
        }
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
            <PreviewImage src={preview} alt="preview" />
          ) : (
            <Preview>
              <PreviewBtn htmlFor="shot">
                <Image
                  width="4.17vw"
                  height="7.03vh"
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
            padding="16px 0"
            // margin="0 0 0 4.44vw"
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
  height: 7%;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.device.mobileLg} {
    img {
      width: 8.89vw;
      height: auto;
      max-height: 18px;
    }
  }
`;

const PostBtn = styled.button`
  width: 100%;
  height: 5.93vh;
  margin-bottom: 20px;
  color: white;
  background-color: ${(props) =>
    props.disabled === true
      ? props.theme.colors.gray
      : props.theme.colors.mainGreen};
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: 32px;
  font-weight: bold;
  ${({ theme }) => theme.device.mobileLg} {
    font-size: 18px;
  }
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
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    height: 72.81%;
    max-height: 592px;
  }
`;

const PreviewBtn = styled.label`
  width: ${(props) => (props.again ? "25.1vw" : "100%")};
  height: ${(props) => (props.again ? "auto" : "100%")};
  display: flex;
  margin-right: 32px;
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
  p {
    margin-top: 18px;
    line-height: normal;
  }
  ${({ theme }) => theme.device.mobileLg} {
    font-size: 16px;
    img {
      width: 17.78%;
      height: 21.62%;
    }
    p {
      margin-top: 2.7%;
    }
    margin-right: 16px;
    width: 100%;
    height: 100%;
    flex: 1;
  }
`;

const InputContainer = styled.div`
  display: flex;
  ${({ theme }) => theme.device.mobileLg} {
    flex-direction: column;
    height: 100%;
  }
`;

const PreviewImage = styled.img`
  width: 25.1vw;
  height: 45.09vh;
  border-radius: 16px;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
  }
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
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    font-size: 16px;
    height: 25.14%;
    margin-left: 0;
    margin-top: 16px;
    /* min-height: 18.15%; */
    ::placeholder {
      font-weight: bold;
      font-size: 16px;
    }
  }
`;

const BtnContainer = styled.div`
  display: flex;
  margin-top: 32px;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    margin-top: 16px;
    button {
      flex: 1;
    }
  }
`;
