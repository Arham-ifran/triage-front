import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/navbar/navbar";
import "./withdrawal.css"
import "../exchange/exchange.css"
import Select from 'react-select'
import InterestPanel from "../interestPanel/interestPanel";
import CurrencyComparison from "../currencyComparison/currencyComparison";
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { getWalletLists, beforeWallets, addWithdrawRequest } from "../../redux/wallet/wallet.action"
import FullPageLoader from '../FullPageLoader/FullPageLoader'
import { getBalanceOfToken } from "../../utils/web3";
import { calculateGasFee, weitoEth } from "../../utils/web3";
import { beforeAddress, getAddressList, getUserProfit } from '../../redux/addressBook/addressBook.action'
import { ENV } from '../../config/config';
import { Col, Container, Modal, Row } from "react-bootstrap";
import MessageAlert from "../messageAlert/messageAlert";
const { chainsConfigs } = ENV

const paymentOpt = [
    // { value: 1, label: 'Direct transfer Tokens' },
    { value: 2, label: 'Transfer With Fiat' },
]


const WithdrawalFn = (props) => {
    const navigate = useNavigate()
    const userData = ENV.getUserKeys()
    const { setStep, setWithdrawalAmount, withdrawalAmount, setTokenAddress, setSelectedCurrencyNetworkId } = props
    const { currencyParam } = useParams()
    const [paymentOptions, setPaymentOptions] = useState([...paymentOpt])
    const [paymentMethod, setPaymentMethod] = useState(paymentOptions[0])
    const [tokenBalance, setTokenBalance] = useState(0)
    const [fullPageLoader, setFullPageLoader] = useState(true)
    const [tokenWallets, setTokenWallets] = useState(null)
    const [wallets, setWallets] = useState([])
    const [secondaryCurrienciesOptions, setSecondaryCurrenciesOptions] = useState([])
    const [selectedSecondaryCurrency, setSelectedSecondaryCurrency] = useState({})
    const [amount, setAmount] = useState('')
    const [error, setError] = useState([])
    const [isChecked, setIsChecked] = useState(false)
    const [txGasFee, setTxGasFee] = useState()
    const [withdrawalAddress, setWithdrawalAddress] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(false)
    const [addressBook, setAddressBook] = useState(true)
    const [messageAlert, setShowMessageAlert] = useState(false)
    const [withdrwalMethod, setWithdrawalMethod] = useState()
    const [userProfit, setUserProfit] = useState(0)
    const [data, setData] = useState()

    useEffect(() => {
        props.beforeWallets()
        props.getWalletLists()
        props.getAddressList()
        props.getUserProfit()
    }, [])

    useEffect(() => {
        if (props.user.userBalance) {
            setTokenBalance(props.user.userBalance)
        }
    }, [props.user.userBalance])

    useEffect(() => {
        setWithdrawalAmount(amount)
    }, [amount])

    // useEffect(() => {
    //     if (props.user?.user?.tokenWallets.ethereum) {
    //         setTokenWallets(props.user?.user?.tokenWallets)
    //     } else {
    //         setTokenWallets(null)
    //     }
    // }, [props.user.user])

    useEffect(() => {
        if (props.address.getAddressListAuth) {
            setData(...props.address?.cryptoAddressList)
        }
    }, [props.address.getAddressListAuth])

    useEffect(() => {
        if (props.address.getUserProfitAuth) {
            props.beforeAddress()
            let { data } = props.address.userProfit
            setUserProfit(data)

        }
    }, [props.address.getUserProfitAuth])

    useEffect(() => {
        if (props.wallets.getWalletsAuth) {
            setFullPageLoader(false)
            setWallets(props.wallets.wallets)
            // manageCurrenciesOptions(props.wallets.wallets)
        }
    }, [props.wallets.getWalletsAuth])

    // const manageCurrenciesOptions = async (walletsArray) => {

    //     const secondaryOpts = []
    //     walletsArray.map((e) => { if (e.type === 2 || e.type === 3 || e.type === 1) { secondaryOpts.push({ label: <span><img src={e.logo} alt="" />{e.symbol}</span>, value: e.symbol, logo: e.logo, networkId: e.networkId, walletAddress: e.walletAddress, id: e._id, type: e.type }) } })
    //     setSecondaryCurrenciesOptions([...secondaryOpts])
    //     let secondaryCurrency = secondaryOpts[0]
    //     if (currencyParam) {
    //         secondaryCurrency = secondaryOpts.filter((e) => {
    //             if (e.value == currencyParam) {
    //                 return e
    //             }
    //         })
    //         secondaryCurrency = secondaryCurrency[0]
    //     }
    //     await changeSecondaryCurrencyHandler(secondaryCurrency) // set the first one as a default secondary currencies
    //     setFullPageLoader(false)
    // }

    // const getTokenBalance = async (currency) => {
    //     let bal = await getBalanceOfToken(currency?.networkId, currency?.walletAddress, userData?.tokenWallets?.ethereum)
    //     return bal
    // }

    // const changeSecondaryCurrencyHandler = async (currency) => {
    //     setTokenAddress(currency)
    //     setSelectedSecondaryCurrency({ ...currency, userBalance: tokenBalance })
    //     setSelectedCurrencyNetworkId(currency?.networkId)
    // }

    // const paymentMethodChangeHandler = (value) => {
    //     const methods = paymentOptions.filter((e) => e?.value === value)
    //     setPaymentMethod(methods[0])
    // }

    const nextStep = async () => {
        let validate = await validation()
        if (validate) {
            // withdrawal api call
            // setStep(2)
            if (!data) {
                setAddressBook(false)
            }
            else {
                setWithdrawalAddress(true)
            }
        }
    }

    const validation = async () => {
        let selectedSecondaryCurrency = wallets[0]
        console.log(selectedSecondaryCurrency, "selectedSecondaryCurrency")

        // setFullPageLoader(true)
        let err = []
        let valid = true

        if (!amount || amount < 0) {
            err["amount"] = "Amount is Required."
            valid = false
        } else {
            let gasFee = await calculateGasFee(selectedSecondaryCurrency?.walletAddress, selectedSecondaryCurrency?.networkId, chainsConfigs[selectedSecondaryCurrency?.networkId].ownerAddress, tokenBalance)
            gasFee = await weitoEth(gasFee)
            setTxGasFee(gasFee)

            console.log("gas fee in validation fn = ", gasFee)

            let amountNeed = tokenBalance - gasFee
            if (amount > amountNeed) {
                err["amount"] = "You don't have enough token to pay for gas fee."
                valid = false
            }
        }
        if (withdrwalMethod === 1 && amount > tokenBalance) {
            err["amount"] = "You don't have enough tokens to withdraw."
            valid = false
        }
        if (withdrwalMethod === 2 && amount > userProfit) {
            err["amount"] = "You don't have enough profit balance to withdraw."
            valid = false
        }



        setError({ ...err })
        return valid
    }

    const getMaxBalance = async () => {
        setFullPageLoader(true)
        let gasFee = await calculateGasFee(selectedSecondaryCurrency?.walletAddress, selectedSecondaryCurrency?.networkId, chainsConfigs[selectedSecondaryCurrency?.networkId].ownerAddress, tokenBalance)
        gasFee = await weitoEth(gasFee)
        setTxGasFee(gasFee)
        setAmount(tokenBalance - gasFee)
        setFullPageLoader(false)
    }

    const getTxGasFee = async (amount) => {
        console.log(amount, "Gas fee calc")
        let selectedSecondaryCurrency = wallets[0]
        console.log(selectedSecondaryCurrency, "selectedSecondaryCurrency gas fee")
        let gasFee = await calculateGasFee(selectedSecondaryCurrency?.walletAddress, selectedSecondaryCurrency?.networkId, chainsConfigs[selectedSecondaryCurrency?.networkId].ownerAddress, amount)
        console.log(gasFee, "gasFee")
        console.log(typeof gasFee, "gasFee")
        gasFee = await weitoEth(gasFee)
        setTxGasFee(gasFee)
    }

    const confirmTransaction = () => {
        let err = []
        if (!isChecked) {
            err["isChecked"] = "Please check the terms & conditions."
        }
        setError({ ...err })
        if (!err.isChecked) {
            setConfirmationModal(false)
        }

        if (isChecked) {
            // handle withdraw request here
            let payload = {
                userId: userData._id,
                withdrawalAmount,
                withdrwalMethod
            }
            props.addWithdrawRequest(payload)
        }

    }

    useEffect(() => {
        if (props.wallets.addWithdrawRequest) {
            props.beforeWallets()
            setShowMessageAlert(true)
            setAmount('')
            setTxGasFee()
        }
    }, [props.wallets.addWithdrawRequest])


    let withdrawalOptions = [
        { label: `Wallet Balance`, value: 1 },
        { label: `Profit Balance`, value: 2 }
    ];


    return (
        <div className="withdrawal-eur deposit-details p-3">
            {
                fullPageLoader ? <FullPageLoader /> :
                    <Container>
                        {/* <div className="d-flex justify-content-end top-head flex-wrap pt-75">
                            <Navbar />
                        </div> */}
                        <div className="transfer-method ">
                            <strong className="mb-4">Withdrawal {currencyParam ? currencyParam : ""}</strong>
                            {!addressBook && <span className="alert alert-warning d-inline-block align-top kyc-warning text-black">
                                <h4>Please add address book first.</h4>
                            </span>}
                            <Row className="align-items-center">
                                <Col xl={6}>
                                    <span className="mb-3 d-block">From</span>
                                    <div className="d-flex selection-field flex-wrap flex-xl-nowrap align-items-center">
                                        <div>
                                            <span className="circle mb-3 mb-xl-0">
                                                <img src={wallets[0]?.logo} alt="" />
                                            </span>
                                        </div>
                                        <div className="position-relative w-100">
                                            {/* <Select isSearchable={false} classNamePrefix="triage-select" value={selectedSecondaryCurrency} className="w-100" options={secondaryCurrienciesOptions} onChange={changeSecondaryCurrencyHandler} />
                                            <><span className="ms-2 balance-span">{selectedSecondaryCurrency?.userBalance}</span> </> */}

                                            <Select isSearchable={false} classNamePrefix="triage-select" className="w-100" options={withdrawalOptions}
                                                onChange={(e) => setWithdrawalMethod(e.value)} value={withdrawalOptions.filter(option => option.value === withdrwalMethod)} />
                                            <><span className="ms-2 balance-span">{withdrwalMethod === 2 ? (userProfit ? userProfit.toFixed(4) : 0) : withdrwalMethod === 1 ? (tokenBalance ? tokenBalance : 0) : ""}</span> </>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={6}>
                                    <span className="d-block mb-2 ps-3">Enter Amount</span>
                                    <div className="mb-4">
                                        <div className="input-div-amount position-relative">
                                            <input autocomplete="off" type="number" step='any' name="amount" required="true" value={amount} onChange={(e) => { setAmount(e.target.value); getTxGasFee(e.target.value); setError([]) }} />
                                            {/* <div className="input-tag" onClick={() => { getMaxBalance(); setError([]) }} >
                                                <span>Max</span>
                                            </div> */}
                                        </div>
                                        {error["amount"] && <span className="error position-absolute">{error["amount"]}</span>}
                                    </div>
                                </Col>
                            </Row>
                            {/* <div className="form-group">
                                <small className="text-white">Note: Gas fee will be deducted in {selectedSecondaryCurrency?.value} {txGasFee}</small>
                            </div> */}

                            <div className="d-flex justify-content-end mb-4">
                                <button type="submit" className="btn-triage-div btn-triage" onClick={() => { nextStep() }}><span>Next</span></button>
                            </div>
                        </div>
                    </Container>
            }
            <Modal centered show={withdrawalAddress} onHide={() => { setWithdrawalAddress(false); setConfirmationModal(true) }} className="deposit-request-modal bank-detail-modal" size="lg" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Bank Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-text-holder position-relative">
                        <p className="mb-2">Amount will be transferred to the following account information.</p>
                    </div>
                    <ul className="list-unstyled bank-detail-list position-relative mb-5">
                        <li className="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap position-relative">
                            <strong className="mb-1 mb-lg-0 detail-label">Label:</strong>
                            <span className="mb-1 mb-lg-0 detail-value">{data?.label}</span>
                        </li>
                        <li className="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap position-relative">
                            <strong className="mb-1 mb-lg-0 detail-label">Beneficiary name:</strong>
                            <span className="mb-1 mb-lg-0 detail-value">{data?.beneficiaryName}</span>
                        </li>
                        <li className="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap position-relative">
                            <strong className="mb-1 mb-lg-0 detail-label">Beneficiary address
                                :</strong>
                            <span className="mb-1 mb-lg-0 detail-value">{data?.beneficiaryAddress}</span>
                        </li>
                        <li className="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap position-relative">
                            <strong className="mb-1 mb-lg-0 detail-label">Country
                                :</strong>
                            <span className="mb-1 mb-lg-0 detail-value">{data?.country}</span>
                        </li>
                        <li className="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap position-relative">
                            <strong className="mb-1 mb-lg-0 detail-label">Beneficiary Bank Name
                                :</strong>
                            <span className="mb-1 mb-lg-0 detail-value">{data?.bankName}</span>
                        </li>
                        <li className="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap position-relative">
                            <strong className="mb-1 mb-lg-0 detail-label">Beneficiary Bank Address
                                :</strong>
                            <span className="mb-1 mb-lg-0 detail-value">{data?.bankAddress}</span>
                        </li>
                        <li className="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap position-relative">
                            <strong className="mb-1 mb-lg-0 detail-label">Beneficiary Bank Account
                                :</strong>
                            <span className="mb-1 mb-lg-0 detail-value">{data?.bankAccount}</span>
                        </li>
                        <li className="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap position-relative">
                            <strong className="mb-1 mb-lg-0 detail-label">BIC/SWIFT:</strong>
                            <span className="mb-1 mb-lg-0 detail-value">{data?.bic_swift}</span>
                        </li>
                        <li className="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap position-relative">
                            <strong className="mb-1 mb-lg-0 detail-label">Comments:</strong>
                            <span className="mb-1 mb-lg-0 detail-value">{data?.comment}</span>
                        </li>
                    </ul>
                </Modal.Body>
                <Modal.Footer className='justify-content-center' >
                    <div className="d-flex justify-content-center flex-wrap">
                        <button onClick={() => setWithdrawalAddress(false)} className="btn-triage-div btn-triage me-4 mb-3 mb-md-0 me-3 d-flex justify-content-center align-items-center"  >
                            <span>CANCEL</span>
                        </button>
                        <button onClick={() => { setWithdrawalAddress(false); setConfirmationModal(true) }} className="btn-triage-div btn-triage me-4 mb-3 mb-md-0 me-3 d-flex justify-content-center align-items-center"  >
                            <span>Next</span>
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            <Modal centered show={confirmationModal} onHide={() => setConfirmationModal(false)} className="deposit-request-modal" size="lg" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Confirm Request!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xl={6} md={12} className="mb-3">
                            <div className="transfer-pay w-100 m-0">
                                <h2 className="d-block mb-1 comparison-text">Withdrawal Amount</h2>
                                <div className="d-flex align-items-center comparison-value">
                                    <strong className="d-inline me-2">{withdrawalAmount}</strong>
                                    <span className="sub-heading pt-1">TRI</span>
                                </div>
                            </div>
                        </Col>
                        <Col xl={6} md={12} className="mb-3">
                            <div className="transfer-pay w-100 m-0">
                                <h2 className="d-block mb-1 comparison-text">You will receive</h2>
                                <div className="d-flex align-items-center comparison-value">
                                    <strong className="d-inline me-2">{withdrawalAmount}</strong>
                                    <span className="sub-heading pt-1">USD</span>
                                </div>
                            </div>
                        </Col>
                        <Col sm={12}>
                            <div className="form-group d-flex">
                                <div>
                                    <label className="right-label-checkbox" >I Understand, take full reponsibility, and commit to providing a Bank Account which is supporting the withdrawal currency.
                                        <input type="checkbox" defaultChecked={isChecked} onChange={() => { setIsChecked(prevVal => !prevVal) }} />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                            {error["isChecked"] && <span className="error">{error["isChecked"]}</span>}
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className='justify-content-center' >
                    <div className="d-flex justify-content-center flex-wrap">
                        <button onClick={() => confirmTransaction()} className="btn-triage-div btn-triage me-4 mb-3 mb-md-0 me-3 d-flex justify-content-center align-items-center"  >
                            <span>CONFIRM</span>
                        </button>

                    </div>
                </Modal.Footer>
            </Modal>
            <MessageAlert
                type="success"
                greeting="Great!"
                description="Withdraw Request Created Successfully, Admin will review it and then amount will be transferred. "
                show={messageAlert}
                onHide={() => setShowMessageAlert(false)}
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    wallets: state.wallets,
    user: state.user,
    address: state.address
})

export default connect(mapStateToProps, { getWalletLists, beforeWallets, beforeAddress, getAddressList, addWithdrawRequest, getUserProfit })(WithdrawalFn)
