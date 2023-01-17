import React, { useState, useEffect } from 'react'
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import TopIcon from "../../assets/images/card-top.svg"
import Refresh from "../../assets/images/Icon feather-refresh-ccw.svg"
import Pin from "../../assets/images/Icon metro-pin.svg"
import Icon1 from "../../assets/images/icon1.svg"
import { Link, useNavigate } from "react-router-dom";

const InterestPanel = ({ currency, amount, tokenValueInUsd}) => {
    const navigate = useNavigate()

    return (
        <div className="transfer-info position-relative p-0">
            <div className="wallet-card position-relative">
                <div className="card-body">
                    <Link to={`/deposit/${currency?.value}`} className="side-tag ">
                        <span className='d-inline-block align-top'>More</span>
                    </Link>
                    {/* <div className="top-icon">
                        <img src={TopIcon} alt="" />
                    </div> */}
                    <div className="about flex-wrap d-flex">
                        <div className="me-2"><span className="pin-circle bg-white">
                            <img src={currency?.logo} alt="" />
                        </span></div>
                        <div>
                            <span className="d-block">{currency?.value}</span>
                            {/* thsi should be dynamic frrom account tiers data */}
                            <span className="value d-block">Interest {currency?.interestRate}%</span> 
                        </div>
                    </div>

                    <div className="pin-details d-flex justify-content-center align-items-center mb-4 flex-wrap ">
                        <div className="value-field">
                            <span>{amount || 1} {currency?.value} = {tokenValueInUsd || 0} USD</span>
                        </div>
                        {/* <div className="pin-circle-icon">
                            <img src={Refresh} alt="" />
                        </div>
                        <div className="pin-circle-icon">
                            <img src={Pin} alt="" />
                        </div> */}
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-4 card-footer">
                    <div><span>Total</span></div>
                    <div>
                        <span className="me-2">{currency?.userBalance} {currency?.value}</span>
                        {/* <FontAwesomeIcon className="text-white" icon={faCaretDown} /> */}
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center card-body about-savings flex-wrap">
                    <div className="mb-2"><span>Savings</span></div>
                    <div><span>{currency?.totalStakedAmnt} {currency?.value}</span></div>
                </div>
                {/* <div className="d-flex justify-content-between align-items-center flex-wrap card-body pt-0">
                    <div className="mb-2 mb-md-0"><span>Discount purchase plan</span></div>
                    <div><span>0 {currency?.value}</span></div>
                </div> */}
                <div className="d-flex justify-content-end buttons-sec">
                    <div className="d-flex justify-content-center align-items-center pt-4 flex-wrap ">
                        <button className="btn-triage-div btn-triage me-4 me-sm-2 me-0 mb-2 " onClick={()=> navigate(`/deposit/${currency?.value}`)}><span>Deposit</span></button>
                        <button className="btn-triage-div btn-triage mb-2 me-sm-2 me-4 trans-btn" disabled={currency?.userBalance <= 0 ? true : false} onClick={()=> navigate(`/earn-interest/${currency?.value}`)}><span>Earn Interest</span></button>
                    </div>
                </div>
                <div className="card-footer mb-4">
                    <div className="d-flex justify-content-between pt-2 pb-2">
                        <div> <span>Available</span></div>
                        <div><span>{tokenValueInUsd * currency?.totalStakedAmnt} {currency?.value}</span></div>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn-triage-div btn-triage me-3 mb-2 mb-sm-0" onClick={() => {navigate(`/withdrawal/${currency?.value}`)}}><span>Withdraw</span></button>
                </div>
            </div>
        </div>
    )
}

export default InterestPanel