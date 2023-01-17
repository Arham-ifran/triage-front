import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Rating from "../../assets/images/rate.png"
import Regulate from "../../assets/images/regulated.png"
import Fifty from "../../assets/images/50.svg"
import Shape from "../../assets/images/triage-shape.svg"
import "./login.css"
import { connect } from 'react-redux'
import { resetPassword, beforeUser } from '../../redux/user/user.action'
import PasswordInput from "../passwordInput/passwordInput";

function ResetPassword(props) {

    let { userId, resetPasswordToken } = useParams();

    const [data, setData] = useState({
        password: '',
        confirmPassword: ''
    })

    const [err, setErr] = useState({})
    const [showPwd, setShowPwd] = useState(false)
    const [showPwdConfirm, setShowPwdConfirm] = useState(false)

    const changeData = (name, value) => {
        let tempData = data
        tempData[name] = value
        setData({...tempData})
    }

    const validation = () => {
        let error = {}
        let isValid = true
        if (data.password == "") {
            error["password"] = 'Field is required.'
            isValid = false
        }
        if (data.confirmPassword == "") {
            error["passwordConfirm"] = 'Field is required.'
            isValid = false
        }
        if (data.password !== data.confirmPassword) {
            if (isValid) {
                error["formErr"] = 'Both Password should be same.'
            }
            isValid = false
        }
        setErr(error)
        return isValid
    }

    const resetPwd = (e) => {
        e.preventDefault()
        if (validation()) {
            props.resetPassword({ password: data.password, resetPasswordToken })
        }
    }

    return (
        <div className="login">

            <Container>
                <Row className="justify-content-center align-items-center ">
                    <Col className="mb-4 mb-lg-0 shape-side index" lg={6}>
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
                    <Col className="mb-3 mb-lg-0 d-flex justify-content-center align-items-center index" lg={1}>
                        <div className="separator-div">
                        </div>
                    </Col>
                    <Col className="mb-3 mb-lg-0" lg={5}>
                        <Form onSubmit={resetPwd}>
                            <div className="login-form position-relative ">
                                <div className="top-heading">
                                    <h2>SET NEW PASSWORD</h2>
                                </div>
                                <div className=" password-input-account mb-4">
                                    <PasswordInput name="password" label="Password" changeData={changeData} errorMsg={err?.password} />
                                </div>
                                <div className=" password-input-account mb-5">
                                    <PasswordInput name="confirmPassword" label="Confirm Password" changeData={changeData} errorMsg={err?.passwordConfirm} />
                                </div>
                                {
                                    err["formErr"] && <p className="error">{err["formErr"]}</p>
                                }
                                <div className="confirmation">
                                    <div className="d-flex justify-content-end ">
                                        <button type="submit" className="btn-triage-div btn-triage  justify-content-center d-flex align-items-center"><span>Reset</span></button>
                                    </div>
                                </div>
                                {
                                    props?.user?.resetMsg && <p className="error">{props?.user?.resetMsg}</p>
                                }
                                <div style={{ bottom: "0" }} className="no-account">
                                    <span ><Link className="signup" to="/sign-in"> Return to Sign in page</Link> </span>
                                </div>
                            </div>
                        </Form>
                    </Col>
                </Row>

            </Container>

        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { resetPassword, beforeUser })(ResetPassword)