import React, { useState } from "react";
import styled from "styled-components";
// modal
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Image } from "../../elements";
import close from "../../assets/images/icons/close.svg";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as imageActions } from "../../redux/modules/challengeCreate";

function CreateImgSelect({ challengeInfo, setChallengeInfo, id }) {
  const dispatch = useDispatch();
  const select = useSelector((state) => state.create.thumnailList);
  const challenge_info = useSelector((state) => state.challengeDetail.detail);

  const [preview, setPreview] = useState("");

  // modal state
  const [open, setOpen] = useState(false);
  const [imgIdx, setImgIdx] = useState("");

  const handleClickOpen = () => {
    if (id) {
      setOpen(true);
      dispatch(imageActions.getThumnailDb(challenge_info.categoryName));
    } else {
      if (!challengeInfo.categoryName) {
        window.alert("카테고리를 먼저 정해주세요!");
        return;
      }
      setOpen(true);
      dispatch(imageActions.getThumnailDb(challengeInfo.categoryName));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 대표이미지 선택
  const selectImg = (img, idx) => {
    setChallengeInfo({
      ...challengeInfo,
      challengeImgUrl: img,
    });
    setImgIdx(idx);

    // setPreview(img);
    handleClose();
  };

  return (
    <>
      <SubT>대표 이미지 업로드 / 선택</SubT>
      <ImageBtn onClick={handleClickOpen}>
        {challengeInfo.challengeImgUrl
          ? `${challengeInfo.categoryName}_${imgIdx + 1}`
          : "이미지를 선택해주세요."}
      </ImageBtn>
      <Dialog
        open={open}
        maxWidth={false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        PaperProps={{
          style: {
            width: "55.21vw",
            padding: "32px",
            borderRadius: "16px",
          },
        }}
      >
        <Container>
          <Title>대표 이미지 설정</Title>
          <Image
            src={close}
            alt="closeBtn"
            onClick={handleClose}
            width="28px"
            height="28px"
            borderRadius="0"
          />
        </Container>
        <ThumbnailModal>
          {select.map((i, idx) => {
            return (
              <Image
                key={idx}
                width="16.67vw"
                height="16.66vh"
                borderRadius="16px"
                src={i}
                onClick={() => selectImg(i, idx)}
                alt="challenge_thumbnail"
              />
            );
          })}
        </ThumbnailModal>
      </Dialog>
      {/* <Preview id={id} preview={preview} challenge_info={challenge_info} /> */}
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

const SubT = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
  margin-bottom: 8px;
`;

const ImageBtn = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.ms};
  background-color: ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.darkGray};
  width: 15vw;
  padding: 1.018vh;
  padding-left: 0.83vw;
  border-radius: 8px;
  margin-bottom: 2.96vh;
`;

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

const ThumbnailModal = styled.div`
  width: 100%;
  display: grid;
  gap: 0.83vw;
  grid-template-columns: repeat(3, 16.67vw);
  grid-template-rows: repeat(2, 16.66vh);
`;
