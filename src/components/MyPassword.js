import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as passwordActions } from "../redux/modules/mypage";

function MyPassword() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState({
    password: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  const onChangePassword = (e) => {
    setPassword({ ...password, password: e.target.value });
  };
  const onChangeNewPassword = (e) => {
    setPassword({ ...password, newPassword: e.target.value });
  };
  const onChangeNewPasswordConfirm = (e) => {
    setPassword({ ...password, newPasswordConfirm: e.target.value });
  };

  const changePassword = () => {
    if (password.password === "") {
      window.alert("현재 비밀번호를 입력해주세요.");
      return;
    }

    if (password.newPassword === "") {
      window.alert("새 비밀번호를 입력해주세요.");
      return;
    }

    if (password.newPassword.length < 4) {
      window.alert("비밀번호를 4자 이상 입력해주세요.");
      return;
    }

    if (password.newPasswordConfirm === "") {
      window.alert("새 비밀번호 확인을 입력해주세요.");
      return;
    }

    if (password.newPassword !== password.newPasswordConfirm) {
      window.alert("새 비밀번호와 새 비밀번호 확인이 같지않습니다.");
      return;
    }
    dispatch(passwordActions.changePasswordDB(password));
  };

  return (
    <>
      <label>
        현재 비밀번호
        <input type="password" onChange={onChangePassword} />
      </label>
      <label>
        새 비밀번호
        <input type="password" onChange={onChangeNewPassword} />
      </label>
      <label>
        새 비밀번호 확인
        <input type="password" onChange={onChangeNewPasswordConfirm} />
      </label>

      <button onClick={changePassword}>비밀번호 변경</button>
    </>
  );
}

export default MyPassword;
