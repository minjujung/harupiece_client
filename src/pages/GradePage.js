import React from "react";
import styled from "styled-components";

import pieces from "../assets/images/grade/pc/lv_info_pieces.png";
import gray from "../assets/images/grade/pc/Lv_gray.png";
import yellow from "../assets/images/grade/pc/Lv_yellow.png";
import orange from "../assets/images/grade/pc/Lv_orange.png";
import red from "../assets/images/grade/pc/Lv_red.png";
import pink from "../assets/images/grade/pc/Lv_pink.png";
import darkgray from "../assets/images/grade/pc/Lv_darkgray.png";
import purple from "../assets/images/grade/pc/Lv_purple.png";
import navy from "../assets/images/grade/pc/Lv_navy.png";
import blue from "../assets/images/grade/pc/Lv_blue.png";
import green from "../assets/images/grade/pc/Lv_green.png";

import { Image } from "../elements";

const GradePage = (props) => {
    return (
        <Container>
            <PieceSection>
                <TextSection>
                    <Head>
                        <p>하루 조각<span>챌린지에 참여해서 조각을 모아보세요.</span></p>
                    </Head>
                    <Body>
                        <p>
                            챌린지에 <span>인증샷</span>을 올리면 1조각,
                            <br />
                            챌린지를 <span>완료</span>하면 인증기간 X 50조각,
                            <br />
                            <span>공식 챌린지</span>를 완료하면 인증기간 X 100조각을 모을 수 있어요.
                        </p>
                    </Body>
                    <Tail>
                        <p>
                            * 인증샷을 올리고 다른 참가자의 50%가 인증해야 1조각을 모을 수 있습니다.
                            <br />
                            * 10일동안 진행하는 일반챌린지를 인증샷을 올려서 완료하면 총 510조각을 모을 수 있어요.
                        </p>
                    </Tail>
                </TextSection>
                <ImageSection>
                    <img src={pieces} alt="pieces"/>
                </ImageSection>
            </PieceSection>
            <GradeSection>
                <TextSection>
                    <Head>
                        <p>구슬 등급<span>모은 조각의 갯수에 따라 구슬등급이 달라져요.</span></p>
                    </Head>
                    <Body>
                        <p>
                        조각 100개를 모으면 YELLOW 등급이,
                        <br />
                        조각 200개를 모으면 ORANGE 등급이 될 수 있어요.
                        </p>
                    </Body>
                </TextSection>
                <BeadSection>
                    <BeadDetailLeft>
                        <img src={gray} alt="gray"/>
                        <img src={yellow} alt="yellow"/>
                        <img src={orange} alt="orange"/>
                        <img src={red} alt="red"/>
                        <img src={pink} alt="pink"/>
                    </BeadDetailLeft>
                    <BeadDetailRight>
                        <img src={darkgray} alt="darkgray"/>
                        <img src={purple} alt="purple"/>
                        <img src={navy} alt="navy"/>
                        <img src={blue} alt="blue"/>
                        <img src={green} alt="green"/>
                    </BeadDetailRight>
                </BeadSection>
            </GradeSection>
        </Container>
    );
};

export default GradePage;

const Container = styled.div`
    width: 100%;
`;

const PieceSection = styled.div`
    width: 100%;
    display: flex;
    justify-content:space-between;
    margin : 3.02vw 0 5.73vw 0;
    padding: 0 21.61vw 0 16.67vw;
    ${({ theme }) => theme.device.mobileLg}{
        width: 100%;
        flex-direction:column;
        margin : 15vw 0 16.67vw 0;
        padding: 0 32px;
    }
`;

const TextSection = styled.div`

`;

const Head =  styled.div`
    width: 100%;
    text-align: left;
    display: flex;
    margin-bottom: 32px;
    & > p {
        font-size:36px;
        font-weight: bold;
        margin-bottom: 8px;
        & > span {
            font-size:16px;
            font-weight:normal;
            padding-left: 24px;
        }
    }
    ${({ theme }) => theme.device.mobileLg}{
        margin-bottom: 4.44vw;
        & > p{
            font-size:24px;
            margin-bottom: 0;
            & > span {
                font-size:14px;
                display: block;
                padding-left: 0;
                margin-top: 2.22vw;
            }
        }
    }
`;

const Body = styled.div`
    width: 100%;
    display: flex;
    line-height:24px;
    & > p{
        font-size:16px;
        margin-bottom: 8px;
        & > span {
            font-weight: bold;
        }
    }
    ${({ theme }) => theme.device.mobileLg}{
        & > p{
            font-size:14px;
            margin-bottom: 3.33vw;
        }
    }
`;

const Tail = styled.div`
    width: 100%;
    display: flex;
    line-height:16px;
    font-size:12px;
    color: ${({ theme }) => theme.colors.darkGray};
`;

const ImageSection = styled.div`
    margin-top: 10px;
    & > img {
        width: 25.00vw;
        height: 10.42vw;
    }
    ${({ theme }) => theme.device.mobileLg}{
        margin-top: 10.00vw;
        & > img {
            width: 78.06vw;
            height: 38.89vw;
        }
    }
`;

const GradeSection = styled.div`
    width: 100%;
    display: flex;
    justify-content:center;
    padding: 0 16.67vw;
    justify-content:space-between;
    ${({ theme }) => theme.device.mobileLg}{
        width: 100%;
        flex-direction:column;
        padding: 0 32px;
    }
`;

const BeadSection = styled.div`
    display: flex;
    margin-top: 36px;
    ${({ theme }) => theme.device.mobileLg}{
        flex-direction:column;
    }
`;

const BeadDetailLeft = styled.div`
    display: flex;
    flex-direction:column;
    & > img {
        width: 14.74vw;
        height: 4.17vw;
    }
    ${({ theme }) => theme.device.mobileLg}{
        & > img {
            width: 76.94vw;
            height: 22.22vw;
            margin-bottom: 4.17vw;
        }
    }
`;

const BeadDetailRight = styled.div`
    display: flex;
    flex-direction:column;
    margin-left: 1.04vw;
    & > img {
        width: 14.74vw;
        height: 4.17vw;
    }
    ${({ theme }) => theme.device.mobileLg}{
        margin-left: 0;
        & > img {
            width: 76.94vw;
            height: 22.22vw;
            margin-bottom: 4.17vw;
        }
    }
`;

