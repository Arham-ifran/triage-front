import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Col, Container, Dropdown, Row, Table } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { Line } from "react-chartjs-2";
import { connect } from 'react-redux';
import Avatar from "../../assets/images/avatar.png";
import TopIcon from "../../assets/images/card-top.svg";
import Copy from "../../assets/images/copy-text.svg";
import Calendar from "../../assets/images/Icon material-date-range.svg";
import { ENV } from '../../config/config';
import { beforeCurrencyCaps, getCurrencyCaps, beforeCurrencyStats, getCurrencyStats } from '../../redux/dashboard/dashboard.action';
import { getUserReferrals } from "../../redux/user/user.action";
import FullPageLoader from '../FullPageLoader/FullPageLoader';
import AlertModal from "../messageAlert/messageAlert";
import Navbar from "../shared/navbar/navbar";
import Amount from "./amount";
import Availabe_Profit from "./avaliableProfit";
import Balance_History from "./balanceHistory";
import "./dashboard.css";
import Locked_Profit from "./lockedProfit";
import Percentage from "./percentage";
import { copyToClipBoard } from '../../utils/helperFunctions'
import { listHistory, beforeHistory } from "../history/history.action"
import moment from "moment";


const Dashboard = (props) => {
    let userData = ENV.getUserKeys()
    const [referrals, setReferrals] = useState(null)
    const [isCopied, setIsCopied] = useState(false);
    const [historyData, setHistoryData] = useState(false);
    const navigate = useNavigate()

    let referralURL = `${ENV.baseUrl}/sign-up?referralKey=${userData.referralKey}`


    const [currencyList, setCurrencyList] = useState({}) //currenct obj
    const [walletList, setWalletList] = useState([])
    const [loader, setLoader] = useState(true)
    const [stats, setStats] = useState(null)
    const [labels, setLabels] = useState(null)
    const [percentages, setPercentages] = useState([10, 3])
    const [symbols, setSymbols] = useState([]);
    const [graphType, setGraphType] = useState('first');
    const [availableProfitStats, setAvailableProfitStats] = useState(null)
    const [lockedProfitStats, setLockedProfitStats] = useState(null)

    useEffect(() => {
        props.beforeCurrencyCaps()
        props.getCurrencyCaps()
        let userId = userData._id
        props.getUserReferrals(userId)
        let qs = ENV.objectToQueryString({ dashboardLimit: 6, receiverId: userId })
        props.listHistory(qs)
        getStats();
    }, [])

    useEffect(() => {
        if (props.history.listHistoryAuth) {
            setHistoryData(props.history.listHistory.history)
            props.beforeHistory()
        }
    }, [props.history.listHistoryAuth])

    useEffect(()=> {
        if(props.dashboard.listStatsGraphAuth) {
            const {availableProfitStats,lockedProfitStats} = props.dashboard.listStatsData
            setAvailableProfitStats(availableProfitStats)
            setLockedProfitStats(lockedProfitStats)
        }
    },[props.dashboard.listStatsGraphAuth])

    const onCopyText = (url) => {
        copyToClipBoard(url)
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    useEffect(() => {
        if (props.user.userReferralAuth) {
            const { userReferrals } = props.user.referrals;
            setReferrals(userReferrals)
        }
    }, [props.user.userReferralAuth])

    useEffect(() => {
        if (props.dashboard.getCurrencyCapAuth) {
            setCurrencyList(props.dashboard?.currencyCapsList)
            setWalletList(props.dashboard?.walletList)
            setLoader(false)
        }
    }, [props.dashboard.getCurrencyCapAuth])


    const getStats = (e) => {
        const stringToNumeric = {
            "firtst": 1,
            "second": 2,
            "third": 3
        }

        let filters = { type: 1 };
        //for Tabs chage
        if (stringToNumeric[e])
            filters.type = stringToNumeric[e]

        if (e?.target?.checked)
            filters.symbol = e.target.name

        let qs = ENV.objectToQueryString(filters)

        props.getCurrencyStats(qs)
        setLoader(true)
    }

    useEffect(() => {
        let statsData = stats;
        let symbolsData = symbols;
        let temp = statsData;

        symbolsData.forEach(symbol => {
            temp = statsData.filter((stats) => stats._id === symbol)
        })
        setStats(temp);
    }, [symbols])


    const appendOrRemove = (id) => {
        const { name } = id.target;
        let arr = symbols;
        if (arr.includes(name)) {
            arr.splice(arr.indexOf(name), 1);
            setSymbols([...arr])
            getStats();
            return;
        }

        arr.push(name);
        setSymbols([...arr])
    }

    return (
        <div className="dashboard wallet-details p-3">
            {
                loader ?
                    <FullPageLoader />
                    :
                    <div className="dashboard-details ">
                        <Container >
                            <div>
                                {/* <div className="d-flex justify-content-end  flex-wrap pt-75 align-items-baseline`">
                                    <Navbar />
                                </div> */}
                                <h2>Wallets</h2>
                                <div className="top-head">
                                    <AlertModal />
                                    <span>Wallets / Details </span>
                                </div>
                                {/* <div className="d-flex all-records flex-wrap flex-xl-nowrap"> */}
                                <div className="all-records ">
                                    <div className="records mb-4 mb-xl-0">
                                        <div>
                                            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                                <div className="d-flex  flex-wrap">
                                                    <div className="tabs-header mb-3 mb-lg-0">
                                                        <Nav variant="pills" onChange={getStats} >
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="first">
                                                                    Available profit
                                                                </Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="second">
                                                                    Locked profit
                                                                </Nav.Link>
                                                            </Nav.Item>
                                                        </Nav>
                                                    </div>
                                                </div>
                                                <div className="record">
                                                    <Tab.Content>
                                                        <Tab.Pane eventKey="first">
                                                            <Availabe_Profit stats={availableProfitStats} />
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="second">
                                                            <Locked_Profit stats={lockedProfitStats}/>
                                                        </Tab.Pane>
                                                    </Tab.Content>
                                                </div>
                                            </Tab.Container>
                                        </div>
                                    </div>
                                </div>
                                <h2>History</h2>
                                <Row className="history-details">
                                    <Col xxl={9} xl={7} className="mb-3 mb-xxl-0">
                                        <div className="history">
                                            <div className="table-responsive">
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>Amount Sent</th>
                                                            <th>Date</th>
                                                            <th>Amount credited</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {historyData && historyData.length > 0 ? historyData.map(history => (
                                                            <tr>
                                                                <td>{history.depositAmountSent}</td>
                                                                <td>{history.updatedAt ? moment(history.updatedAt).format('MMMM Do YYYY, h:mm:ss a') : 'N/A'}</td>
                                                                <td>{history.depositAmountCredited}</td>
                                                            </tr>
                                                        )) :<tr> <td colSpan={3}><div className='not-found-alert d-flex justify-content-center align-items-center'>No History Found</div></td></tr>}

                                                    </tbody>
                                                </Table>


                                            </div>
                                        </div>
                                        <div className='pt-3 d-flex justify-content-end'> <button onClick={() => navigate('/history')} className="btn-triage-div btn-triage"><span>View All</span></button></div>
                                    </Col>
                                    <Col xxl={3} xl={5}>
                                        <div className="refferal">
                                            <div className="body">
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <div className="d-flex justify-content-center align-items-center mb-4 avatar-circle">
                                                        <img className="img-fluid" alt="" src={(userData.profileImage) ? (userData.profileImage) : Avatar} />
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between bonus-details flex-wrpa">
                                                    <span>Referral bonus received</span>
                                                    <span>{userData.referralBonus ? parseFloat(userData.referralBonus.toFixed(4)) : 0}</span>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                    <span>Your referrals</span>
                                                    <span>{referrals ? referrals.length : 0} USERS</span>
                                                </div>
                                            </div>
                                            <div className="overlay">
                                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                    <div className="referral-url">
                                                        <strong className="mb-2 d-block">Your referral link</strong>
                                                        <span>{referralURL}</span>
                                                    </div>
                                                    <span className="cursor-pointer position-relative" onClick={() => onCopyText(referralURL)}>
                                                        <img src={Copy} className="d-inline-block" />
                                                        {/* <span className="copy-popup-text" >Copied!</span> */}
                                                        {isCopied && <span className="copy-popup-text" >Copied!</span>}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </div >
            }
        </div >
    )
}
const mapStateToProps = (state) => ({
    dashboard: state.dashboard,
    user: state.user,
    history: state.history
})

export default connect(mapStateToProps, { beforeCurrencyCaps, getCurrencyCaps, beforeCurrencyStats, getCurrencyStats, getUserReferrals, listHistory, beforeHistory })(Dashboard)