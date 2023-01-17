import React, { useState, useEffect } from 'react';
import SubmitLoader from '../submitLoader/submitLoader';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { createStake, beforeStakeAuth } from '../../redux/dashboard/dashboard.action';
import { connect } from "react-redux";
import MessageAlert from "../messageAlert/messageAlert";
import {ENV} from "../../config/config"


const ConfirmationLockModal = (props) => {
    let userData = ENV.getUserKeys()

    const { selectedProfitPlan, selectedToken, amount, selectedPlanCriteria, setStep, setAmount, setIsLockedConfirmed, isLockedConfirmed, bonus, promoCodeUsed, setShowConfirmationModal, setSelectedToken, setShowMessageAlert } = props

    let plan = props.selectedProfitPlan
    let profitAtDueDay = props.amount * plan?.profit / 100
    let monthlyProfit = (props.amount * plan?.profit / 100) / plan?.months

    const [loader, setloader] = useState(false)
    const [success, setSuccess] = useState(false)
    const [submitLoader, setSubmitLoader] = useState(false)


    useEffect(() => {
        if (props.dashboard.createStakeAuth) {
            setSubmitLoader(false)
            setloader(false)
            setSuccess(true)
            setShowMessageAlert(true)
            setIsLockedConfirmed(true)
            setShowConfirmationModal(false)
            setSelectedToken(null)
            props.beforeStakeAuth()
        }
    }, [props.dashboard.createStakeAuth])

    const callStakeApi = async () => {
        // create the stake function
        setloader(true)
        setSubmitLoader(true)

        let data = {
            userId: userData._id,
            criteriaId: selectedPlanCriteria?._id,
            months: selectedPlanCriteria?.months,
            currency: selectedToken.symbol,
            depositedAmount: amount,
            monthlyInterest: selectedProfitPlan.months,
            yearlyInterest: selectedProfitPlan.months,
            totalInterest: selectedProfitPlan.profit,
            totalToBeReceived: selectedProfitPlan.profit,
            totalProfit: selectedProfitPlan.profit,
            profitType: selectedProfitPlan.type === "available" ? 1 : selectedProfitPlan.type === "locked" ? 2 : 0,
        }

        if (promoCodeUsed) {
            data["promoCode"] = promoCodeUsed
        }

        props.createStake(data)

    }

    return (
        <>
            {
                selectedToken &&
                <Modal
                    className='review-modal triage-model'
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Confirmation Lock
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                            <li className='d-flex justify-content-between mb-4 flex-wrap'>
                                <div className='mb-2 mb-sm-0'><span>Currency</span></div>
                                <div><span>{selectedToken.symbol}</span></div>
                            </li>
                            <li className='d-flex justify-content-between mb-4 flex-wrap'>
                                <div className='mb-2 mb-sm-0'><span>Lock term</span></div>
                                <div><span>{selectedProfitPlan.months / 12 || 0} Years</span></div>
                            </li>
                            <li className='d-flex justify-content-between mb-4 flex-wrap'>
                                <div className='mb-2 mb-sm-0'><span>Set amount </span></div>
                                <div><span>{amount} {selectedToken.symbol}</span></div>
                            </li>
                            <li className='d-flex justify-content-between mb-4 flex-wrap'>
                                <div className='mb-2 mb-sm-0'><span>Monthly interest</span></div>
                                <div><span>{monthlyProfit} {selectedToken.symbol} {props?.bonus ? `+ ${props.bonus}% extra` : ''}</span></div>
                            </li>
                            {/* <li className='d-flex justify-content-between mb-4 flex-wrap'>
                                <div className='mb-2 mb-sm-0'><span>Yearly</span></div>
                                <div><span> {profitAtDueDay} {selectedToken.symbol} {props?.bonus ? `+ ${props.bonus}% extra` : ''}</span></div>
                            </li> */}
                            <li className='d-flex justify-content-between mb-4 flex-wrap'>
                                <div className='mb-2 mb-sm-0'><span>Total interest</span></div>
                                <div><span>{profitAtDueDay} {selectedToken.symbol} {props?.bonus ? `+ ${props.bonus}% extra` : ''}</span></div>
                            </li>
                            {/* <li className='d-flex justify-content-between mb-4 flex-wrap'>
                                    <div className='mb-2 mb-sm-0'><span>Total to be recieved</span></div>
                                    <div><span>7 883 EUR + 258.493 APE</span></div>
                                </li> */}
                            {/* <li className='d-flex justify-content-between mb-4 flex-wrap'>
                                    <div className='mb-2 mb-sm-0'><span>Total profit</span></div>
                                    <div><span> 258.493 APE</span></div>
                                </li> */}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer className='justify-content-center' >
                        <div className="d-flex justify-content-center flex-wrap">
                            {
                                success ? <p className='sucess-text'>Confirmed Successfully.</p> :
                                    <button className="btn-triage-div btn-triage me-4 mb-3 mb-md-0 me-3 d-flex justify-content-center align-items-center" onClick={() => { callStakeApi() }} >
                                        <span>CONFIRM</span>
                                        {submitLoader && <SubmitLoader />}
                                        {/* {
                                                loader && <SubmitLoader />
                                            } */}
                                    </button>
                            }
                        </div>
                    </Modal.Footer>
                </Modal>
            }

        </>
    );
}

const mapStateToProps = (state) => ({
    dashboard: state.dashboard,
    user: state.user
})

export default connect(mapStateToProps, { createStake, beforeStakeAuth })(ConfirmationLockModal)
