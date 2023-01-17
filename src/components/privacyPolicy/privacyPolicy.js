import React, { useEffect, useState } from "react";
import "./privacyPolicy.css"
import { Container, Row, Col } from "react-bootstrap"
import { getDynamicPagesData, beforeFooter } from "../shared/footer/footer.action"
import { connect } from 'react-redux'


function PrivacyPolicy(props) {

    const [data, setData] = useState()

    useEffect(() => {
        props.getDynamicPagesData()
    }, [])

    useEffect(() => {
        if (props.footer.getDynamicPageDataAuth) {
            props.beforeFooter()
            const { privacyPolicyData } = props.footer.dynamicPagesData
            setData(privacyPolicyData)
        }
    }, [props.footer.getDynamicPageDataAuth])


    return (
        <div className="terms-conditions index">
            <Container>
                <Row>
                    <Col className="index">

                        <div className="">
                            <h1 className="text-center">{data?.title}</h1>
                            <div className='d-inline-flex justify-content-center align-items-center '>
                                            <div>
                                                <span dangerouslySetInnerHTML={{ __html: data?.description }} />
                                            </div>
                                        </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

const mapStateToProps = (state) => ({
    footer: state.footer
})

export default connect(mapStateToProps, { beforeFooter, getDynamicPagesData })(PrivacyPolicy)