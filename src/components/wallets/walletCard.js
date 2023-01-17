import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faCaretDown, faCaretUp, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import TopIcon from "../../assets/images/card-top.svg"
import BottomIcon from "../../assets/images/card-bottom.svg"
import Refresh from "../../assets/images/Icon feather-refresh-ccw.svg"
import Pin from "../../assets/images/Icon metro-pin.svg"
import "./wallets.css"
import { Link, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { ENV } from '../../config/config'

const WalletCard = (props) => {

    const [tokenBalance, setTokenBalance] = useState()

    useEffect(() => {
        if (props.user?.userBalance) {
            setTokenBalance(props.user?.userBalance)
        } 
    }, [props.user.userBalance])

    const { data, valueInUSD } = props
    const navigate = useNavigate()

    const [isActivee, setActivee] = useState(false);

    const toggleClass = () => {
        setActivee(!isActivee);
    };


    return (
        <div className="wallet-card position-relative">
            <div className="d-flex flex-column flex-sm-row">
                {/* <div className="bottom-icon" onClick={toggleClass}  >
                    <img style={{ cursor: "pointer" }} className="arrow-down" src={BottomIcon} alt="" />
                    <div className="arrow-up">
                        <div class="semicircle">
                            <FontAwesomeIcon className="text-white icon-up" icon={faChevronUp} />
                        </div>
                    </div>
                </div> */}
                <div className="d-flex flex-column flex-fill px-3">
                    <div className="card-body">
                        {/* <Link to={`/deposit/${data.symbol}`} className="side-tag">
                            <span className="d-inline-block align-top">More</span>
                        </Link> */}
                        {/* <div className="top-icon">
                            <img src={TopIcon} alt="" />
                        </div> */}
                        {/* <div className="bottom-icon d-none">
                        </div> */}
                        <div className="about flex-wrap d-flex">
                            <div className="me-2"><span className="pin-circle bg-white">
                                <img src={data.logo} alt="" />
                            </span></div>
                            <div>
                                <span className="d-block">{data.symbol}</span>
                                <span className="value d-block">Interest {data.interestRate || 0}%</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between card-footer mb-4">
                            <div><span className="me-2">Total</span></div>
                            <div>
                                <span className="me-2">{tokenBalance || 0} {data.symbol}</span>
                                {/* <FontAwesomeIcon className="text-white" icon={faCaretDown} /> */}
                            </div>
                        </div>
                        <div className="pin-details d-flex justify-content-center align-items-center flex-wrap ">
                            <div className="value-field">
                                <span>1 {data.symbol} = {valueInUSD?.toFixed(4)} {ENV.defaultCurrency}</span>
                            </div>
                            {/* <div className="pin-circle-icon">
                                <img src={Refresh} alt="" />
                            </div>
                            <div className="pin-circle-icon">
                                <img src={Pin} alt="" />
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="total-list flex-fill">
                    <div className="d-flex justify-content-between flex-wrap mb-3">
                        <span>Savings</span>
                        <span className="me-2">{data.stakedAmount} {data.symbol}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3 flex-wrap">
                        <div><button className="btn-triage-div btn-triage mb-2 mb-sm-3 me-2" onClick={() => { navigate(`/deposit/${data.symbol}`) }}><span>DEPOSIT</span></button></div>
                        <div> <button className="btn-triage-div btn-triage" onClick={() => { navigate(`/earn-interest/${data.symbol}`) }}><span>EARN INTEREST</span></button></div>
                    </div>
                    <div className="d-flex justify-content-between mb-4 card-footer">
                        <div><span className="me-2">Total</span></div>
                        <div>
                            <span className="me-2">{data.stakedAmount * valueInUSD} {ENV.defaultCurrency}</span>
                            {/* <FontAwesomeIcon className="text-white" icon={faCaretDown} /> */}
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                        <div> <button className="btn-triage-div btn-triage" onClick={() => { navigate(`/withdrawal/${data.symbol}`) }}><span>WITHDRAW</span></button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps, {})(WalletCard)