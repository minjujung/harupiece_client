import React, {useEffect} from "react";
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { MainCreators } from '../redux/modules/main';

const MainSlider = (props) => {
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <Contain>
                <div>
                    sadf
                </div> 
                <div>
                    safd
                </div>
                <div>
                    asdf
                </div>
            </Contain>
        </React.Fragment>
    ) 
};

export default MainSlider;

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