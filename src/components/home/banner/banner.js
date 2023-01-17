import React from "react";
import Design from "../../../assets/images/banner-design.png"
import Path from "../../../assets/images/top-path.svg"
import GIF from "../../../assets/images/test.gif"
import Bottom from "../../../assets/images/banner-bottom.svg"
import Rating from "../../../assets/images/rate.png"
import Regulate from "../../../assets/images/regulated.png"
import Fifty from "../../../assets/images/50.svg"
import { Col, Container, Row } from "react-bootstrap"
import './banner.css'
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import banner from "../../../lotties/banner.json"



const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: banner,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};
function Banner() {

    return (
        <div class="wrapper">
            <div className="banner-div">
                <div className="banner">
                    <div className="design">
                        <img className="img-fluid" src={Design} alt="" />
                    </div>

                    {/* <div className="gif-path">
                    <img className="img-fluid" src={GIF} alt="" />
                </div> */}
                    <Container>
                        <Row className=" banner-details">
                            <Col xl={6} xs={{ order: 1 }} className="index">
                                <div >
                                    <div className="heading p-0">
                                        <span>A secure, EU authorized,<br /> interest-generating wallet and exchange</span>
                                        <h1>TAKE CONTROL OF YOUR CYBER FINANCES SOLUTIONS</h1>
                                        <Link to={'/sign-up'} className="btn-triage-div btn-triage"><span className="m-0 w-100">Open an Account</span></Link>
                                    </div>
                                </div>

                            </Col>
                            <Col xl={{ span: 6, order: 2 }} className="index">

                                <Lottie
                                    options={defaultOptions}
                                    height={'auto'}
                                    width={'100%'}
                                    className=" index img-fluid"
                                />
                            </Col>
                        </Row>


                    </Container>
                </div>
                <div className="banner-bottom">
                    <Container>
                        <Row>
                            <Col xl={12} className="index">
                                <ul className="d-flex m-0 pl-4 list-unstyled align-items-baseline flex-wrap" >
                                    <li >
                                        <div className="mb-4"><img src={Rating} alt="" /></div>
                                        <span className=" text-white with-us">A big love with us</span>
                                    </li>

                                    <li>
                                        <div className="mb-2">
                                            <img src={Regulate} alt="" />
                                        </div>
                                        <span className=" text-white">Official European Union license</span>
                                    </li>
                                    <li>
                                        <div className="mb-2">

                                            <img className="img-fluid" src={Fifty} alt="" />
                                        </div>
                                        <span className=" text-white">over 50 exchanges automatically</span>
                                    </li>
                                </ul>
                            </Col>
                        </Row>

                    </Container>

                </div>
            </div>
        </div>

    )
}
export default Banner