import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/challengeCreate";
// modal
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Button } from "@material-ui/core";

function CreateImgSelect({ challengeInfo, setChallengeInfo }) {
  const dispatch = useDispatch();

  const select = useSelector((state) => state.create.thumnailList);

  const [preview, setPreview] = useState("");

  // modal state
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    dispatch(imageActions.getThumnailDb(challengeInfo.categoryName));
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 대표이미지 선택
  const selectImg = (img) => {
    setChallengeInfo({ ...challengeInfo, challengeImgUrl: img });
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
              <>
                <img src={i} onClick={() => selectImg(i)} alt="" />
              </>
            );
          })}
        </DialogContent>
      </Dialog>
      {preview ? <img src={preview} alt="preview" /> : null}
    </>
  );
}

export default CreateImgSelect;
