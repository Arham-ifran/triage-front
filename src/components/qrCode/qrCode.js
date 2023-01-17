import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Scan from "../../assets/images/scan.png"
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from "react-bootstrap";
import { beforeQr, otpVerfication, getQrCode } from './qr.action'
import { connect } from 'react-redux'
import { ENV } from "../../config/config";
import { useNavigate } from 'react-router-dom'

function QrCode(props) {
    const [qr, setQr] = useState(props?.qrCode);
    const [otp, setOtp] = useState(0);
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('accessToken'))
            props.getQrCode()
    }, [localStorage.getItem('accessToken')])

    useEffect(() => {
        if (props.qr.getQrCodeAuth) {
            setQr(props.qr.getQrCode.data)
            props.beforeQr()
        }
    }, [props.qr.getQrCodeAuth])

    useEffect(() => {
        if (props.qr.otpVerfiedAuth) {
            if (props.qr?.otpVerfied?.isVerified) {
                props.setVerified(true)
                props.onHide();
                navigate(props.redirctPath)
            }
            props.beforeQr()
        }
    }, [props.qr.otpVerfiedAuth])

    const handleOtpSend = () => {
        if (!otp)
            console.log("otp not sent")
        else {
            if(props.securityType === 'login'){
                props.setVerified(true)
                props.onHide()
            }else {
                setError('')
                let obj = { userToken: otp }
                const query = ENV.objectToQueryString(obj)
                props.otpVerfication(query)
            }
        }
    }

    return (
        <Modal
            className="triage-model"
            show={props.show}
            onHide={() => {
                props.setVerified(false)
                props.onHide()
                }
                
            }
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            // className="security-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Please Enter your 2FA code
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="">
                <Row className="pt-4 align-items-center">
                    {
                        qr && 
                            <Col lg={2}>
                                <div>
                                    <img className="img-fluid" src={qr} alt="" />
                                </div>
                            </Col>
                    }
                    <Col lg={10}>
                        <span>Two Factor Authentication</span>
                        <div className="mb-4 input position-relative">
                            <label>Security Code</label>
                            <div className="code-input"> <input placeholder="Enter security code" onChange={(e) => {setOtp(e.target.value);  if(props.securityType === 'login') {props?.setOtpCode(e.target.value)}}} /></div>
                            <a href="" className="copy-icon">
                            </a>
                        </div>
                        <p className="guide-alert">Please enter the OTP displaying on you Google Authenticator App.</p>
                    </Col>

                </Row>
                {props?.error && <p className="error">{props?.error?.message}</p>}
                
            </Modal.Body>
            <Modal.Footer className="justify-content-center align-items-center d-flex">
            {/* <div className="d-flex justify-content-center"> */}
                    <button className="btn-triage-div btn-triage" onClick={handleOtpSend} disabled={otp ? false: true} ><span>Send</span></button>
                {/* </div> */}
            </Modal.Footer>
        </Modal>
    );
}


const mapStateToProps = (state) => ({
    qr: state.qr,
    error: state?.error?.error
})

export default connect(mapStateToProps, { beforeQr, otpVerfication, getQrCode })(QrCode)