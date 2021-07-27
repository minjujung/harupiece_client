import React, { useState } from "react";
// modal
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Button } from "@material-ui/core";

function CreateImgSelect() {
  // modal state
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          <div>이미지</div>
          <div>이미지</div>
          <div>이미지</div>
          <div>이미지</div>
          <div>이미지</div>
          <div>이미지</div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateImgSelect;
