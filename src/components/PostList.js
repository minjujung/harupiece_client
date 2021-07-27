import React, { useState } from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import { consoleLogger } from "../redux/configureStore";

const PostList = (props) => {
  const { list, totalNumber } = props;
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState("");

  //인증샷 클릭시 인증샷 상세페이지 modal 열기
  const handleClickOpen = (id) => {
    consoleLogger(id);
    setClicked(list.findIndex((l) => l.postingId === id));
    setOpen(true);
  };

  // modal창 닫기
  const handleClose = () => {
    setOpen(false);
  };

  const check = () => {};

  return (
    <>
      {list.map((l, idx) => (
        <article key={l.postingId}>
          <img
            src={l.postingImg}
            onClick={() => handleClickOpen(l.postingId)}
            alt="vegan_post"
          />
        </article>
      ))}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          style: {
            padding: "1em",
            borderRadius: "0.6em ",
          },
        }}
      >
        <div>
          <Profile src={list[clicked]?.profileImg} alt="profile" />{" "}
          {list[clicked]?.nickName}
          <div>
            <StatusBar>
              <Status
                width={`${(list[clicked]?.postingCount / totalNumber) * 100}%`}
              />
            </StatusBar>
            <span>
              총 {(list[clicked]?.postingCount / totalNumber) * 100} %
            </span>
          </div>
        </div>
        <p>{list[clicked]?.postingContent}</p>
        <img
          src={list[clicked]?.postingImg}
          onClick={handleClickOpen}
          alt="vegan_post"
        />
        <div>
          <button onClick={check}>인증 확인</button>
          <button>인증샷 수정</button>
        </div>
      </Dialog>
    </>
  );
};

export default PostList;

const Profile = styled.img`
  width: 1em;
  height: 1em;
`;

const StatusBar = styled.div`
  width: 5em;
  height: 3em;
  border: 1px solid grey;
  position: relative;
`;

const Status = styled.div`
  position: absolute;
  background-color: gray;
  width: ${(props) => props.width};
  height: 3em;
  top: 0;
  left: 0;
`;
