import React from "react";
import "./maximizeChanges.css"
import MaximizeChanging from "../../../assets/images/passive-changes.png"

import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom";

function MaximizeChanges() {
    return (
        <div className="maximize-changes">
            <Container>
                <Row className="align-items-center">
                    <Col className="mb-4 mb-xl-0 " xl={6} xs={{order:1}} >
                        <h2>MAXIMIZE YOUR PASSIVE CHANGES</h2>
                        <div className="para">
                            <p className="mb-3">Stake your funds with our decentralized yield farming program and trade using our automated Triage trading system to enjoy annual percentage yields that are unmatched anywhere in the industry</p>
                            <p>Duis mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna sit amet, luctus aliquet nibh. Curabitur auctor leo et libero consectetur gravida.</p>
                        </div>
                        <Link to={'/sign-up'} className="btn-triage-div btn-triage"><span>Sign Up</span></Link>
                    </Col>
                    <Col className="mb-4 mb-xl-0" xl={{span:6,order:2}}  >
                        <div className="main-img">
                            <img className="img-fluid" src={MaximizeChanging} alt="" />
                        </div>
                    </Col>
                </Row>

            </Container>

        </div>
    )
}
export default MaximizeChanges