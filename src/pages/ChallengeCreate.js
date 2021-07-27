import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/chCreate";
import { actionCreators as createActions } from "../redux/modules/chCreate";
// consolelog logger
import { consoleLogger } from "../redux/configureStore";
// date range picker
import { enGB } from "date-fns/locale";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";
// modal
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Button } from "@material-ui/core";

// icons
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

function ChallengeCreate(props) {
  const dispatch = useDispatch();

  // title
  const [title, setTitle] = useState("");

  // date picker state
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  // modal state
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // image preview
  const fileInput = React.useRef();

  // const preview = useSelector((state) => state.chCreate.preview);

  const selectFile = (e) => {
    consoleLogger(e.target.files);
    consoleLogger(e.target.files[0]);
    consoleLogger(fileInput.current.files[0]);

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      consoleLogger(reader.result);
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  // challenge description
  const [desc, setDesc] = useState("");

  // create challenge
  const createChallenge = () => {
    // memberName: " ",
    // challengeTitle: " ",
    // challengeContent: " ",
    // categoryName: " ",
    // challengePassword: " ",
    // challengeStartDate: " ",
    // challengeEndDate: " ",
    // challengeProgress: " ",
    // challengeImgUrl: " ",
    // challengeGood: " ",
    // challengeBad: " ",
    // challengeHoliday: " ",
    dispatch(createActions.createChDB(title, desc));
  };

  return (
    <>
      <h2>챌린지 개설</h2>

      <CreateContainer>
        <GuideLine>개설 가이드라인</GuideLine>

        <CreateContents>
          <Contents>
            <label style={{ width: "100%" }}>
              제목
              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                  console.log(setTitle(e.target.value));
                }}
                placeholder="제목을 입력해주세요"
              />
            </label>
          </Contents>

          <ContentsContainer>
            {/* 카테고리 */}
            <Contents>
              <label>카테고리</label>
              <select>
                <option value="">카테고리</option>
                <option value="">돈 관리</option>
                <option value="">공부</option>
                <option value="">다이어트</option>
                <option value="">생활습관</option>
              </select>

              {/* 대표 이미지 */}
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
              >
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

              {/* 인증샷 예시 */}
              <Certification>
                <div>인증샷 예시 등록</div>
                <CertificationBox>
                  <Good>
                    <label htmlfor="ex_file">
                      <PhotoCameraIcon />
                    </label>
                    <img alt="" />
                    <input onChange={selectFile} id="ex_file" type="file" />
                  </Good>
                  <Bad>
                    <label htmlfor="ex_file">
                      <PhotoCameraIcon />
                    </label>
                    <input id="ex_file" type="file" />
                  </Bad>
                </CertificationBox>
              </Certification>
            </Contents>

            <Contents>
              {/* date picker */}
              <div>
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={setStartDate}
                  onEndDateChange={setEndDate}
                  minimumDate={new Date()}
                  minimumLength={1}
                  format="dd MMM yyyy"
                  locale={enGB}
                >
                  {({ startDateInputProps, endDateInputProps, focus }) => (
                    <div className="date-range">
                      <input
                        className={
                          "input" + (focus === START_DATE ? " -focused" : "")
                        }
                        {...startDateInputProps}
                        placeholder="Start date"
                      />
                      <span className="date-range_arrow" />
                      <input
                        className={
                          "input" + (focus === END_DATE ? " -focused" : "")
                        }
                        {...endDateInputProps}
                        placeholder="End date"
                      />
                    </div>
                  )}
                </DateRangePicker>
              </div>

              {/* 모집형식 */}
              <label>모집형식</label>
              <select>
                <option value="">카테고리</option>
                <option value="">공개</option>
                <option value="">비공개</option>
              </select>

              {/* 챌린지 설명 */}
              <label>
                챌린지 설명
                <div>
                  <input
                    onChange={(e) => {
                      setDesc(e.target.value);
                      console.log(setDesc(e.target.value));
                    }}
                    placeholder="챌린지를 설명해주세요."
                  />
                </div>
              </label>
            </Contents>
          </ContentsContainer>

          {/* 챌린지 개설 */}
          <button>챌린지 개설하기</button>
        </CreateContents>
      </CreateContainer>
    </>
  );
}

const CreateContainer = styled.div`
  background-color: orange;
  display: flex;
  width: 100%;
  height: 100vh;
`;

const GuideLine = styled.div`
  background-color: coral;
  width: 50%;
  height: 100%;
  padding: 20px;
`;

const CreateContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background-color: palegreen;
  padding: 20px;
`;

const ContentsContainer = styled.div`
  display: flex;
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const Contents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Certification = styled.div`
  width: 100%;
  height: 100%;
`;

const CertificationBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Good = styled.image`
  label {
    display: inline-block;
    padding: 0.5em 0.75em;
    color: #999;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    background-color: #fdfdfd;
    cursor: pointer;
    border: 1px solid #ebebeb;
    border-bottom-color: #e2e2e2;
    border-radius: 0.25em;
  }

  input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

const Bad = styled.image`
  label {
    display: inline-block;
    padding: 0.5em 0.75em;
    color: #999;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    background-color: #fdfdfd;
    cursor: pointer;
    border: 1px solid #ebebeb;
    border-bottom-color: #e2e2e2;
    border-radius: 0.25em;
  }

  input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

export default ChallengeCreate;
