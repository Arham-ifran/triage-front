import React from "react";
import Banner from "./banner/banner";
import CryptoMarket from "./cryptoMarket/cryptoMarket";
import MaximizeChanges from "./maximizeChanges/maximizeChanges";
import OpenWallet from "./openWallet/openWallet";
import TimeExecution from "./timeExecution/timeExecution";
import './home.css'

function Home() {
    return(
        <>
        <Banner />
        <OpenWallet />
        <CryptoMarket />
        <TimeExecution />
        <MaximizeChanges />
        </>
    )
}
export default Home;