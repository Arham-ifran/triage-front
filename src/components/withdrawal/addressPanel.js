import React, { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import AddressBook from "../myAccount/addressBook";
import "./withdrawal.css"

const AddressPanel = (props) => {

    const { setStep, setAddressForWithdrawal, addressForWithdrawal, setCryptoAddrAvailable, selectedCurrencyNetworkId } = props

    return (
        <div className="bank-requisites p-3">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <div className="d-flex justify-content-between align-items-baseline flex-wrap">
                    <div className="mb-4"><h2 className="mb-2">Choose Crypto Requisites</h2>
                        <p className="text-white">Select the Address Where you want to receive the interest.</p>
                    </div>
                </div>
                <AddressBook setStep={setStep} setAddressForWithdrawal={setAddressForWithdrawal} addressForWithdrawal={addressForWithdrawal} setCryptoAddrAvailable={setCryptoAddrAvailable} selectedCurrencyNetworkId={selectedCurrencyNetworkId}/>
                {/* <Tab.Content>
                    <Tab.Pane eventKey="first">
                    </Tab.Pane> */}
                    {/* <Tab.Pane eventKey="second"> */}
                        {/* <Sonnet /> */}
                    {/* </Tab.Pane> */}
                {/* </Tab.Content> */}
            </Tab.Container>
        </div >
    )
}
export default AddressPanel