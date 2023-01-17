import React from "react";
import "./cryptoMarket.css"
import CryptoMarketing from "../../../assets/images/crypto-market.png"

import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom";

function CryptoMarket() {
    return (
        <div className="crypto-market position-relative">
            <Container>
                <Row className="align-items-center">
                    <Col className="mb-4 mb-lg-0 " xl={6} xs={{order:1}}>
                        <h2>YOUR KEY TO THE CRYPTO MARKET</h2>
                        <div className="para">
                            <p className="mb-3">Unlock emerging opportunities rapidly and reliably, trading securely on Triage market-leading, licensed, and regulated exchange.</p>
                            <p>Duis mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna sit amet, luctus aliquet nibh. Curabitur auctor leo et libero consectetur gravida.</p>
                        </div>
                        <Link to={'/sign-up'} className="btn-triage-div btn-triage"><span>Open a Wallet</span></Link>
                    </Col>
                    <Col xl={{span:6,order:2}} className="d-flex justify-content-end">
                        <div  className="text-right main-img">
                            <img className="img-fluid" src={CryptoMarketing} alt="" />
                        </div>
                    </Col>
                </Row>

            </Container>

        </div>
    )
}
export default CryptoMarket