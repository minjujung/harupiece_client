import React, { useState } from "react";
import styled from "styled-components";

import { Button } from "../../elements";
import Dialog from "@material-ui/core/Dialog";

import popup from "../../assets/images/logo/popup.png"

import { useDispatch, useSelector } from "react-redux";
import { userCreators } from "../../redux/modules/user";

const WelcomeModal = () => {
    const dispatch = useDispatch();

    const is_complete = useSelector((state) => state.is_complete);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

  // modal창 닫기,
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Button 
            width="100%"
            height="5.93vh"
            margin="0 0 20px 0"
            _onClick={handleClickOpen}
            >
            모달 버튼
            </Button>
            <Dialog
            open={open}
            maxWidth={false}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            PaperProps={{
                style: {
                    width:"28.13vw",
                    height: "50vh",
                    borderRadius: "10px",
                },
            }}
            >
                <Container>
                    <Text>
                        <p>홍길동님!<br/>
                        회원가입을 축하합니다.<br/>
                        첫 만남 기념으로 노랑하루를 드릴게요 :-)<br/>
                        챌린지를 열심히 달성하여<br/>
                        하루 뱃지를 GET 해보세요!
                        </p>
                    </Text>
                    <img src={popup} alt="popup"/>
                </Container>
            </Dialog>
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