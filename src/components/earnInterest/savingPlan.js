import React from "react";
import "./earnInterest.css"

const SavingPlan = ({ selectedToken, data}) => {
    return (
        <div className="saving-plan wallet-details p-0">
            <div className="wallet-card">
                <div className="card-body">
                    <div className="about flex-wrap d-flex align-items-center">
                        <div className="me-2"><span className="pin-circle bg-white">
                            <img src={selectedToken?.logo} alt="" />
                        </span></div>
                        <div>
                            <strong>Deposit {data?.months} months</strong>
                            <span className="value d-block">
                                {data?.lockedProfit}% Profit</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SavingPlan