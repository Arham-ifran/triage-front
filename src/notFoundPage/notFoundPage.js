import React from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../../src/assets/images/not-found.png"
import Logo from "../../src/assets/images/logo.svg"
import "./notFoundPage.css"
import { Col, Container, Row } from "react-bootstrap";

function NotFound() {
    return (
        <>
            <Container>
               <Row>
                <Col className="index" lg={12}>
                <div className="pt-5">
                    <Link to={'/'}><img className="img-fluid" src={Logo} alt="logo" /></Link>
                </div>
                <div className="page-not-found">
                    <div>
                        <div className="not-exist"><img src={PageNotFound} alt="" /></div>
                        <div>
                            <h1 className="text-center mb-4">404</h1>
                            <p>Page Not Found</p>
                        </div>
                    </div>
                </div>
                </Col>
               </Row>
            </Container>
        </>
    )
}
export default NotFound