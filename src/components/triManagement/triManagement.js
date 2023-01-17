import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Profile from "../../assets/images/profile.png"
import TriIcon1 from "../../assets/images/tri-1.svg"
import TriIcon2 from "../../assets/images/tri-2.svg"
import TriIcon3 from "../../assets/images/tri-3.svg"
import TriIcon4 from "../../assets/images/tri-4.svg"
import Icon from "../../assets/images/double-arrow.svg"
import ETH from "../../assets/images/small-cone.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Graph from "../../assets/images/graph.png"
import "./management.css"
import Navbar from "../shared/navbar/navbar";
import { ENV } from './../../config/config';
import { getBalanceOfToken, getLockedTRI } from '../../utils/web3'
import { connect } from 'react-redux'
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct" , "Nov" , "Dec"],
  datasets: [
    {
      label: "TRI",
      data: [1,1,1,1,1,1,1,1,1,1,1,1],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      color:"white",
      borderColor: "rgba(75,192,192,1)"
    },
    // {
    //   label: "Second dataset",
    //   data: [33, 25, 35, 51, 54, 76],
    //   fill: false,
    //   borderColor: "#742774"
    // }
  ]
};
const options = {
    legend: {
        display: false
    },
    tooltips: {
        enabled: false
    }
}


const Tri_Management = (props) => {

    const [totalTRI, setTotalTRI] = useState()
    const [lockedTRI, setLockedTRI] = useState()
    const [tokenWallets, setTokenWallets] = useState()
    const [TRIVal, setTRIVal] = useState()

    useEffect(() => {
        if (props.user?.user?.tokenWallets.ethereum) {
            setTokenWallets(props.user?.user?.tokenWallets)
            getMaxBalance()
        } else {
            setTokenWallets(null)
        }
    }, [props.user.user])

    const getMaxBalance = async () => {
        let chainConfig =  null
        let networkId = null
        if(ENV.default_network === "testnet"){
            chainConfig = ENV.chainsConfigs[5]
            networkId = 5
        }else { 
            chainConfig = ENV.chainsConfigs[1]
            networkId = 1
        }
        let bal = await getBalanceOfToken(networkId, chainConfig.primaryToken.address, props.user?.user?.tokenWallets?.ethereum)
        setTotalTRI(bal)
        let lockedBal = await getLockedTRI(chainConfig.primaryToken.address)
        setLockedTRI(lockedBal)
        setTRIVal(chainConfig.primaryToken.valueInUsd)

    }


    return (
        <div className="management d-flex">
            <div className="management-details wallet-details p-3">
                <Container>
                    {/* <div className="d-flex justify-content-end pt-75 top-head flex-wrap">
                        <Navbar />
                    </div> */}
                    <div>
                        <h2>Earn Interest</h2>

                        <Row className="tri-card">
                            <Col xxl={3} xl={4} md={6} className="mb-3 mb-xxl-0">
                                <div className="tri-cards">
                                    <div className="d-flex flex-wrap align-items-center">
                                        <div className="me-3 mb-3 mb-sm-0">
                                            <img src={TriIcon1} alt="" />
                                        </div>
                                        <strong>Deposit TRI</strong>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={3} xl={4} md={6} className="mb-3 mb-xxl-0">
                                <div className="tri-cards">
                                    <div className="d-flex flex-wrap align-items-center">
                                        <div className="me-3 mb-3 mb-sm-0">
                                            <img src={TriIcon2} alt="" />
                                        </div>
                                        <strong>Buy TRI</strong>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={3} xl={4} md={6} className="mb-3 mb-xxl-0">
                                <div className="tri-cards">
                                    <div className="d-flex flex-wrap align-items-center">
                                        <div className="me-3 mb-3 mb-sm-0">
                                            <img src={TriIcon3} alt="" />
                                        </div>
                                        <strong>Exchange to TRI</strong>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={3} xl={4} md={6} className="mb-3 mb-xxl-0">
                                <div className="tri-cards">
                                    <div className="d-flex flex-wrap align-items-center">
                                        <div className="me-3 mb-3 mb-sm-0">
                                            <img src={TriIcon4} alt="" />
                                        </div>
                                        <strong>Earn Interest</strong>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xxl={8} xl={7} className="mb-3 mb-xxl-0">
                                <div className="graph">
                                    <div className="head d-flex justify-content-between align-items-center flex-wrap">
                                        <div>
                                            <div className="d-flex align-items-center flex-wrap">
                                                <div className="circle-icon">
                                                    <img src={Icon} alt="" />
                                                </div>
                                                <div>
                                                    <span>{ENV.primaryTokenName}</span>
                                                    <span className="green-value">Exchange rate</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="neg-value"> <FontAwesomeIcon icon={faCaretDown} /> 0%</span>
                                            <span className="text-end">{TRIVal} {ENV.defaultCurrency}</span>
                                        </div>
                                    </div>

                                    {/* graph should not be image */}

                                    <Line data={data} options={options} />



                                    <div>
                                        {/* <img className="img-fluid" src={Graph} alt="" /> */}
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={4} xl={5}>
                                <div className="manual-calculations">
                                    <div className="card">
                                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                                            <div>
                                                <div className="d-flex align-items-center flex-wrap">
                                                    <span className="tri-circle mb-2 mb-sm-0">
                                                        <img src={Icon} alt="" />
                                                    </span>
                                                    <span className="mb-2 mb-sm-0">TRI Available</span>
                                                </div>
                                            </div>
                                            <div className="pl-62">
                                                <span>{totalTRI}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                                            <div>
                                                <div className="d-flex align-items-center flex-wrap">
                                                    <span className="tri-circle mb-2 mb-sm-0">
                                                        <img src={Icon} alt="" />
                                                    </span>
                                                    <span className="mb-2 mb-sm-0">TRI Locked</span>
                                                </div>

                                            </div>
                                            <div className="pl-62">
                                                <span>{lockedTRI}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                                            <div>
                                                <div className="d-flex align-items-center flex-wrap">
                                                    <span className="tri-circle mb-2 mb-sm-0 ">
                                                        <img src={Icon} alt="" />
                                                    </span>
                                                    <span className="mb-2 mb-sm-0">Total TRI</span>
                                                </div>
                                            </div>
                                            <div className="pl-62">
                                                <span>{lockedTRI + totalTRI}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    wallets: state.wallets,
    user: state.user,
})

export default connect(mapStateToProps, {})(Tri_Management)