import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// modal
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Button } from "@material-ui/core";

function CreateImgSelect({ challengeInfo, setChallengeInfo }) {
  const dispatch = useDispatch();

  const select = useSelector((state) => state.create.thumnailList);

  // modal state
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 대표이미지 선택
  const selectImg = () => {};
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
                <img src={i.challengeImgUrl} onClick={selectImg} alt="" />
              </>
            );
          })}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateImgSelect;
