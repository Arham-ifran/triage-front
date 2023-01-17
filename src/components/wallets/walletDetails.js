import React, {useEffect, useRef} from "react";
import Profile from "../../assets/images/profile.png"
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import Bitcoin from "../../assets/images/bit.svg"
import { Container, Row, Col } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab'
import Select from 'react-select'
import BTC_Logo from "../../assets/images/icon1.svg";
import { useNavigate } from "react-router-dom";
import "./wallets.css"
import Tabs_Table from "./historyTable";
import Navbar from "../shared/navbar/navbar";
import HistoryDetail from "../history/historyDetail";
import { Link } from "react-router-dom";


function WalletDetails() {
    const scrollToRef = useRef();
    const navigate = useNavigate();
    let tokenBalance = localStorage.getItem('bal')

    useEffect(()=> {
        scrollToRef.current.scrollIntoView()
    },[])

    const btc = [
        { value: 'BTC', label: <span><img src={BTC_Logo} alt="" /> BTC</span> },
        { value: 'Purchase with a wire transfer ', label: 'Purchase with a wire transfer ' },
    ]
    return (
        <div className="btc wallet-details pt-75">
            <div className="btc-details ">

                <Container>
                    {/* <div className="d-flex justify-content-end top-head flex-wrap pt-75">
                        <Navbar />
                    </div> */}
                    <div className="head">
                        <h2>Wallet</h2>
                        <span>Wallets / Details / TRI</span>
                    </div>
                    <Row className="btcs">
                        <Col xl={8} className="mb-3 mb-xl-0">
                            <div className="total-btc">
                                <div className="slot d-flex align-items-center flex-column flex-sm-row">
                                    <div className="flex-fill mb-4 mb-sm-0">
                                        <span className="d-block mb-3">Total</span>
                                        <div className="d-flex ">
                                            <strong>{tokenBalance}</strong>
                                            <span className="small-text">TRI</span>
                                        </div>
                                    </div>
                                    <Link to={'/deposit'} className="btn-triage-div btn-triage me-4 mb-3 mb-md-0"><span>Deposit</span></Link>
                                </div>
                                <span className="note-text text-white d-block mb-4 px-3">1 TRI = 1 USD <FontAwesomeIcon icon={faArrowUp} /> </span>
                                <div className="slot d-flex align-items-center flex-column flex-xxl-row mb-0">
                                    <div className="flex-fill mb-4 mb-xxl-0">
                                        <span className="d-block mb-3">Available</span>
                                        <div className="d-flex ">
                                            <strong>{tokenBalance}</strong>
                                            <span className="small-text">TRI</span>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end flex-column flex-sm-row">
                                        <Link to={'/earn-interest'}  onClick={()=> navigate(`/earn-interest`)} className="btn-triage-div btn-triage me-2 mb-3 mb-md-0" ><span>Earn Interest</span></Link>
                                        <Link to={'/withdrawal'} className="btn-triage-div btn-triage me-2 mb-3 mb-md-0"><span>Withdrawal</span></Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xl={4}>
                            <div className="avaliable-btc">
                            </div>
                        </Col>
                    </Row>
                    <div ref={scrollToRef}>
                        <h2>Transactions TRI</h2>
                        <HistoryDetail />
                    </div>
                </Container>

            </div>
        </div>
    )
}
export default WalletDetails