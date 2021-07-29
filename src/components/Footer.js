import React from "react";
import styled from 'styled-components';

const Footer = (props) => {
    return (
        <React.Fragment>
            <FooterBox>Footer</FooterBox>;
        </React.Fragment>
    ) 
};


export default Footer;

const FooterBox = styled.div`
    height: 8em;
    width : 100%;
    bottom : 0;
    position : fixed;
    background-color : #c4c4c4;

`;