import { faArrowRight, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./payment.css"
import { useNavigate, useLocation } from 'react-router-dom';

function Payment(props) {

    const navigate = useNavigate()
    const search = useLocation().search;
    const type = new URLSearchParams(search).get('type');
    
    
    const redirection = () => {
        if(type === "success"){
            navigate('/earn-interest')
        }
        if(type === "fail"){
            navigate('/deposit')
        }
    }

    return (
        <div className="payment index">
            <Container>
                <Row>
                    <Col className="index" xl={12}>
                        <div className="d-flex justify-content-center align-items-center">

                            {
                                type === "success" ? 
                                    <div className="success-msg-circle">
                                        <FontAwesomeIcon className="tick-icon" icon={
                                            faCheck
                                        } />
                                    </div>
                                    : 
                                    <div className="error-msg-circle">
                                        <FontAwesomeIcon className="tick-icon" icon={
                                            faXmark
                                        } />
                                    </div>
                            }
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <h1>Payment Done</h1>

                        </div>
                        <div className="d-flex justify-content-center align-items-center ">
                            <button onClick={() => redirection()} className="btn-triage-div btn-triage">
                                <span>{type === "success" ? "Redirect to Earn Interest" : "Redirect to Deposit"}</span>
                                <div className="ms-3"><span className="arrow"><FontAwesomeIcon icon={faArrowRight} /> </span></div>
                            </button>
                        </div>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}
export default Payment