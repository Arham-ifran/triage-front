import { useEffect, useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import { connect } from 'react-redux';
import FaqIcon from "../../assets/images/faq-icon.svg";
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import { beforeFaqCats, beforeFaqs, listFaqCats, listFaqs } from './faqs.action';
import "./faqs.css";


function Faqs(props) {

    const [faqCats, setFaqCats] = useState([])
    const [faqs, setFaqs] = useState([])
    const [loader, setLoader] = useState(true)


    useEffect(() => {
        window.scroll(0, 0)
        props.listFaqCats()
        localStorage.setItem('activatedNav', 0)
    }, [])

    useEffect(() => {
        if (props.faqs.listFaqCatsAuth) {
            let faqCatsArr = props.faqs.listFaqCats.faqCats
            if (faqCatsArr && faqCatsArr.length) {
                setFaqCats(faqCatsArr)
                props.listFaqs(faqCatsArr[0]._id)
            }
            else {
                setLoader(false)
            }
            props.beforeFaqCats()
        }
    }, [props.faqs.listFaqCatsAuth])

    useEffect(() => {
        if (props.faqs.listFaqAuth) {
            setFaqs(props.faqs.listFaq.faqs)
            setLoader(false)
            props.beforeFaqs()
        }
    }, [props.faqs.listFaqAuth])

    useEffect(() => {
        navActivator(localStorage.getItem('activatedNav'))
    }, [loader])


    const onNavClick = (id, num) => {
        setLoader(true)
        localStorage.setItem('activatedNav', num)
        props.listFaqs(id)
    }

    const navActivator = (num) => {
        let query = document.querySelector(`.faq-nav-item-${num}`)
        if (query)
            query.classList.add('active')
    }

    return (
        <div className="faqs">
            {
                loader ?
                    <FullPageLoader />
                    :
                    <Container >
                        <Row className="align-items-center top-section">
                            <Col xl={6} className="index mb-4 mb-xl-0" xs={{ order: 1 }}>
                                <div className="headings">
                                    <h2>HAVE ANY QUESTIONS?</h2>
                                    <p>Proin vulputate congue metus, eget vestibulum dolor porta ac. In pretium sem quis libero efficitur, nec aliquam lorem convallis. Vivamus rutrum, ligula eget tempus dignissim, metus nibh fringilla quam, nec fermentum.</p>
                                </div>
                                <div>
                                    <a className="btn-triage-div btn-triage"><span>Contact Us</span></a>
                                </div>
                            </Col>
                            <Col xl={{ span: 6, order: 2 }} className="index">
                                <div className="d-flex justify-content-end">
                                    <img className="img-fluid" src={FaqIcon} alt="" />
                                </div>
                            </Col>
                        </Row>
                        <Tab.Container id="left-tabs-example">
                            <div className="d-flex justify-content-center index">
                                <Nav variant="pills">
                                    {
                                        faqCats && faqCats.length ?
                                            faqCats.map((item, index) => {
                                                return (
                                                    <Nav.Item>
                                                        <Nav.Link key={index} onClick={() => { onNavClick(item._id, index) }} className={`faq-nav-item-${index}`}>{item.title}</Nav.Link>
                                                    </Nav.Item>
                                                )
                                            })
                                            : ''
                                    }
                                </Nav>
                            </div>
                            <Tab.Content className="d-flex justify-content-center">
                                <div className="general-faqs">
                                    {
                                        faqs && faqs.length ?
                                            faqs.map((item, index) => {
                                                return (
                                                    <Accordion defaultActiveKey="1">
                                                        <Accordion.Item key={index}>
                                                            <Accordion.Header>{item.title}</Accordion.Header>
                                                            <Accordion.Body>
                                                                <p><span dangerouslySetInnerHTML={{ __html: item.desc }} /></p>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                )
                                            })
                                            : ''
                                    }
                                </div>
                            </Tab.Content>
                        </Tab.Container>
                    </Container>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    faqs: state.faqs
})

export default connect(mapStateToProps, { beforeFaqCats, listFaqCats, listFaqs, beforeFaqs })(Faqs)