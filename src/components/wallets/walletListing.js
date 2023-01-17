import React, { useEffect, useState } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faGear, faMagnifyingGlass, faThumbTack, faArrowsRotate, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import TopIcon from "../../assets/images/card-top.svg"
import BottomIcon from "../../assets/images/card-bottom.svg"
import Refresh from "../../assets/images/Icon feather-refresh-ccw.svg"
import Pin from "../../assets/images/Icon metro-pin.svg"
import Icon1 from "../../assets/images/icon1.svg"
import "./wallets.css"
import Alert from "../../assets/images/alert-svgrepo-com.svg"
import { useNavigate } from 'react-router-dom'
import WalletCard from "./walletCard";
import { getBalanceOfToken } from "../../utils/web3";
import { connect } from 'react-redux';
import { ENV } from '../../config/config'



const WalletListing = (props) => {

    const [ tokenWallet, setTokenWallet] = useState()
    let usdBalanace = 0


    useEffect(() => {
        if (props.user?.user?.tokenWallets?.ethereum) {
            let userTokenWallets = props.user?.user?.tokenWallets
            setTokenWallet(userTokenWallets?.ethereum)
        }
    }, [props.user.user])

    const getTokenBalance = async (networkId,walletAddress, usdValue ) => {
        let bal = await getBalanceOfToken(networkId, walletAddress, tokenWallet)
        let balanceinUsd = usdValue ? bal * usdValue : bal
        usdBalanace = usdBalanace + balanceinUsd
        ENV.encryptUserBal(usdBalanace)
    }



    return (
        <Row>
            {
                props.wallets.map((wallet, index) => {
                    let currencyCap = props.currencyCaps
                    let valueInUSD = currencyCap[`${wallet.symbol}InUSD`]
                    getTokenBalance(wallet.networkId, wallet.walletAddress,valueInUSD )

                    return (
                        <Col key={index} className="mb-4" xxl={6} lg={12}>
                            <WalletCard data={wallet} valueInUSD={valueInUSD || 1} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps, {})(WalletListing)