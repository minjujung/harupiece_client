import React from "react";
import styled from "styled-components";
import Grade from "../components/Grade";

const GradePage = (props) => {
    return (
        <Container>
            <PieceSection>
                <div>
                    <h1>하루 조각</h1>
                </div>
                <div>
                </div>
            </PieceSection>
            <GradeSection>
                <div>
                    <div>
                        <Grade/>
                    </div>
                    <div>
                        <Grade/>
                    </div>
                </div>
            </GradeSection>
        </Container>
    );
};

export default GradePage;

const Container = styled.div`

`;

const GradeSection = styled.div`

`;

const PieceSection = styled.div`

`;


