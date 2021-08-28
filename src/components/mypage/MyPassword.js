import React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";

import { Button } from "../../elements";

import { useDispatch } from "react-redux";
import { actionCreators as passwordActions } from "../../redux/modules/mypage";

function MyPassword() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(myInfo.getMyInfoDB());
  // }, []);

  return (
    <Container>
      <ChangePwd>
        <h2>비밀번호 변경</h2>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
          }}
          validationSchema={Yup.object({
            oldPassword: Yup.string().required(
              "비밀번호 작성칸이 빈칸 입니다 입력 해주세요."
            ),
            newPassword: Yup.string()
              .max(20, "20 글자 이상 작성이 불가능 합니다")
              .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
                "최소 8자 , 하나 이상의 문자, 하나 이상의 숫자 및 특수문자를 포함하여 주십시오"
              )
              .required("비밀번호 작성칸이 빈칸 입니다 입력 해주세요."),

            newPasswordConfirm: Yup.string()
              .max(20, " 글자 이상 작성이 불가능 합니다")
              .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
                "최소 8자 , 하나 이상의 문자, 하나 이상의 숫자 및 특수문자를 포함하여 주십시오"
              )
              .required("비밀번호 확인 작성칸이 빈칸 입니다 입력 해주세요.")
              .oneOf(
                [Yup.ref("newPassword"), null],
                "비밀번호가 일치하지 않습니다"
              ),
          })}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(passwordActions.changePasswordDB(values));
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <div>
                <Input
                  id="oldPassword"
                  type="password"
                  placeholder="현재 비밀번호"
                  margin="0 0 1.85vh 0"
                  padding="1.48vh 0 1.48vh 0.83vw"
                  {...formik.getFieldProps("oldPassword")}
                />
                {formik.touched.oldPassword && formik.errors.oldPassword ? (
                  <ErrorMsg>{formik.errors.oldPassword}</ErrorMsg>
                ) : null}
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="새로운 비밀번호"
                  margin="0 0 1.85vh 0"
                  padding="1.48vh 0 1.48vh 0.83vw"
                  {...formik.getFieldProps("newPassword")}
                />
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <ErrorMsg>{formik.errors.newPassword}</ErrorMsg>
                ) : null}
                <Input
                  id="newPasswordConfirm"
                  type="password"
                  placeholder="새로운 비밀번호 확인"
                  {...formik.getFieldProps("newPasswordConfirm")}
                />
                {formik.touched.newPasswordConfirm &&
                formik.errors.newPasswordConfirm ? (
                  <ErrorMsg>{formik.errors.newPasswordConfirm}</ErrorMsg>
                ) : null}
                <Button
                  width="100%"
                  height="5.93vh"
                  bg="black"
                  color="white"
                  fontsize="ms"
                  margin="2.96vh 0"
                  type="submit"
                >
                  비밀번호 변경
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </ChangePwd>
    </Container>
  );
}

export default MyPassword;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ChangePwd = styled.div`
  width: 19.58vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 7.13vh;
  h2 {
    font-size: ${({ theme }) => theme.fontSizes.md};
    margin-bottom: 6.3vh;
  }
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    margin-top: 0;
  }
`;

const Input = styled.input`
  margin-bottom: 22px;
  width: 100%;
  margin: 0 0 1.85vh 0;
  font-size: ${({ theme }) => theme.fontSizes.ms};
  padding: 1.48vh 0 1.48vh 0.83vw;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 2px solid ${({ theme }) => theme.colors.black};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray};
    font-size: ${({ theme }) => theme.fontSizes.ms};
  }
`;

const ErrorMsg = styled.p`
  margin-bottom: 10px;
  color: red;
  font-size: 12px;
  margin-left: 2.64vw;
`;
