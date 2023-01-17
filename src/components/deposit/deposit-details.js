// import React, { useState } from "react";
// import { Col, Container, Row } from "react-bootstrap";
// import { Form } from "react-bootstrap";
// import Profile from "../../assets/images/profile.png"
// import Bitcoin from "../../assets/images/bit.svg"
// import Concoin from "../../assets/images/cone.svg"
// import Scan from "../../assets/images/scan.png"
// import Copy from "../../assets/images/copy.svg"
// import BottomIcon from "../../assets/images/card-bottom.svg"
// import BTC_Logo from "../../assets/images/icon1.svg"
// import ETH_Logo from "../../assets/images/icon2.svg"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee, faGear, faMagnifyingGlass, faThumbTack, faArrowsRotate, faCaretDown, faSquareCaretDown } from '@fortawesome/free-solid-svg-icons'
// import "../wallets/wallets.css"
// import "./deposit.css"
// import "../myAccount/myAccount.css"
// import CodeModal from "./securityCodeModal";

// import Select from 'react-select'
// import Navbar from "../shared/navbar/navbar";



// function Deposit_Details(props) {
//     const options = [
//         { value: 'Direct transfer BTC', label: 'Direct transfer BTC' },
//         { value: 'Purchase with a wire transfer ', label: 'Purchase with a wire transfer ' },
//     ]
//     const btc = [
//         { value: 'BTC', label: <span><img src={BTC_Logo} alt="" /> BTC</span> },
//         { value: 'Purchase with a wire transfer ', label: 'Purchase with a wire transfer ' },
//     ]
//     const eth = [
//         { value: 'ETH', label: <span><img src={ETH_Logo} alt="" /> BTC</span> },
//         { value: 'Purchase with a wire transfer ', label: 'Purchase with a wire transfer ' },
//     ]
//     const EUR_SEPA = [
//         { value: 'ETH', label: <span> EUR SEPA</span> },
//         { value: 'Purchase with a wire transfer ', label: 'Purchase with a wire transfer ' },
//     ]


//     const [isActive, setActive] = useState(false);

//     const toggleClass = () => {
//         setActive(!isActive);
//     };
//     return (
//         <div className="deposit-details wallet-details p-3">
//             <Container>
//                 <div className="d-flex justify-content-end top-head flex-wrap pt-75">
//                    <Navbar />
//                 </div>
//                 <div>
//                     <h2>Deposit BTChh</h2>

//                     <CodeModal />
//                     <Row>
//                         <Col xxl={8} className="mb-3 mb-xxsl-0" >
//                             <div className="transfer-method">
//                                 <strong className="mb-4">TRANSFER</strong>
//                                 <span className="mb-3 d-block">Choose wallet to top up the balance</span>
//                                 <div className="d-flex selection-field flex-wrap flex-xl-nowrap">
//                                     <span className="circle mb-3 mb-xl-0">
//                                         <img src={Bitcoin} alt="" />
//                                     </span>
//                                     <Select placeholder={<span><img src={BTC_Logo} alt="" /> BTC</span>} className="w-100" options={btc} />
//                                 </div>
//                                 <span className="d-block mb-2">Network</span>
//                                 <div className="d-flex selection-field flex-wrap flex-xl-nowrap">
//                                     <span className="circle mb-3 mb-xl-0">
//                                         <img src={Concoin} alt="" />
//                                     </span>

//                                     <Select placeholder={<span><img src={ETH_Logo} alt="" /> ETH</span>} className="w-100" options={eth} />
//                                 </div>
//                                 <div className="text-center">
//                                     <p style={{ fontSize: '20px' }} className="guide-alert">Please only use the ERC-20 network (Ethereum network) when depositing BTC</p>
//                                 </div>
//                                 <span className="d-block mb-2">Method</span>
//                                 <div className="mb-4">
//                                     <div className="d-flex selection-field flex-wrap">

//                                         <div className="positon-relative">
//                                             {/* <div className="">
//                                                 <FontAwesomeIcon className="text-white" icon={faCaretDown} />
//                                             </div> */}
//                                         </div>


//                                         <Select className="w-100" options={options} />

//                                     </div>
//                                 </div>

//                                 <Row className="pt-4">
//                                     <Col lg={2}>
//                                         <div>
//                                             <img className="img-fluid" src={Scan} alt="" />
//                                         </div>
//                                     </Col>
//                                     <Col lg={10}>
//                                         <span>Your payment address</span>


//                                         <div className="mb-4 input position-relative">
//                                             <input placeholder="0x72C1A05Efa398b8E3Dcac4936c33A2D0dE47623a" />
//                                             <a href="" className="copy-icon">
//                                                 <img src={Copy} alt="" />
//                                             </a>
//                                         </div>
//                                         <p className="guide-alert">Please copy and paste the address above directly to your wallet or any other third-party platform from which you are going to send funds.</p>
//                                     </Col>

//                                 </Row>
//                             </div>
//                         </Col>
//                         <Col xxl={4}>
//                             <div className="transfer-info">
//                                 <div className={isActive ? "increase" : ""}>

//                                     <div className="bottom-icon" onClick={toggleClass}  >
//                                         <img style={{ cursor: "pointer" }} src={BottomIcon} alt="" />
//                                     </div>
//                                     <h2>TRANSFER INFORMATION</h2>
//                                     <p>Please enter the amount you are going to purchase. Please don't forget to copy the address below.</p>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>

//                     <div className="transfer-method">
//                         <strong className="mb-4">TRANSFER</strong>
//                         <span className="mb-3 d-block">Choose wallet to top up the balance</span>
//                         <div className="d-flex selection-field flex-wrap flex-xl-nowrap">
//                             <span className="circle mb-3 mb-xl-0">
//                                 <img src={Bitcoin} alt="" />
//                             </span>
//                             <Select placeholder={<span><img src={BTC_Logo} alt="" /> BTC</span>} className="w-100" options={btc} />
//                         </div>
//                         <span className="d-block mb-2">Network</span>
//                         <div className="d-flex selection-field flex-wrap flex-xl-nowrap">
//                             <span className="circle mb-3 mb-xl-0">
//                                 <img src={Concoin} alt="" />
//                             </span>

//                             <Select placeholder={<span><img src={ETH_Logo} alt="" /> ETH</span>} className="w-100" options={eth} />
//                         </div>
//                         <div className="text-center">
//                             <p style={{ fontSize: '20px' }} className="guide-alert">Please only use the ERC-20 network (Ethereum network) when depositing BTC</p>
//                         </div>
//                         <span className="d-block mb-2">Method</span>
//                         <div className="mb-4">
//                             <div className="d-flex selection-field flex-wrap">

//                                 <div className="positon-relative">
//                                     {/* <div className="">
//                                                 <FontAwesomeIcon className="text-white" icon={faCaretDown} />
//                                             </div> */}
//                                 </div>


//                                 <Select className="w-100" options={options} />

//                             </div>
//                         </div>
//                         <div>
//                             <span>Amount</span>
//                             <div>
//                                 <Row className="align-items-center">
//                                     <Col xl={10}>
//                                         <div className="amount-input">
//                                             <input />
//                                         </div>
//                                     </Col>
//                                     <Col xl={2}>
//                                         <Select className="w-100" placeholder="EUR SEPA" options={EUR_SEPA} />
//                                     </Col>
//                                 </Row>
//                                 <Row>
//                                     <Col xl={10}>
//                                         <div className="d-flex justify-content-between current-amount">
//                                             <div>  <span>Current amount in RBIS</span></div>
//                                             <div><span>0</span></div>

//                                         </div>
//                                         <span className="ps-3">RBIS</span>
//                                     </Col>
//                                 </Row>
//                                 <Row>
//                                     <Col xl={6}>
//                                         <div className="transfer-pay">
//                                             <span className="d-block mb-2">Total to pay</span>
//                                             <div className="d-flex">
//                                                 <strong className="d-inline me-2">24</strong>
//                                                 <span className="sub-heading pt-1">BTC</span>
//                                             </div>
//                                             <span className="sub-heading">fees 0 BTC</span>

//                                         </div>
//                                     </Col>
//                                     <Col xl={6}>
//                                         <div className="transfer-pay">
//                                             <span className="d-block mb-2">Total to pay</span>
//                                             <div className="d-flex">
//                                                 <strong className="d-inline me-2">24</strong>
//                                                 <span className="sub-heading pt-1">BTC</span>
//                                             </div>
//                                             <span className="sub-heading">fees 0 BTC</span>

//                                         </div>
//                                     </Col>
//                                 </Row>
//                                 <div className="d-flex justify-content-center">
//                                     <button className="btn-triage-div btn-triage"><span>Create Request</span></button>
//                                 </div>
//                             </div>
//                         </div>


//                         {/* <Row className="pt-4">
//                                     <Col lg={2}>
//                                         <div>
//                                             <img className="img-fluid" src={Scan} alt="" />
//                                         </div>
//                                     </Col>
//                                     <Col lg={10}>
//                                         <span>Your payment address</span>


//                                         <div className="mb-4 input position-relative">
//                                             <input placeholder="0x72C1A05Efa398b8E3Dcac4936c33A2D0dE47623a" />
//                                             <a href="" className="copy-icon">
//                                                 <img src={Copy} alt="" />
//                                             </a>
//                                         </div>
//                                         <p className="guide-alert">Please copy and paste the address above directly to your wallet or any other third-party platform from which you are going to send funds.</p>
//                                     </Col>

//                                 </Row> */}
//                     </div>


//                 </div>
//             </Container>

//         </div>

//     )
// }
// export default Deposit_Details