import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";

import { useDispatch, useSelector } from "react-redux";
import { userCreators } from "../redux/modules/user";

import Input from "../elements/Input";

const Login = (props) => {
  const islogin = useSelector((store) => store.user.isLogin);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  useEffect(() => {
    if (islogin) props.history.push("/");
  }, []);

  const login = () => {
    dispatch(userCreators.setLoginDB(email, pw));
  };

  return (
    <React.Fragment>
      <Header />
      <Container>
        <LoginC0>
          <h1>Login</h1>
        </LoginC0>
        <LoginC1>
          <Input
            placeholder="아이디"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Input>
          <Input
            placeholder="비밀번호"
            onChange={(e) => {
              setPw(e.target.value);
            }}
          ></Input>
          <button onClick={login}>로그인 하기</button>
          <button
            onClick={() => {
              props.history.push("/signup");
            }}
          >
            회원가입 하러 하기
          </button>
        </LoginC1>
      </Container>
    </React.Fragment>
  );
};

export default Login;

const Container = styled.div`
  max-width: 43.75em;
  margin: 0 auto;
  width: 100%;
  top: 54px;
  position: absolute;
  left: 50%;
  top: 18em;
  transform: translateX(-50%);
`;

const LoginC0 = styled.div`
  padding: 1em;
  display: flex;
  justify-content: center;
  background-color: #c4c4c4;
`;

const LoginC1 = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #c4c4c4;
`;
