import React from "react";
import styled from "styled-components";
import camera from "../../assets/images/icons/camera.svg";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as imageActions } from "../../redux/modules/challengeCreate";
import { Image } from "../../elements/";

function CreateCertification({ challengeInfo, setChallengeInfo, id }) {
  const dispatch = useDispatch();

  // image preview
  const goodFileInput = React.useRef();
  const badFileInput = React.useRef();

  const goodPreview = useSelector((state) => state.create.goodPreview);
  const badPreview = useSelector((state) => state.create.badPreview);

  const goodSelectFile = (e) => {
    const reader = new FileReader();
    const goodFile = goodFileInput.current.files[0];

    if (!goodFile) {
      return;
    }

    reader.readAsDataURL(goodFile);

    reader.onloadend = () => {
      dispatch(imageActions.setGoodPreview(reader.result));
      setChallengeInfo({ ...challengeInfo, challengeGood: goodFile });
    };
  };

  const badSelectFile = (e) => {
    const reader = new FileReader();
    const badFile = badFileInput.current.files[0];

    if (!badFile) {
      return;
    }

    reader.readAsDataURL(badFile);

    reader.onloadend = () => {
      dispatch(imageActions.setBadPreview(reader.result));
      setChallengeInfo({ ...challengeInfo, challengeBad: badFile });
    };
  };

  return (
    <>
      <Certification>
        <SubT>인증샷 예시 등록</SubT>
        <CertificationBox>
          <Good>
            {goodPreview ? (
              <PreviewBtn htmlFor="ex_file">
                <Image
                  width="7.08vw"
                  height="12.59vh"
                  src={goodPreview}
                  alt="goodPreview"
                />
              </PreviewBtn>
            ) : (
              <Preview>
                <PreviewBtn htmlFor="ex_file">
                  <Image
                    width="1.04vw"
                    height="1.85vh"
                    src={camera}
                    alt="camera"
                  />
                </PreviewBtn>
              </Preview>
            )}
            <input
              onChange={goodSelectFile}
              ref={goodFileInput}
              style={{ display: "none" }}
              id="ex_file"
              type="file"
            />
            <BottomT>좋은 인증샷 예시</BottomT>
          </Good>
          <Bad>
            {badPreview ? (
              <PreviewBtn htmlFor="ex_files">
                <Image
                  width="7.08vw"
                  height="12.59vh"
                  src={badPreview}
                  alt="badPreview"
                />
              </PreviewBtn>
            ) : (
              <Preview>
                <PreviewBtn htmlFor="ex_files">
                  <Image
                    width="1.04vw"
                    height="1.85vh"
                    src={camera}
                    alt="camera"
                  />
                </PreviewBtn>
              </Preview>
            )}
            <input
              onChange={badSelectFile}
              ref={badFileInput}
              style={{ display: "none" }}
              id="ex_files"
              type="file"
            />
            <BottomT>나쁜 인증샷 예시</BottomT>
          </Bad>
        </CertificationBox>
      </Certification>
    </>
  );
}

const Certification = styled.div`
  width: 100%;
  height: 100%;
`;

const CertificationBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const SubT = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
  margin-bottom: 8px;
`;

const BottomT = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
  margin-top: 8px;
`;

const Good = styled.div`
  margin-right: 0.73vw;
`;

const Preview = styled.div`
  width: 7.08vw;
  height: 12.59vh;
  background-color: #e5e5e5;
  border-radius: 16px;
`;

const PreviewBtn = styled.label`
  width: 7.08vw;
  height: 12.59vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
`;

const Bad = styled.div``;

export default CreateCertification;
