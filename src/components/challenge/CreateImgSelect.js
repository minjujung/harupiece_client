import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as imageActions } from "../../redux/modules/challengeCreate";
// modal
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Button } from "@material-ui/core";

function CreateImgSelect({ challengeInfo, setChallengeInfo, id }) {
  const dispatch = useDispatch();
  const select = useSelector((state) => state.create.thumnailList);
  const challenge_info = useSelector((state) => state.challengeDetail.detail);

  const [preview, setPreview] = useState("");

  // modal state
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    if (id) {
      dispatch(imageActions.getThumnailDb(challenge_info.categoryName));
    } else {
      dispatch(imageActions.getThumnailDb(challengeInfo.categoryName));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 대표이미지 선택
  const selectImg = (img) => {
    setChallengeInfo({
      ...challengeInfo,
      challengeImgUrl: img,
    });

    setPreview(img);
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        대표 이미지 업로드 / 선택{" "}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {select.map((i, idx) => {
            return (
              <div key={idx}>
                <img src={i} onClick={() => selectImg(i)} alt="" />
              </div>
            );
          })}
        </DialogContent>
      </Dialog>
      <Preview id={id} preview={preview} challenge_info={challenge_info} />
    </>
  );
}

const Preview = ({ id, preview, challenge_info }) => {
  if (id && !preview) {
    return <img src={challenge_info.challengeImgUrl} alt="thumbnail" />;
  } else if (!id && !preview) {
    return null;
  } else {
    return <img src={preview} alt="thumbnail_preview" />;
  }
};

export default CreateImgSelect;
