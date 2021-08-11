import React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";

import Header from "../components/Header";

import { useDispatch } from "react-redux";
import { userCreators } from "../redux/modules/user";

import Green from "../assets/images/level/green.svg";

import { Button, Image } from "../elements";

const Login = (props) => {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Header />
      <Container>
        <div>
          <Image width="162px" height="155px" src={Green} />
        </div>
        <p>로그인</p>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string().required(
              "이메일 작성칸이 빈칸 입니다 입력 해주세요."
            ),

            password: Yup.string().required(
              "비밀번호 작성칸이 빈칸 입니다 입력 해주세요."
            ),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            dispatch(userCreators.setLoginDB(values));
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <div>
                <Input
                  id="email"
                  type="text"
                  placeholder="이메일"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <ErrorMsg>{formik.errors.email}</ErrorMsg>
                ) : null}
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <ErrorMsg>{formik.errors.password}</ErrorMsg>
                ) : null}
                <Button
                  width="100%"
                  padding="16px 156px"
                  bg="black"
                  color="white"
                  fontsize="ms"
                  type="submit"
                >
                  로그인
                </Button>
              </div>
            </form>
          )}
        </Formik>
        <LoginText
          onClick={() => {
            props.history.push("/signup");
          }}
        >
          회원가입 하러 가기
        </LoginText>
      </Container>
    </React.Fragment>
  );
};

export default Login;

const Container = styled.div`
  position: absolute;
  width: 19.58vw;
  top: 16.38vh;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  left: 50%;
  transform: translateX(-50%);
  & > p {
    margin-top: 26px;
    margin-bottom: 73px;
  }
`;

const Input = styled.input`
  margin-bottom: 22px;
  width: 100%;
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 2px solid ${({ theme }) => theme.colors.black};
`;

const ErrorMsg = styled.p`
  margin-bottom: 10px;
  text-align: center;
  color: red;
  font-size: 12px;
`;

const LoginText = styled.p`
  text-align: center;
  margin-top: 31px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray};
`;
