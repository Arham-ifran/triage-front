import { useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import FullPageLoader from '../FullPageLoader/FullPageLoader';
import { connect } from 'react-redux';
import { beforeCms, getCms } from './cms.action';

const Cms = (props) => {

    const [loader, setLoader] = useState(true)
    const [data, setData] = useState({})

    useEffect(() => {
        window.scroll(0, 0)
        props.getCms(window.location.href.split('/')[4])
    }, [])

    useEffect(() => {
        if (props.cms.getCmsAuth) {
            setData(props.cms.getCms)
            setLoader(false)
        }
    }, [props.cms.getCmsAuth])


    return (
        <>
            {
                loader ?
                    <FullPageLoader />
                    :
                    <div className='login text-white'>
                        {data && data.title ?
                            <Container>
                                <Row className='pb-5'>
                                    <Col className='text-center index'>
                                        <h3 className='pb-3'>{data.title}</h3>
                                        <div className='d-inline-flex justify-content-center align-items-center '>
                                            <div>
                                                <span dangerouslySetInnerHTML={{ __html: data.description }} />
                                            </div>
                                        </div>
                                        {/* <div className='d-inline-flex justify-content-center align-items-center '><div className='list-data' dangerouslySetInnerHTML={{ __html: data.description }} /></div> */}
                                    </Col>
                                </Row>
                            </Container>
                            :
                            <Container>
                                <Row>
                                    <Col className='text-center'>
                                        <h3>The Page You Are Looking For Is Not Avaliable.</h3>
                                    </Col>
                                </Row>
                            </Container>
                        }
                    </div>
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    cms: state.cms
})

export default connect(mapStateToProps, { beforeCms, getCms })(Cms);