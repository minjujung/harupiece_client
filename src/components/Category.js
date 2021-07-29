import React from "react";
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { MainCreators } from '../redux/modules/main';

const Category = (props) => {
    const dispatch = useDispatch();
    const guestmain = useSelector((state) => state.main.guestmain);
    console.log(guestmain.study);
    return (
        <React.Fragment>
            <PContain>카테고리 이름<span>전체보기</span></PContain>
            <Contain>
                <div>
                    asdffs
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