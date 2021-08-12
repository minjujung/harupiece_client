import React, { useState } from "react";
import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";

import { useDispatch, useSelector } from "react-redux";
import { userCreators } from "../../redux/modules/user";

const WelcomeModal = () => {
    const dispatch = useDispatch();

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
            <Dialog>
                
            </Dialog>
        </>
    )
};

export default WelcomeModal;