import React, { useState } from "react";
import styled from "styled-components";

import { Button } from "../../elements";
import Dialog from "@material-ui/core/Dialog";

import popup from "../../assets/images/logo/popup.png"

import { useDispatch, useSelector } from "react-redux";
import { userCreators } from "../../redux/modules/user";

const WelcomeModal = () => {
    const dispatch = useDispatch();

    const user_info = useSelector((state) => state.user.userInfo);
    const is_complete = useSelector((state) => state.user.is_complete);

    const [open, setOpen] = useState(false);
    


    const handleClose = () => {
        setOpen(false);
    };

    const welcome = () => {
        if (is_complete === true) {
            setOpen(true);
        }; 
    };

    return (
        <>
        {welcome ? <Dialog
        open={open}
        maxWidth={false}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{
            style: {
                width:"28.13vw",
                height: "50vh",
                borderRadius: "10px",
                overflowY: "hidden",
                padding: "0px",
            },
        }}
        >
            <Container>
                <Text>
                    <p>{user_info.nickname}님!<br/>
                    회원가입을 축하합니다.<br/>
                    첫 만남 기념으로 노랑하루를 드릴게요 :-)<br/>
                    챌린지를 열심히 달성하여<br/>
                    하루 뱃지를 GET 해보세요!
                    </p>
                </Text>
                <img src={popup} alt="popup"/>
            </Container>
        </Dialog>
        : null}
        </>
    );
};

export default WelcomeModal;

const Container = styled.div`
    width: 100%;
    text-align:center;
    & > img{
        position: relative;
        width: 28.13vw;
        height: 50vh;
    }
`;

const Text = styled.div`
    width : 100%;
    position: absolute;
    padding-top:57px;
    z-index: 10;
    & > p{
        font-size: ${({ theme }) => theme.fontSizes.md};
        }
`;