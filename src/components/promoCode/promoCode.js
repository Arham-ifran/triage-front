import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { connect } from 'react-redux';
import Profile from "../../assets/images/profile.png"
import Navbar from "../shared/navbar/navbar";
import { verifyPromoCode, beforePromoCode, usedPromos } from "./promoCode.action";
import Alert from 'react-bootstrap/Alert';
import moment from 'moment';
import { ENV } from '../../config/config';
import "./promoCode.css"
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import SubmitLoader from "../submitLoader/submitLoader";

function Promo_Code(props) {
    const { _id } = ENV.getUserKeys('_id')
    const [promoCode, setPromoCode] = useState('')
    const [data, setData] = useState(null)
    const [promoCodeVerified, setPromoCodeVerified] = useState('')
    const [loader, setLoader] = useState(true)
    const [verifyPromoLoader, setVerifyPromoLoader] = useState(false)

    useEffect(() => {
        props.usedPromos(_id)
    }, [])


    const verifyPromoCode = () => {
        setVerifyPromoLoader(true)
        props.verifyPromoCode(promoCode);
    }


    useEffect(() => {
        if (props.promocodes.verifyPromoCodeAuth) {
            props.beforePromoCode();
            setPromoCodeVerified(true)
            setVerifyPromoLoader(false)
        }
    }, [props.promocodes.verifyPromoCodeAuth])

    useEffect(() => {
        if (props.promocodes.usedPromoCodesAuth) {
            props.beforePromoCode();
            const { usedpromoCodes } = props.promocodes.usedpromocodesData
            setData(usedpromoCodes)
            setLoader(false)
        }
    }, [props.promocodes.usedPromoCodesAuth])

    return (
        <div className="promo-code wallet-details p-3">
            {
                loader ? <FullPageLoader />
                :
                <div className="promo-code-details d-flex">
                    <Container>

                        {/* <div className="d-flex justify-content-end top-head flex-wrap pt-75">
                            <Navbar />
                        </div> */}
                        <div>
                            <h2>Promo Code</h2>
                            <div className="enter-code-box">
                                <strong>Verify Promo code</strong>
                                <div className="d-flex align-items-center flex-wrap flex-md-nowrap mb-3">
                                    <div className="enter-input mb-3 mb-md-0">
                                        <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                                    </div>
                                    <button style={{ padding: "11px 40px" }} onClick={() => verifyPromoCode()} disabled={promoCode ? false : true} className="btn-triage-div btn-triage"><span>Check</span>{verifyPromoLoader && <SubmitLoader />}</button>
                                </div>
                                {promoCodeVerified ?
                                    <Alert variant={props.promocodes.promoCode.success ? 'success' : 'danger'} className="d-inline-block" dismissable="true">
                                        {props.promocodes.promoCode.message}
                                    </Alert> : ''}
                            </div>
                        </div>
                        <div>
                            <h2>Promo Codes</h2>
                            {/* Loader */}
                            {/* <div class="center-body-loader">
                                <div class="loader-triangle-9">
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                            <button className="d-flex justify-content-center align-items-center"><span>testing</span><SubmitLoader /> </button> */}
                            {/* Loader */}

                            <div className="history p-0 bg-transparent shadow-none">
                                <div className="table-responsive">
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Times Used</th>
                                                <th>Code Type</th>
                                                <th>Bonus</th>
                                                <th>Created At</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data && data.length > 0 ? data.map((code, index) => (
                                                <tr>
                                                    <td>{code.title}</td>
                                                    <td>{code.noOfTimesUsed}</td>
                                                    <td>{code.codeType === 1 ? "Token" : "Profit"}</td>
                                                    < td >{code.bonus}</td>
                                                    <td>{moment(code.createdAt).format('DD MMM YYYY')}</td>
                                                </tr>
                                            )) : <tr><td colSpan={7} ><div className="d-flex justify-content-center align-items-center not-found-alert"><span>'You have not used any promos yet.'</span></div></td></tr>
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>

                        </div>
                    </Container>
                </div >
            }
        </div >
    )
}

const mapStateToProps = state => ({
    promocodes: state.promocodes,
    error: state.error
});

export default connect(mapStateToProps, { verifyPromoCode, beforePromoCode, usedPromos })(Promo_Code);