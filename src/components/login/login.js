import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../../assets/images/rate.png"
import Regulate from "../../assets/images/regulated.png"
import Fifty from "../../assets/images/50.svg"
import Shape from "../../assets/images/triage-shape.svg"
import "./login.css"
import { connect } from 'react-redux'
import { login, getEnabledSecurity, beforeSecurity } from '../../redux/user/user.action'
import { useNavigate } from 'react-router-dom'
import PasswordInput from '../passwordInput/passwordInput'
import { emptyError } from '../../redux/shared/error/error.action';
import QrCode from "../qrCode/qrCode";
import CheckSecurity from "../qrCode/checkSecurity";
import FullPageLoader from '../FullPageLoader/FullPageLoader'
import SubmitLoader from "../submitLoader/submitLoader";

function Login(props) {
    const [qrShow, setQrShow] = useState(false);
    const handleClose = () => setQrShow(false);

    const navigate = useNavigate()

    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const [err, setErr] = useState({})
    const [renderSecurity, setRednerSecuirty] = useState(false);
    const [otpCode, setOtpCode] = useState()
    const [qrCode, setQrCode] = useState()
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        if (props.user.getSecurityAuth) {
            const { security } = props.user
            if(security?.login){
                setQrCode(security?.qrCode)
                if(security?.qrCode || security?.qrCode === null){
                    setRednerSecuirty(true)
                }
            }else {
                let tempData = {
                    ...data,
                }
                props.login(tempData)
            }
        }
    }, [props.user.getSecurityAuth])

    useEffect(() => {
        if (props.user.user) {
            // setQrShow(true);
            // setRednerSecuirty(true)
            setLoader(false)
            console.log(props.user.user, "props.user.user:star:")
            if(props.user.user?.kycApplied?.appliedKYC) {
                navigate("/wallet")
            }
            else {
                navigate('/kyc')
            }
        }
    }, [props.user])

    useEffect(()=> {
        if(otpCode){
            let tempData = data
            tempData["otp"] = otpCode
            setData({ ...tempData })
        }
    }, [otpCode])

    useEffect(() => {
        props.emptyError()
        setRednerSecuirty(false)
    }, [])

    useEffect(() => {
        if (props.error.error) {
            let error = err
            error["auth"] = props?.error?.error?.message
            setErr({ ...error })
            setLoader(false)
        } else {
            setErr({})
        }
    }, [props.error.error])

    const changeData = (name, value) => {
        let tempData = data
        tempData[name] = value
        setData({ ...tempData })
    }

    const validation = () => {
        let error = {}
        let isValid = true
        if (data.email == "") {
            error["email"] = 'Email is required.'
            isValid = false
        }
        if (data.password == "") {
            error["password"] = 'Password is required.'
            isValid = false
        }
        setErr(error)
        return isValid
    }

    const login = async (e) => {
        e.preventDefault()
        if (validation()) {
            setLoader(true)
            // check whether the 2FA authentication is enabled for login using email then render the code accordingly
            props.beforeSecurity()
            props.getEnabledSecurity(data)

            // setRednerSecuirty(true)
        }
    }

    const setVerified = async (value) => {
        if (value) {
            let tempData = {
                ...data,
                otp: otpCode
            }
            await props.login(tempData)
        }
        setRednerSecuirty(false)
    }

    return (
        <div className="login">
            <Container>
                <Row className="justify-content-center align-items-center ">
                    <Col className="mb-4 mb-lg-0 shape-side index" xl={6} lg={5}>
                        <div className="shape" >
                            <img className="img-fluid" src={Shape} alt="" />
                        </div>
                        <ul className="d-flex m-0 pl-4 list-unstyled align-items-baseline flex-wrap list-items" >
                            <li >
                                <div className="mb-4"><img src={Rating} alt="" /></div>
                                <span className=" text-white with-us">A big love with us</span>
                            </li>
                            <li>
                                <div className="mb-2">
                                    <img src={Regulate} alt="" />
                                </div>
                                <span className=" text-white">Official European Union license</span>
                            </li>
                            <li>
                                <div className="mb-2">
                                    {/* <img src={Regulate} alt="" /> */}
                                    <img className="img-fluid" src={Fifty} alt="" />
                                </div>
                                <span className=" text-white">over 50 exchanges automatically</span>
                            </li>
                        </ul>
                    </Col>
                    <Col className="mb-3 mb-lg-0 d-flex justify-content-center align-items-center index" xl={1} lg={1}>
                        <div className="separator-div">
                        </div>
                    </Col>
                    <Col className="mb-3 mb-lg-0" xl={5} lg={6}>
                        <Form onSubmit={login}>
                            <div className="login-form position-relative ">
                                <h2>LOGIN</h2>
                                <label>Email</label>
                                <div className="input email-input"> <input autocomplete="off" name="email" type="email" placeholder="Enter Your Email" onChange={(e) => changeData(e.target.name, e.target.value)} />
                                {
                                    err["email"] && <p className="error ms-1">{err["email"]}</p>
                                }
                                </div>
                                <div className="position-relative input email-input">
                                    <PasswordInput name="password" label="Password" changeData={changeData} errorMsg={err?.password} />
                                </div>
                                {
                                    err["auth"] && <p className="error ms-1">{err["auth"]}</p>
                                }
                                <div className="confirmation">
                                    <Link className="forget-password" to="/forget-password">Forget your password?</Link>
                                    <div className="d-flex justify-content-end ">
                                        <button type="submit" className="btn-triage-div btn-triage  justify-content-center d-flex align-items-center"><span>Sign in</span>{loader && <SubmitLoader />}</button>
                                    </div>
                                </div>
                                <div className="no-account">
                                    <span >Don't have account yet?<Link className="signup" to="/sign-up"> Sign up</Link> </span>
                                </div>
                            </div>
                        </Form>
                    </Col>
                </Row>

            </Container>
            {renderSecurity && <CheckSecurity setVerified={setVerified} securityType="login" setOtpCode={setOtpCode} QRCode={qrCode} redirctPath="/" />}
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    error: state.error
})

export default connect(mapStateToProps, { login, emptyError, getEnabledSecurity, beforeSecurity })(Login)