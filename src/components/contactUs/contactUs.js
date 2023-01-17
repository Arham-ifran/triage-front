import React, { useState, useEffect } from "react";
import Design from "../../assets/images/banner-design.png"
import { Col, Container, Row } from "react-bootstrap";
import { connect } from 'react-redux'
import Contact from "../../assets/images/contact.svg";
import validator from "validator";
import Mail from "../../assets/images/email.svg"
import UserIcon from "../../assets/images/operator.svg"
import { beforeFooter, contactUs } from "../shared/footer/footer.action";
import MessageAlert from "../messageAlert/messageAlert";

import "./contactUs.css"

function ContactUs(props) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [country, setCountry] = useState('')
    const [message, setMessage] = useState('')
    const [msg, setMsg] = useState({
        username: '',
        email: '',
        message: ''
    })
    const [showAlertMsgModal, setShowAlertMsgModal] = useState(false)


    const submit = (e) => {
        e.preventDefault()

        let check = true
        let userEmail = '';
        let username = '';
        let userMessage = '';

        if (validator.isEmpty(name)) {
            username = " Name Required"
            check = false
        }

        if (validator.isEmpty(email)) {
            userEmail = "Email Required"
            check = false
        }

        if (!validator.isEmpty(email) && !validator.isEmail(email)) {
            userEmail = "Invalid Email"
            check = false
        }

        if (validator.isEmpty(message)) {
            userMessage = "Message Required"
            check = false
        }

        setMsg({
            userEmail,
            username,
            userMessage
        })


        if (check) {
            let body = {
                name, email, country, message
            }
            props.contactUs(body)
        }

    }

    useEffect(() => {
        if (props.footer.submitContactAuth) {
            props.beforeFooter()
            setShowAlertMsgModal(true)
            setName('')
            setEmail('')
            setCountry('')
            setMessage('')
        }
    }, [props.footer.submitContactAuth])

    return (
        <div className="contact-us">
            <Container >
                <Row className="align-items-center">
                    <Col xl={{ span: 6, order: 1 }} xxl={6} className="index">
                        <div className="d-flex justify-content-end mb-4 mb-md-0">
                            <img className="img-fluid" src={Contact} alt="" />
                        </div>

                    </Col>
                    <Col xxl={6} xl={6} className="index mb-4 mb-xl-0">
                        <div className="headings">
                            <h2>CONTACT US</h2>
                            <p>Proin vulputate congue metus, eget vestibulum dolor porta ac. In pretium sem quis libero efficitur, nec aliquam lorem convallis. Vivamus rutrum,</p>
                        </div>
                        {/* <div className="inquiry-form">
                            <h3>SEND US INQUIRY NOW</h3>
                            <form>
                                <div className="inquiry-input"><input type="text" placeholder="Your Name*" value={name} onChange={(e) => setName(e.target.value)} /></div>
                                <span className={msg.username ? `` : `d-none`}>
                                    <label className="pl-1 pt-0 text-danger">{msg.username}</label>
                                </span>
                                <div className="inquiry-input"><input type="email" placeholder="Your Email*" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                                <span className={msg.userEmail ? `` : `d-none`}>
                                    <label className="pl-1 pt-0 text-danger">{msg.userEmail}</label>
                                </span>
                                <div className="inquiry-input"><input type="text" placeholder="Your Country*" value={country} onChange={(e) => setCountry(e.target.value)} /></div>
                                <div className="inquiry-input"><textarea type="text" placeholder="Your Requirement*" value={message} onChange={(e) => setMessage(e.target.value)} /></div>
                                <span className={msg.userMessage ? `` : `d-none`}>
                                    <label className="pl-1 pt-0 text-danger">{msg.userMessage}</label>
                                </span>
                                <button className="btn-triage-div btn-triage " onClick={(e) => submit(e)}><span>Submit</span></button>
                            </form>

                        </div> */}
                    </Col>

                </Row>
                <div>
                    <Row className="align-items-center">
                        <Col xxl={6} xl={6} className="index mb-4">
                            <div className="inquiry-form">
                                <h3>SEND US INQUIRY NOW</h3>
                                <form>
                                    <div className="inquiry-input"><input type="text" placeholder="Your Name*" value={name} onChange={(e) => setName(e.target.value)} />
                    
                                    <span className={msg.username ? `` : `d-none`}>
                                        <label className="pl-1 pt-0 text-danger">{msg.username}</label>
                                    </span>
                                    </div>
                                    <div className="inquiry-input">
                                        <input type="email" placeholder="Your Email*" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <span className={msg.userEmail ? `` : `d-none`}>
                                        <label className="pl-1 pt-0 text-danger">{msg.userEmail}</label>
                                    </span>
                                    </div>
                                    <div className="inquiry-input"><input type="text" placeholder="Your Country" value={country} onChange={(e) => setCountry(e.target.value)} /></div>
                                    <div className="inquiry-input"><textarea type="text" placeholder="Your Requirement*" value={message} onChange={(e) => setMessage(e.target.value)} />
                                        <span className={msg.userMessage ? `` : `d-none`}>
                                            <label className="pl-1 pt-0 text-danger">{msg.userMessage}</label>
                                        </span>
                                    </div>

                                    <button className="btn-triage-div btn-triage " onClick={(e) => submit(e)}><span>Submit</span></button>
                                    {/* <div className="pt-3">
                                        <span className={msg.userMessage ? `` : `d-none`}>
                                            <label className="pl-1 pt-0 error">{msg.userMessage}</label>
                                        </span>
                                    </div> */}
                                </form>

                            </div>
                        </Col>
                        <Col xxl={{ span: 6, order: 1 }} xl={6} className="index mb-4">

                            <h3 className="mb-3">GET IN TOUCH</h3>
                            <Row>
                                <Col md={6} className="mb-3 mb-md-0">
                                    <div className="address-box">
                                        <div className="mb-4">
                                            <img src={Mail} alt="" />
                                        </div>
                                        <span className="small-text">Contact our team via e-mail, at any time, at support@triage.com</span>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="address-box">
                                        <div className="mb-3">
                                            <img src={UserIcon} alt="" />
                                        </div>
                                        <span className="small-text">Triage expert, global professionals are available, 24/7, via live chat</span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <MessageAlert
                    type="success"
                    greeting="Great!"
                    description={"Support Form successfully sent"}
                    show={showAlertMsgModal}
                    onHide={() => setShowAlertMsgModal(false)}
                />
            </Container>

        </div>
    )
}


const mapStateToProps = (state) => ({
    footer: state.footer
})

export default connect(mapStateToProps, { beforeFooter, contactUs })(ContactUs)