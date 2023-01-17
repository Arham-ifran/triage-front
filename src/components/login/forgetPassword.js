import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../../assets/images/rate.png"
import Regulate from "../../assets/images/regulated.png"
import Fifty from "../../assets/images/50.svg"
import Shape from "../../assets/images/triage-shape.svg"
import "./login.css"
import { connect } from 'react-redux'
import { forgotPassword, beforeUser } from '../../redux/user/user.action'

function ForgetPassword(props) {

    const [data, setData] = useState({
        email: '',
    })

    const [err, setErr] = useState({})

    const validation = () => {
        let error = {}
        let isValid = true
        if (data.email == "") {
            error["email"] = 'Email is required.'
            isValid = false
        }
        setErr(error)
        return isValid
    }

    const forgetPwd = (e) => {
        e.preventDefault()
        if (validation()) {
            props.forgotPassword(data)
        }
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
                    <Col className="mb-3 mb-lg-0 d-flex justify-content-center align-items-center index"  xl={1} lg={1}>
                        <div className="separator-div">
                        </div>
                    </Col>
                    <Col className="mb-3 mb-lg-0" xl={5} lg={6}>
                        <Form onSubmit={forgetPwd}>
                            <div className="login-form position-relative ">
                                <div className="top-heading set-password">
                                    <h2>SET NEW PASSWORD</h2>
                                </div>
                                <label>Email associated with your account</label>
                                <div className="input email-input"> <input type="email" placeholder="Enter Your Email" onChange={(e) => { props.beforeUser(); setData({ ...data, email: e.target.value }) }} />
                                {
                                    err["email"] && <p className="error ms-1">{err["email"]}</p>
                                }
                                </div>
                              
                                <div className="confirmation">
                                    <div className="d-flex justify-content-end ">
                                        <button type="submit" className="btn-triage-div btn-triage  justify-content-center d-flex align-items-center"><span>Send Code</span></button>
                                    </div>
                                </div>
                                {
                                    props?.user?.forgotMsg && <h5 className="text-success text-center">{props?.user?.forgotMsg}</h5>
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

export default connect(mapStateToProps, { forgotPassword, beforeUser })(ForgetPassword)