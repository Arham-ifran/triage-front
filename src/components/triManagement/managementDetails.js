// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import Profile from "../../assets/images/profile.png"
// import TriIcon1 from "../../assets/images/tri-1.svg"
// import TriIcon2 from "../../assets/images/tri-2.svg"
// import TriIcon3 from "../../assets/images/tri-3.svg"
// import TriIcon4 from "../../assets/images/tri-4.svg"
// import Icon from "../../assets/images/double-arrow.svg"
// import ETH from "../../assets/images/small-cone.svg"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
// import Graph from "../../assets/images/graph.png"
// import "./management.css"
// import Navbar from "../shared/navbar/navbar";

// function Management_Details() {
//     return (
//         <div className="management-details wallet-details p-3">

//             <Container>
//                 <div className="d-flex justify-content-end pt-75 top-head flex-wrap">

//                     <Navbar />
//                     {/* <button className="btn-triage-div btn-triage me-4 mb-3 mb-sm-0"><span>Deposit</span></button>
//                     <button className="profile-btn">Hamayun Safdar <span className="ms-3 dp">
//                         <img src={Profile} alt="" />
//                     </span></button> */}
//                 </div>
//                 <div>
//                     <h2>Earn Interest</h2>
//                     <Row className="tri-card">
//                         <Col xxl={3} md={6} className="mb-3 mb-xxl-0">
//                             <div className="tri-cards">
//                                 <div className="d-flex flex-wrap align-items-center">
//                                     <div className="me-3 mb-3 mb-sm-0">
//                                         <img src={TriIcon1} alt="" />
//                                     </div>
//                                     <strong>Deposit TRI</strong>
//                                 </div>
//                             </div>
//                         </Col>
//                         <Col xxl={3} md={6} className="mb-3 mb-xxl-0">
//                             <div className="tri-cards">
//                                 <div className="d-flex flex-wrap align-items-center">
//                                     <div className="me-3 mb-3 mb-sm-0">
//                                         <img src={TriIcon2} alt="" />
//                                     </div>
//                                     <strong>Buy TRI</strong>
//                                 </div>
//                             </div>
//                         </Col>
//                         <Col xxl={3} md={6} className="mb-3 mb-xxl-0">
//                             <div className="tri-cards">
//                                 <div className="d-flex flex-wrap align-items-center">
//                                     <div className="me-3 mb-3 mb-sm-0">
//                                         <img src={TriIcon3} alt="" />
//                                     </div>
//                                     <strong>Exchange to TRI</strong>
//                                 </div>
//                             </div>
//                         </Col>
//                         <Col xxl={3} md={6} className="mb-3 mb-xxl-0">
//                             <div className="tri-cards">
//                                 <div className="d-flex flex-wrap align-items-center">
//                                     <div className="me-3 mb-3 mb-sm-0">
//                                         <img src={TriIcon4} alt="" />
//                                     </div>
//                                     <strong>Earn Interest</strong>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col xxl={8} xl={7} className="mb-3 mb-xxl-0">
//                             <div className="graph">
//                                 <div className="head d-flex justify-content-between align-items-center flex-wrap">
//                                     <div>
//                                         <div className="d-flex align-items-center flex-wrap">
//                                             <div className="circle-icon">
//                                                 <img src={ETH} alt="" />
//                                             </div>
//                                             <div>
//                                                 <span>Aave</span>
//                                                 <span className="green-value">Exchange rate</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <span className="neg-value"> <FontAwesomeIcon icon={faCaretDown} />  -0.63%</span>
//                                         <span className="text-end">91.48</span>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <img className="img-fluid" src={Graph} alt="" />
//                                 </div>
//                             </div>
//                         </Col>
//                         <Col xxl={4} xl={5}>
//                             <div className="manual-calculations">
//                                 <div className="card">
//                                     <div className="d-flex justify-content-between align-items-center flex-wrap">
//                                         <div>
//                                             <div className="d-flex align-items-center flex-wrap">
//                                                 <span className="tri-circle mb-2 mb-sm-0">
//                                                     <img src={Icon} alt="" />
//                                                 </span>
//                                                 <span className="mb-2 mb-sm-0">TRI available</span>
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <span>6</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="card">
//                                     <div className="d-flex justify-content-between align-items-center flex-wrap">
//                                         <div>
//                                             <div className="d-flex align-items-center flex-wrap">
//                                                 <span className="tri-circle mb-2 mb-sm-0">
//                                                     <img src={Icon} alt="" />
//                                                 </span>
//                                                 <span className="mb-2 mb-sm-0">TRI locked</span>
//                                             </div>

//                                         </div>
//                                         <div>
//                                             <span>3</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="card">
//                                     <div className="d-flex justify-content-between align-items-center flex-wrap">
//                                         <div>
//                                             <div className="d-flex align-items-center flex-wrap">
//                                                 <span className="tri-circle mb-2 mb-sm-0 ">
//                                                     <img src={Icon} alt="" />
//                                                 </span>
//                                                 <span className="mb-2 mb-sm-0">Total TRI</span>
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <span>9</span>
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
// export default Management_Details