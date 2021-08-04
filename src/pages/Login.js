import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";

import Header from "../components/Header";

import { useDispatch, useSelector } from "react-redux";
import { userCreators } from "../redux/modules/user";

import { Input } from "../elements";

const Login = (props) => {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Header />
      <Container>
        <LoginC0>
          <h1>Login</h1>
        </LoginC0>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("올바른 이메일 형식을 작성해주세요.")
              .required("이메일 작성칸이 빈칸 입니다 입력 해주세요."),

            // password: Yup.string()
            //   .matches(
            //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
            //     "최소 8자 , 하나 이상의 문자, 하나 이상의 숫자 및 특수문자를 포함하여 주십시오"
            //   )
            //   .required("비밀번호 작성칸이 빈칸 입니다 입력 해주세요."),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            dispatch(userCreators.setLoginDB(values));
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <LoginC1>
                <input
                  width="50%"
                  id="email"
                  type="text"
                  placeholder="이메일"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
                <input
                  width="50%"
                  id="password"
                  type="password"
                  placeholder="비밀번호"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
                <button type="submit">로그인 하기</button>
              </LoginC1>
            </form>
          )}
        </Formik>
        <button
          onClick={() => {
            props.history.push("/signup");
          }}
        >
          회원가입 하러 가기
        </button>
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
