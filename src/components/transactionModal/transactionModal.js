import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./transactionModal.css"

function TransactionModal(props) {

    const confirmTransaction = () => {
        props.confirmTx()
    }

    return (
        <div className='transaction-modal'>
            <Modal
                className='transaction-modal triage-model'
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
            >
                {
                    props.txStatus !== 1 &&
                    <Modal.Header closeButton>
                        
                    </Modal.Header>
                }
                <Modal.Body >
                    <div className='w-100 d-flex justify-content-center align-items-center mb-4'>
                        {
                            props.txStatus === 1 ?
                                <div>
                                    <div className='d-flex justify-content-center align-items-center mb-3'>
                                        <div className='loader'></div>
                                    </div>
                                    <div className='mb-4'> <h3 >Processing</h3></div>
                                </div>
                                : props.txStatus === 2 ?

                                    <div className='mb-4'><h3 >Click on Confirm to Swap Token.</h3></div>
                                    :
                                    props.txStatus === 3 ?
                                        <div>
                                            <div className='mb-4'><h5>Transaction Done Successfully. It may take some time to transfer tokens.</h5></div>
                                        </div> : 'There is an Error'
                        }
                    </div>


                    <div className='footer-card mt-4'>
                        <div className='d-flex justify-content-between mb-3 flex-wrap'>
                            <strong className='text-black'>Gas Fee </strong>
                            <div><strong>{props.txGasFee} {props.txGasFeeSymbol}</strong></div>
                        </div>
                        {/* <div className='d-flex justify-content-between mb-3 flex-wrap'>
                            <strong>Price Impact</strong>
                            <div><strong className='text-danger'>-7.83%</strong></div>

                        </div>
                        <hr></hr>
                        <div className='d-flex justify-content-between flex-wrap'>
                            <div><strong>Minimun recieved after slippage (0.50%)</strong></div>
                            <div><strong>0.00857408 MKR</strong></div>

                        </div> */}
                    </div>
                </Modal.Body>
                <Modal.Footer className='d-block'>
                    <div className='d-flex justify-content-center align-items-center pt-3'>
                        {
                            props.txStatus === 2 ?
                                <button className='btn-triage-div btn-triage' onClick={() => { confirmTransaction() }} disabled={props.txStatus === 1 ? true : false}><span>Confirm Transaction</span>{props.txStatus === 1 ? <div className='d-flex justify-content-center align-items-center mb-3'><div className='loader'></div></div> : ""}</button>
                                : props.txStatus === 3 ? <button className='btn-triage-div btn-triage' onClick={() => { props.setLoader(false); props.onHide() }} ><span>Close</span></button> : ""
                        }
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default TransactionModal

