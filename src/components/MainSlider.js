import React, {useEffect} from "react";
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { MainCreators } from '../redux/modules/main';
import { getCookie } from "../shared/Cookie";

const MainSlider = (props) => {
    const dispatch = useDispatch();
    
    const main_list = useSelector((state) => state.main)

        return (
            <React.Fragment>
                    <Contain>
                        {getCookie("token") ? (main_list.usermain.myList?.map((l,idx)=>
                        <div>
                            <p>배경 이미지 : {l.challengeImgUrl}</p>
                            <p>카테고리 이름 : {l.categoryName}</p>
                            <p>챌린지 재목 : {l.challengeTitle}</p>
                            <p>챌린지 참여 명수 : {l.challengeMember.length}</p>
                            <p>챌린지 시작 날짜 : {l.challengeStartDate}</p>
                            <p>챌린지 마감 날짜 : {l.challengeEndDate}</p>
                        </div> 
                        )) : (main_list.guestmain.popular?.map((l,idx)=> 
                            <div>
                            {/* <p>배경 이미지 : {l.challengeImgUrl}</p> */}
                            <p>카테고리 이름 : {l.categoryName}</p>
                            <p>챌린지 재목 : {l.challengeTitle}</p>
                            <p>챌린지 참여 명수 : {l.challengeMember.length}</p>
                            <p>챌린지 시작 날짜 : {l.challengeStartDate}</p>
                            <p>챌린지 마감 날짜 : {l.challengeEndDate}</p>
                        </div> 
                        ))  }
                        
                    </Contain>
            </React.Fragment>
        ) 
};

export default MainSlider;

const Contain = styled.div`
    display: flex;
    & > div > p{
        margin : 0px;
    }

    & > div {
        background-color : #c4c4c4;
        margin-right : 1em;
        margin-bottom : 1em;
        width: 100%;
        text-align: center;
    }
    
`;