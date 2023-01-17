import React, { useState, useEffect } from 'react'
import Refresh_icon from "../../assets/images/refresh-small.svg"
import { Col, Row } from "react-bootstrap";
import { ENV } from '../../config/config';
import { ownerTrgBalance } from '../../utils/web3';

const CurrencyComparison = (props) => {

    const [convertedAmount, setConvertedAmount] = useState(0)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (props?.currency?.value == "usd") {
            usdToTrg()
        } else {
            tokenConversion()
        }
    }, [props?.currency, props?.amount])

    // USD to TRG conversion
    const usdToTrg = async () => {
        // get the value of the triage token when it will live
        let trgValue = 1
        let amountToBeTransfer = trgValue * props?.amount
        setConvertedAmount(trgValue * props?.amount)
        const trgBal = await ownerTrgBalance()
        if (trgBal <= amountToBeTransfer) {
            setError("Platform dont have enough ERC20 TRG Token.")
            props.setValidation(false)
        } else {
            setError(null)
            props.setValidation(true)
        }
    }

    // to convert the value of currency token to triage
    const tokenConversion = () => {
        // call the api to get the latest value of token symbol 
        const url = `${ENV.url}currencyCap/get?symbol=${props?.currency?.value}`;
        fetch(url, {
            method: "GET",
            headers: {
                'Authorization': ENV.Authorization,
                'x-auth-token': ENV.x_auth_token,
                'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : '',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json()).then(async (data) => {
            if (data.success) {
                let currencyCap = data.data.currencyCap
                // token value 
                let tokenValue = currencyCap[`${props?.currency?.value}InUSD`] || 1
                if (props?.amount === 0) {
                    setConvertedAmount(0)
                } else {
                    props.setTokenValue(tokenValue)
                    let amountToBeTransfer = tokenValue * props?.amount
                    setConvertedAmount(amountToBeTransfer)

                    const trgBal = await ownerTrgBalance()

                    if (amountToBeTransfer > trgBal) {
                        setError("Platform dont have enough ERC20 TRG Token.")
                        props.setValidation(false)
                    } else {
                        setError(null)
                        props.setTrgTokenAmounttoTransfer(amountToBeTransfer)
                        props.setValidation(true)
                    }
                }

            } else { }
        }).catch(error => {
            if (error.response && error.response.data) {
                const { data } = error.response
                if (data.message)
                    console.log("Error : ", data.message)
            }
        })
    }

    // const calculateFee = () => {
    //     // calculate the fee to convert the token into the primary token (TRG)

    //     return 0
    // }

    const refreshValues = () => {
        // call the api again and get updated value of the token
        tokenConversion()
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center flex-wrap current-rate">
                <div>
                    <span className="me-4">Current exchange rate</span>
                    <span className="guide-alert">{ENV.primaryTokenName}</span>
                </div>
                <div>
                    <span className="guide-alert"><img className="me-2" src={Refresh_icon} alt="" onClick={() => refreshValues()} /> {props?.amount || 0} {props?.currency?.value} = {convertedAmount.toFixed(4) || 0} {ENV.primaryTokenName}</span>
                </div>
            </div>
            <Row className="mb-4">
                <Col xl={6} md={12}  className="mb-3 mb-xxl-0">
                    <div className="transfer-pay w-100 m-0">
                        <span className="d-block mb-1 comparison-text">Total to pay</span>
                        <div className="d-flex align-items-center comparison-value">
                            <strong className="d-inline me-2">{props?.amount || 0}</strong>
                            <span className="sub-heading pt-1">{props?.currency?.value}</span>
                        </div>
                        <span className="sub-heading pt-1 comparison-fee">Fees {props?.txGasFee || 0} {props?.currency?.value}</span>
                    </div>
                </Col>
                <Col xl={6} md={12}  className="mb-3 mb-xxl-0">
                    <div className="transfer-pay w-100 m-0">
                    <span className="d-block mb-1 comparison-text">You will get</span>
                        <div className="d-flex align-items-center comparison-value">
                            <strong className="d-inline me-2">{props.extraTokens ? (convertedAmount + props.extraTokens).toFixed(4) : convertedAmount.toFixed(4) || 0}</strong>
                            <span className="sub-heading pt-1">{ENV.primaryTokenName}</span>
                        </div>
                    </div>
                </Col>
            </Row>
            {error && <span className='text-danger error'>{error}</span>}
        </div>
    )
}

export default CurrencyComparison