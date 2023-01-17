import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab'
import Profile from "../../assets/images/profile.png"
import Table from 'react-bootstrap/Table';
import BTC_Icon from "../../assets/images/icon1.svg"
import BTC_Icon2 from "../../assets/images/icon2.svg"
import Brand1 from "../../assets/images/b1.png"
import "./liveTriage.css"
import ToggleBtn from "../../assets/images/toggle-btn.svg"
import EUR from "./EUR_tab";
import ValuesInUSD from "./ValuesInUSD";
import USDT from "./USTD_tab";
import Navbar from "../shared/navbar/navbar";


function LiveTriage(props) {

    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(!isActive);
    };

    return (
        <div className="live-triage-details wallet-details p-3">
            <Container>
                {/* <div className="d-flex justify-content-end top-head flex-wrap pt-75">
                    <Navbar />
                </div> */}
                <div>
                    <h2>Live Triage</h2>
                    <div className="card">
                        <Container >
                            <Row>
                                <Col className="pr-0 pl-0 tabs-col" sm={12}>
                                    {/* <Tab.Container id="left-tabs-example" defaultActiveKey="first"> */}
                                    <div className="d-flex justify-content-center align-items-center tabs">
                                        <div className="percent-records">

                                            {/* <h2>USD</h2> */}
                                            {/* <div className="tab-div ">
                                                    <div className="tabs-header mb-0 p-0 d-flex justify-content-between align-items-center">
                                                        <Nav variant="pills" >
                                                            <Nav.Item className="m-0">
                                                                <Nav.Link eventKey="first" href="#">
                                                                    USD
                                                                </Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="second" href="#">
                                                                    EUR                                                                    
                                                                </Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="third" href="#">
                                                                    USDT
                                                                </Nav.Link>
                                                            </Nav.Item>
                                                        </Nav>
                                                    </div>
                                                </div> */}
                                        </div>
                                    </div>
                                    <ValuesInUSD />
                                    {/* <Tab.Content>
                                            <Tab.Pane eventKey="first">
                                                <ValuesInUSD />
                                            </Tab.Pane> */}
                                    {/* <Tab.Pane eventKey="second">
                                                <EUR />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="third">
                                                <USDT />
                                    //         </Tab.Pane> */}
                                    {/* </Tab.Content>
                                    </Tab.Container> */}
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </Container>
        </div>
    )
}
export default LiveTriage