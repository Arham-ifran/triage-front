import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import AS_Logo from "../../../assets/images/as-logo.svg"
import "./footer.css"

function LowerFooter(){

    return(
        <>
        <div className="lower-footer">
                <div className="company-logo" ><img src={AS_Logo} alt="" /></div>
                <Container>
                    <div className="d-flex justify-content-center align-items-center">
                    {/* <span className="copyright ">©2022 Triage. All right Reserved. <a href="" className="terms">Terms. Privacy.</a></span> */}
                    <span className="copyright "><span>&#169;</span>2022 Triage. All right Reserved. <Link to="/terms-conditions" className="terms text-decoration-none"> Terms </Link>.<Link to="/terms-conditions" className="terms text-decoration-none"> Privacy </Link>.</span>
                    </div>
                </Container>
            </div>
        </>
    )
}
export default LowerFooter