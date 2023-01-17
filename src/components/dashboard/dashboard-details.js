// import React, { useState } from "react";
// import { Col, Container, Row, Table, Dropdown, InputGroup, DropdownButton, Form, Toast } from "react-bootstrap";
// import Profile from "../../assets/images/profile.png"
// import Chart from "../../assets/images/chart.svg"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import Calendar from "../../assets/images/Icon material-date-range.svg"
// import TopIcon from "../../assets/images/card-top.svg"
// import Icon2 from "../../assets/images/cone.svg"
// import Copy from "../../assets/images/copy-text.svg"
// import Avatar from "../../assets/images/avatar.png"
// import Nav from 'react-bootstrap/Nav';
// import Tab from 'react-bootstrap/Tab'
// import DatePicker from 'react-date-picker';
// import { faCoffee, faGear, faMagnifyingGlass, faThumbTack, faArrowsRotate, faCaretDown } from '@fortawesome/free-solid-svg-icons'
// import "./dashboard.css"
// import Availabe_Profit from "./avaliableProfit";
// import Percentage from "./percentage";
// import Amount from "./amount";
// import AlertModal from "../messageAlert/messageAlert";
// import Navbar from "../shared/navbar/navbar";

// function Dashboard_Details() {
//     const [value, onChange] = useState(new Date());
//     return (
//         <div className="dashboard-details ">
//             <Container >

//                 <div>
//                     <div className="d-flex justify-content-end  flex-wrap pt-75 align-items-baseline`">
                        
//                         <Navbar />
//                     </div>
//                     <h2>Wallets BTC</h2>
//                     <div className="top-head">

//                         <AlertModal />
//                         {/* <ToastModal /> */}
//                         <span>Wallets / Details / BTC</span>
//                     </div>
//                     <Row className="all-records">
//                         <Col xxl={9} xl={8} className="mb-4 mb-xxl-0">
//                             <div className="records">
//                                 {/* <div className="d-flex justify-content-between flex-wrap"> */}
//                                 <div>
//                                     <Tab.Container id="left-tabs-example" defaultActiveKey="first">
//                                         <div className="d-flex justify-content-between flex-wrap try">
//                                             <div className="tabs-header mb-3 mb-lg-0">
//                                                 <Nav variant="pills" >
//                                                     <Nav.Item>
//                                                         <Nav.Link eventKey="first" href="#">
//                                                             Availabe profit
//                                                         </Nav.Link>
//                                                     </Nav.Item>
//                                                     <Nav.Item>
//                                                         <Nav.Link eventKey="second" href="#">
//                                                             Locked profit
//                                                         </Nav.Link>
//                                                     </Nav.Item>
//                                                     <Nav.Item>
//                                                         <Nav.Link eventKey="third" href="#">
//                                                             Balance history
//                                                         </Nav.Link>
//                                                     </Nav.Item>

//                                                 </Nav>
//                                             </div>
//                                             <div >
//                                                 <div className="d-flex  flex-wrap align-items-center ">
//                                                     <span className="calendar me-3 d-flex  flex-wrap align-items-center">

//                                                         {/* <div className="account-inputs"> */}
//                                                         <div className="about-weeks">
//                                                             <Dropdown>
//                                                                 <Dropdown.Toggle variant="success" id="dropdown-basicc">
//                                                                     <span className="me-3 text-white">One week</span>  <img src={Calendar} alt="" />
//                                                                 </Dropdown.Toggle>

//                                                                 <Dropdown.Menu>
//                                                                     <Dropdown.Item href="#/action-1">One Week</Dropdown.Item>
//                                                                     <Dropdown.Item href="#/action-2">One Month</Dropdown.Item>
//                                                                     <Dropdown.Item href="#/action-3">Three Month</Dropdown.Item>
//                                                                     <Dropdown.Item href="#/action-3">Six Month</Dropdown.Item>
//                                                                     <Dropdown.Item href="#/action-3">One Year</Dropdown.Item>
//                                                                 </Dropdown.Menu>
//                                                             </Dropdown>
//                                                         </div>
//                                                         {/* </div> */}
//                                                         {/* <img src={Calendar} alt="" /> */}

//                                                     </span>
//                                                     <Dropdown >
//                                                         <Dropdown.Toggle variant="success" id="dropdown-basics">
//                                                             <FontAwesomeIcon className="icon" icon={faGear} />
//                                                         </Dropdown.Toggle>

//                                                         <Dropdown.Menu>
//                                                             <strong  >Currency Choice</strong>
//                                                             <ul style={{ width: "371px;", marginBottom: "54px" }} >
//                                                                 <li className="d-flex justify-content-between mb-2 flex-wrap">
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="11" />

//                                                                             <label for="11">

//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="11">Hide all</span>
//                                                                     </div>
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="21" />

//                                                                             <label for="21">

//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="21">Show all</span>
//                                                                     </div>
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div></div>
//                                                                     </div>
//                                                                 </li>
//                                                             </ul>
//                                                             <ul style={{ width: "371px;" }} >
//                                                                 <li className="d-flex justify-content-between mb-2 flex-wrap">
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="1" />

//                                                                             <label for="1">

//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="1">AAVE</span>
//                                                                     </div>
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="2" />

//                                                                             <label for="2">

//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="2">APE</span>
//                                                                     </div>
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="3" />

//                                                                             <label for="3">

//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="3">AXS</span>
//                                                                     </div>
//                                                                 </li>
//                                                                 <li className="d-flex justify-content-between mb-2 flex-wrap">
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="111" />

//                                                                             <label for="111">

//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="111">BNB</span>
//                                                                     </div>
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="222" />

//                                                                             <label for="222">

//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="222">BTC</span>
//                                                                     </div>
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="333" />

//                                                                             <label for="333">

//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="333">LINK</span>
//                                                                     </div>
//                                                                 </li>
//                                                                 <li className="d-flex justify-content-between mb-2 flex-wrap">
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="41" />
//                                                                             <label for="41">
//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="41">COMP</span>
//                                                                     </div>
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="42" />
//                                                                             <label for="42">
//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="42">CRV</span>
//                                                                     </div>
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="43" />
//                                                                             <label for="43">
//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="43">MANA</span>
//                                                                     </div>
//                                                                 </li>
//                                                                 <li className="d-flex justify-content-between mb-2 flex-wrap">
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="51" />
//                                                                             <label for="51">
//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="51">USD</span>
//                                                                     </div>
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="52" />
//                                                                             <label for="52">
//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="52">ETH</span>
//                                                                     </div>
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="53" />
//                                                                             <label for="53">
//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="53">EUR</span>
//                                                                     </div>
//                                                                 </li>
//                                                                 <li className="d-flex justify-content-between mb-2 flex-wrap">
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="61" />
//                                                                             <label for="61">
//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="61">FTT</span>
//                                                                     </div>
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="62" />
//                                                                             <label for="62">
//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="62">GALA</span>
//                                                                     </div>
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="63" />
//                                                                             <label for="63">
//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="63">GBP</span>
//                                                                     </div>
//                                                                 </li>
//                                                                 <li className="d-flex justify-content-between mb-2 flex-wrap">
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="71" />
//                                                                             <label for="71">
//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="71">RBIS</span>
//                                                                     </div>
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="72" />
//                                                                             <label for="72">
//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="72">XRP</span>
//                                                                     </div>
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="73" />
//                                                                             <label for="73">
//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="73">SHIB</span>
//                                                                     </div>
//                                                                 </li>
//                                                                 <li className="d-flex justify-content-between mb-2 flex-wrap">
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="81" />
//                                                                             <label for="81">
//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="81">XLM</span>
//                                                                     </div>
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="82" />
//                                                                             <label for="82">
//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="82">USDT</span>
//                                                                     </div>
//                                                                     <div class="form-group d-flex justify-content-center">
//                                                                         <div>
//                                                                             <input type="checkbox" id="83" />
//                                                                             <label for="83">
//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="83">UNI</span>
//                                                                     </div>
//                                                                 </li>
//                                                                 <li className="d-flex justify-content-between mb-2 flex-wrap">
//                                                                     <div class="form-group d-flex justify-content-center flex-wrap">
//                                                                         <div>
//                                                                             <input type="checkbox" id="91" />
//                                                                             <label for="91">
//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="91">USDC</span>
//                                                                     </div>
//                                                                     <div class="form-group d-flex justify-content-center flex-wrap">
//                                                                         <div>
//                                                                             <input type="checkbox" id="92" />
//                                                                             <label for="92">
//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="92">WBTC</span>
//                                                                     </div>
//                                                                     <div class="form-group d-flex justify-content-center flex-wrap">
//                                                                         <div>
//                                                                             <input type="checkbox" id="93" />
//                                                                             <label for="93">
//                                                                             </label>
//                                                                         </div>
//                                                                         <span for="93">YFI</span>
//                                                                     </div>
//                                                                 </li>
//                                                             </ul>
//                                                         </Dropdown.Menu>
//                                                     </Dropdown>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="record">
//                                             <Tab.Content>
//                                                 <Tab.Pane eventKey="first">
//                                                     <Availabe_Profit />
//                                                 </Tab.Pane>
//                                                 <Tab.Pane eventKey="second">
//                                                     {/* <Password /> */}
//                                                 </Tab.Pane>
//                                                 <Tab.Pane eventKey="third">
//                                                     {/* <Email /> */}
//                                                 </Tab.Pane>

//                                             </Tab.Content>
//                                         </div>

//                                     </Tab.Container>
//                                 </div>

//                                 {/* </div> */}
//                                 {/* <Tab.Container>
                              
//                             </Tab.Container> */}

//                                 {/* <div className="main-content d-flex justify-content-center align-items-center">
//                                 <strong className="">No Record Found</strong>
//                             </div>
//                             <div className="d-flex justify-content-start">
//                                 <ul className="d-flex flex-wrap m-0 p-0">
//                                     <li className="d-flex align-items-center me-3">
//                                         <div className="orange-dot"></div>
//                                         <span className="text-white" >RBIS</span>
//                                     </li>
//                                     <li className="d-flex align-items-center me-3">
//                                         <span className="text-white" >ETH</span>
//                                     </li>
//                                     <li className="d-flex align-items-center">
//                                         <div className="purple-dot"></div>
//                                         <span className="text-white" >BTC</span>
//                                     </li>
//                                 </ul>

//                             </div> */}

//                             </div>
//                         </Col>
//                         <Col xxl={3} xl={4}>
//                             <div className="percent-records">
//                                 <Tab.Container id="left-tabs-example" defaultActiveKey="first">
//                                     <div className="tab-div d-flex justify-content-between align-items-center  flex-wrap">
//                                         <div className="tabs-header mb-0 p-0">
//                                             <Nav variant="pills" >
//                                                 <Nav.Item className="me-4">
//                                                     <Nav.Link eventKey="first" href="#">
//                                                         Percentage
//                                                     </Nav.Link>
//                                                 </Nav.Item>
//                                                 <Nav.Item>
//                                                     <Nav.Link eventKey="second" href="#">
//                                                         Amount
//                                                     </Nav.Link>
//                                                 </Nav.Item>
//                                             </Nav>
//                                         </div>
//                                     </div>
//                                     <Tab.Content>
//                                         <Tab.Pane eventKey="first">
//                                             <Percentage />
//                                         </Tab.Pane>
//                                         <Tab.Pane eventKey="second">
//                                             <Amount />
//                                         </Tab.Pane>
//                                     </Tab.Content>
//                                 </Tab.Container>
//                             </div>
//                         </Col>
//                     </Row>
//                     <h2>Exchange Rates</h2>
//                     <Row className="exchange-rates">
//                         <Col className="mb-4" xl={4} md={6}>
//                             <div className="wallet-card position-relative w-100">
//                                 <div className="card-body">
//                                     <div className="top-icon">
//                                         <img src={TopIcon} alt="" />
//                                     </div>
//                                     <div className="about flex-wrap d-flex">
//                                         <div className="me-2"><span className="pin-circle bg-white">
//                                             <img src={Icon2} alt="" />
//                                         </span></div>
//                                         <div>
//                                             <span className="d-block">BTC</span>
//                                             <span className="value d-block">Interest 07%</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                         <Col className="mb-4" xl={4} md={6}>
//                             <div className="wallet-card position-relative w-100">
//                                 <div className="card-body">
//                                     <div className="top-icon">
//                                         <img src={TopIcon} alt="" />
//                                     </div>
//                                     <div className="about flex-wrap d-flex">
//                                         <div className="me-2"><span className="pin-circle bg-white">
//                                             <img src={Icon2} alt="" />
//                                         </span></div>
//                                         <div>
//                                             <span className="d-block">BTC</span>
//                                             <span className="value d-block">Interest 07%</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                         <Col className="mb-4" xl={4} md={6}>
//                             <div className="wallet-card position-relative w-100">
//                                 <div className="card-body">
//                                     <div className="top-icon">
//                                         <img src={TopIcon} alt="" />
//                                     </div>
//                                     <div className="about flex-wrap d-flex">
//                                         <div className="me-2"><span className="pin-circle bg-white">
//                                             <img src={Icon2} alt="" />
//                                         </span></div>
//                                         <div>
//                                             <span className="d-block">BTC</span>
//                                             <span className="value d-block">Interest 07%</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                         <Col className="mb-4" xl={4} md={6}>
//                             <div className="wallet-card position-relative w-100">
//                                 <div className="card-body">
//                                     <div className="top-icon">
//                                         <img src={TopIcon} alt="" />
//                                     </div>
//                                     <div className="about flex-wrap d-flex">
//                                         <div className="me-2"><span className="pin-circle bg-white">
//                                             <img src={Icon2} alt="" />
//                                         </span></div>
//                                         <div>
//                                             <span className="d-block">BTC</span>
//                                             <span className="value d-block">Interest 07%</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                         <Col className="mb-4" xl={4} md={6}>
//                             <div className="wallet-card position-relative w-100">
//                                 <div className="card-body">
//                                     <div className="top-icon">
//                                         <img src={TopIcon} alt="" />
//                                     </div>
//                                     <div className="about flex-wrap d-flex">
//                                         <div className="me-2"><span className="pin-circle bg-white">
//                                             <img src={Icon2} alt="" />
//                                         </span></div>
//                                         <div>
//                                             <span className="d-block">BTC</span>
//                                             <span className="value d-block">Interest 07%</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                         <Col className="mb-4" xl={4} md={6}>
//                             <div className="wallet-card position-relative w-100">
//                                 <div className="card-body">
//                                     <div className="top-icon">
//                                         <img src={TopIcon} alt="" />
//                                     </div>
//                                     <div className="about flex-wrap d-flex">
//                                         <div className="me-2"><span className="pin-circle bg-white">
//                                             <img src={Icon2} alt="" />
//                                         </span></div>
//                                         <div>
//                                             <span className="d-block">BTC</span>
//                                             <span className="value d-block">Interest 07%</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                         <Col className="mb-4" xl={4} md={6}>
//                             <div className="wallet-card position-relative w-100">
//                                 <div className="card-body">
//                                     <div className="top-icon">
//                                         <img src={TopIcon} alt="" />
//                                     </div>
//                                     <div className="about flex-wrap d-flex">
//                                         <div className="me-2"><span className="pin-circle bg-white">
//                                             <img src={Icon2} alt="" />
//                                         </span></div>
//                                         <div>
//                                             <span className="d-block">BTC</span>
//                                             <span className="value d-block">Interest 07%</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                         <Col className="mb-4" xl={4} md={6}>
//                             <div className="wallet-card position-relative w-100">
//                                 <div className="card-body">
//                                     <div className="top-icon">
//                                         <img src={TopIcon} alt="" />
//                                     </div>
//                                     <div className="about flex-wrap d-flex">
//                                         <div className="me-2"><span className="pin-circle bg-white">
//                                             <img src={Icon2} alt="" />
//                                         </span></div>
//                                         <div>
//                                             <span className="d-block">BTC</span>
//                                             <span className="value d-block">Interest 07%</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                         <Col className="mb-4" xl={4} md={6}>
//                             <div className="wallet-card position-relative w-100">
//                                 <div className="card-body">
//                                     <div className="top-icon">
//                                         <img src={TopIcon} alt="" />
//                                     </div>
//                                     <div className="about flex-wrap d-flex">
//                                         <div className="me-2"><span className="pin-circle bg-white">
//                                             <img src={Icon2} alt="" />
//                                         </span></div>
//                                         <div>
//                                             <span className="d-block">BTC</span>
//                                             <span className="value d-block">Interest 07%</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>
//                     <h2>History</h2>
//                     <Row className="history-details">
//                         <Col xxl={9} xl={7} className="mb-3 mb-xxl-0">
//                             <div className="history">
//                                 <div className="table-responsive">
//                                     <Table striped bordered hover>
//                                         <thead>
//                                             <tr>
//                                                 <th>Amount Sent</th>
//                                                 <th>Date</th>
//                                                 <th>Amount credited</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             <tr>
//                                                 <td>Ligula nec</td>
//                                                 <td>20 / 06 / 2022</td>
//                                                 <td>Bignuiom trhkml</td>
//                                             </tr>
//                                             <tr>
//                                                 <td>Ligula nec</td>
//                                                 <td>20 / 06 / 2022</td>
//                                                 <td>Bignuiom trhkml</td>
//                                             </tr>
//                                             <tr>
//                                                 <td>Ligula nec</td>
//                                                 <td>20 / 06 / 2022</td>
//                                                 <td>Bignuiom trhkml</td>
//                                             </tr>
//                                             <tr>
//                                                 <td>Ligula nec</td>
//                                                 <td>20 / 06 / 2022</td>
//                                                 <td>Bignuiom trhkml</td>
//                                             </tr>
//                                             <tr>
//                                                 <td>Ligula nec</td>
//                                                 <td>20 / 06 / 2022</td>
//                                                 <td>Bignuiom trhkml</td>
//                                             </tr>

//                                         </tbody>
//                                     </Table>
//                                 </div>
//                             </div>
//                         </Col>
//                         <Col xxl={3} xl={5}>
//                             <div className="refferal">
//                                 <div className="body">
//                                     <div className="d-flex justify-content-center align-items-center mb-4">
//                                         <img className="img-fluid" alt="" src={Avatar} />
//                                     </div>
//                                     <div className="d-flex justify-content-between bonus-details flex-wrpa">
//                                         <span>Referral bonus recieved</span>
//                                         <span>0 EUR</span>
//                                     </div>
//                                     <div className="d-flex justify-content-between align-items-center flex-wrap">
//                                         <span>Your referrals</span>
//                                         <span>0 USERS</span>
//                                     </div>
//                                 </div>
//                                 <div className="overlay">
//                                     <div className="d-flex justify-content-between align-items-center flex-wrap">
//                                         <div>
//                                             <strong className="mb-2 d-block">Your referral link</strong>
//                                             <span>https://arbismart.page.link/6jed</span>
//                                         </div>
//                                         <div>
//                                             <a href="" className="d-inline-block"><img src={Copy} alt="" /></a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>
//                 </div>
//             </Container>

//         </div>
//     )
// }
// export default Dashboard_Details