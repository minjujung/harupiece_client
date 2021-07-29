import React from "react";
import styled from 'styled-components';

const Category = (props) => {
    return (
        <React.Fragment>
            <PContain>공부<span>전체보기</span></PContain>
            <Contain>
                <div>
                    sadf
                </div>
                <div>
                    zxcvd
                </div>
                <div>
                    asdf
                </div>
                <div>
                    asdf
                </div>
            </Contain>
        </React.Fragment>
    ) 
};

export default Category;

const Contain = styled.div`
    display: flex;

    & > div {
        background-color : #c4c4c4;
        margin-right : 1em;
        margin-bottom : 1em;
        width: 100%;
        text-align: center;
    }
    
`;
const PContain = styled.p`
        display : flex;
        justify-content : space-between;
    & > span {
        padding-right : 1em;
    }
`;