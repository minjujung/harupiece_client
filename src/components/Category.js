import React from "react";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getCookie } from "../shared/Cookie";

const Category = (props) => {
    
    const main_list = useSelector((state) => state.main)

    return (
        <React.Fragment>
            <PContain>EXERCISE<span>전체보기</span></PContain>
            <Contain>
                {getCookie("token") ? (main_list.usermain.exercise?.map((l,idx)=>
                <div>
                    배경이미지 : {l.challengeImgUrl}
                    챌린지 이름 : {l.challengeTitle}
                    참여 인원 : {l.challengeMember.length}
                    시작 날짜 : {l.challengeStartDate}
                    끝 날짜 : {l.challengeEndDate}
                </div> 
                )) : (main_list.guestmain.exercise?.map((l,idx)=> 
                <div>
                    배경이미지 : {l.challengeImgUrl}
                    챌린지 이름 : {l.challengeTitle}
                    참여 인원 : {l.challengeMember.length}
                    시작 날짜 : {l.challengeStartDate}
                    끝 날짜 : {l.challengeEndDate}
                </div>
                ))  }
                
            </Contain>
            <PContain>STUDY<span>전체보기</span></PContain>
            <Contain>
                {getCookie("token") ? (main_list.usermain.study?.map((l,idx)=>
                <div>
                    배경이미지 : {l.challengeImgUrl}
                    챌린지 이름 : {l.challengeTitle}
                    참여 인원 : {l.challengeMember.length}
                    시작 날짜 : {l.challengeStartDate}
                    끝 날짜 : {l.challengeEndDate}
                </div> 
                )) : (main_list.guestmain.study?.map((l,idx)=> 
                <div>
                    배경이미지 : {l.challengeImgUrl}
                    챌린지 이름 : {l.challengeTitle}
                    참여 인원 : {l.challengeMember.length}
                    시작 날짜 : {l.challengeStartDate}
                    끝 날짜 : {l.challengeEndDate}
                </div>
                ))  }
                
            </Contain>
            <PContain>LIVINGHABITS<span>전체보기</span></PContain>
            <Contain>
                {getCookie("token") ? (main_list.usermain.livingHabits?.map((l,idx)=>
                <div>
                    배경이미지 : {l.challengeImgUrl}
                    챌린지 이름 : {l.challengeTitle}
                    참여 인원 : {l.challengeMember.length}
                    시작 날짜 : {l.challengeStartDate}
                    끝 날짜 : {l.challengeEndDate}
                </div> 
                )) : (main_list.guestmain.livingHabits?.map((l,idx)=> 
                <div>
                    배경이미지 : {l.challengeImgUrl}
                    챌린지 이름 : {l.challengeTitle}
                    참여 인원 : {l.challengeMember.length}
                    시작 날짜 : {l.challengeStartDate}
                    끝 날짜 : {l.challengeEndDate}
                </div>
                ))  }
                
            </Contain>
            <PContain>MONEY<span>전체보기</span></PContain>
            <Contain>
                {getCookie("token") ? (main_list.usermain.money?.map((l,idx)=>
                <div>
                    배경이미지 : {l.challengeImgUrl}
                    챌린지 이름 : {l.challengeTitle}
                    참여 인원 : {l.challengeMember.length}
                    시작 날짜 : {l.challengeStartDate}
                    끝 날짜 : {l.challengeEndDate}
                </div> 
                )) : (main_list.guestmain.money?.map((l,idx)=> 
                <div>
                    배경이미지 : {l.challengeImgUrl}
                    챌린지 이름 : {l.challengeTitle}
                    참여 인원 : {l.challengeMember.length}
                    시작 날짜 : {l.challengeStartDate}
                    끝 날짜 : {l.challengeEndDate}
                </div>
                ))  }
                
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
        margin : 0px;
    & > span {
        vertical-align: middle;
        padding-right : 1em;
    }
`;