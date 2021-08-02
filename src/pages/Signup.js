import React, { useEffect } from "react";
import styled from 'styled-components';
import Header from '../components/Header';

import { nickCheck, emailCheck } from '../shared/regExp';
import { useDispatch , useSelector} from 'react-redux';
import { userCreators } from '../redux/modules/user';

const Signup = (props) => {
    const islogin = useSelector((store) => store.user.isLogin);
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('');
    const [nick, setNick] = React.useState('');
    const [pw, setPw] = React.useState('');
    const [pwc, setPwC] = React.useState('');

    const pwd = React.useRef();
	const pwdC = React.useRef();
    const profileImg = "https://onedaypiece-shot-image.s3.ap-northeast-2.amazonaws.com/profieImg.png";
    
    
    useEffect(() => {
		if (islogin) props.history.push('/');
	},[]);

	if (pw && pwc && pw === pwc) {
		pwd.current.innerText = '성공 아이콘';
		pwdC.current.innerText = '성공 아이콘';
	} else if (pw !== pwc) {
		pwd.current.innerText = '실패 아이콘';
		pwdC.current.innerText = '실패 아이콘';
	}

	const signup = () => {
		if (email === '' || nick === '' || pw === '' || pwc === '') {
			window.alert('이메일, 닉네임, 비밀번호, 비밀번호 체크를 모두 입력해주세요!!');
			return;
		}

        if (!emailCheck(email)) {
			window.alert('올바른 이메일 형식을 작성해주세요');
			return;
		}

		if (!nickCheck(nick)) {
			window.alert('숫자 및 영어만 입력가능합니다.');
			return;
		}

		if (pw !== pwc) {
			window.alert('비밀번호와 비밀번호 재확인이 일치하지 않습니다.');
			return;
		}

		dispatch(userCreators.registerDB(email, nick , pw , pwc, profileImg));
	};

    

    return(
        <React.Fragment>
            <Header/>
                <Container>
                    <LoginC0>
                        <h1>SignUp</h1>
                    </LoginC0>
                    <LoginC1>
                        <input placeholder="이메일" onChange={(e) => {
								setEmail(e.target.value);
							}}></input>
                        <input placeholder="닉네임" onChange={(e) => {
								setNick(e.target.value);
							}}></input>
                        <input placeholder="패스워드" onChange={(e) => {
								setPw(e.target.value);
							}}></input> <p ref={pwd}/>
                        <input placeholder="패스워드 확인"onChange={(e) => {
								setPwC(e.target.value);
							}}></input> <p ref={pwdC}/>
                        <button onClick={signup} 
                            >회원가입 하기</button>
                    </LoginC1>
                </Container>
        </React.Fragment>
        )
};
        

export default Signup;

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