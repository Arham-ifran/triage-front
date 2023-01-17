import React, { useEffect, useState, useMemo } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faGear, faMagnifyingGlass, faThumbTack, faArrowsRotate, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import TopIcon from "../../assets/images/card-top.svg"
import BottomIcon from "../../assets/images/card-bottom.svg"
import Refresh from "../../assets/images/Icon feather-refresh-ccw.svg"
import Pin from "../../assets/images/Icon metro-pin.svg"
import Icon1 from "../../assets/images/icon1.svg"
import "./wallets.css"
import { useNavigate } from 'react-router-dom'
import Alert from "../../assets/images/alert-svgrepo-com.svg"
import { connect } from 'react-redux';
import WalletListing from "./walletListing";
import { getWalletLists, beforeWallets, getSymbolsLists } from "../../redux/wallet/wallet.action"
import Navbar from "../shared/navbar/navbar";
import debounce from 'lodash.debounce';
import FullPageLoader from "../FullPageLoader/FullPageLoader";

const Wallets = (props) => {

    const [fullPageLoader, setFullPageLoader] = useState(true)
    const [wallets, setWallets] = useState([])
    const [currenciesArray, setCurrenciesArray] = useState([])
    const [selectedCurrencies, setSelectedCurrencies] = useState([...currenciesArray]) //[...defaultSelectedCurrencies]
    const [searchSymbolText, setSearchSymbolText] = useState()
    const [filterType, setFilterType] = useState("custom") // cutom, balance, name
    const [currencyCaps, setCurrencyCaps] = useState()
    const [selectCurrenciesAll, setSelectCurrenciesAll] = useState(null)

    useEffect(() => {
        if (selectCurrenciesAll == "no") {
            setSelectedCurrencies(["false"])
            currenciesArray.map((e) => {
                document.getElementById(e).checked = false
            })
        }
        if (selectCurrenciesAll == "yes") {
            setSelectedCurrencies([...currenciesArray])
            currenciesArray.map((e) => {
                document.getElementById(e).checked = true
            })
        }
    }, [selectCurrenciesAll])

    useEffect(() => {
        let token = localStorage.getItem("accessToken")
        if (token) {
            props.beforeWallets()
            props.getSymbolsLists()
            props.getWalletLists()
        }
    }, [])

    useEffect(() => {
        if (props.wallets.getSymbolsAuth) {
            setCurrenciesArray(props.wallets.symbols)
        }
    }, [props.wallets.getSymbolsAuth])

    useEffect(() => {
        if (props.wallets.getWalletsAuth) {
            setFullPageLoader(false)
            setWallets(props.wallets.wallets)
            setCurrencyCaps(props.wallets.currencyCaps) //currencyCaps
        }
    }, [props.wallets.getWalletsAuth])

    useEffect(() => {
        props.beforeWallets()
        setFullPageLoader(true)
        let payload = { symbols: selectedCurrencies, symbolText: searchSymbolText, sortByName: filterType }
        let token = localStorage.getItem("accessToken")
        if (token) {
            props.getWalletLists(payload)
        }
    }, [selectedCurrencies, searchSymbolText, filterType])

    const manageCurrencies = (currency) => {
        setSelectCurrenciesAll(null)
        if (selectedCurrencies?.includes(currency)) {
            // remove the currencies
            let temp = [...selectedCurrencies]
            let removedArray = temp.filter((e) => e !== currency)
            setSelectedCurrencies([...removedArray])
        } else {
            let temp = [...selectedCurrencies]
            temp.push(currency)
            setSelectedCurrencies([...temp])
        }
    }

    const changeHandler = (e) => {
        setSearchSymbolText(e.target.value)
    }
    const debouncedChangeHandler = useMemo(
        () => debounce(changeHandler, 300)
        , []);


    return (
        <div className="wallet-details deposit-details p-3">
            <Container>
                <div>
                    {/* <div className="d-flex justify-content-end pt-75 flex-wrap align-items-baseline top-head">
                        <Navbar />
                    </div> */}
                    <h2>Wallets</h2>
                    <div className="alert-msg position-relative">
                        <div className="alert-icon"> <img src={Alert} alt="" /></div>
                        <strong>ATTENTION: IMPORTANT!</strong>
                        <p>You can start receiving interest of up to 50% by locking your funds with our Earn Interest program.</p>
                    </div>
                    {/* <div className="d-flex justify-content-between flex-md-nowrap flex-wrap search-sec">
                        <div className="d-flex flex-wrap flex-sm-nowrap">
                            <div className="field-input d-flex justify-content-between align-items-center ms-2 mb-3 flex-wrap flex-lg-nowrap mb-lg-0">
                                <div className={`${filterType === "custom" ? "custom-tag" : ''}`} onClick={() => { setFilterType("custom") }}><span>Default</span></div>
                                <div className={`${filterType === "balance" ? "custom-tag" : ''}`} onClick={() => { setFilterType("balance") }} ><span>By Balance</span></div>
                                <div className={`${filterType === "name" ? "custom-tag" : ''}`} onClick={() => { setFilterType("name") }}><span>A-Z</span></div>
                            </div>
                            <Dropdown className="mb-3 mb-lg-0 ms-2" >
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    <FontAwesomeIcon className="icon" icon={faGear} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <strong  >Currency Choice</strong>
                                    <ul style={{ width: "371px;", marginBottom: "54px" }} >
                                        <li className="d-flex justify-content-between mb-2 flex-wrap">
                                            <div class="form-group d-flex justify-content-center">
                                                <div>
                                                    <input type="checkbox" checked={selectCurrenciesAll === "no" ? true : false} onClick={() => setSelectCurrenciesAll("no")} id="11" />
                                                    <label className="label-text" for="11">
                                                        Hide all
                                                    </label>
                                                </div>
                                                <span for="11">Hide all</span>
                                            </div>
                                            <div class="form-group d-flex justify-content-center">
                                                <div>
                                                    <input type="checkbox" checked={selectCurrenciesAll === "yes" ? true : false} onClick={() => setSelectCurrenciesAll("yes")} id="21" />
                                                    <label for="21" className="m-0 label-text">
                                                        Show all
                                                    </label>
                                                </div>
                                                <span for="21">Show all</span>
                                            </div>
                                            <div class="form-group d-flex justify-content-center">
                                                <div></div>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul style={{ width: "371px;" }} className="d-flex check-list flex-wrap" >
                                        {
                                            currenciesArray.map((e) => {
                                                return (
                                                    <li className="d-flex justify-content-between mb-2 flex-wrap" >
                                                        <div class="form-group d-flex justify-content-center" key={e} >
                                                            <div>
                                                                <input type="checkbox" id={e} onChange={() => { manageCurrencies(e) }} />
                                                                selectedCurrencies.includes(e)  defaultChecked={true}
                                                                <label className="label-text" for={e}>

                                                                    {e}
                                                                </label>
                                                            </div>
                                                            <span for={e}>{e}</span>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="search-field ms-2 mb-0">
                            <div className="search-icon">
                                <FontAwesomeIcon className="icon icon-search" icon={faMagnifyingGlass} />
                            </div>
                            <input placeholder="Enter text to search" onChange={(e) => { debouncedChangeHandler(e) }} />
                        </div>
                    </div> */}
                    {
                        fullPageLoader ?

                            <div>
                                <FullPageLoader />
                            </div>
                            :
                            wallets.length ?
                                <WalletListing wallets={wallets} currencyCaps={currencyCaps} /> : <div className="not-found"><p>No Wallet Available.</p></div>
                    }
                </div>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => ({
    wallets: state.wallets
})

export default connect(mapStateToProps, { getWalletLists, beforeWallets, getSymbolsLists })(Wallets)