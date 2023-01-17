import React from "react";
import "./timeExecution.css"
import TimeExecute from "../../../assets/images/time-execution.png"

import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom";

function TimeExecution(){
    return(
        <div className="time-execution">
            <Container>
                <Row className="align-items-center">
                   
                    <Col className="mb-3 mb-xl-0" xl={6} >
                        <div className="main-img">
                            <img className="img-fluid" src={TimeExecute} alt="" />
                        </div>
                    </Col>
                    <Col lg={1}></Col>
                    <Col className="mb-3 mb-xl-0" xl={5} >
                        <h2>RAPID, REAL TIME EXECUTION</h2>
                        <div className="para">
                        <p className="mb-3">In the volatile cryptocurrency exchanges, every second counts. Our highly responsive tech can react instantly, executing a huge volume of transactions simultaneously.</p>
                        <p>Duis mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna sit amet, luctus aliquet nibh. Curabitur auctor leo et libero consectetur gravida.</p>
                        </div>
                        <Link to={'/sign-up'} className="btn-triage-div btn-triage"><span>Open a Wallet</span></Link>
                    </Col>
                </Row>

            </Container>

        </div>
    )
}
export default TimeExecution