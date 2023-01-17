import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import BTC_Icon from "../../assets/images/icon1.svg"
import BTC_Icon2 from "../../assets/images/icon2.svg"
import Brand1 from "../../assets/images/b1.png"
import Brand2 from "../../assets/images/b2.png"
import { getCurrencyCaps, beforeCurrencyCaps } from '../../redux/dashboard/dashboard.action'
import { connect } from 'react-redux'
import FullPageLoader from '../FullPageLoader/FullPageLoader'
import { ENV } from '../../config/config'

const ValuesInUSD = (props) =>  {

    const [currencyList, setCurrencyList] = useState({}) //currenct obj
    const [walletList, setWalletList] = useState([])
    const [fullPageLoader, setFullPageLoader] = useState(true)

    useEffect(()=> {
        props.beforeCurrencyCaps()
        props.getCurrencyCaps()
    }, [])

    useEffect(() => {
        if (props.dashboard.getCurrencyCapAuth) {
            setCurrencyList(props.dashboard?.currencyCapsList)
            setWalletList(props.dashboard?.walletList)
            setFullPageLoader(false)
        }
    }, [props.dashboard.getCurrencyCapAuth])

    return (
        <>
            {
                fullPageLoader ? <FullPageLoader /> : 
                <div className="table-responsive livetrigae-table">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th >
                                    &nbsp;

                                </th>
                                <th >
                                    <div className="brand-tag">
                                        <img src={Brand1} alt="" />
                                    </div>
                                    <span className="brand-name">Coin Market Cap</span>
                                </th>
                                {/* <th >
                                    <div className="brand-tag">
                                        <img src={Brand2} alt="" />
                                    </div>
                                    <span className="brand-name d-block text-center me-4">Kraken</span>
                                </th>
                                <th >
                                    <div className="brand-tag">
                                        <img src={Brand1} alt="" />
                                    </div>
                                    <span className="brand-name">TheRockTrading</span>
                                </th>
                                <th >
                                    <div className="brand-tag">
                                        <img src={Brand2} alt="" />
                                    </div>
                                    <span className="brand-name d-block text-center me-4">Kraken</span>
                                </th>
                                <th >
                                    <div className="brand-tag">
                                        <img src={Brand1} alt="" />
                                    </div>
                                    <span className="brand-name">TheRockTrading</span>
                                </th>
                                <th >
                                    <div className="brand-tag">
                                        <img src={Brand2} alt="" />
                                    </div>
                                    <span className="brand-name d-block text-center me-4">Kraken</span>
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                walletList?.map((e) => {
                                    return (
                                        <tr>
                                            <td >
                                                <div className="d-flex justify-content-center align-items-end">
                                                    <div className="me-2"><img src={BTC_Icon2} alt="" /></div>
                                                    <span className="text-white">{e.symbol}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="success-value d-block">{ENV.defaultCurrency} {currencyList[`${e.symbol}InUSD`] || 1}</span>
                                                <span>VOL: {currencyList[`${e.symbol}InUSD`] || 1} </span>
                                            </td>
                                            <td className="text-white">_</td>
                                            <td className="text-white">_</td>
                                            <td className="text-white">_</td>
                                            <td className="text-white">_</td>
                                            <td className="text-white">_</td>
                                            <td className="text-white">_</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    dashboard: state.dashboard
})

export default connect(mapStateToProps, { beforeCurrencyCaps, getCurrencyCaps })(ValuesInUSD)