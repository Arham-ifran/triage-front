import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Poster from "../../assets/images/Capure.png"
import Lottie from "react-lottie";
import animationData from "../../lotties/partner.json"
import animationData2 from "../../lotties/static.json"
import ReferralIcon from "../../assets/images/referral-svgrepo-com.svg"
import BountyIcon from "../../assets/images/money-bag-svgrepo-com.svg"
import "./about.css"
import ExploreWorld from "../../assets/images/explore-world.svg"
import Vision from "../../assets/images/vision.svg"
import ExpertiseIcon from "../../assets/images/expertise.svg"
import Icon1 from "../../assets/images/benefit1.svg"
import Icon2 from "../../assets/images/benefit2.svg"
import Icon3 from "../../assets/images/benefit3.svg"
import Icon4 from "../../assets/images/benefit4.svg"
import Screen from "../../assets/images/screen.png"
import { Player } from "video-react";
import { Link } from "react-router-dom";
function About() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const defaultOptions2 = {
        loop: true,
        autoplay: true,
        animationData: animationData2,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <div className="about-company smart-levels">

            <Container>
                <Row className="crypto-choices align-items-center ">
                    <Col className="mb-4 mb-xl-0 index" xl={6} xs={{ order: 1 }}>
                        <h2>A WORLD OF CRYPTO CHOICES</h2>
                        <p>Proin vulputate congue metus, eget vestibulum dolor porta ac. In pretium sem quis libero efficitur, nec aliquam lorem convallis. Vivamus rutrum, ligula eget tempus dignissim, metus nibh fringilla quam, nec fermentum velit lectus vitae enim. Quisque metus neque, dapibus interdum nisi ac.</p>
                        <Link to={'/sign-up'} className="btn-triage-div btn-triage"><span>Get Started</span></Link>
                    </Col>

                    <Col className="index d-flex justify-content-end" xl={{ span: 6, order: 2 }}>
                        <Player
                            className="img-fluid pt-0"
                            playsInline
                            poster={Poster}
                            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                        />



                        {/* <img className="img-fluid" src={Poster} alt="" /> */}
                    </Col>
                </Row>
                <Row className="align-items-center mb-230 triage-advantage">
                    <Col xl={7} className="index">
                        <Lottie
                            options={defaultOptions2}
                            // height={596}
                            // width={665}
                            className="img-fluid"
                        />
                    </Col>
                    <Col xl={5} className="index">
                        <h2>THE TRIAGE ADVANTAGE</h2>
                        <p className="mb-3">In the volatile cryptocurrency exchanges, every second counts. Our highly responsive tech can react instantly, executing a huge volume of transactions simultaneously.</p>
                        <p>Duis mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna sit amet, luctus aliquet nibh. Curabitur auctor leo et libero consectetur gravida.</p>
                        {/* <a className="btn-triage-div btn-triage"><span>Join now</span></a> */}
                        <Link to={'/sign-up'} className="btn-triage-div btn-triage"><span>Join now</span></Link>
                    </Col>
                </Row>
                <div className="why-become-triage mb-230 triage-advantage">
                    <div className="d-flex justify-content-center">
                        <div className="text-center">
                            <h2>WHY BECOME A TRIAGE?</h2>
                            <p className="mb-100 d-flex justify-content-center">Etiam venenatis libero in tortor efficitur, interdum rutrum risus rhoncus. Sed posuere venenatis dapibus. Sed vitae mi placerat, malesuada orci sed, lobortis massa. Nullam commodo fringilla velit ut commodo. Aenean dictum cursus enim, vel ullamcorper purus interdum vitae.</p>
                        </div>
                    </div>
                    <Row className="mb-100">
                        <Col xl={6}>
                            <div className="box">
                                <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
                                    <div className="box-img">
                                        <img src={Icon1} alt="" />
                                    </div>
                                    <div className="box-content">
                                        <strong>Unmatched profit potential</strong>
                                        <p>Enjoy the opportunity to earn unparalleled passive profits and industry-leading interest rates on your fiat and crypto capital</p>
                                    </div>
                                </div>

                            </div>
                        </Col>
                        <Col xl={6}>
                            <div className="box">
                                <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
                                    <div className="box-img">
                                        <img src={Icon2} alt="" />
                                    </div>
                                    <div className="box-content">
                                        <strong>State-of-the-art technology</strong>
                                        <p>Benefit from the cryptocurrency markets in real time, with advanced tech capable of processing a mass of data at lightning speed</p>
                                    </div>
                                </div>

                            </div>
                        </Col>
                        <Col xl={6}>
                            <div className="box">
                                <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
                                    <div className="box-img">
                                        <img src={Icon3} alt="" />
                                    </div>
                                    <div className="box-content">
                                        <strong>EU licensed and regulated</strong>
                                        <p>Invest with peace of mind, with an exceptionally secure, licensed platform, compliant with the strictest regulatory standards</p>
                                    </div>
                                </div>

                            </div>
                        </Col>
                        <Col xl={6}>
                            <div className="box">
                                <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
                                    <div className="box-img">
                                        <img src={Icon4} alt="" />
                                    </div>
                                    <div className="box-content">
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
                <Row className="align-items-center mb-230 triage-advantage ">
                    <Col className="mb-4 mb-lg-0  " xl={6} xs={{ order: 1 }}>
                        <div className="crypto-market position-relative">
                            <h2>OUR VISION</h2>
                            <p className="mb-3">Unlock emerging opportunities rapidly and reliably, trading securely on Triage market-leading, licensed, and regulated exchange.</p>
                            <p className="mb-3">Duis mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna sit amet, luctus aliquet nibh. Curabitur auctor leo et libero consectetur gravida.</p>
                            <p>Mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna sit amet, luctus aliquet nibh. Curabitur auctor leo et libero consectetur gravida.</p>
                        </div>
                    </Col>

                    <Col xl={{ span: 6, order: 2 }} className="d-flex align-items-end">
                        <div>
                            <img className="img-fluid" src={Vision} alt="" />
                        </div>
                    </Col>
                </Row>
                <Row className="mb-230 align-items-center triage-advantage">
                    <Col xl={7} className="mb-4 mb-xl-0">
                        <div>
                            <img className="img-fluid" src={ExpertiseIcon} alt="" />
                        </div>
                    </Col>
                    <Col xl={5}>
                        <h2>UNMATCHED EXPERTISE</h2>
                        <p className="mb-3">In the volatile cryptocurrency exchanges, every second counts. Our highly responsive tech can react instantly, executing a huge volume of transactions simultaneously.</p>
                        <p className="mb-3">Duis mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna sit amet, luctus aliquet nibh. Curabitur auctor leo et libero consectetur gravida.</p>
                        <p>Mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna sit amet, luctus aliquet nibh. Curabitur auctor leo et libero consectetur gravida.</p>
                    </Col>
                </Row>
                <Row className="explore-world align-items-center mb-230 triage-advantage">

                    <Col className="mb-4 mb-lg-0 " xl={6} xs={{ order: 1 }}>
                        <h2>EXPLORE NEW WORLDS</h2>
                        <p className="mb-3">Stake your funds with our decentralized yield farming program and trade using our automated Triage trading system to enjoy annual percentage yields that are unmatched anywhere in the industry</p>
                        <p>Duis mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna sit amet, luctus aliquet nibh. Curabitur auctor leo et libero consectetur gravida.</p>
                        {/* <a className="btn-triage-div btn-triage"><span>Join now</span></a> */}

                        <Link to={'/sign-up'} className="btn-triage-div btn-triage"><span>Join now</span></Link>
                    </Col>

                    <Col xl={{ span: 6, order: 2 }}>
                        <div>
                            <img className="img-fluid" src={ExploreWorld} alt="" />
                        </div>
                    </Col>
                </Row>

            </Container>
            <div className="about-benefits">
                <Container>
                    <Row>
                        <Col xl={6} className="mb-4 mb-xl-0">
                            <div>
                                <img className="img-fluid" src={Screen} alt="" />
                            </div>
                        </Col>
                        <Col xl={6} >
                            <div className="benefits-details pl-40">
                                <h2>THE BENEFITS</h2>
                                <p>Aenean sed lorem est. Sed quis neque ut nibh suscipit imperdiet ac non augue. Aenean ornare sit amet lectus non tristique. Nunc ut volutpat lectus. Nulla velit augue, pulvinar sed nisi sit amet, eleifend fermentum esaugue, pulvinnar seased nir sedt.</p>
                                <p> Quisque nibh justo, congue ut erat at, aliquet efficitur purus. Integer venenatis odio vitae orci efficitur mollis.</p>
                                <ul className="list-unstyled">
                                    <li>Aenean sed lorem ested quis neque ut nibh</li>
                                    <li> Guscipit imperdiet ac non auguee enean</li>
                                    <li>Hrnare sit amet lectus non tristique.</li>
                                </ul>
                            </div>
                            <div className="pl-40">
                                {/* <a className="btn-triage-div btn-triage"><span>Apply now</span></a> */}
                                <Link to={'/sign-up'} className="btn-triage-div btn-triage"><span>Apply now</span></Link>
                            </div>
                        </Col>
                    </Row>
                </Container>

            </div>

            <Container>
                <Row className="align-items-center mb-230 triage-advantage">

                    <Col className="mb-4 mb-lg-0 " xl={6} xs={{ order: 1 }}>
                        <h2>PARTNERSHIP</h2>
                        <p>Proin vulputate congue metus, eget vestibulum dolor porta ac. In pretium sem quis libero efficitur, nec aliquam lorem convallis. Vivamus rutrum, ligula eget tempus dignissim, metus nibh fringilla quam, nec fermentum velit lectus vitae enim. Quisque metus neque, dapibus interdum nisi ac.</p>
                        {/* <a className="btn-triage-div btn-triage"><span>Become a partner</span></a> */}
                        <Link to={'/sign-up'} className="btn-triage-div btn-triage"><span>Become a partner</span></Link>
                    </Col>

                    <Col xl={{ span: 6, order: 2 }} >
                        <Lottie
                            options={defaultOptions}
                            className="img-fluid"
                        // height={555}
                        // width={832}
                        />
                    </Col>
                </Row>
                <Row className="mb-230">
                    <Col xl={6} className="mb-4 mb-xl-0">
                        <div className="box-div mb-3 mb-md-0">
                            <div className="d-flex flex-wrap flex-sm-nowrap">
                                <div className="me-4 mb-3 mb-md-0"><img src={ReferralIcon} alt="" /></div>
                                <div className="box-content">
                                    <strong>Referal</strong>
                                    <p className="mb-0">Enjoy the opportunity to earn unparalleled passive profits and industry-leading interest rates on your fiat and crypto capital</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={6}>
                        <div className="box-div mb-3 mb-md-0">
                            <div className="d-flex flex-wrap flex-sm-nowrap">
                                <div className="me-4 mb-3 mb-md-0"><img src={BountyIcon} alt="" /></div>
                                <div>
                                    <strong>Bounty</strong>
                                    <p className="mb-0">Benefit from the cryptocurrency markets in real time, with advanced tech capable of processing a mass of data at lightning speed</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>

        </div>
    )
}
export default About