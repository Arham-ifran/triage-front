import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import "./myAccount.css"

function FinancialReport() {
    return (
        <>
            <div className="financial-report position-relative">
                <Container>
                    <strong>
                        Choose currencies to be included in the report
                    </strong>
                    <p>Your report will only be include selected currencies</p>
                    <Row>
                        <Col xl={4}>
                            <ul className="w-100">
                                <li className="d-flex justify-content-between ms-4 flex-wrap">
                                    <div> <span>Login</span></div>
                                    <div>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                            />
                                        </Form>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-between ms-4 flex-wrap">
                                    <div> <span>Withdrawal requests </span></div>
                                    <div>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                            />
                                        </Form>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-between ms-4 flex-wrap">
                                    <div> <span>Account deletion request</span></div>
                                    <div>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                            />
                                        </Form>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-between ms-4 flex-wrap">
                                    <div> <span>Change E-Mail request </span></div>
                                    <div>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                            />
                                        </Form>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-between flex-wrap">
                                    <div> <span>Change Password request </span></div>
                                    <div>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                            />
                                        </Form>
                                    </div>
                                </li>
                            </ul>
                        </Col>
                        <Col xl={4}>
                            <ul className="w-100">
                                <li className="d-flex justify-content-between ms-4 flex-wrap">
                                    <div> <span>Login</span></div>
                                    <div>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                            />
                                        </Form>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-between ms-4 flex-wrap">
                                    <div> <span>Withdrawal requests </span></div>
                                    <div>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                            />
                                        </Form>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-between ms-4 flex-wrap">
                                    <div> <span>Account deletion request</span></div>
                                    <div>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                            />
                                        </Form>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-between ms-4 flex-wrap">
                                    <div> <span>Change E-Mail request </span></div>
                                    <div>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                            />
                                        </Form>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-between  flex-wrap">
                                    <div> <span>Change Password request </span></div>
                                    <div>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                            />
                                        </Form>
                                    </div>
                                </li>
                            </ul>
                        </Col>
                        <Col xl={4}>
                            <ul className="w-100">
                                <li className="d-flex justify-content-between ms-4 flex-wrap">
                                    <div> <span>All</span></div>
                                    <div>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                            />
                                        </Form>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-between ms-4 flex-wrap">
                                    <div> <span>Withdrawal requests </span></div>
                                    <div>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                            />
                                        </Form>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-between ms-4 flex-wrap">
                                    <div> <span>Account deletion request</span></div>
                                    <div>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                            />
                                        </Form>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-between ms-4 flex-wrap">
                                    <div> <span>Change E-Mail request </span></div>
                                    <div>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                            />
                                        </Form>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-between flex-wrap">
                                    <div> <span>Change Password request </span></div>
                                    <div>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                            />
                                        </Form>
                                    </div>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
                {/* <div className="footer-report">

                </div> */}
            </div>

        </>

    )
}
export default FinancialReport