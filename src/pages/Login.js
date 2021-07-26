import React from "react";
import styled from 'styled-components';
import Header from '../components/Header';

const Login = (props) => {
    return(
        <React.Fragment>
            <Header/>
                <Container>
                    <LoginC0>
                        <h1>Login</h1>
                    </LoginC0>
                    <LoginC1>
                        <input placeholder="아이디"></input>
                        <input placeholder="비밀번호"></input>
                        <button>로그인 하기</button>
                        <button onClick={() => {
                                props.history.push("/signup");
                            }} 
                            >회원가입 하러 하기</button>
                    </LoginC1>
                </Container>
        </React.Fragment>
        )
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
    background-color : #c4c4c4;
`;

const LoginC1 = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color : #c4c4c4;
`;
