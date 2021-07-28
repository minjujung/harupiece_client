import React, { useRef, useState } from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";

import { useDispatch, useSelector } from "react-redux";
import { actionCreator as imageActions } from "../redux/modules/image";
import { actionCreator as postActions } from "../redux/modules/post";
import { consoleLogger } from "../redux/configureStore";

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
      <button onClick={handleClickOpen}>인증샷 올리기</button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          style: {
            padding: "1em",
            borderRadius: "0.6em ",
          },
        }}
      >
        <h3>인증샷 올리기</h3>
        {preview ? (
          <img
            src={preview}
            alt="preview"
            style={{ width: "30em", height: "26em" }}
          />
        ) : (
          <Preview>
            <p>인증샷 프리뷰!</p>
          </Preview>
        )}

        <label htmlFor="shot">카메라 아이콘</label>
        <input
          ref={shotInput}
          type="file"
          id="shot"
          style={{ display: "none" }}
          onChange={selectFile}
        />
        <label htmlFor="shot_text">인증 글 남기기</label>
        <input
          value={shotText}
          type="text"
          id="shot_text"
          placeholder="챌린지를 실천하면서 느껐던 점을 메모해보세요!"
          onChange={writeText}
        />
        <CreateBtn
          onClick={createPost}
          disabled={
            !shotInput.current?.files[0] || shotText === "" ? true : false
          }
        >
          인증 올리기
        </CreateBtn>
      </Dialog>
    </>
  );
};

export default PostWrite;

const Preview = styled.div`
  width: 30em;
  height: 26em;
  background-color: grey;
`;

const CreateBtn = styled.button`
  color: ${(props) => (props.disabled ? "black" : "white")};
  background-color: ${(props) => (props.disabled ? "grey" : "blue")};
`;
