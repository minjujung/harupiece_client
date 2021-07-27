import React, { useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { actionCreator as imageActions } from "../redux/modules/image";

const PostEdit = (props) => {
  const {
    postingId,
    memberId,
    postingImg,
    postingContent,
    postingCount,
    postingApproval,
    postingModifyOk,
  } = props;

  const dispatch = useDispatch();
  const preview = useSelector((state) => state.image.preview);

  const [shotText, setShotText] = useState("");
  const shotInput = useRef();

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

  return (
    <>
      <h3>인증샷 수정하기</h3>
      {preview ? (
        <img
          src={preview}
          alt="preview"
          style={{ width: "30em", height: "26em" }}
        />
      ) : (
        <img
          src={postingImg}
          alt="before_edit_photo"
          style={{ width: "30em", height: "26em" }}
        />
      )}

      <label htmlFor="shot">카메라 아이콘</label>
      <input
        ref={shotInput}
        type="file"
        id="shot"
        style={{ display: "none" }}
        onChange={selectFile}
      />
      {/*
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
      </CreateBtn> */}
    </>
  );
};

export default PostEdit;
