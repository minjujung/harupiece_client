import React from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';

const Main = (props) => {
    return(
        <React.Fragment>
            <Header/>
                <h1>Main</h1>
            <Footer/>
        </React.Fragment>
        )
};

export default Main;