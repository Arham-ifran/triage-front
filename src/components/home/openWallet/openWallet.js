import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap"
import Bitcoin from "../../../assets/images/Icon metro-bitcoin.svg"
import Bitcoin2 from "../../../assets/images/eth-svgrepo-com.svg"
import Bitcoin3 from "../../../assets/images/ripple-svgrepo-com.svg"
import Bitcoin4 from "../../../assets/images/trg.svg"
import Bitcoin5 from "../../../assets/images/ltc.svg"
import USDT from "../../../assets/images/usdt-svgrepo-com.svg"
import ETH from "../../../assets/images/eth.svg"
import BNB from "../../../assets/images/bnb.png"
import USDC from "../../../assets/images/usdc.png"
import BUSD from "../../../assets/images/busd.png"
import Path from "../../../assets/images/path.svg"
import RedPath from "../../../assets/images/red-path.svg"
import "./openWallet.css"
import { Link } from "react-router-dom";
import { getCurrencyList, beforeFooter } from "../../shared/footer/footer.action";
import { connect } from "react-redux"


function OpenWallet(props) {
    const [CurrencyData, setCuurencyData] = useState(null)

    useEffect(() => {
        props.getCurrencyList()
    }, [])

    useEffect(() => {
        if (props.footer.getCurrencyAuth) {
            props.beforeFooter()
            setCuurencyData(props?.footer?.currencyList)
        }

    }, [props.footer.getCurrencyAuth])



    return (
        <div className="earn">
            <Container>
                <Row className="align-items-center">
                    <Col className="mb-3 mb-md-0" xl={7}>
                        {CurrencyData?.map(currency => (
                            <div className="box mb-2 d-flex align-items-center justify-content-between flex-wrap flex-md-nowrap">

                                <div className="box-in d-flex me-4 align-items-center flex-wrap justify-content-between w-100">
                                    <div className="d-flex">
                                        <div className="circle me-2">
                                            <img src={
                                                currency.symbol === "BTC" ? Bitcoin :
                                                    currency.symbol === "ETH" ? ETH
                                                        : currency.symbol === "USDT" ? USDT
                                                            : currency.symbol === "BNB" ? BNB
                                                                : currency.symbol === "USDC" ? USDC
                                                                    : currency.symbol === "BUSD" ? BUSD
                                                                        : ''} alt="" />
                                        </div>
                                        <div className="me-4 mb-4 mb-md-0">
                                            <strong className="d-block">{currency.symbol}</strong>
                                            <span>{currency.name}</span>
                                        </div>
                                    </div>
                                    <span className="text-white ms-4 me-4 pull-end">$ {(currency.quote.USD.price).toFixed(2)}</span>
                                </div>

                                {/* <div className="box-margin-bottom">
                                <span className="ms-2 me-4 value">+0.35%</span>
                                <span className="ms-2 me-4 value">2% - 49%</span>
                                <img className="img-fluid" src={Path} />
                            </div> */}
                                {/* <div><Link className="btn-triage-div btn-triage" to={''}><span>Earn</span></Link></div> */}
                            </div>
                        ))}
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center" xl={1}>
                        <div className="separator"></div>
                    </Col>
                    <Col className="pl-3" xl={4}>
                        <h2 className="price">EARN UP TO <span className="percent">120%</span> INTEREST!</h2>
                        <p className="mb-4">
                            Aenean sed lorem est. Sed quis neque ut nibh suscipit imperdiet ac non augue. Aenean ornare sit amet lectus non tristique. Nunc ut volutpat lectus. Nulla velit augue, pulvinar sed nisi sit amet, eleifend fermentum esaugue, pulvinnar seased nir sedt.
                        </p>
                        <p className="mb-4">Quisque nibh justo, congue ut erat at, aliquet efficitur purus. Integer venenatis odio vitae orci efficitur mollis.</p>
                        <ul>
                            <li>Aenean sed lorem ested quis neque ut nibh</li>
                            <li> Guscipit imperdiet ac non auguee enean </li>
                            <li>Hrnare sit amet lectus non tristique.</li>
                        </ul>
                        <Link to={'/sign-up'} className="btn-triage-div btn-triage"><span>Open a Wallet</span></Link>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

const mapStateToProps = (state) => ({
    footer: state.footer
})

export default connect(mapStateToProps, { getCurrencyList, beforeFooter })(OpenWallet)