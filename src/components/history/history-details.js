// import React from "react";
// import { Container } from "react-bootstrap";
// import Profile from "../../assets/images/profile.png"
// import Nav from 'react-bootstrap/Nav';
// import Tab from 'react-bootstrap/Tab'
// import "./history.css"
// import DepositTab from "./depositTab";
// import WithdrawalTab from "./withdrawalTab";
// import ExchangeTab from "./exchangeTab";
// import ReferralTab from "./referralTab";
// import BonusTab from "./bonousTab";
// import SavingTab from "./savingTab";
// import Navbar from "../shared/navbar/navbar";

// function History_Details(props) {
//     return (
//         <div className="history-level-details d-flex">
//             <Container>
//                 <div className="d-flex justify-content-end top-head flex-wrap pt-75">
//                     <Navbar />
//                 </div>
//                 <div>
//                     <h2>History</h2>
//                     <div className="tabs-section">
//                         <Tab.Container id="left-tabs-example" defaultActiveKey="first">
//                             <div className="tabs-header mb-0">
//                                 <Nav variant="pills" >
//                                     <Nav.Item>
//                                         <Nav.Link eventKey="first" >
//                                             Deposits
//                                         </Nav.Link>
//                                     </Nav.Item>
//                                     <Nav.Item>
//                                         <Nav.Link eventKey="second" >
//                                             Withdrawals
//                                         </Nav.Link>
//                                     </Nav.Item>
//                                     <Nav.Item>
//                                         <Nav.Link eventKey="third" >
//                                             Exchange
//                                         </Nav.Link>
//                                     </Nav.Item>
//                                     <Nav.Item>
//                                         <Nav.Link eventKey="forth" >

//                                             Referrals
//                                         </Nav.Link>
//                                     </Nav.Item>
//                                     <Nav.Item>
//                                         <Nav.Link eventKey="fifth" >
//                                             Bonouses
//                                         </Nav.Link>
//                                     </Nav.Item>
//                                     <Nav.Item>
//                                         <Nav.Link eventKey="sixth" >
//                                             Savings Operations
//                                         </Nav.Link>
//                                     </Nav.Item>

//                                 </Nav>
//                             </div>
//                             <Tab.Content>
//                                 <Tab.Pane eventKey="first">
//                                     <DepositTab />
//                                 </Tab.Pane>
//                                 <Tab.Pane eventKey="second">
//                                     <WithdrawalTab />
//                                 </Tab.Pane>
//                                 <Tab.Pane eventKey="third">
//                                     <ExchangeTab />
//                                 </Tab.Pane>
//                                 <Tab.Pane eventKey="forth">
//                                     <ReferralTab />
//                                 </Tab.Pane>
//                                 <Tab.Pane eventKey="fifth">
//                                     <BonusTab />
//                                 </Tab.Pane>
//                                 <Tab.Pane eventKey="sixth">
//                                     <SavingTab />
//                                 </Tab.Pane>

//                             </Tab.Content>
//                         </Tab.Container>
//                     </div>
//                 </div>
//             </Container>
//         </div>
//     )
// }
// export default History_Details