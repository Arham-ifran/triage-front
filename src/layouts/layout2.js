import React, { useState, useEffect } from "react";
import LowerFooter from "../components/shared/footer/lowerFooter";
import Sidebar from "../components/sidebar/sidebar";
import { faBars, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../components/shared/navbar/navbar";
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const Layout2 = (props) => {

    const navigate = useNavigate()

    const [isActive, setActive] = useState(false);
    const toggleClass = () => {
        setActive(!isActive);
    };

    useEffect(() => {
        let token = localStorage.getItem("accessToken")
        if (!token) {
            navigate("/sign-in")
            return;
        }
    }, [])

    return (
        <>
            {/* <div className="d-flex justify-content-center align-items-center"> */}
            {/* {
                    props?.user?.walletError !== "" ?
                        <div className="warning-section">
                            <div className="warning-text">
                                <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
                                {props?.user?.walletError}
                            </div>
                        </div>
                        : ''
                } */}
            {/* </div> */}
            {/* <div> */}
            {/* <Navbar /> */}
            <div className="wrapper scroll-fixed position-relative">
                <div className={isActive ? 'show complete-content' : 'complete-content'}>
                    <Sidebar />
                    <div className="right-content position-relative">
                        <FontAwesomeIcon className="menu-icon" onClick={toggleClass} icon={faBars} />

                        <div className="pt-4 p-3 d-flex justify-content-end pt-75 flex-wrap align-items-baseline top-head">
                            <Container>
                                <Navbar />
                            </Container>
                        </div>

                        {props.children}
                        <LowerFooter />
                    </div>
                </div>
            </div>
            {/* <LowerFooter /> */}
            {/* </div> */}

        </>
    );
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, {})(Layout2);
