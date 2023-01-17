import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap"
import { connect } from 'react-redux'
import { beforeCms, listCms } from '../../cms/cms.action'
import { getFooter, beforeFooter, submitEmail } from "./footer.action";
import axios from "axios";
import { isEmail } from 'validator';
import { Link } from "react-router-dom";
import MessageAlert from "../../messageAlert/messageAlert";
import Brand1 from "../../../assets/images/brand6.svg"
import Brand2 from "../../../assets/images/brand5.svg"
import Brand3 from "../../../assets/images/brand4.svg"
import Brand4 from "../../../assets/images/brand3.svg"
import Brand5 from "../../../assets/images/brand2.svg"
import Brand6 from "../../../assets/images/brand1.svg"
import AS_Logo from "../../../assets/images/as-logo.svg"
import Logo from "../../../assets/images/logo.svg"
import './footer.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faFacebook, faFacebookF, faInstagram, faLinkedin, faLinkedinIn, faMedium, faReddit, faTelegram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

function Footer(props) {

    const [cms, setCms] = useState({})
    const [footerData, setFooterData] = useState({})
    const [email, setEmail] = useState('')
    const [submitCheck, setSubmitCheck] = useState(false)
    const [msg, setMsg] = useState('')
    const [submitRes, setSubmitRes] = useState({})
    const [submitResCheck, setSubmitResCheck] = useState(false)

    useEffect(() => {
        props.getFooter()
    }, [])

    useEffect(() => {
        if (email && submitCheck) {
            if (isEmail(email)) {
                setMsg('')
            }
            else {
                setMsg('Please Enter Valid Email.')
            }
        }
        else {
            setMsg('')
        }
    }, [email])

    useEffect(() => {
        if (props.cms.listCmsAuth) {
            setCms(props.cms.listCms)
            props.beforeCms()
        }
    }, [props.cms.listCmsAuth])

    useEffect(() => {
        if (props.footer.getFooterAuth) {
            if (props.footer.getFooter) {
                setFooterData(props.footer.getFooter)
            }
            props.beforeFooter()
        }
    }, [props.footer.getFooterAuth])

    useEffect(() => {
        if (props.footer.submitAuth) {
            setEmail('')
            setSubmitRes({ ...props.footer.submitRes })
            setSubmitResCheck(true)
            props.beforeFooter()
        }
    }, [props.footer.submitAuth])

    useEffect(() => {
        if (submitResCheck) {
            setTimeout(() => {
                setSubmitResCheck(false)
            }, 3000);
        }
    }, [submitResCheck])


    const onChange = (e) => {
        setEmail(e.target.value)
    }



    const submit = async (e) => {
        e.preventDefault()
        setSubmitCheck(true)
        let ip = await axios.get('https://jsonip.com/')
        if (isEmail(email) && ip) {
            let formData = new FormData()
            formData.append('email', email)
            formData.append('ip', ip && ip.data.ip)
            props.submitEmail(formData)
        }
    }

    const addHttps = (str) => {
        if (!str.includes('http'))
            return 'https://' + str
        return str
    }


    return (
        <div className="footer">
            <MessageAlert
                type={submitRes.success ? 'success' : 'error'}
                greeting={submitRes.success ? 'Great!' : 'Please Try Again!'}
                description={submitRes.message}
                show={submitResCheck}
                onHide={setSubmitResCheck}
            />
            <Container>
                <Row>
                    <Col md={12} className="index">
                        <div className="brands">
                            <Row>
                                <Col sm={2} >
                                    <div className="mb-sm-0 mb-4">
                                        <img className="img-fluid" src={Brand1} alt="" />
                                    </div>
                                </Col>
                                <Col sm={2}>
                                    <div className="mb-sm-0 mb-4">
                                        <img className="img-fluid" src={Brand2} alt="" />
                                    </div>
                                </Col>
                                <Col sm={2}>
                                    <div className="mb-sm-0 mb-4">
                                        <img className="img-fluid" src={Brand3} alt="" />
                                    </div>
                                </Col>
                                <Col sm={2}>
                                    <div className="mb-sm-0 mb-4">
                                        <img className="img-fluid" src={Brand4} alt="" />
                                    </div>
                                </Col>
                                <Col sm={2}>
                                    <div className="mb-sm-0 mb-4">
                                        <img className="img-fluid" src={Brand5} alt="" />
                                    </div>
                                </Col>
                                <Col sm={2}>
                                    <div>
                                        <img className="img-fluid" src={Brand6} alt="" />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

            </Container>
            <div className="upper-footer">
                <Container>
                    <Row>
                        <Col xl={6} className="mb-xl-0 mb-5 text-xl-start text-center">
                            <div className="mb-4"><Link to={'/'}> <img src={Logo} alt="" /></Link></div>
                            <p>
                                {footerData.desc !== undefined ? footerData.desc : ''}
                            </p>

                            <span>Subscribe Our Newsletter</span>
                            <form onSubmit={submit}>
                                <div className="news-letter-in d-flex justify-content-center justify-content-xl-start">

                                    <div className="input-div">
                                        <input className="bg-white" placeholder="Enter Your Email" value={email} onChange={onChange} />
                                    </div>
                                    <button className="btn-triage-div btn-triage" type='submit'><span>Subscribe</span></button>
                                </div>
                            </form>
                            {
                                msg ?
                                    <div className='error'>{msg}</div>
                                    : ''
                            }
                            <div className="pt-4">
                                <ul className="social-icons m-0 p-0 d-flex list-unstyled">
                                    {
                                        footerData.discord ?
                                            <li className="icon-holder">
                                                <a href={addHttps(footerData.discord)} target='_blank'>
                                                    <FontAwesomeIcon icon={faDiscord} />
                                                </a>
                                            </li>
                                            : ''
                                    }
                                    {
                                        footerData.twitter ?
                                            <li className="icon-holder">
                                                <a href={addHttps(footerData.twitter)} target='_blank'>
                                                    <FontAwesomeIcon icon={faTwitter} />
                                                </a>
                                            </li>
                                            : ''
                                    }
                                    {
                                        footerData.youtube ?
                                            <li className="icon-holder">

                                                <a href={addHttps(footerData.youtube)} target='_blank'>
                                                    <FontAwesomeIcon icon={faYoutube} />
                                                </a>

                                            </li>
                                            : ''
                                    }
                                    {
                                        footerData.instagram ?
                                            <li className="icon-holder">
                                                <a href={addHttps(footerData.instagram)} target='_blank'>
                                                    <FontAwesomeIcon icon={faInstagram} />
                                                </a>
                                            </li>
                                            : ''
                                    }
                                    {
                                        footerData.medium ?
                                            <li className="icon-holder">
                                                <a href={addHttps(footerData.medium)} target='_blank'>
                                                    <FontAwesomeIcon icon={faMedium} />
                                                </a>
                                            </li>
                                            : ''
                                    }
                                    {
                                        footerData.telegram ?
                                            <li className="icon-holder">
                                                <a href={addHttps(footerData.telegram)} target='_blank'>
                                                    <FontAwesomeIcon icon={faTelegram} />
                                                </a>
                                            </li>
                                            : ''
                                    }
                                    {
                                        footerData.linkedIn ?
                                            <li className="icon-holder">
                                                <a href={addHttps(footerData.linkedIn)} target='_blank'>
                                                    <FontAwesomeIcon icon={faLinkedinIn} />
                                                </a>
                                            </li>
                                            : ''
                                    }
                                    {
                                        footerData.facebook ?
                                            <li className="icon-holder">
                                                <a href={addHttps(footerData.facebook)} target='_blank'>
                                                    <FontAwesomeIcon icon={faFacebookF} />
                                                </a>
                                            </li>
                                            : ''
                                    }
                                    {
                                        footerData.reddit ?
                                        <li className="icon-holder">
                                            <a href={addHttps(footerData.reddit)} target='_blank'>
                                                <FontAwesomeIcon icon={faReddit} />
                                            </a>
                                        </li>
                                        : ''
                                    }
                                </ul>
                            </div>
                        </Col>
                        <Col xl={6}>
                            <Row>
                                <Col md={3} sm={6} className="mb-md-0 mb-5">
                                    <h3>Useful Links</h3>
                                    <ul className="m-0 p-0 list-unstyled">
                                        <li>
                                            <Link to={'/'} className="effects">Triage</Link>
                                        </li>
                                        <li>
                                            <Link to={'/smart-levels'} className="effects">Earn interest</Link>
                                        </li>
                                        <li>
                                            <Link to={'/contact'} className="effects">Support</Link>
                                        </li>
                                      
                                    </ul>
                                </Col>
                                <Col md={3} sm={6} className="mb-sm-0 mb-5">
                                    <h3>Useful Links</h3>
                                    <ul className="m-0 p-0 list-unstyled">
                                        <li>
                                            <Link to={'/informative-pages'} className="effects">Informative Pages</Link>
                                        </li>
                                        <li>
                                            <Link to={'/faqs'} className="effects">FAQs</Link>
                                        </li>
                                          <li>
                                            <Link to={'/about'} className="effects">Company</Link>
                                        </li>
                                    </ul>
                                </Col>
                                <Col md={3} sm={6}>
                                    <h3>Policies</h3>
                                    <ul className="m-0 p-0 list-unstyled">
                                        <li>
                                            <Link to={'/privacy-policy'} className="effects">Privacy Policy</Link>
                                        </li>
                                          <li>
                                            <Link to={'/terms-conditions'} className="effects">Terms and Conditions</Link>
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div style={{ left: '0', width: '100%' }} className="lower-footer">
                <div className="company-logo" ><img src={AS_Logo} alt="" /></div>
                <Container>
                    <div className="d-flex justify-content-center align-items-center">
                        <span className="copyright "><span>&#169;</span>2022 Triage. All right Reserved. <Link to="/terms-conditions" className="terms text-decoration-none"> Terms </Link>.<Link to="/privacy-policy" className="terms text-decoration-none"> Privacy </Link>.</span>
                    </div>
                </Container>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    cms: state.cms,
    footer: state.footer
})

export default connect(mapStateToProps, { beforeCms, listCms, getFooter, beforeFooter, submitEmail })(Footer)