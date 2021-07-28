import React, { useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { actionCreator as imageActions } from "../redux/modules/image";
import { actionCreator as postActions } from "../redux/modules/post";

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
  const loading = useSelector((state) => state.post.is_loading);

  const [shotText, setShotText] = useState("");
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
        postActions.editPostDB(postingId, { file: postingImg, shotText })
      );
    } else {
      dispatch(postActions.editPostDB(postingId, { file, shotText }));
    }

    if (!loading) {
      props.handleClose();
    }
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

      <label htmlFor="shot_text">인증 글 수정하기</label>
      <input
        value={shotText}
        type="text"
        id="shot_text"
        placeholder={postingContent}
        onChange={writeText}
      />
      <button onClick={editPost}>인증샷 수정하기</button>
    </>
  );
};

export default PostEdit;
