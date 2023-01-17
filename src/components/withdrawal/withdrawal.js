import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Profile from "../../assets/images/profile.png"
import Navbar from "../shared/navbar/navbar";
import AddressPanel from "./addressPanel";
import "./withdrawal.css"
import WithdrawalFn from "./withdrawalFn";
import { connect } from 'react-redux'
import { tokenWithdrawal } from '../../utils/web3'
import MessageAlert from "../messageAlert/messageAlert";
import CheckSecurity from "../qrCode/checkSecurity";
import SubmitLoader from "../submitLoader/submitLoader";

const Withdrawal = (props) => {

    const [iskycVerified, setIsKycVerified] = useState(false)

    const [step, setStep] = useState(1) //1- select wallet, 2- select address [where to send the coins]
    const [addressForWithdrawal, setAddressForWithdrawal] = useState()
    const [withdrawalAmount, setWithdrawalAmount] = useState()
    const [selectedWallet, setSelectedWallet] = useState()
    const [txLoader, setTxLoader] = useState()
    const [error, setError] = useState(false)
    const [tokenAddress, setTokenAddress] = useState()

    const [createSuccess, setCreateSuccess] = useState(false)
    const [showAlertMsgModal, setShowAlertMsgModal] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null)
    const [renderSecurity, setRednerSecuirty] = useState(false);
    const [cryptoAddrAvailable, setCryptoAddrAvailable] = useState(false)
    const [selectedCurrencyNetworkId, setSelectedCurrencyNetworkId] = useState()
    
    useEffect(() => {
        if (createSuccess) {
            setSuccessMsg("It may take some more time to be reflected in your account.")
            setShowAlertMsgModal(true)
            setCreateSuccess(false)
        }
    }, [createSuccess])

    useEffect(() => {
        if (props.user?.user?.tokenWallets?.ethereum) {
            setSelectedWallet(props.user?.user?.tokenWallets)
        } else {
            setSelectedWallet(null)
        }
    }, [props.user.user])

    const checkValidation = () => {
        let err = ''
        let validate = true
        if(!addressForWithdrawal){
            err = "Please Select the address." 
            validate = false
        }
        setError(err)
        return validate
    }

    const confirmWithdrawal = async () => { 
        if(checkValidation()){
            setTxLoader(true)
            const withdrawalTx = await tokenWithdrawal(tokenAddress.walletAddress, addressForWithdrawal.network, selectedWallet?.ethereumPrivateKey, selectedWallet?.ethereum, withdrawalAmount, addressForWithdrawal?.address)
            if (withdrawalTx.status) {
                setCreateSuccess(true)
            } else {
                setError("Error in the withdrawal fund, please try again.")
            }
            setStep(1)
            setTxLoader(false)
        }
    }

    const setVerified = (value) => {
        if (value) {
            confirmWithdrawal()

        }
        setRednerSecuirty(false)
    }

    return (
        <div className="withdrawal wallet-details p-3">
            {renderSecurity && <CheckSecurity setVerified={setVerified} securityType="withdrawal" redirctPath="/withdrawal" />}
            <MessageAlert
                type="success"
                greeting="Withdrawal Successfull."
                description={successMsg}
                show={showAlertMsgModal}
                onHide={setShowAlertMsgModal}
            />
            {
                step === 1 ?
                    <WithdrawalFn setTokenAddress={setTokenAddress} setStep={setStep} setWithdrawalAmount={setWithdrawalAmount}
                    withdrawalAmount={withdrawalAmount} setSelectedCurrencyNetworkId={setSelectedCurrencyNetworkId} /> 
                    : step === 2 ?
                        <>
                            <AddressPanel setCryptoAddrAvailable={setCryptoAddrAvailable} setStep={setStep} setAddressForWithdrawal={setAddressForWithdrawal} addressForWithdrawal={addressForWithdrawal} selectedCurrencyNetworkId={selectedCurrencyNetworkId} />
                        </> : ""
            }
            {error ? <p className="error">{error}</p> : ''}
            <div className="d-flex justify-content-end p-4 flex-wrap flex-sm-nowrap">
                {
                    step > 1 ?
                    <>
                        <button className="btn-triage-div btn-triage me-2 mb-2 mb-sm-0" onClick={() => { setStep(prevVal => prevVal - 1); setAddressForWithdrawal(null); setError(''); }}><span>Back</span></button>
                        {
                            cryptoAddrAvailable &&
                                <button className="btn-triage-div btn-triage me-2 mb-2 mb-sm-0" 
                                    onClick={() => { setRednerSecuirty(true) }} disabled={txLoader ? true : false} >
                                    <span>Confirm Transaction </span>{txLoader && <SubmitLoader />}
                                </button>
                        }
                    </>  : ''
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, {})(Withdrawal)