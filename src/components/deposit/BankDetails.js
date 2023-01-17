import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { getBankDetails, beforeSettings } from "../../redux/settings/settings.action"
import { connect } from "react-redux"
import { copyToClipBoard } from "../../utils/helperFunctions"
import { useParams, useNavigate } from "react-router-dom";


function BankDetails(props) {
    const navigate = useNavigate()
    const { bankDetailsModal, setBankDetailsModal } = props;
    const [data, setData] = useState({})
    const [isCopied, setIsCopied] = useState(false)


    useEffect(() => {
        props.getBankDetails()
    }, [])

    useEffect(() => {
        if (props.settings.getBankDetailsAuth) {
            props.beforeSettings()
            let bankList = props.settings.bankDetailsList;
            setData(bankList)
        }
    }, [props.settings.getBankDetailsAuth])



    return (
        <Modal centered show={bankDetailsModal} onHide={() => { setBankDetailsModal(false); navigate('/wallets/details') }} className="bank-detail-modal" size="lg" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Choose bank details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-text-holder position-relative">
                    <p className="mb-5">In order to transfer funds to our corporate account please initiate a bank transfer to the following account information</p>
                    {isCopied && <span className="copy-popped-text">Copied!</span>}
                </div>
                <ul className="list-unstyled bank-detail-list position-relative mb-5">
                    <li className="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap position-relative">
                        <strong className="mb-1 mb-lg-0 detail-label">Reference ID:</strong>
                        <span className="mb-1 mb-lg-0 detail-value">{data.referenceId}</span>
                        <span className="cursor-pointer detail-icon copy-icon text-center"
                            onClick={() => { copyToClipBoard(data.referenceId); setIsCopied(true); setTimeout(() => { setIsCopied(false); }, 1000); }}>
                            <FontAwesomeIcon icon={faCopy} />
                        </span>
                    </li>
                    <li className="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap position-relative">
                        <strong className="mb-1 mb-lg-0 detail-label">Beneficiary name:</strong>
                        <span className="mb-1 mb-lg-0 detail-value">{data.beneficiaryName}</span>
                        <span className="cursor-pointer detail-icon copy-icon text-center"
                            onClick={() => { copyToClipBoard(data.beneficiaryName); setIsCopied(true); setTimeout(() => { setIsCopied(false); }, 1000); }}>
                            <FontAwesomeIcon icon={faCopy} />
                        </span>
                    </li>
                    <li className="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap position-relative">
                        <strong className="mb-1 mb-lg-0 detail-label">Beneficiary address
                            :</strong>
                        <span className="mb-1 mb-lg-0 detail-value">{data.beneficiaryAddress}</span>
                        <span className="cursor-pointer detail-icon copy-icon text-center"
                            onClick={() => { copyToClipBoard(data.beneficiaryAddress); setIsCopied(true); setTimeout(() => { setIsCopied(false); }, 1000); }}>
                            <FontAwesomeIcon icon={faCopy} />
                        </span>
                    </li>
                    <li className="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap position-relative">
                        <strong className="mb-1 mb-lg-0 detail-label">Beneficiary Bank name
                            :</strong>
                        <span className="mb-1 mb-lg-0 detail-value">{data.beneficiaryBankName}</span>
                        <span className="cursor-pointer detail-icon copy-icon text-center"

                            onClick={() => { copyToClipBoard(data.beneficiaryBankName); setIsCopied(true); setTimeout(() => { setIsCopied(false); }, 1000); }}>
                            <FontAwesomeIcon icon={faCopy} />
                        </span>
                    </li>
                    <li className="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap position-relative">
                        <strong className="mb-1 mb-lg-0 detail-label">Beneficiary Bank address
                            :</strong>
                        <span className="mb-1 mb-lg-0 detail-value">{data.beneficiaryBankAddress}</span>
                        <span className="cursor-pointer detail-icon copy-icon text-center"
                            onClick={() => { copyToClipBoard(data.beneficiaryBankAddress); setIsCopied(true); setTimeout(() => { setIsCopied(false); }, 1000); }}>
                            <FontAwesomeIcon icon={faCopy} />
                        </span>
                    </li>
                    <li className="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap position-relative">
                        <strong className="mb-1 mb-lg-0 detail-label">Beneficiary bank account number - IBAN
                            :</strong>
                        <span className="mb-1 mb-lg-0 detail-value">{data.Iban}</span>
                        <span className="cursor-pointer detail-icon copy-icon text-center"
                            onClick={() => { copyToClipBoard(data.Iban); setIsCopied(true); setTimeout(() => { setIsCopied(false); }, 1000); }}>
                            <FontAwesomeIcon icon={faCopy} />
                        </span>
                    </li>
                    <li className="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap position-relative">
                        <strong className="mb-1 mb-lg-0 detail-label">BIC / SWIFT
                            :</strong>
                        <span className="mb-1 mb-lg-0 detail-value">{data.bic}</span>
                        <span className="cursor-pointer detail-icon copy-icon text-center"
                            onClick={() => { copyToClipBoard(data.bic); setIsCopied(true); setTimeout(() => { setIsCopied(false); }, 1000); }}>
                            <FontAwesomeIcon icon={faCopy} />
                        </span>
                    </li>
                    <li className="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap position-relative">
                        <strong className="mb-1 mb-lg-0 detail-label">Conditions:</strong>
                        <span className="mb-1 mb-lg-0 detail-value">{data.condition}</span>
                        <span className="cursor-pointer detail-icon copy-icon text-center"
                            onClick={() => { copyToClipBoard(data.condition); setIsCopied(true); setTimeout(() => { setIsCopied(false); }, 1000); }}>
                            <FontAwesomeIcon icon={faCopy} />
                        </span>
                    </li>
                    <li className="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap position-relative">
                        <strong className="mb-1 mb-lg-0 detail-label">Attention:</strong>
                        <span className="mb-1 mb-lg-0 detail-value">{data.attention}</span>
                        <span className="cursor-pointer detail-icon copy-icon text-center"
                            onClick={() => { copyToClipBoard(data.attention); setIsCopied(true); setTimeout(() => { setIsCopied(false); }, 1000); }}>
                            <FontAwesomeIcon icon={faCopy} />
                        </span>
                    </li>
                </ul>
            </Modal.Body>
            <Modal.Footer className='justify-content-center' >
                <div className="d-flex justify-content-center flex-wrap">
                    <button onClick={() => setBankDetailsModal(false)} className="btn-triage-div btn-triage me-4 mb-3 mb-md-0 me-3 d-flex justify-content-center align-items-center"  >
                        <span>CANCEL</span>
                    </button>
                    <button onClick={() => navigate('/wallets/details')} className="btn-triage-div btn-triage me-4 mb-3 mb-md-0 me-3 d-flex justify-content-center align-items-center"  >
                        <span>Next</span>
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}


const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps, { beforeSettings, getBankDetails })(BankDetails);