import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ReviewModal = (props) => {

    const [isCheckedTerms, setIsCheckedTerms] = useState(false)
    const [error, setError] = useState({})

    let plan = props.selectedProfitPlan
    let profitAtDueDay = props.amount * plan?.profit / 100
    let monthlyProfit = (props.amount * plan?.profit / 100) / plan?.months 


    const validation = () => {
        let isValid = true
        let err = []
        if(!isCheckedTerms) {
            isValid = false
            err["isChecked"] = "Please Check the Terms & Condition."
        }
        setError({...err})
        return isValid
    }
    
    const lockPlan = () => {
        if(validation()){
            props.setShowConfirmationModal(true); 
            props.onHide();
        }
    }

    return (
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
                    <h2 className='text-white p-0'>Lock Amount</h2>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    <li className='d-flex justify-content-between mb-4 flex-wrap'>
                        <div className='mb-2 mb-sm-0'><span>Lock term </span></div>
                        <div><span> {plan.months / 12} Years</span></div>
                    </li>
                    <li className='d-flex justify-content-between mb-4 flex-wrap'>
                        <div className='mb-2 mb-sm-0'><span>Amount </span></div>
                        <div><span>  {props?.selectedToken?.symbol} {props?.amount}</span></div>
                    </li>
                    <li className='d-flex justify-content-between mb-4 flex-wrap'>
                        <div className='mb-2 mb-sm-0'><span>Due date  </span></div>
                        <div><span>{moment().add(plan.months, 'M').format('DD-MM-YYYY')}</span></div>
                    </li>
                    <li className='d-flex justify-content-between mb-4 flex-wrap'>
                        <div className='mb-2 mb-sm-0'><span>Profit at due date </span></div>
                        <div><span>{props?.selectedToken?.symbol} {profitAtDueDay} {props?.bonus ? `+ ${props.bonus}% extra` : ''}</span></div>
                    </li>
                    <li className='d-flex justify-content-between mb-4 flex-wrap'>
                        <div className='mb-2 mb-sm-0'><span>Monthly interest  </span></div>
                        <div><span>{props?.selectedToken?.symbol} {monthlyProfit} {props?.bonus ? `+ ${props.bonus}% extra` : ''}</span></div>
                    </li>
                    <li className='d-flex justify-content-between mb-4 flex-wrap'>
                        <div className='mb-2 mb-sm-0'><span>Profits paid to </span></div>
                        <div><span>{plan.type === "available" ? 'Available savings plan balance' : plan.type === "locked" ? 'Locked savings plan balance' : "Primary savings plan balance"} </span></div>
                    </li>
                </ul>
                <div className="form-group d-flex m-2">
                    <div>
                        <input type="checkbox" id="html" onChange={() => {setIsCheckedTerms(prevValue => !prevValue)}}/>

                        <label for="html">
                        <span >I agree with <Link to="/terms-conditions" className=" ms-1">Term &amp; Conditions.</Link></span>
                        </label>
                    </div>

                    
                </div>
                {
                    error["isChecked"] && <p className='error'>{error["isChecked"]}</p>
                }
            </Modal.Body>
            <Modal.Footer className='justify-content-center' >
                <div className="d-flex justify-content-center flex-wrap">
                    <button className="btn-triage-div btn-triage me-4 mb-3 mb-md-0 me-3 pervious-btn" onClick={() => {setIsCheckedTerms(false); setError({}); props.onHide()}} ><span>PERVIOUS</span></button>
                    <button className="btn-triage-div btn-triage me-4 mb-3 mb-md-0 me-3 " onClick={() => {lockPlan()}} ><span>LOCK</span></button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ReviewModal

