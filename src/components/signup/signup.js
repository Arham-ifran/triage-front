import React, { useState, useEffect } from "react";
import validator from "validator";
import { Container, Row, Col, Form } from "react-bootstrap";
import Rating from "../../assets/images/rate.png"
import Regulate from "../../assets/images/regulated.png"
import Fifty from "../../assets/images/50.svg"
import Shape from "../../assets/images/triage-shape.svg"
import "../../components/login/login.css"
import { connect } from 'react-redux'
import { register } from '../../redux/user/user.action'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import PasswordInput from "../passwordInput/passwordInput";
import { emptyError } from '../../redux/shared/error/error.action';
import queryString from 'query-string';
import FullPageLoader from '../FullPageLoader/FullPageLoader'
import SubmitLoader from "../submitLoader/submitLoader";

function Signup(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const { referralKey } = queryString.parse(location.search);

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const [agreeCheck, setAgreeCheck] = useState(false)
    const [err, setErr] = useState({})
    const [showPwd, setShowPwd] = useState(false)
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        props.emptyError()
    }, [])

    useEffect(() => {
        if (props.user.user) {
            setLoader(false)
            if(props.user.user.userKYCStatus) {
                navigate("/wallet")
            }
            else {
                navigate('/kyc')
            }
        }
    }, [props.user])

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
        if (data.firstName == "") {
            error["firstName"] = 'First Name is required.'
            isValid = false
        }
        if (data.lastName == "") {
            error["lastName"] = 'Last Name is required.'
            isValid = false
        }
        if (data.email == "") {
            error["email"] = 'Email is required.'
            isValid = false
        }
        if (data.email && !validator.isEmail(data.email) ) {
            error["invalidEmail"] = 'Invalid Email'
            isValid = false
        }

        if (data.password == "") {
            error["password"] = 'Password is required.'
            isValid = false
        }

        if(data.password && !validator.isStrongPassword(data.password, [{minLength: 8,minUppercase: 1,pointsForContainingNumber: 1}])) {
            error["passwordStrength"] = 'password should be 8 characters long with one upper case letter and one digit.'
            isValid = false
        }

        if (!agreeCheck) {
            error["agreeCheck"] = 'You must have to agree with the term and conditions.'
            isValid = false
        }
        setErr({ ...error })
        return isValid
    }

    const registerUser = (e) => {
        e.preventDefault()
        if (validation()) {
            if (referralKey) {
                data.referralKey = referralKey;
            }
            setLoader(true)
            props.register(data)
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
                    <Col className="mb-3 mb-lg-0 d-flex justify-content-center align-items-center index" xl={1} lg={1}>
                        <div className="separator-div">
                        </div>
                    </Col>
                    <Col className="mb-3 mb-lg-0" xl={5} lg={6}>
                        <Form onSubmit={registerUser} >
                            <div className="login-form position-relative ">
                                <h2>SIGN UP</h2>
                                <Row>
                                    <Col xl={6}>

                                        <label>First Name</label>
                                        <div className="input email-input w-100 mb-3">
                                            <input name="firstName" type="text" placeholder="First Name" onChange={(e) => setData({ ...data, firstName: e.target.value })} />
                                            {
                                                (err["firstName"] && !data.firstName) && <p className="error">{err["firstName"]}</p>
                                            }
                                        </div>
                                    </Col>
                                    <Col xl={6}>
                                        <label>Last Name</label>
                                        <div className="input email-input w-100 mb-3">
                                            <input name="lastName" type="text" placeholder="Last Name" onChange={(e) => setData({ ...data, lastName: e.target.value })} />
                                            {
                                                (err["lastName"] && !data.lastName ) && <p className="error">{err["lastName"]}</p>
                                            }

                                        </div>
                                    </Col>
                                </Row>



                                <label>Email</label>
                                <div className="input email-input mb-3"> <input name="email" type="email" placeholder="Enter Your Email" onChange={(e) => changeData(e.target.name, e.target.value)} />
                                {
                                    (err["email"] && !data.email) && <p className="error">{err["email"]}</p>
                                }
                                  {
                                    (err["invalidEmail"] && data.email) && <p className="error">{err["invalidEmail"]}</p>
                                }
                                </div>
                              

                                <div className="input email-input mb-3 position-relative">
                                    <PasswordInput name="password" label="Password" changeData={changeData} errorMsg={err?.password && !data.password ? err?.password : ""} 
                                    passwordStrengthMsg={err?.passwordStrength}
                                    />
                                </div>
                                <div className="confirmation pt-4 mb-5">
                                    <div className="d-flex justify-content-between align-items-baseline flex-wrap pt-3 ">
                                        <div className=" ">
                                            <div className="form-group d-flex ">
                                                <div>
                                                    <input type="checkbox" id="html" onClick={(e) => setAgreeCheck(e.target.checked)} />

                                                    <label className="agree-text p-0" for="html">
                                                        I agree with <Link to="/terms-conditions" className="text-white  p-0">Term & Conditions.</Link>
                                                    </label>
                                                </div>

                                                {/* <span for="html"></span> */}
                                            </div>
                                            {
                                                (err["agreeCheck"] && !agreeCheck) && <p className="error">{err["agreeCheck"]}</p>
                                            }
                                            {
                                                err["auth"] && <p className="error">{err["auth"]}</p>
                                            }
                                        </div>

                                        <button type="submit" className="btn-triage-div btn-triage  justify-content-center d-flex align-items-center"><span>Sign Up</span>{loader && <SubmitLoader />}</button>
                                    </div>
                                </div>
                                <div className="no-account">
                                    <span >Already registered?<Link className="signup" to="/sign-in"> Sign in</Link> </span>
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
    user: state.user,
    error: state.error
})

export default connect(mapStateToProps, { register, emptyError })(Signup)