import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Select from 'react-select'
import "./exchange.css"
import { connect } from 'react-redux'
import { getWalletLists, beforeWallets } from "../../redux/wallet/wallet.action"
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import SubmitLoader from "../submitLoader/submitLoader";
import CurrencyComparison from '../currencyComparison/currencyComparison';
import Navbar from "../shared/navbar/navbar";
import { getBalanceOfToken, getStakedAmountFn } from "../../utils/web3";
import ConnectWalletModal from "../connectWalletModal/connectWalletModal";
import InterestPanel from "../interestPanel/interestPanel"
import { tokenExchangeFn, calculateGasFee, weitoEth } from "../../utils/web3"
import TransactionModal from "../transactionModal/transactionModal";
import { ENV } from '../../config/config'
const { chainsConfigs } = ENV

function Exchange(props) {

    const [fullPageLoader, setFullPageLoader] = useState(true)
    const [loader, setLoader] = useState(false)
    const [wallets, setWallets] = useState([])
    const [secondaryCurrienciesOptions, setSecondaryCurrenciesOptions] = useState([])
    const [selectedSecondaryCurrency, setSelectedSecondaryCurrency] = useState({})
    const [primaryCurrienciesOptions, setPrimaryCurrenciesOptions] = useState([])
    const [selectedPrimaryCurrency, setSelectedPrimaryCurrency] = useState({})
    const [amount, setAmount] = useState()
    const [error, setError] = useState("")
    const [tokenWallets, setTokenWallets] = useState(null)
    const [show, setShow] = useState(false);
    const [validation, setValidation] = useState(false)
    const [trgTokenAmounttoTransfer, setTrgTokenAmounttoTransfer] = useState()
    const [txModalShow, setTxModalShow] = useState(false);
    const [txGasFee, setTxGasFee] = useState() // we will convert this in the token later on
    const [selectedSecondaryTokenValueInUsd, setSelectedSecondaryTokenValueInUsd] = useState(0)
    const [txStatus, setTxStatus] = useState(2) //1-process,  2-message, 3-done 

    const [gasLoader, setGasLoader] = useState(false)

    useEffect(() => {
        props.beforeWallets()
        props.getWalletLists()
    }, [])

    useEffect(() => {
        if (props.user?.user?.tokenWallets.ethereum) {
            setTokenWallets(props.user?.user?.tokenWallets)
        } else {
            setTokenWallets(null)
        }
    }, [props.user.user])

    useEffect(() => {
        if (props.wallets.getWalletsAuth) {
            setWallets(props.wallets.wallets)
            manageCurrenciesOptions(props.wallets.wallets)
        }
    }, [props.wallets.getWalletsAuth])

    useEffect(() => {

        if (amount <= 0) {
            setError("Amount should be greater than 0.")
        }

        if (parseFloat(amount) > parseFloat(selectedSecondaryCurrency?.userBalance)) {
            // check whether the connected wallet have this amount of token
            // call the web3 function to get this value
            setError("You dont have enough Tokens to exchange.")
        } else if (amount > 0) {
            // calculate the gas fee in token
            // alert("calculation = ==")
            calculateGasFeeInToken()
        } else {
            setTxGasFee(0)
        }
        
    }, [amount])

    const calculateGasFeeInToken = async () => {
        setGasLoader(true)
        let tokenWalletAddress = null
        if (selectedSecondaryCurrency?.networkId === 5) { //for goerli
            tokenWalletAddress = tokenWallets?.ethereum
        } else if (selectedSecondaryCurrency?.networkId === 56) { //for binance
            tokenWalletAddress = tokenWallets?.ethereum
        } else if (selectedSecondaryCurrency?.networkId === 97) { //for binance
            tokenWalletAddress = tokenWallets?.ethereum
        } else if (selectedSecondaryCurrency?.networkId === 1) { //for ethereum mainnet
            tokenWalletAddress = tokenWallets?.ethereum
        } else { }

        const gasFee = await calculateGasFee(selectedSecondaryCurrency.walletAddress, selectedSecondaryCurrency.networkId, tokenWalletAddress, amount)
        let gasFeeInToken = await gasFeeConversionInSecondaryCurrency(gasFee)
        gasFeeInToken = await weitoEth(gasFeeInToken)

        setTxGasFee(gasFeeInToken)

        let tokenPayable = parseFloat(amount) + parseFloat(gasFeeInToken)

        if (tokenPayable > parseFloat(selectedSecondaryCurrency?.userBalance)) {
            setError(`You dont enough token to pay for gas. Total Token to Pay : ${tokenPayable}`)
        }
        setGasLoader(false)
    }

    const manageCurrenciesOptions = async (walletsArray) => {
        const secondaryOpts = []
        walletsArray.map((e) => { if (e.type === 2 || e.type === 3) { secondaryOpts.push({ label: <span><img src={e.logo} alt="" />{e.symbol}</span>, value: e.symbol, logo: e.logo, networkId: e.networkId, walletAddress: e.walletAddress, id: e._id, type: e.type, interestRate: e.interestRate }) } })
        setSecondaryCurrenciesOptions([...secondaryOpts])
        let secondaryCurrency = secondaryOpts[0]
        await changeSecondaryCurrencyHandler(secondaryCurrency) // set the first one as a default secondary currencies

        const primaryOpts = []
        walletsArray.map((e) => { if (e.type === 1) { primaryOpts.push({ label: <span><img src={e.logo} alt="" />{e.symbol}</span>, value: e.symbol, logo: e.logo, networkId: e.networkId, walletAddress: e.walletAddress, id: e._id, type: e.type, interestRate: e.interestRate }) } })
        setPrimaryCurrenciesOptions([...primaryOpts])
        let primaryCurrency = primaryOpts[0]
        await changePrimaryCurrencyHandler(primaryCurrency) // set the first one as a default primary currencies
        setFullPageLoader(false)
    }

    const getTokenBalance = async (currency) => {
        let bal = await getBalanceOfToken(currency?.networkId, currency?.walletAddress, tokenWallets?.ethereum)
        return bal
    }

    const changeSecondaryCurrencyHandler = async (currency) => {
        setFullPageLoader(true)
        setAmount(0)
        let bal = await getTokenBalance(currency)
        let totalStakedAmnt = await getStakedAmountFn(currency?.walletAddress)
        setSelectedSecondaryCurrency({ ...currency, userBalance: bal, totalStakedAmnt })
        setError('')
        setFullPageLoader(false)
    }

    const changePrimaryCurrencyHandler = async (currency) => {
        setFullPageLoader(true)
        let bal = await getTokenBalance(currency)
        let totalStakedAmnt = await getStakedAmountFn(currency?.walletAddress)
        setSelectedPrimaryCurrency({ ...currency, userBalance: bal, totalStakedAmnt })
        setFullPageLoader(false)
    }

    const exhangeCurrency = async (e) => {
        e.preventDefault()
        setLoader(true)
        await calculateGasFeeInToken()
        setLoader(false)
        //  show modal to confirm transaction 
        setTxModalShow(true)
    }

    const gasFeeConversionInSecondaryCurrency = (gasFee) => {
        return gasFee * selectedSecondaryTokenValueInUsd
    }

    const tokenExchange = async () => {

        let tokenWalletAddress = null
        let tokenWalletPrivateKey = null
        if (selectedSecondaryCurrency?.networkId === 5) { //for goerli
            tokenWalletAddress = tokenWallets?.ethereum
            tokenWalletPrivateKey = tokenWallets?.ethereumPrivateKey
        } else if (selectedSecondaryCurrency?.networkId === 56) { //for binance
            tokenWalletAddress = tokenWallets?.ethereum
            tokenWalletPrivateKey = tokenWallets?.ethereumPrivateKey
        } else if (selectedSecondaryCurrency?.networkId === 97) { //for binance
            tokenWalletAddress = tokenWallets?.ethereum
            tokenWalletPrivateKey = tokenWallets?.ethereumPrivateKey
        } else if (selectedSecondaryCurrency?.networkId === 1) { //for ethereum mainnet
            tokenWalletAddress = tokenWallets?.ethereum
            tokenWalletPrivateKey = tokenWallets?.ethereumPrivateKey
        } else { }

        setTxStatus(1)
        const res = await tokenExchangeFn(selectedSecondaryCurrency.walletAddress, selectedSecondaryCurrency.networkId, tokenWalletPrivateKey, tokenWalletAddress, amount, trgTokenAmounttoTransfer)
        if (res.status === true) {
            setTxStatus(3)
            setLoader(false)
        } else {
            // some thing wrong with the transaction
            alert("Error should be there")
        }
    }

    const callWalletsFn = () => {
        props.beforeWallets()
        props.getWalletLists()
    }

    const getMaxBalance = async () => {
        setFullPageLoader(true)
        let gasFee = await calculateGasFee(selectedSecondaryCurrency?.walletAddress, selectedSecondaryCurrency?.networkId, chainsConfigs[selectedSecondaryCurrency?.networkId].ownerAddress, selectedSecondaryCurrency?.userBalance)
        gasFee = await weitoEth(gasFee * 2)
        setAmount(selectedSecondaryCurrency?.userBalance - gasFee)
        setFullPageLoader(false)
    }

    return (
        <div className="exchange wallet-details p-3">
            {
                fullPageLoader ? <FullPageLoader /> :
                    <div className="deposit-details  exchange-details">
                        <Container>
                            <div>
                                {/* <div className="d-flex justify-content-end top-head flex-wrap pt-75 ">
                                    <Navbar />
                                </div> */}
                                <h2>Exchange</h2>
                                {
                                    txModalShow && 
                                        <TransactionModal
                                            show={txModalShow}
                                            onHide={() => setTxModalShow(false)}
                                            txGasFee={txGasFee}
                                            txGasFeeSymbol={selectedSecondaryCurrency?.value}
                                            confirmTx={tokenExchange}
                                            txStatus={txStatus}
                                            setLoader = {setLoader}
                                            callWalletsFn = {callWalletsFn}
                                        />
                                }
                                <Row>
                                    <Col xxl={8} xl={7} className="mb-3 mb-xl-0" >
                                        <form onSubmit={exhangeCurrency}>
                                            <div className="transfer-method ">
                                                <strong className="mb-4">TRANSFER</strong>
                                                <span className="mb-3 d-block">From</span>
                                                <div className="d-flex selection-field flex-wrap flex-xl-nowrap align-items-center">
                                                    <div>
                                                        <span className="circle mb-3 mb-xl-0">
                                                            <img src={selectedSecondaryCurrency?.logo} alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="position-relative w-100">
                                                        <Select isSearchable={false} value={selectedSecondaryCurrency} className="w-100" options={secondaryCurrienciesOptions} onChange={changeSecondaryCurrencyHandler} classNamePrefix="triage-select" />
                                                        <><span className="ms-2 balance-span">{selectedSecondaryCurrency?.userBalance}</span> </>
                                                    </div>
                                                </div>
                                                <span className="d-block mb-2">To</span>
                                                <div className="d-flex selection-field flex-wrap flex-xl-nowrap align-items-center">
                                                    <div>
                                                        <span className="circle mb-3 mb-xl-0">
                                                            <img src={selectedPrimaryCurrency?.logo} alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="position-relative w-100">
                                                        <Select
                                                        isSearchable={false}
                                                            value={selectedPrimaryCurrency}
                                                            className="w-100"
                                                            options={primaryCurrienciesOptions}
                                                            onChange={changePrimaryCurrencyHandler}
                                                            classNamePrefix="triage-select"
                                                        />
                                                        <><span className="ms-2 balance-span">{selectedPrimaryCurrency?.userBalance}</span> </>
                                                    </div>
                                                </div>
                                                <span className="d-block mb-2">Enter Amount</span>
                                                <div className="mb-4">
                                                    <div className="input-div">
                                                        <input type="text" autoComplete="off" onKeyDown={(e) => { ENV.decimalNumberValidator(e) }} step={0.1} name="amount" value={amount} onChange={(e) => { setAmount(e.target.value); setError() }} />
                                                        <div className="input-tag" onClick={() => { getMaxBalance(); setError() }}>
                                                            <span>Max</span>
                                                        </div>
                                                        {error && <small className="text-danger error">{error}</small>}
                                                    </div>
                                                </div>

                                                <CurrencyComparison gasLoader={gasLoader} txGasFee={txGasFee} setTokenValue={setSelectedSecondaryTokenValueInUsd} setTrgTokenAmounttoTransfer={setTrgTokenAmounttoTransfer} setValidation={setValidation} currency={selectedSecondaryCurrency} amount={amount || 0} />
                                                <div className="d-flex justify-content-end mb-4">
                                                    <button type="submit" className="btn-triage-div btn-triage" disabled={error || loader ||  !validation ? true : false}><span>Exchange</span>{loader && <SubmitLoader />}</button>
                                                </div>
                                            </div>
                                        </form>
                                    </Col>
                                    {/* interest panel */}
                                    <Col xxl={4} xl={5} >
                                        <InterestPanel currency={selectedSecondaryCurrency} tokenValueInUsd={selectedSecondaryTokenValueInUsd} amount={amount} />
                                    </Col>
                                    {/* end of interest panel */}
                                </Row>

                            </div>
                        </Container>
                    </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    wallets: state.wallets,
    user: state.user,
    dashboard: state.dashboard
})

export default connect(mapStateToProps, { getWalletLists, beforeWallets })(Exchange)