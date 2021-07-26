import React from "react";
import styled from 'styled-components';

const Header = (props) => {
    return (
        <React.Fragment>
            <HederBox>Header</HederBox>;
        </React.Fragment>
    ) 
};

export default Header;

const HederBox = styled.div`
    height: 4em;
    width : 100%;
    top : 0;
    position : fixed;
    background-color : #c4c4c4;
`;