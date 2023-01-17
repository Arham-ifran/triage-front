import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import Profile from "../../assets/images/profile.png"
import BottomIcon from "../../assets/images/card-bottom.svg"
import Icon1 from "../../assets/images/icon1.svg"
import Icon2 from "../../assets/images/cone.svg"
import Icon3 from "../../assets/images/ripple.svg"
import Icon4 from "../../assets/images/eth.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import "./earnInterest.css"
import Navbar from "../shared/navbar/navbar";
import InterestCard from "./earnInterestCard";
import { getWalletLists, beforeWallets, getSymbolsLists } from "../../redux/wallet/wallet.action"
import { connect } from 'react-redux';
import LockPeriod from "./lockPeriod";
import ProfitPlannings from "./profitPlannings";
import { getCriteriaList } from "../../redux/user/user.action"
import ConfirmationLockModal from "./confirmationLockModal";
import MessageAlert from "../messageAlert/messageAlert";
import FullPageLoader from "../FullPageLoader/FullPageLoader";


const EarnInterest = (props) => {
    const [tokenBal, setTokenBalance] = useState()
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [messageAlert, setShowMessageAlert] = useState(false)
    const [profitPlan, setProfitPlan] = useState(null)
    const [amnt, setAmnt] = useState()
    const [isLockedConfirmed, setIsLockedConfirmed] = useState(false)

    const [fullPageLoader, setFullPageLoader] = useState(true)
    const [wallets, setWallets] = useState([])
    const [bronzeMinInvestment, setBronzeMinInvestment] = useState([])
    const [currenciesArray, setCurrenciesArray] = useState([])
    const [criteriaList, setCriteriaList] = useState(null)
    const [searchSymbolText, setSearchSymbolText] = useState()
    const [selectedToken, setSelectedToken] = useState(null)
    const [selectedPlanCriteria, setSelectedPlanCriteria] = useState(null)

    const [step, setStep] = useState(1) //1-currency selection, 2-plan selection 3- profit selection
    const [bonus, setBonus] = useState()
    const [promoCodeUsed, setPromoCodeUsed] = useState()

    useEffect(() => {
        let token = localStorage.getItem("accessToken")
        if (token) {
            props.beforeWallets()
            props.getSymbolsLists()
            props.getWalletLists()
            props.getCriteriaList()
        }
    }, [])

    useEffect(() => {
        if (isLockedConfirmed) {
            // setAmount(0)
            setStep(1)
            setIsLockedConfirmed(false)
            // props.setIsLockedConfirmed(false)
        }
    }, [isLockedConfirmed])

    useEffect(() => {
        if (props.wallets.getSymbolsAuth) {
            setCurrenciesArray(props.wallets.symbols)
        }
    }, [props.wallets.getSymbolsAuth])

    useEffect(() => {
        if (props.wallets.getWalletsAuth) {
            props.beforeWallets()
            setFullPageLoader(false)
            setWallets(props.wallets.wallets)
            setBronzeMinInvestment(props.wallets.bronzeMinInvestment)
        }
    }, [props.wallets.getWalletsAuth])

    useEffect(() => {
        if (props.user.criteriaListAuth) {
            const { criteria } = props.user.criteriaList
            setCriteriaList(criteria)
        }
    }, [props.user.criteriaListAuth])

    useEffect(() => {
        if (props.user?.userBalance) {
            setTokenBalance(props.user?.userBalance)
        }
    }, [props.user.userBalance])

    useEffect(() => {
        props.beforeWallets()
        let payload = { symbolText: searchSymbolText }
        let token = localStorage.getItem("accessToken")
        if (token) {
            props.getWalletLists(payload)
        }
    }, [searchSymbolText])


    return (
        <div className="earn-interest">
            <div className="earn-interest-details wallet-details p-3">
                {/* <div className="d-flex justify-content-end top-head flex-wrap pt-75">
                    <Navbar />
                </div> */}

                <Container>
                    <h2>Earn Interest</h2>
                    <Row className="details">
                        <Col xxl={3} xl={4} md={6}>
                            <div className={`detais-cards ${step === 1 ? "active" : ''}`}>
                                <div className="d-flex align-items-center flex-sm-nowrap flex-wrap">
                                    <span className="count">01</span>
                                    <strong>Currency</strong>
                                </div>
                            </div>
                        </Col>
                        <Col xxl={3} xl={4} md={6}>
                            <div className={`detais-cards ${step === 2 ? "active" : ''}`}>
                                <div className="d-flex align-items-center flex-sm-nowrap flex-wrap">
                                    <span className="count">02</span>
                                    <strong>Earn interest plan</strong>
                                </div>
                            </div>
                        </Col>
                        <Col xxl={3} xl={4} md={6}>
                            <div className={`detais-cards ${step === 3 ? "active" : ''}`}>
                                <div className="d-flex align-items-center flex-sm-nowrap flex-wrap">
                                    <span className="count">03</span>
                                    <strong>Set amount</strong>
                                </div>
                            </div>
                        </Col>
                        <Col xxl={3} xl={4} md={6}>
                            <div className={`detais-cards ${step === 4 ? "active" : ''}`}>
                                <div className="d-flex align-items-center flex-sm-nowrap flex-wrap">
                                    <span className="count">04</span>
                                    <strong>Confirmation</strong>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {
                        step === 1 ?
                            <>
                                <div className="d-flex justify-content-between align-items-center flex-wrap searching">
                                    <h2 className="mb-4">Please select the currency you wish to Lock &amp; Earn</h2>
                                    {/* <div className="search-field position-relative mb-4">
                                        <div className="search-icon">
                                            <FontAwesomeIcon className="icon icon-search" icon={faMagnifyingGlass} />
                                        </div>
                                        <input placeholder="Enter text to search" onChange={(e) => { setSearchSymbolText(e.target.value) }} /></div> */}
                                </div>
                                <Row className="interst-cards">
                                    {
                                        fullPageLoader ?
                                            <div>
                                                <FullPageLoader />
                                            </div>
                                            :
                                            <>
                                                {
                                                    wallets.map((wallet) => {
                                                        return (
                                                            <Col className="mb-4" xxl={3} xl={4} md={6}>
                                                                <div className={wallet?._id === selectedToken?._id ? "active-card " : ''}>
                                                                    <InterestCard wallet={wallet} setSelectedToken={setSelectedToken} bronzeMinInvestment={bronzeMinInvestment} />
                                                                </div>
                                                            </Col>
                                                        )
                                                    })
                                                }
                                                {
                                                    !wallets.length ?
                                                        <div className="not-found"><p className="text-white">Wallet is not avilable.</p></div> : ''
                                                }
                                            </>

                                    }
                                </Row>
                            </> : ''
                    }
                </Container>
                {
                    (step === 1 && (bronzeMinInvestment && tokenBal)) ?
                        <div className="d-flex justify-content-end container">
                            {/* <button className="btn-triage-div btn-triage me-4 mb-3 mb-md-0 me-3" ><span>Deposit</span></button> */}
                            <button className="btn-triage-div btn-triage mb-3 mb-md-0 " onClick={() => setStep(2)}
                             disabled={
                                selectedToken && (tokenBal > bronzeMinInvestment) ? false : true 
                            }><span>Next</span></button>
                        </div> : ''
                }
            </div>
            {
                step === 2 ?
                    <LockPeriod setStep={setStep} selectedToken={selectedToken}
                        setSelectedPlanCriteria={setSelectedPlanCriteria} /> : ''
            }
            {
                step === 3 || step === 4 ?
                    <ProfitPlannings setPromoCodeUsed={setPromoCodeUsed} setBonus={setBonus} selectedProfitPlan={profitPlan} setSelectedProfitPlan={setProfitPlan} amount={amnt} setAmount={setAmnt} setShowConfirmationModal={setShowConfirmationModal} setStep={setStep} selectedToken={selectedToken} selectedPlanCriteria={selectedPlanCriteria} /> : ''
            }

            {
                showConfirmationModal &&
                <ConfirmationLockModal
                    promoCodeUsed={promoCodeUsed}
                    bonus={bonus}
                    show={showConfirmationModal}
                    onHide={() => setShowConfirmationModal(false)}
                    selectedProfitPlan={profitPlan}
                    setSelectedProfitPlan={setProfitPlan}
                    amount={amnt}
                    setAmount={setAmnt}
                    setStep={setStep}
                    selectedToken={selectedToken}
                    setSelectedToken={setSelectedToken}
                    setShowConfirmationModal={setShowConfirmationModal}
                    selectedPlanCriteria={selectedPlanCriteria}
                    isLockedConfirmed={isLockedConfirmed}
                    setIsLockedConfirmed={setIsLockedConfirmed}
                    messageAlert={messageAlert}
                    setShowMessageAlert={setShowMessageAlert}
                />
            }

            <MessageAlert
                type="success"
                greeting="Great!"
                description={"You have successfully locked the selected amount. Check your dashboard daily for the available rewards."}
                show={messageAlert}
                onHide={() => setShowMessageAlert(false)}
            />

        </div>
    )
}

const mapStateToProps = (state) => ({
    wallets: state.wallets,
    user: state.user
})

export default connect(mapStateToProps, { getWalletLists, beforeWallets, getSymbolsLists, getCriteriaList })(EarnInterest)