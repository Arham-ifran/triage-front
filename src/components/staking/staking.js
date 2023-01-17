import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Design from "../../assets/images/banner-design.png"
import StakingIcon from "../../assets/images/stak.svg"
import BenefitIcon from "../../assets/images/benefit-sec.svg"
import Path from "../../assets/images/top-path.svg"
import Bottom from "../../assets/images/banner-bottom.svg"
import System from "../../assets/images/screen.png"
import GrowCrypto from "../../assets/images/grow-crypto.svg"
import "./staking.css"
import { Link } from "react-router-dom";

function Staking() {
    return (
        <div className="staking">
            {/* <div className="path">
                <img src={Path} alt="" />
            </div>
            <div className="bottom-end">
                <img src={Bottom} alt="" />
            </div> */}
            <div className="design position-absolute">
                <img className="img-fluid" src={Design} alt="" />
            </div>
            <div className="unparallel" >
                <Container>
                    <Row className="align-items-center">
                        <Col xl={6} xs={{ order: 1 }} className="index" >
                            <h2>UNPARALLELED APY</h2>
                            <p>Proin vulputate congue metus, eget vestibulum dolor porta ac. In pretium sem quis libero efficitur, nec aliquam lorem convallis. Vivamus rutrum, ligula eget tempus dignissim, metus nibh fringilla quam, nec fermentum velit lectus vitae enim. Quisque metus neque, dapibus interdum nisi ac.</p>
                            {/* <a className="btn-triage-div btn-triage"><span>Join now</span></a> */}
                            <Link to={'/sign-up'} className="btn-triage-div btn-triage"><span>Join now</span></Link>
                        </Col>
                        <Col className="d-flex justify-content-end mb-3 mb-lg-0 index" xl={{ span: 6, order: 2 }} >
                            <div>
                                <img className="img-fluid" src={StakingIcon} alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="unparallel">
                <Container>
                    <Row className="align-items-center">
                        <Col xl={5} xs={{ order: 2 }}>
                            <h2>GROW YOUR CRYPTO CAPITAL</h2>
                            <p className="mb-3">Earn sky-high rewards simply for HODLing your funds, with Triage's decentralized yield farming program. Stake with ease, contributing to WBTC/RBIS, ETH/RBIS and USDT/RBIS liquidity pools for generous passive profits that are available for withdrawal at any time.</p>
                            <p>Duis mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna sit ame.</p>
                            <Link to={'/sign-up'} className="btn-triage-div btn-triage"><span>Get Started</span></Link>
                        </Col>
                        <Col className="d-flex mb-3 mb-lg-0" xl={{ span: 7, order: 1 }}>
                            <div>
                                <img className="img-fluid" src={GrowCrypto} alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="unparallel benefits">
                <Container>
                    <Row className="align-items-center">
                        <Col xl={6} xs={{ order: 1 }}>
                            <h2>TRIAGE STAKING BENEFITS</h2>
                            <p>Aenean sed lorem est. Sed quis neque ut nibh suscipit imperdiet ac non augue. Aenean ornare sit amet lectus non tristique. Nunc ut volutpat lectus. Nulla velit augue, pulvinar sed nisi sit amet, eleifend fermentum esaugue, pulvinnar seased nir sedt.</p>
                            <ul className="list-unstyled m-4">
                                <li>Exchange Advantages</li>
                                <li>An intuitive, easy-to-navigate UI</li>
                                <li>Instant, real-time trade execution</li>
                            </ul>
                            {/* <a className="btn-triage-div btn-triage"><span>Join now</span></a> */}
                            <Link to={'/sign-up'} className="btn-triage-div btn-triage"><span>Join now</span></Link>
                        </Col>
                        <Col className="d-flex justify-content-end mb-3 mb-lg-0" xl={{ span: 6, order: 2 }}>
                            <div>
                                <img className="img-fluid" src={BenefitIcon} alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="unparallel">
                <Container>
                    <Row className="align-items-center">
                        <Col xl={7} className="mb-3 mb-lg-0" >
                            <div>
                                <img className="img-fluid" src={System} alt="" />
                            </div>
                        </Col>
                        <Col xl={5}>
                            <h2>OPTIMIZED PROFIT POTENTIAL</h2>
                            <p>Proin vulputate congue metus, eget vestibulum dolor porta ac. In pretium sem quis libero efficitur, nec aliquam lorem convallis. Vivamus rutrum, ligula eget tempus dignissim, metus nibh fringilla quam, nec fermentum velit lectus vitae enim. Quisque metus neque, dapibus interdum nisi ac.</p>
                            <Link to={'/sign-up'} className="btn-triage-div btn-triage"><span>Open an account</span></Link>
                        </Col>

                    </Row>
                </Container>
            </div>
        </div>
    )
}
export default Staking