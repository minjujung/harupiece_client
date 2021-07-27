import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/chCreate";

// consolelog logger
import { consoleLogger } from "../redux/configureStore";

// icons
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

function CreateCertification() {
  const dispatch = useDispatch();
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
  return (
    <>
      <Certification>
        <div>인증샷 예시 등록</div>
        <CertificationBox>
          <Good>
            <label for="ex_file">
              <PhotoCameraIcon />
            </label>
            <img alt="" />
            <input onChange={selectFile} id="ex_file" type="file" />
          </Good>
          <Bad>
            <label for="ex_file">
              <PhotoCameraIcon />
            </label>
            <input id="ex_file" type="file" />
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

export default CreateCertification;
