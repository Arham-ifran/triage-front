import React, {useEffect, useState}from "react";
import "./informativePages.css"
import { Container, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux'
import {beforeCms,listCms} from "../cms/cms.action";
import {Link, useNavigate} from 'react-router-dom';



function InformativePages(props) {
    const navigate = useNavigate();
    const [cms, setCms] = useState(null)
    useEffect(() => {
        props.listCms()
    }, [])

    useEffect(() => {
        if (props.cms.listCmsAuth) {
            setCms(props.cms.listCms)
            props.beforeCms()
        }
    }, [props.cms.listCmsAuth])


    return (
        <div className="terms-conditions index">
            <Container>
                <Row>
                    <Col className="index">

                        <div className="">
                            <h1 className="text-center">informative Pages</h1>
                            <ul className="list-unstyled">
                                {cms ? cms.map((item,index) => (
                                    <li className="cursor-pointer" key={index} onClick={()=> navigate(`/cms/${item.slug}`)} ><span className="effects d-inline-block mb-2">{item.title}</span></li>
                                )):''}
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

const mapStateToProps = (state) => ({
    cms: state.cms
})

export default connect(mapStateToProps, { beforeCms, listCms })(InformativePages)