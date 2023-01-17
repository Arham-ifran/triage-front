import React, { useState, useEffect } from "react";
import { faCaretDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import BottomIcon from "../../assets/images/card-bottom.svg"
import Icon1 from "../../assets/images/icon1.svg"
import "./earnInterest.css"
import { useNavigate } from 'react-router-dom'
import { getBalanceOfToken } from '../../utils/web3'
import { connect } from "react-redux";

const InterestCard = (props) => {
    const [tokenBal, setTokenBalance] = useState()


    const naviagte = useNavigate()
    const [openCard, setOpenCard] = useState(false);


    const toggleClassCard = () => {
        setOpenCard(!openCard);
    };

    useEffect(() => {
        if (props.user?.userBalance) {
            setTokenBalance(props.user?.userBalance)
        } 
    }, [props.user.userBalance])

    return (
        <div className="interest-card">
            <div className={openCard ? 'show_class wallet-card position-relative' : 'wallet-card position-relative'}
                onClick={() => { props.setSelectedToken(props?.wallet) }}>
                <div className='card-body'>
                    {/* <div className="top-icon">
                    </div> */}
                    {/* <div style={{ cursor: "pointer" }} className="bottom-icon">
                        <img className="arrow-down" src={BottomIcon} alt="" onClick={() => { toggleClassCard() }} />
                        <div className="arrow-up">
                            <div className="semicircle" onClick={() => { toggleClassCard()}}>
                                <FontAwesomeIcon className="text-white icon-up"  icon={faChevronUp} />
                            </div>
                        </div>
                    </div> */}
                    <div className="about flex-wrap d-flex align-items-center">
                        <div className="me-2"><span className="pin-circle bg-white">
                            <img src={props?.wallet?.logo} alt="" />
                        </span></div>
                        <div>
                            <span className="d-block">{props?.wallet?.symbol}</span>
                            <span className="value d-block">Interest {props?.wallet?.interestRate || 0}%</span>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between card-footer flex-wrap">
                    <div><span>Available</span></div>
                    <div>
                        <span className="me-2">{tokenBal || 0} {props?.wallet?.symbol}</span>
                        {/* <FontAwesomeIcon className="text-white" icon={faCaretDown} /> */}
                    </div>
                </div>
                {(tokenBal < props.bronzeMinInvestment) && 
                <div className="top-up-account pb-4">
                    <div className="d-flex justify-content-center align-items-center">
                        <div>
                            <p className="pt-4 text-center">Please top up your account first</p>
                            <div className="d-flex justify-content-center align-items-center"><button className="btn-triage-div btn-triage" onClick={() => naviagte(`/deposit/${props?.wallet?.symbol}`)}><span>Deposit</span></button></div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, {})(InterestCard)