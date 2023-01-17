import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ArbitrageIcon from "../../assets/images/arbitrage.svg"
import ArbitrageCryptoIcon from "../../assets/images/crypto-arbitrage.svg"
import Icon1 from "../../assets/images/benefit1.svg"
import Icon2 from "../../assets/images/benefit2.svg"
import Icon3 from "../../assets/images/benefit3.svg"
import Icon4 from "../../assets/images/benefit4.svg"
import "./arbitrage.css"
import { Link } from "react-router-dom";

function Arbitrage() {
    return (
        <div className="arbitrage">
            <Container>
                <Row className="align-items-center what-is-arbitrage" >
                    <Col xl={6} className="index mb-4 mb-xl-0" xs={{ order: 1 }}>
                        <h2>WHAT IS ARBITRAGE?</h2>
                        <p>Proin vulputate congue metus, eget vestibulum dolor porta ac. In pretium sem quis libero efficitur, nec aliquam lorem convallis. Vivamus rutrum, ligula eget tempus dignissim, metus nibh fringilla quam, nec fermentum velit lectus vitae enim. Quisque metus neque, dapibus interdum nisi ac.</p>
                        <div className="button-div">
                        <Link to={'/sign-up'} className="btn-triage-div btn-triage"><span>Get Started</span></Link>
                        </div>

                    </Col>
                    <Col xl={{ span: 6, order: 2 }} className="index d-flex justify-content-end">
                        <img className="img-fluid" src={ArbitrageIcon} alt="" />
                    </Col>
                </Row>
                <Row className="what-is-crypto-arbitrage align-items-center">
                    <Col xl={6}>
                        <img className="img-fluid" src={ArbitrageCryptoIcon} alt="" />
                    </Col>
                    <Col xl={6}>
                        <h2>WHAT IS CRYPTO ARBITRAGE?</h2>
                        <p className="mb-3">In the volatile cryptocurrency exchanges, every second counts. Our highly responsive tech can react instantly, executing a huge volume of transactions simultaneously.</p>
                        <p>Duis mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna sit amet, luctus aliquet nibh. Curabitur auctor leo et libero consectetur gravida.</p>
                        <div>
                            {/* <a className="btn-triage-div btn-triage"><span>Create an account</span></a> */}
                            <Link to={'/sign-up'} className="btn-triage-div btn-triage"><span>Create an account</span></Link>
                        </div>
                    </Col>
                </Row>
                <div className="why-become-triage">
                    <div className="d-flex justify-content-center">
                        <div className="text-center">
                            <h2>WHY BECOME A TRIAGE?</h2>
                            <p className="mb-70">Etiam venenatis libero in tortor efficitur, interdum rutrum risus rhoncus. Sed posuere venenatis dapibus. Sed vitae mi placerat, malesuada orci sed, lobortis massa. Nullam commodo fringilla velit ut commodo. Aenean dictum cursus enim, vel ullamcorper purus interdum vitae.</p>
                        </div>
                    </div>
                    <Row className="mb-70">
                        <Col xl={6}>
                            <div className="box">
                                <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
                                    <div className="me-4 mb-3 mb-sm-0">
                                        <img src={Icon1} alt="" />
                                    </div>
                                    <div>
                                        <strong>Unmatched profit potential</strong>
                                        <p>Enjoy the opportunity to earn unparalleled passive profits and industry-leading interest rates on your fiat and crypto capital</p>
                                    </div>
                                </div>

                            </div>
                        </Col>
                        <Col xl={6}>
                            <div className="box">
                                <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
                                    <div className="me-4 mb-3 mb-sm-0">
                                        <img src={Icon2} alt="" />
                                    </div>
                                    <div>
                                        <strong>State-of-the-art technology</strong>
                                        <p>Benefit from the cryptocurrency markets in real time, with advanced tech capable of processing a mass of data at lightning speed</p>
                                    </div>
                                </div>

                            </div>
                        </Col>
                        <Col xl={6}>
                            <div className="box">
                                <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
                                    <div className="me-4 mb-3 mb-sm-0">
                                        <img src={Icon3} alt="" />
                                    </div>
                                    <div>
                                        <strong>EU licensed and regulated</strong>
                                        <p>Invest with peace of mind, with an exceptionally secure, licensed platform, compliant with the strictest regulatory standards</p>
                                    </div>
                                </div>

                            </div>
                        </Col>
                        <Col xl={6}>
                            <div className="box">
                                <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
                                    <div className="me-4 mb-3 mb-sm-0">
                                        <img src={Icon4} alt="" />
                                    </div>
                                    <div>
                                        <strong>Access via any device</strong>
                                        <p>Manage your portfolio from home or on the go, accessing your ArbiSmart account, at any time, via your computer, tablet or mobile</p>
                                    </div>
                                </div>

                            </div>
                        </Col>
                    </Row>
                      <div className="d-flex justify-content-center align-items-center">
                      <Link to={'/sign-up'} className="btn-triage-div btn-triage"><span>Get Started</span></Link>
                      </div>
                </div>
            </Container>

        </div>
    )
}
export default Arbitrage