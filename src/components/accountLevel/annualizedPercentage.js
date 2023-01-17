import { useState, useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import "./accountLevel.css"
import Error_Icon from "../../assets/images/Icon material-error.svg"
import Select from 'react-select'
import BTC_Logo from "../../assets/images/icon1.svg"
import BitIcon from "../../assets/images/B-icon.svg"
import { connect } from 'react-redux';
import { getWalletLists, beforeWallets } from "../../redux/wallet/wallet.action"
import { searchLevelsDetails, beforeLevels } from "./accountLevel.action";
import { ENV } from "../../config/config";


function Annualized(props) {
    // const [wallets, setWallets] = useState([])
    const [searchCurrency, setSearchCurrency] = useState()
    const [levelsData, setLevelsData] = useState()

    useEffect(() => {
        // props.getWalletLists();
        props.searchLevelsDetails()
    }, [])

    useEffect(() => {
        if (props.wallets.getWalletsAuth) {
            props.beforeWallets()
            // setWallets(props.wallets.wallets)
            setSearchCurrency(props.wallets.wallets[0].symbol)
        }
    }, [props.wallets.getWalletsAuth])

    useEffect(() => {
        if (props.accountLevel.searchLevelAnnualizedAuth) {
            let monthsData = []
            props.beforeLevels()
            const { accountLevels } = props.accountLevel.listLevelAnnualized

            for (let index = 0; index < accountLevels.length; index++) {
                const element = accountLevels[index].profitInMonths[0]
                monthsData.push(element)
            }

            setLevelsData(monthsData)
        }
    }, [props.accountLevel.searchLevelAnnualizedAuth])

    // const currencies = wallets.map(wallet => (
    //     { value: wallet.symbol, label: wallet.symbol }
    // ))


    useEffect(() => {
        let obj = {
            searchLevel: props.searchLevel,
            searchSubLevel: props.searchSubLevel,
            searchCurrency,
            key: "annualized"
        };
        let qs = ENV.objectToQueryString(obj)
        if (props.searchLevel && props.searchSubLevel && searchCurrency) {
            props.searchLevelsDetails(qs)
        }
    }, [searchCurrency, props.searchSubLevel, props.searchLevel])


    return (
        <>
            <Row className="deposit-details">
                {/* <Col xl={3} className="mb-3 mb-xl-0">
                    <strong>Currency</strong>
                    <Select isSearchable={false} placeholder={<span>Select Currency</span>} className="w-100" options={currencies}
                        value={currencies.filter(currency => currency.label === searchCurrency)}
                        onChange={(e) => setSearchCurrency(e.value)}
                        classNamePrefix="triage-select"
                    />
                </Col> */}
                <Col xl={12}>
                    <div className="empty-tag">
                        <strong>&nbsp;</strong>

                    </div>
                    <div className="top-label mb-4">

                        <h2 className="mb-0">Annualized Percentage</h2>
                    </div>
                    <div className="table-responsive">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="d-flex"><span >Years</span></th>
                                    <th>Profits in Available Balance <span className="ms-2"><img src={Error_Icon} alt="" /></span></th>
                                    <th>Profits in Locked Balance <span className="ms-2"><img src={Error_Icon} alt="" /></span></th>
                                    {/* <th>Profits in TRG to Locked Balance <span className="ms-2"><img src={Error_Icon} alt="" /></span></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {levelsData && levelsData.map(level => (
                                    <tr>
                                        <td>{(level.months / 12).toFixed(4)}</td>
                                        <td>{level.availableProfit}%</td>
                                        <td>{level.lockedProfit}%</td>
                                        {/* <td>{level.lockedProfitInPrimaryCurrency}%</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = (state) => ({
    wallets: state.wallets,
    accountLevel: state.accountLevel
})

export default connect(mapStateToProps, { getWalletLists, beforeWallets, searchLevelsDetails, beforeLevels })(Annualized)