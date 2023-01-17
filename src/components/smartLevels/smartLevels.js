import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Lottie from "react-lottie";
import AccoutIcon from "../../assets/images/account.svg"
import BeginnerLottie from "../../lotties/beginner.json"
import AdvanceLottie from "../../lotties/advance.json"
import ExpertLottie from "../../lotties/expert.json"
import EliteLottie from "../../lotties/elite.json"
import ContactUs from "../../lotties/contact-us.json"
import Icon1 from "../../assets/images/benefit1.svg"
import Icon2 from "../../assets/images/benefit2.svg"
import Icon3 from "../../assets/images/benefit3.svg"
import Icon4 from "../../assets/images/benefit4.svg"
import "./smartLevels.css"
import { Link } from "react-router-dom";
import FullPageLoader from '../FullPageLoader/FullPageLoader';
import { connect } from 'react-redux';
import { beforeLevels, listLevels } from '../accountLevel/accountLevel.action'
import { beforeUser, getCriteriaListAll } from '../../redux/user/user.action'


function SmartLevels(props) {

    const [loader, setLoader] = useState(true)
    const [levels, setLevels] = useState([])
    const [bronzeLogo, setBronzeLogo] = useState('')
    const [silverLogo, setSilverLogo] = useState('')
    const [goldLogo, setGoldLogo] = useState('')
    const [PlatinumLogo, setPlatinumLogo] = useState('')
    const [subLevels, setSubLevels] = useState({})

    useEffect(() => {
        props.listLevels()
    }, [])


    useEffect(() => {
        if (props.accountLevel.listLevelAuth) {
            let lvls = props.accountLevel.listLevel
            if (lvls && lvls.length) {
                lvls.sort((a, b) => {
                    return a.level - b.level
                })
                lvls = lvls.map((item) => {
                    return item.level
                })
                setLevels(lvls)
                props.getCriteriaListAll()
            }
            else {
                setLoader(false)
            }

            for (let i = 0; i < props.accountLevel.listLevel.length; i++) {
                if (props.accountLevel.listLevel[i].level === 1) {
                    setBronzeLogo(props.accountLevel.listLevel[i].image)
                }
                else if (props.accountLevel.listLevel[i].level === 2) {
                    setSilverLogo(props.accountLevel.listLevel[i].image)

                }
                else if (props.accountLevel.listLevel[i].level === 3) {
                    setGoldLogo(props.accountLevel.listLevel[i].image)

                }
                else if (props.accountLevel.listLevel[i].level === 4) {
                    setPlatinumLogo(props.accountLevel.listLevel[i].image)
                }
            }
            props.beforeLevels()
        }
    }, [props.accountLevel.listLevelAuth])

    useEffect(() => {
        if (props.user.criteriaListAuth) {
            let localObj = {}
            for (let i = 0; i < levels.length; i++) {
                localObj[levels[i]] = []
            }
            let criteria = props.user.criteriaList
            let localArray = []
            for (let key in localObj) {
                if (criteria && criteria.length) {
                    for (let i = 0; i < criteria.length; i++) {
                        if (criteria[i]['level'] == key) {
                            localArray.push(criteria[i])
                        }
                    }
                    localObj[key] = localArray
                    localArray = []
                }
            }
            setSubLevels(localObj)
            setLoader(false)
            props.beforeUser()
        }
    }, [props.user.criteriaListAuth])



    const defaultOptions1 = {
        loop: true,
        autoplay: true,
        animationData: BeginnerLottie,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const defaultOptions2 = {
        loop: true,
        autoplay: true,
        animationData: AdvanceLottie,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const defaultOptions3 = {
        loop: true,
        autoplay: true,
        animationData: ExpertLottie,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const defaultOptions4 = {
        loop: true,
        autoplay: true,
        animationData: EliteLottie,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const defaultOptions5 = {
        loop: true,
        autoplay: true,
        animationData: ContactUs,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };


    const minimumValSetter = (level, subLevel, e) => {
        let subLvls = subLevels[level].filter((item) => {
            if (item.subLevel === subLevel)
                return (item)
        })
        if (subLvls && subLvls.length) {
            document.querySelector(`#smartlevel-level${level}-sublevel`).innerHTML = subLvls[0].minInvestment
            document.querySelectorAll(`.smartlevel-level${level}-tabs`).forEach((item) => {
                item.classList.remove('active')
            })
            e.target.classList.add('active')
        }
    }
    const handleChatScript = () => {
        const script = document.createElement("script");
        // script.src = "https://static.zdassets.com/ekr/snippet.js?key=6a7e9a98-235e-42f1-8998-82ad8e324236";
        script.src = "https://static.zdassets.com/ekr/snippet.js?key=f450f611-5a07-41ab-89e8-386b957e2846";
        script.id = "ze-snippet";
        script.async = true;
        document.body.appendChild(script);
    }



    return (
        <div className="smart-levels">
            {
                loader ?
                    <FullPageLoader />
                    :
                    <Container>
                        <Row className="mb-230 align-items-center">
                            <Col className="mb-4 mb-xl-0 index" xl={6} xs={{ order: 1 }}>
                                <h2>ACCOUNTS</h2>
                                <p>Proin vulputate congue metus, eget vestibulum dolor porta ac. In pretium sem quis libero efficitur, nec aliquam lorem convallis. Vivamus rutrum, ligula eget tempus dignissim, metus nibh fringilla quam, nec fermentum velit lectus vitae enim. Quisque metus neque, dapibus interdum nisi ac.</p>
                                <Link to={'/sign-up'} className="btn-triage-div btn-triage"><span>Open an Account</span></Link>
                            </Col>

                            <Col className="mb-4 mb-xl-0 index d-flex justify-content-end" xl={{ span: 6, order: 2 }}>
                                <div className="main-img">
                                    <img className="img-fluid" src={AccoutIcon} alt="" />
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-230">
                            {
                                levels.includes(1) ?
                                    <Col xl={3} lg={6} className="mb-3 mb-xl-0">
                                        <div className="card beginner">
                                            <div className="text-center">
                                                <h3>{levels[0] === 1 && "Bronze"}</h3>
                                                <div className="d-flex justify-content-center align-items-center ">
                                                    <div className="mb-4 shape">
                                                        <div className="d-flex justify-content-center align-items-center accnt-lvl-img-holder">
                                                            <img className="img-fluid" src={bronzeLogo} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center align-items-center stages">
                                                    {
                                                        subLevels[1] !== undefined ?
                                                            subLevels[1].map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <button onClick={(e) => { minimumValSetter(1, item.subLevel, e) }} className={`smartlevel-level1-tabs level-tag ${index === 0 ? 'active' : ''}`}>
                                                                            Level {item.subLevel}
                                                                        </button>
                                                                    </>
                                                                )
                                                            })
                                                            :
                                                            ''
                                                    }
                                                </div>
                                            </div>
                                            {
                                                subLevels[1] !== undefined ?
                                                    <>
                                                        <span>Minimum Amount($) to hold</span>
                                                        <strong id='smartlevel-level1-sublevel'>{subLevels[1][0]['minInvestment']}</strong>
                                                    </>
                                                    : ''
                                            }
                                        </div>
                                    </Col>
                                    : ''
                            }
                            {
                                levels.includes(2) ?
                                    <Col xl={3} lg={6} className="mb-3 mb-xl-0">
                                        <div className="card advance">
                                            <div className="text-center">
                                                <h3>{levels[1] === 2 && "Silver"}</h3>
                                                <div className="d-flex justify-content-center align-items-center ">
                                                    <div className="mb-4 shape">
                                                        <div className="d-flex justify-content-center align-items-center accnt-lvl-img-holder">
                                                            <img className="img-fluid" src={silverLogo} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center align-items-center stages">
                                                    {
                                                        subLevels[2] !== undefined ?
                                                            subLevels[2].map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <button onClick={(e) => { minimumValSetter(2, item.subLevel, e) }} className={`smartlevel-level2-tabs level-tag ${index === 0 ? 'active' : ''}`}>
                                                                            Level {item.subLevel}
                                                                        </button>
                                                                    </>
                                                                )
                                                            })
                                                            :
                                                            ''
                                                    }
                                                </div>
                                            </div>
                                            {
                                                subLevels[2] !== undefined ?
                                                    <>
                                                        <span>Minimum Amount($) to hold</span>
                                                        <strong id='smartlevel-level2-sublevel'>{subLevels[2][0]['minInvestment']}</strong>
                                                    </>
                                                    : ''
                                            }
                                        </div>
                                    </Col>
                                    : ''
                            }
                            {
                                levels.includes(3) ?
                                    <Col xl={3} lg={6} className="mb-3 mb-xl-0">
                                        <div className="card expert">
                                            <div className="text-center">
                                                <h3>{levels[2] === 3 && "Gold"}</h3>
                                                <div className="d-flex justify-content-center align-items-center ">
                                                    <div className="mb-4 shape">
                                                        <div className="d-flex justify-content-center align-items-center accnt-lvl-img-holder">
                                                            <img className="img-fluid" src={goldLogo} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center align-items-center stages">
                                                    {
                                                        subLevels[3] !== undefined ?
                                                            subLevels[3].map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <button onClick={(e) => { minimumValSetter(3, item.subLevel, e) }} className={`smartlevel-level3-tabs level-tag ${index === 0 ? 'active' : ''}`}>
                                                                            Level {item.subLevel}
                                                                        </button>
                                                                    </>
                                                                )
                                                            })
                                                            :
                                                            ''
                                                    }
                                                </div>
                                            </div>
                                            {
                                                subLevels[3] !== undefined ?
                                                    <>
                                                        <span>Minimum Amount($) to hold</span>
                                                        <strong id='smartlevel-level3-sublevel'>{subLevels[3][0]['minInvestment']}</strong>
                                                    </>
                                                    : ''
                                            }
                                        </div>
                                    </Col>
                                    : ''
                            }
                            {
                                levels.includes(4) ?
                                    <Col xl={3} lg={6} className="mb-3 mb-xl-0">
                                        <div className="card elite">
                                            <div className="text-center">
                                                <h3>{levels[3] === 4 && "Platinum"}</h3>
                                                <div className="d-flex justify-content-center align-items-center ">
                                                    <div className="mb-4 shape">
                                                        <div className="d-flex justify-content-center align-items-center accnt-lvl-img-holder">
                                                            <img className="img-fluid" src={PlatinumLogo} />

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center align-items-center stages">
                                                    {
                                                        subLevels[4] !== undefined ?
                                                            subLevels[4].map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <button onClick={(e) => { minimumValSetter(4, item.subLevel, e) }} className={`smartlevel-level4-tabs level-tag ${index === 0 ? 'active' : ''}`}>
                                                                            Level {item.subLevel}
                                                                        </button>
                                                                    </>
                                                                )
                                                            })
                                                            :
                                                            ''
                                                    }
                                                </div>
                                            </div>
                                            {
                                                subLevels[4] !== undefined ?
                                                    <>
                                                        <span>Minimum Amount($) to hold</span>
                                                        <strong id='smartlevel-level4-sublevel'>{subLevels[4][0]['minInvestment']}</strong>
                                                    </>
                                                    : ''
                                            }
                                        </div>
                                    </Col>
                                    : ''
                            }
                        </Row>
                        <div className="chat-with-experts mb-230">
                            <Row className="align-items-center">
                                <Col className="mb-4 mb-lg-0 " xl={5} xs={{ order: 1 }}>
                                    <h2>CONTACT US</h2>
                                    <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare quis eros eget rutrum. Aliquam convallis magna velit, ut varius turpis suscipit eu.</p>
                                    <span className="email-address">support@triage.com</span>
                                    {/* <a className="btn-triage-div btn-triage"><span>Chat with Experts</span></a> */}
                                    <button className="btn-triage-div btn-triage" onClick={() => handleChatScript()}><span >Chat with Experts</span></button>
                                </Col>

                                <Col xl={{ span: 7, order: 2 }}>
                                    <div className="main-img lottie-img">
                                        <Lottie
                                            options={defaultOptions5}
                                            // height={596}
                                            // width={665}
                                            className="img-fluid"
                                        />
                                    </div>
                                </Col>

                            </Row>

                        </div>
                        <div className="mb-230">
                            <div className="why-become-triage">
                                <div className="d-flex justify-content-center">
                                    <div className="text-center">
                                        <h2>WHY BECOME A TRIAGE?</h2>
                                        <p className="mb-70 para">Etiam venenatis libero in tortor efficitur, interdum rutrum risus rhoncus. Sed posuere venenatis dapibus. Sed vitae mi placerat, malesuada orci sed, lobortis massa. Nullam commodo fringilla velit ut commodo. Aenean dictum cursus enim, vel ullamcorper purus interdum vitae.</p>
                                    </div>
                                </div>
                                <Row className="mb-100">
                                    <Col xl={6}>
                                        <div className="box">
                                            <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
                                                <div className="box-img">
                                                    <img src={Icon1} alt="" className="img-fluid" />
                                                </div>
                                                <div className="box-content">
                                                    <strong>Unmatched profit potential</strong>
                                                    <p>Enjoy the opportunity to earn unparalleled passive profits and industry-leading interest rates on your fiat and crypto capital</p>
                                                </div>
                                            </div>

                                        </div>
                                    </Col>
                                    <Col xl={6}>
                                        <div className="box">
                                            <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
                                                <div className="box-img">
                                                    <img src={Icon2} alt="" className="img-fluid" />
                                                </div>
                                                <div className="box-content">
                                                    <strong>State-of-the-art technology</strong>
                                                    <p>Benefit from the cryptocurrency markets in real time, with advanced tech capable of processing a mass of data at lightning speed</p>
                                                </div>
                                            </div>

                                        </div>
                                    </Col>
                                    <Col xl={6}>
                                        <div className="box">
                                            <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
                                                <div className="box-img">
                                                    <img src={Icon3} alt="" className="img-fluid" />
                                                </div>
                                                <div className="box-content">
                                                    <strong>EU licensed and regulated</strong>
                                                    <p>Invest with peace of mind, with an exceptionally secure, licensed platform, compliant with the strictest regulatory standards</p>
                                                </div>
                                            </div>

                                        </div>
                                    </Col>
                                    <Col xl={6}>
                                        <div className="box">
                                            <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
                                                <div className="box-img">
                                                    <img src={Icon4} alt="" className="img-fluid" />
                                                </div>
                                                <div className="box-content">
                                                    <strong>Access via any device</strong>
                                                    <p>Manage your portfolio from home or on the go, accessing your ArbiSmart account, at any time, via your computer, tablet or mobile</p>
                                                </div>
                                            </div>

                                        </div>
                                    </Col>
                                </Row>
                                <div className="d-flex justify-content-center align-items-center">
                                    {/* <a className="btn-triage-div btn-triage"><span>Get Started</span></a> */}
                                    <Link to={'/sign-up'} className="btn-triage-div btn-triage"><span>Get Started</span></Link>
                                </div>
                            </div>
                        </div>
                    </Container>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    accountLevel: state.accountLevel
})

export default connect(mapStateToProps, { beforeUser, getCriteriaListAll, beforeLevels, listLevels })(SmartLevels)