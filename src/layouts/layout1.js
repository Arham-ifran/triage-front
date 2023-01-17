import React from "react";
import Header from './../components/shared/header/header';
import Footer from './../components/shared/footer/footer';
import Path from "../assets/images/top-path.svg"
import Bottom from "../assets/images/banner-bottom.svg"
import Design from "../assets/images/banner-design.png"

const Layout1 = (props) => {
    return (
        <div className="wrapper position-relative">
            <div className="position-relative">
                <div className="design position-absolute">
                    <img className="img-fluid" src={Design} alt="" />
                </div>
                <div className="path">
                    <img src={Path} alt="" />
                </div>
                <div className="bottom-end">
                    <img src={Bottom} alt="" />
                </div>
                <Header />
                {props.children}
                <Footer />
            </div>
        </div>
    );
}

export default Layout1;
