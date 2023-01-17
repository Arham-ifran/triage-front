import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import SpeedIcon from "../../assets/images/speed.svg"
import TradeIcon from "../../assets/images/trade.svg"
import Screen from "../../assets/images/screen.png"
import Bitcoin from "../../assets/images/Icon metro-bitcoin.svg"
import Bitcoin2 from "../../assets/images/eth-svgrepo-com.svg"
import Bitcoin3 from "../../assets/images/dollar.svg"
import "./exchangeTriage.css"
import { Link } from "react-router-dom";


function ExchangeTriage() {
    return (
        <div className="exchange-triage">
            <Container>
                <Row className="speed-simplicity align-items-center">

                    <Col className="mb-4 mb-lg-0 index " xl={6} xs={{ order: 1 }}>
                        <h2>SPEED AND SIMPLICITY</h2>
                        <p>Proin vulputate congue metus, eget vestibulum dolor porta ac. In pretium sem quis libero efficitur, nec aliquam lorem convallis. Vivamus rutrum, ligula eget tempus dignissim, metus nibh fringilla quam, nec fermentum velit lectus vitae enim. Quisque metus neque, dapibus interdum nisi ac.</p>
                        {/* <a className="btn-triage-div btn-triage"><span>Trade Now</span></a> */}
                        <Link to={'/exchange'} className="btn-triage-div btn-triage"><span>Trade Now</span></Link>
                    </Col>

                    <Col xl={{ span: 6, order: 2 }} className="index d-flex justify-content-end mb-4 mb-xl-0">
                        <div>
                            <img className="img-fluid" src={SpeedIcon} alt="" />
                        </div>
                    </Col>
                </Row>
                <Row className="trade-with-peace">
                    <Col xl={7} className="mb-4 mb-xl-0 index">
                        <div>
                            <img className="img-fluid" src={TradeIcon} alt="" />
                        </div>
                    </Col>
                    <Col xl={5} className="index">
                        <h2>TRADE WITH PEACE OF MIND</h2>
                        <p className="mb-3">In the volatile cryptocurrency exchanges, every second counts. Our highly responsive tech can react instantly, executing a huge volume of transactions simultaneously.</p>
                        <p>Duis mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna sit amet, luctus aliquet nibh. Curabitur auctor leo et libero consectetur gravida.</p>
                        <Link to={'/sign-up'} className="btn-triage-div btn-triage"><span>Join us</span></Link>
                    </Col>
                </Row>
                <Row className="exchange-advantages">
                    <Col className="mb-4 mb-lg-0 " xl={6} xs={{ order: 1 }}>
                        <h2>EXCHANGE ADVANTAGES</h2>
                        <p className="mb-3">Aenean sed lorem est. Sed quis neque ut nibh suscipit imperdiet ac non augue. Aenean ornare sit amet lectus non tristique. Nunc ut volutpat lectus. Nulla velit augue, pulvinar sed nisi sit amet, eleifend fermentum esaugue, pulvinnar seased nir sedt. Quisque nibh justo, congue ut erat at, aliquet efficitur purus. Integer venenatis odio vitae orci efficitur mollis.</p>
                        <p>Aenean sed lorem est. Sed quis neque ut nibh suscipit imperdiet ac non augue. Aenean ornare sit amet lectus non tristique. Nunc ut volutpat lectus. Nulla velit augue, pulvinar sed nisi sit amet, eleifend fermentum esaugue, pulvinnar seased nir sedt. Quisque nibh justo, congue ut erat at, aliquet efficitur purus. Integer venenatis odio vitae orci efficitur mollis.</p>
                        <div className="earn p-0">
                            <ul className="mb-4">
                                <li>Exchange Advantages </li>
                                <li> An intuitive, easy-to-navigate UI</li>
                                <li>Instant, real-time trade execution</li>
                            </ul>
                            <div>
                                <Link to={'/sign-up'} className="btn-triage-div btn-triage" ><span>Open an account</span></Link>
                            </div>
                        </div>

                    </Col>

                    <Col className="mb-4 mb-xl-0" xl={{ span: 6, order: 2 }}>
                        <div>
                            <img className="img-fluid" src={Screen} alt="" />
                        </div>
                    </Col>
                </Row>
                <div className="expectional-rates">
                    <div className="d-flex justify-content-center">
                        <div className="text-center">
                            <h2>EXCEPTIONAL RATES</h2>
                            <p>Etiam venenatis libero in tortor efficitur, interdum rutrum risus rhoncus. Sed posuere venenatis dapibus. Sed vitae mi placerat, malesuada orci sed, lobortis massa. Nullam commodo fringilla velit ut commodo. Aenean dictum cursus enim, vel ullamcorper purus interdum vitae.</p>
                        </div>
                    </div>
                    <div className="history">
                        <div className="table-responsive">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th className="text-center">Name</th>
                                        <th>Category</th>
                                        <th>Market Cap</th>
                                        <th>Price</th>
                                        <th>Change</th>
                                        <th>Yield rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="d-flex align-items-center table-content">
                                                <div className="circle me-2">
                                                    <img src={Bitcoin} alt="" />
                                                </div>
                                                <strong>Bitcoin BTC</strong>
                                            </div>
                                        </td>
                                        <td><div className="d-flex justify-content-center align-items-center table-content">Crypto</div></td>
                                        <td ><div className="d-flex justify-content-center align-items-center table-content"> € 454,615,004,956.56</div></td>
                                        <td><div className="d-flex justify-content-center align-items-center table-content"> € 23,776.4c</div></td>
                                        <td><div className="d-flex justify-content-center align-items-center table-content change"> -0.12%</div></td>
                                        <td><div className="d-flex justify-content-center align-items-center table-content">2.74%</div></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="d-flex align-items-center table-content">
                                                <div className="circle me-2">
                                                    <img src={Bitcoin2} alt="" />
                                                </div>
                                                <strong>Ethereum ETH</strong>
                                            </div>
                                        </td>
                                        <td><div className="d-flex justify-content-center align-items-center table-content">Crypto</div></td>
                                        <td ><div className="d-flex justify-content-center align-items-center table-content"> € 228,127,976,242.947</div></td>
                                        <td><div className="d-flex justify-content-center align-items-center table-content"> € 23,776.4c</div></td>
                                        <td><div className="d-flex justify-content-center align-items-center table-content change">-0.03%</div></td>
                                        <td><div className="d-flex justify-content-center align-items-center table-content">2.74%</div></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="d-flex  align-items-center table-content">
                                                <div className="circle me-2">
                                                    <img src={Bitcoin3} alt="" />
                                                </div>
                                                <strong>USD Coin USDC</strong>
                                            </div>
                                        </td>
                                        <td><div className="d-flex justify-content-center align-items-center table-content">Crypto</div></td>
                                        <td ><div className="d-flex justify-content-center align-items-center table-content"> ____</div></td>
                                        <td><div className="d-flex justify-content-center align-items-center table-content"> ____</div></td>
                                        <td><div className="d-flex justify-content-center align-items-center table-content"> Crypto</div></td>
                                        <td><div className="d-flex justify-content-center align-items-center table-content">2.74%</div></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="text-center">
                        <Link to={'/sign-up'} className="btn-triage-div btn-triage"><span>Join now</span></Link>
                            {/* <a className="btn-triage-div btn-triage">
                                <span>Join now</span>
                            </a> */}

                        </div>
                    </div>
                </div>
            </Container>


        </div>
    )
}
export default ExchangeTriage