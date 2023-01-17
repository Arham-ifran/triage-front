import React, { useState, useEffect } from "react";
import { Col, Container, Dropdown, Table } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import Profile from "../../assets/images/profile.png"
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Level_Logo from "../../assets/images/title.svg"
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faCaretDown, faChevronDown, faExclamation } from '@fortawesome/free-solid-svg-icons'
import Logo from "../../assets/images/small-icon.svg"
import Cart from "../../assets/images/cart-icon.svg"
import Star from "../../assets/images/star-icon.svg"
import Wallet from "../../assets/images/wallet-icon.svg"
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select'
import BTC_Logo from "../../assets/images/icon1.svg"
import ETH_Logo from "../../assets/images/icon2.svg"
import "./accountLevel.css"
import Annualized from "./annualizedPercentage";
import Navbar from "../shared/navbar/navbar";
import { connect } from 'react-redux';
import { beforeLevels, listLevels, searchLevelsDetails, levelsInvestments } from './accountLevel.action'
import { beforeWallets, getWalletLists } from "../../redux/wallet/wallet.action";
import { getCriteriaList, beforeUser } from "../../redux/user/user.action";
import { ENV } from "../../config/config";
import { getBalanceOfToken } from "../../utils/web3";
import FullPageLoader from "../FullPageLoader/FullPageLoader";



function AccountLevel(props) {
    const [tokenBalance, setTokenBalance] = useState()

    const { firstName, lastName } = ENV.getUserKeys()
    const accountLevelsLimit = ENV.accountLevelsPointsLimit;
    const user = ENV.getUserKeys()
    const navigate = useNavigate();
    const [levels, setLevels] = useState([])
    const [currencies, setCurrencies] = useState([])
    const [level, setLevel] = useState({})
    const [subLevel, setSubLevel] = useState({ value: 1, label: 'Level 1' })
    const [searchLevel, setSearchLevel] = useState()
    const [calculatorLevel, setCalculatorLevel] = useState()
    const [calculatorCurrency, setCalculatorCurrency] = useState()
    const [calculatorSubLevel, setCalculatorSubLevel] = useState()
    const [fullPageLoader, setFullPageLoader] = useState(true)
    const [searchSubLevel, setSearchSubLevel] = useState(1)
    const [timePeriod, setTimePeriod] = useState(0)
    const [intrestPaid, setIntrestPaid] = useState(1)
    const [timePeriodList, setTimePeriodList] = useState([])
    const [bronzeLogo, setBronzeLogo] = useState('')
    const [silverLogo, setSilverLogo] = useState('')
    const [goldLogo, setGoldLogo] = useState('')
    const [PlatinumLogo, setPlatinumLogo] = useState('')
    const [userLevel, setUserLevel] = useState(0)
    const [userSubLevel, setUserSubLevel] = useState(0)
    const [minpoints, setMinPoints] = useState({
        bronzeMinPoints: '',
        silverMinPoints: '',
        goldMinPoints: '',
        platinumMinPoints: '',
    })
    const [wallets, setWallets] = useState(null);
    const [searchCurrency, setSearchCurrency] = useState()
    const [criteria, setCrieria] = useState(null);
    const [amount, setAmount] = useState(0);
    const [criteriaTimePeriod, setCriteriaTimePeriods] = useState([])


    useEffect(() => {
        props.listLevels()
        props.getWalletLists();
    }, [])

    useEffect(() => {
        if (props.user?.userBalance) {
            setTokenBalance(props.user?.userBalance)
        }
    }, [props.user.userBalance])

    useEffect(() => {
        if (props.wallets.getWalletsAuth) {
            setWallets(props.wallets.wallets)
            getTokenBalance(props.wallets.wallets[0])
            setSearchCurrency(props.wallets.wallets[0].symbol)

            // Dynamic Time Period
            let periodList = []
            for (let index = 0; index < criteriaTimePeriod.length; index++) {
                const element = criteriaTimePeriod[index];
                element.forEach(el => {
                    periodList.push(parseInt(el.months))
                });
            }

            periodList = [...new Set(periodList)]
            setTimePeriodList(periodList.sort());

            // USD in currencies 
            let currencies = []
            let currenciesData = props.wallets.wallets
            currencies = currenciesData.map(currency => (
                { value: currency.symbol, label: currency.symbol }
            ))
            currencies.push({ value: 'USD', label: 'USD' })
            setCurrencies(currencies)
        }
    }, [props.wallets.getWalletsAuth])


    useEffect(() => {
        if (props.accountLevel.listLevelAuth) {
            props.beforeLevels()
            let localLevels = []
            for (let i = 0; i < props.accountLevel.listLevel.length; i++) {
                if (props.accountLevel.listLevel[i].level === 1) {
                    localLevels.push({ value: props.accountLevel.listLevel[i]._id, label: 'Bronze' })
                    setBronzeLogo(props.accountLevel.listLevel[i].image)
                }
                else if (props.accountLevel.listLevel[i].level === 2) {
                    localLevels.push({ value: props.accountLevel.listLevel[i]._id, label: 'Silver' })
                    setSilverLogo(props.accountLevel.listLevel[i].image)

                }
                else if (props.accountLevel.listLevel[i].level === 3) {
                    localLevels.push({ value: props.accountLevel.listLevel[i]._id, label: 'Gold' })
                    setGoldLogo(props.accountLevel.listLevel[i].image)

                }
                else if (props.accountLevel.listLevel[i].level === 4) {
                    localLevels.push({ value: props.accountLevel.listLevel[i]._id, label: 'Platinum' })
                    setPlatinumLogo(props.accountLevel.listLevel[i].image)

                }
            }
            setLevels(localLevels)
            setSearchLevel(localLevels && localLevels[0].value)
        }
    }, [props.accountLevel.listLevelAuth])

    useEffect(() => {
        if (props.accountLevel.minInvestmentAuth) {
            setFullPageLoader(false)
            props.beforeLevels();
            const { bronzeMinInvestment, silverMinInvestment, goldMinInvestment, platinumMinInvestment, level, subLevel, timePeriods } = props.accountLevel.accountsInvestments
            setMinPoints({ ...minpoints, bronzeMinPoints: bronzeMinInvestment, silverMinPoints: silverMinInvestment, goldMinPoints: goldMinInvestment, platinumMinPoints: platinumMinInvestment })
            setUserLevel(level)
            setUserSubLevel(subLevel)
            setCriteriaTimePeriods(timePeriods)

        }
    }, [props.accountLevel.minInvestmentAuth])

    const getTokenBalance = async (walletData) => {
        let bal = await getBalanceOfToken(walletData?.networkId, walletData?.walletAddress, user?.tokenWallets?.ethereum)
        props.levelsInvestments(bal)
        // setWalletBalance(bal)
    }


    const subLevels = [
        { value: 1, label: 'Level 1' },
        { value: 2, label: 'Level 2' },
        { value: 3, label: 'Level 3' },
    ]

    let timePeriods = timePeriodList.map((item, key) => (
        {
            label: `${item > 1 ? `${item} Months` : `${item} Month`} `,
            value: item
        }
    ))



    const interestPaids = [
        { value: 1, label: 'Available' },
        { value: 2, label: 'Locked' },
        // { value: 3, label: 'TRI Locked' }
    ]

    const btc = [
        { value: 'BTC', label: <span><img src={BTC_Logo} alt="" /> BTC</span> },
        { value: 'Purchase with a wire transfer ', label: 'Purchase with a wire transfer ' },
    ]

    const period = [
        { value: 'ETH', label: <span><img src={ETH_Logo} alt="" /> BTC</span> },
        { value: 'Purchase with a wire transfer ', label: 'Purchase with a wire transfer ' },
    ]

    const intrest = [
        { value: 'ETH', label: <span><img src={ETH_Logo} alt="" /> BTC</span> },
        { value: 'Purchase with a wire transfer ', label: 'Purchase with a wire transfer ' },
    ]

    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(!isActive);
    };


    useEffect(() => {
        let obj = {
            searchLevel: searchLevel,
            searchSubLevel: searchSubLevel,
            searchCurrency: searchCurrency,
            key: "accountlevel"
        };

        let qs = ENV.objectToQueryString(obj)
        if (searchLevel && searchSubLevel && searchCurrency) {
            props.searchLevelsDetails(qs)
        }
    }, [searchCurrency, searchSubLevel, searchLevel])


    useEffect(() => {
        if (props.accountLevel.searchLevelAuth) {
            props.beforeLevels()
            const { accountLevels } = props.accountLevel.listLevels
            setCrieria(accountLevels)
        }
    }, [props.accountLevel.searchLevelAuth])


    useEffect(() => {

        let obj = {
            searchLevel: calculatorLevel,
            searchSubLevel: calculatorSubLevel,
            searchCurrency: calculatorCurrency === "USD" ? "TRI" : calculatorCurrency,
            timePeriod,
            intrestPaid,
            key: "accountlevel"
        } 

        let qs = ENV.objectToQueryString(obj)
        props.searchLevelsDetails(qs)
        caluculatedApy()

    }, [calculatorLevel, calculatorSubLevel, calculatorCurrency, timePeriod, intrestPaid])


    const caluculatedApy = () => {
        var profits = {}
        let apy = 0;
        for (let index = 0; index < criteria?.length; index++) {
            const element = criteria[index].profitInMonths;
            profits = element.filter(mon => mon.months === timePeriod.toString())
        }
        if (profits && profits.length > 0) {
            apy = intrestPaid === 2 ? profits[0].lockedProfit : intrestPaid === 3 ? profits[0].lockedProfitInPrimaryCurrency : intrestPaid === 1 ? profits[0].availableProfit : 0
        }
        return apy;
    }

    console.log(userLevel, "USER LEVEL")

    return (
        fullPageLoader ?
            <div>
                <FullPageLoader />
            </div>
            :
            <div className="account-level-details wallet-details d-flex p-3">
                <Container>
                    {/* <div className="d-flex justify-content-end top-head flex-wrap pt-75">
                    <Navbar />
                </div> */}
                    {/* <div> */}
                    <h2>Account Levels</h2>
                    <div className="card-profile">
                        <div className="head-top d-flex justify-content-between  flex-wrap">
                            <strong>{`${firstName ? firstName : ''}   ${lastName ? lastName : ''}`}</strong>
                            <div> <div className="title-circle">
                                <img className="img-fluid" src={userLevel === 1 ? bronzeLogo : userLevel === 2 ? silverLogo : userLevel === 3 ? goldLogo : userLevel === 4 ? PlatinumLogo : Level_Logo} alt="" />
                            </div></div>
                            <div> <button onClick={() => navigate('/deposit')} className="btn-triage-div btn-triage"><span>Level Up</span></button></div>
                        </div>
                        <Container>
                            <div className="progress-level">
                                <strong className="ms-1">{userLevel === 1 ? `Bronze Sub Level ${userSubLevel}` : userLevel === 2 ? `Silver Sub Level ${userSubLevel}` : userLevel === 3 ? `Gold Sub Level ${userSubLevel}` : userLevel === 4 ? `Platinum Sub Level ${userSubLevel}` : "Basic"}</strong>

                                <ProgressBar now={tokenBalance} max={userLevel === 1 ? minpoints.silverMinPoints : userLevel === 2 ? minpoints.goldMinPoints : userLevel === 3 ? minpoints.platinumMinPoints : minpoints.bronzeMinPoints} />
                                <div className="d-flex justify-content-between  flex-wrap">
                                    <div> <span>You now have {tokenBalance ? tokenBalance : 0} points</span></div>
                                    {userLevel !== 4 && <div> <span>To next level {userLevel === 1 ? minpoints.silverMinPoints : userLevel === 2 ? minpoints.goldMinPoints : userLevel === 3 ? minpoints.platinumMinPoints : minpoints.bronzeMinPoints} points</span></div>}
                                </div>
                            </div>
                        </Container>
                        {userLevel === 0 &&
                            <div className="upgrading-alert">
                                <div className="d-flex align-items-center flex-wrap msg">
                                    <div className="alert-circle me-2">
                                        <FontAwesomeIcon icon={faExclamation} />
                                    </div>
                                    <div>
                                        <p>The basic account holders cannot earn interest.</p>
                                        <p>Please upgrade to Bronze account by holding at least in your account to receive interest on your funds.</p>
                                    </div>
                                </div>
                            </div>
                        }
                        <Container>
                            <Row>
                                <Col xl={4} className="mb-3 mb-xl-0">
                                    <div className="card">
                                        <div className="d-flex align-items-center flex-wrap flex-md-nowrap">
                                            <div className="me-3 mb-3 mb-md-0"> <img src={Cart} alt="" /></div>
                                            <strong className="me-3 mb-3 mb-md-0 d-block">Buy TRI</strong>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={4} className="mb-3 mb-xl-0">
                                    <div className="card">
                                        <div className="d-flex align-items-center flex-wrap flex-md-nowrap">
                                            <div className="me-3 mb-3 mb-md-0"><img src={Star} alt="" /></div>
                                            <div><strong className="me-3 mb-3 mb-md-0 d-block">Increase your account level</strong></div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={4} className="mb-3 mb-xl-0">
                                    <div className="card ">
                                        <div className="d-flex align-items-center flex-wrap flex-md-nowrap">
                                            <div className="me-3 mb-3 mb-md-0"> <img src={Wallet} alt="" /></div>
                                            <div> <strong className="me-3 mb-3 mb-md-0 d-block">Get more profit!</strong></div>
                                        </div>

                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="card-level">
                        <div className="level-tabs  ">
                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                <div>
                                    <div className="d-flex flex-wrap">
                                        <div className="p-3 deposit-details deposit-detailss">
                                            <Select
                                                // menuIsOpen="true"
                                                className="w-100"
                                                classNamePrefix="liveTriage"
                                                isSearchable={false}
                                                options={levels}
                                                onChange={(e) => { setSearchLevel(e.value); }}
                                                value={levels.filter(level => level.value === searchLevel)} />
                                        </div>
                                        <div className="p-3 deposit-details deposit-detailss ">
                                            <Select
                                                classNamePrefix="liveTriage"
                                                // menuIsOpen="true"
                                                isSearchable={false}
                                                options={subLevels}
                                                onChange={(e) => { setSearchSubLevel(e.value); }}
                                                value={subLevels.filter(level => level.value === searchSubLevel)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <Annualized searchLevel={searchLevel} searchSubLevel={searchSubLevel} />
                        </div>
                    </div>
                    <div className="profit-calculator">
                        <div className="card-level">
                            <div className="body-content">
                                <strong className="d-block">Profit Calculator</strong>
                                <p>Want to know how much you can earn at different account levels? Calculate your profit now!</p>
                                <div className="grid-box">
                                    {/* <div className="text-white deposit-details">
                                    <label>Currency</label>
                                    <Select isSearchable={false} placeholder={<span>Select Currency</span>} className="w-100" options={currencies}
                                        value={currencies?.filter(currency => currency.label === calculatorCurrency)}
                                        onChange={(e) => setCalculatorCurrency(e.value)}
                                        classNamePrefix="triage-select"
                                    />
                                </div> */}
                                    <div className="text-white">
                                        <label>Amount ($)</label>
                                        <div className="enter-amount-input w-100">
                                            <input style={{ padding: "18px 52px 18px 10px" }} placeholder="Enter Amount" type="text"
                                                onKeyDown={(e) => ENV.decimalNumberValidator(e)}
                                                onChange={(e) => setAmount(e.target.value)} />
                                            <div className="input-lable">USD</div>
                                        </div>
                                    </div>
                                    <div className="text-white deposit-details">
                                        <label>Level</label>
                                        <div>
                                            <div className="d-flex flex-wrap">
                                                <div className="w-100">
                                                    <Select
                                                        classNamePrefix="triage-select"
                                                        isSearchable={false}
                                                        options={levels}
                                                        onChange={(e) => setCalculatorLevel(e.value)}
                                                        value={levels.filter(level => level.value === calculatorLevel)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-white deposit-details">
                                        <label>Sub Level</label>
                                        <div>
                                            <div className="d-flex flex-wrap">
                                                <div className="w-100">
                                                    <Select
                                                        classNamePrefix="triage-select"
                                                        isSearchable={false}
                                                        options={subLevels}
                                                        onChange={(e) => setCalculatorSubLevel(e.value)}
                                                        value={subLevels.filter(level => level.value === calculatorSubLevel)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-white deposit-details">
                                        <label>Period</label>
                                        <Select
                                            classNamePrefix="triage-select"
                                            isSearchable={false}
                                            options={timePeriods}
                                            onChange={(e) => { setTimePeriod(e.value); }}
                                            value={timePeriods.filter(level => level.value === timePeriod)}
                                        />
                                        {/* <Select placeholder={<span>24 Months</span>} className="w-100" options={period} classNamePrefix="triage-select" /> */}
                                    </div>
                                    <div className="text-white deposit-details">
                                        <label>Interest Paid to</label>
                                        <Select
                                            classNamePrefix="triage-select"
                                            isSearchable={false}
                                            options={interestPaids}
                                            onChange={(e) => { setIntrestPaid(e.value); }}
                                            value={interestPaids.filter(level => level.value === intrestPaid)}
                                        />
                                        {/* <Select placeholder={<span>Available</span>} className="w-100" options={intrest} classNamePrefix="triage-select" /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="footer">
                                <div className="text-center">

                                    {calculatorCurrency || calculatorLevel || calculatorSubLevel || timePeriod ?
                                        caluculatedApy() === 0 ? <p className="mb-0">The profit plan for the selected criteria does not exist.</p> :
                                            <>
                                                <p className="mb-2">Profit: <span className="success-rate">+
                                                    {(caluculatedApy() * amount) / 100}
                                                    {searchCurrency}</span> Profit in {timePeriod} months</p>
                                                <p className="mb-0">APY = {caluculatedApy()}%</p>
                                            </>
                                        : <p className="mb-0">calculate by selecting values from above dropdowns</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </Container>
            </div>
    )
}

const mapStateToProps = (state) => ({
    accountLevel: state.accountLevel,
    wallets: state.wallets,
    user: state.user
})

export default connect(mapStateToProps, { beforeLevels, listLevels, searchLevelsDetails, getCriteriaList, beforeUser, levelsInvestments, getWalletLists, beforeWallets })(AccountLevel)